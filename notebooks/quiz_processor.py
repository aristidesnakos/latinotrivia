import json
from datetime import datetime
import os
import dotenv
from openai import OpenAI
import argparse

dotenv.load_dotenv()

# Available categories with descriptions
CATEGORIES = {
    "tutorial": "General tutorial content for CreateQuiz.Video",
    "quickstart": "Getting started guides for CreateQuiz.Video",
    "youtube": "YouTube-related content and guides",
    "accessibility": "Accessibility features and guidelines",
    "shorts": "Content related to YouTube Shorts",
    "greekTrivia": "Quizzes and content about Greek mythology and culture",
    "uvRating": "Content related to UV ratings and sun safety",
    "latinoTrivia": "Quizzes and content about Latino culture and history"
}

def get_blog_content_from_llm(quiz_data):
    """Generate blog content using Groq LLM."""
    client = OpenAI(
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1"
    )

    categories_str = "\n".join([f"- {slug}: {desc}" for slug, desc in CATEGORIES.items()])

    prompt = f"""Given a quiz about a specific topic, generate a blog post frontmatter and introduction.
    The output should be in JSON format with the following structure:
    {{
        "slug": "kebab-case-title",
        "title": "Engaging title that includes SEO keywords",
        "description": "2-3 sentences describing the quiz and its value to readers",
        "categories": ["CATEGORY_SLUG"],
        "introduction": "2-3 paragraphs introducing the topic and encouraging participation"
    }}

    Available categories (choose from these slug values only):
    {categories_str}

    Make the content engaging, SEO-friendly, and valuable to readers.
    You MUST choose categories only from the available list above.
    Quiz data: {json.dumps(quiz_data)}"""

    try:
        print("Sending request to OpenRouter API...")
        completion = client.chat.completions.create(
            model="google/gemini-2.0-flash-thinking-exp:free",
            messages=[{"role": "system", "content": prompt}],
            response_format={ "type": "json_object" },
            max_tokens=4000,
            temperature=0
        )
        print(f"Received response from OpenRouter API: {completion.choices[0].message.content}")
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        print(f"Error generating blog content: {str(e)}")
        return None

def clean_quiz(quiz_data):
    """Clean the quiz data to keep only essential information."""
    cleaned_quiz = {
        "title": quiz_data.get("cover", {}).get("title") or quiz_data["hook"]["title"],
        "subtitle": quiz_data.get("cover", {}).get("subtitle") or "",
        "description": quiz_data["hook"]["content"],
        "questions": []
    }
    
    for q in quiz_data["questions"]:
        cleaned_question = {
            "question": q["question"],
            "choices": q["choices"],
            "correctAnswerIndex": q["correctAnswerIndex"]
        }
        cleaned_quiz["questions"].append(cleaned_question)
    
    return cleaned_quiz

def create_blog_post(quiz, blog_content=None):
    """Create a markdown blog post from the quiz data."""
    current_date = datetime.now().strftime("%Y-%m-%d")
    
    if blog_content is None:
        blog_content = {
            "slug": quiz["title"].lower().replace(" ", "-"),
            "title": f"Test Your Knowledge: {quiz['title']}",
            "description": quiz["description"][:200] + "...",
            "categories": ["quiz", "education"],
            "introduction": quiz["description"]
        }
    
    # Create the frontmatter
    blog_content = f"""---
slug: "{blog_content['slug']}"
title: "{blog_content['title']}"
description: "{blog_content['description']}"
categories:
{chr(10).join([f'  - {cat}' for cat in blog_content['categories']])}
author: "ari"
publishedAt: "{current_date}"
image:
  src: "/blog/{blog_content['slug']}.webp"
  alt: "{blog_content['title']}"
---

{blog_content['introduction']}

## Take the Quiz!

Test your knowledge with these questions:

"""
    
    # Add questions
    for i, q in enumerate(quiz["questions"], 1):
        blog_content += f"\n### Question {i}: {q['question']}\n\n"
        for j, choice in enumerate(q["choices"]):
            blog_content += f"{j+1}. {choice}\n"
        blog_content += f"\n<details><summary>Click to see the answer</summary>\n\nThe correct answer is: {q['choices'][q['correctAnswerIndex']]}\n\n</details>\n"
    
    return blog_content

# Main execution
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process quiz data and generate a blog post')
    parser.add_argument('quiz_file', help='Path to the JSON file containing quiz data')
    
    args = parser.parse_args()
    
    # Read quiz data from file
    with open(args.quiz_file, 'r') as f:
        quiz_data = json.load(f)
    
    # Clean the quiz
    cleaned_quiz = clean_quiz(quiz_data)
    
    # Generate blog content using Groq LLM
    blog_content = get_blog_content_from_llm(cleaned_quiz)
    
    # Create blog post
    blog_post = create_blog_post(cleaned_quiz, blog_content)
    
    # Construct output path using the blog content's slug
    output_dir = "../app/blog/_assets/articles"
    output_file = os.path.join(output_dir, f"{blog_content['slug']}.md")
    
    # Create directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Write to file
    with open(output_file, "w") as f:
        f.write(blog_post)
    
    print(f"Blog post created at: {output_file}")
