import json
import os
import argparse
from quiz_processor import clean_quiz, create_blog_post, get_blog_content_from_llm
from blog_header import create_blog_header, COLORS

def convert_kebab_to_title(kebab_text):
    """Convert kebab-case to Title Case"""
    return ' '.join(word.capitalize() for word in kebab_text.split('-'))

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Create a blog post from quiz data')
    parser.add_argument('json_file', help='Path to the JSON file containing quiz data')
    parser.add_argument('--bg-color', default='cream', choices=list(COLORS.keys()) + list(COLORS['gradients'].keys()),
                      help='Background color for the blog header image')
    args = parser.parse_args()

    try:
        # Read the quiz data from JSON file
        with open(args.json_file, "r") as f:
            quiz_data = json.load(f)
        
        # Clean the quiz data
        cleaned_quiz = clean_quiz(quiz_data)
        
        # Get blog content from LLM
        blog_content = get_blog_content_from_llm(cleaned_quiz)
        if blog_content is None:
            print("Error: Failed to generate blog content. Please check the logs above for details.")
            return
        
        # Create blog post
        blog_post = create_blog_post(cleaned_quiz, blog_content)
        
        # Save blog post to file
        output_file = os.path.join("app/blog/_assets/articles", f"{blog_content['slug']}.md")
        os.makedirs("app/blog/_assets/articles", exist_ok=True)
        with open(output_file, "w") as f:
            f.write(blog_post)
        
        # Create blog header image
        header_image_path = create_blog_header(
            blog_content['slug'],
            bg_color=args.bg_color,
            maker_name="createquiz.video",
            emphasis_color="#ff0335"
        )
        
        print(f"Blog post created successfully at: {output_file}")
        print(f"Created blog header image: {header_image_path}")
        
    except FileNotFoundError:
        print(f"Error: Could not find JSON file: {args.json_file}")
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in file: {args.json_file}")
    except Exception as e:
        print(f"Error: An unexpected error occurred: {str(e)}")

if __name__ == "__main__":
    main()
