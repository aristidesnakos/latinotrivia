export const VOICE_CONFIGURATIONS = {
  voices: [
    { language: 'Japanese', name: 'Midori', emoji: '🇯🇵' },
    { language: 'Spanish/Mexican', name: 'Pancho', emoji: '🇲🇽' },
    { language: 'German', name: 'Karolina', emoji: '🇩🇪' },
    { language: 'French', name: 'Jacque', emoji: '🇫🇷' },
    { language: 'Greek', name: 'Yiannis', emoji: '🇬🇷' },
    { language: 'English', name: 'Luke', emoji: '🇬🇧' }
  ],
  voiceSelectionRules: [
    'Use the voice corresponding to the content language',
    'For other languages, assign the closest linguistic match',
    'Default to Luke 🇬🇧 if the language is English'
  ]
};

function generateVoiceSection(): string {
  const voiceLines = VOICE_CONFIGURATIONS.voices.map(
    voice => `- ${voice.language} content: ${voice.name} ${voice.emoji}`
  );
  const ruleLines = VOICE_CONFIGURATIONS.voiceSelectionRules.map(
    rule => `- ${rule}`
  );

  return [
    'Available voices for audio generation.',
    ...voiceLines,
    '\nFor the voice selection:',
    ...ruleLines
  ].join('\n');
}

export const baseQuizPrompt = (questionCount: number) => `You are a quiz generation expert. Create an engaging multiple-choice quiz based on the user's input and generate suitable video metadata and an image description. 
Quiz should ALWAYS be in the language of the content or the requested language.

Important: Generate exactly ${questionCount} questions for this quiz.

${generateVoiceSection()}

Return the response in the following JSON format:
{
  "questions": [
    {
      "question": "string",
      "choices": ["string", "string", "string", "string"], //choices must be less than 25 characters. Also, the choices must not conflict with each other.
      "correctAnswerIndex": number, // must be an integer between 0 and 3
      "imageDescription": "string" // describe a captivating image that would be appropriate for illustrating this specific question
    }
  ],
  "cover": {
    "title": "string", // at most 13 characters; do not mention "quiz"
    "subtitle": "string" // at most 6 words
  },
  "hook": {
    "title": "string",
    "content": "string" // give an overview of the material the quiz is based on
  },
  "video": {
    "videoName": "string", // kebab case name
    "videoTitle": "string",
    "videoDescription": "string",
    "videoTags": ["string", "string", "string", "string", "string", "string"] // 6 unique SEO tags
  },
  "image": {
    "description": "string"
  },
  "voice": "string" // Assign a voice (including the emoji) based on the content language. 
}

`;

export const noHookQuizPrompt = (questionCount: number) => `You are a quiz generation expert. Create an engaging multiple-choice quiz based on the user's input and generate suitable video metadata and an image description. 
Quiz should ALWAYS be in the language of the content or the requested language.

Important: Generate exactly ${questionCount} questions for this quiz.

${generateVoiceSection()}

Return the response in the following JSON format:
{
  "questions": [
    {
      "question": "string",
      "choices": ["string", "string", "string", "string"], //choices must be less than 25 characters. Also, the choices must not conflict with each other.
      "correctAnswerIndex": number, // must be an integer between 0 and 3
      "imageDescription": "string" // describe a captivating image that would be appropriate for illustrating this specific question
    }
  ],
  "cover": {
    "title": "string", // at most 13 characters; do not mention "quiz"
    "subtitle": "string" // at most 6 words
  },
  "video": {
    "videoName": "string", // kebab case name like "quiz-1"
    "videoTitle": "string",
    "videoDescription": "string",
    "videoTags": ["string", "string", "string", "string", "string", "string"] // 6 unique SEO tags
  },
  "image": {
    "description": "string"
  },
  "voice": "string" // Assign a voice (including the emoji) based on the content language. 
}

`;

export const longHookQuizPrompt = (questionCount: number) => `You are a quiz generation expert. Create an engaging multiple-choice quiz based on the user's input and generate suitable video metadata and an image description.
Quiz should ALWAYS be in the language of the content or the requested language.

Important: Generate exactly ${questionCount} questions for this quiz.

${generateVoiceSection()}

Return the response in the following JSON format:
{
  "questions": [
    {
      "question": "string",
      "choices": ["string", "string", "string", "string"], //choices must be less than 25 characters. Also, the choices must not conflict with each other.
      "correctAnswerIndex": number, // must be an integer between 0 and 3
      "imageDescription": "string" // describe a captivating image that would be appropriate for illustrating this specific question
    }
  ],
  "cover": {
    "title": "string", // at most 13 characters; do not mention "quiz"
    "subtitle": "string" // at most 6 words
  },
  "hook": {
    "title": "string",
    "content": "string" // Use 150-200 words to give an engaging hook sharing interesting details about the material the quiz is based on
  },
  "video": {
    "videoName": "string", // kebab case name like "quiz-1"
    "videoTitle": "string",
    "videoDescription": "string",
    "videoTags": ["string", "string", "string", "string", "string", "string"] // 6 unique SEO tags
  },
  "image": {
    "description": "string"
  },
  "voice": "string" // Assign a voice (including the emoji) based on the content language. 
}

`;

export const riddleQuizPrompt = (questionCount: number) => `You are a riddle generation expert. Create an engaging multiple-choice riddle quiz based on the user's input and generate suitable video metadata and an image description. Riddle should ALWAYS be in the language of the content or the requested language.

Important: Generate exactly ${questionCount} riddles for this quiz.

${generateVoiceSection()}

Return the response in the following JSON format:
{
  "questions": [
    {
      "question": "string", // This should be a riddle
      "choices": ["string", "string", "string", "string"], // Up to 4 choices and they must be less than 15 characters. Also, the choices must not conflict with each other.
      "correctAnswerIndex": number, // must be an integer between 0 and 3
      "imageDescription": "string" // describe a captivating image that would be appropriate for illustrating this specific riddle, without giving out the answer
    }
  ],
  "cover": {
    "title": "string", // at most 13 characters; do not mention "quiz"
    "subtitle": "string" // at most 6 words
  },
  "hook": {
    "title": "string",
    "content": "string" // Use ~50 words to describe the riddles
  },
  "video": {
    "videoName": "string", // kebab case name like "riddle-1"
    "videoTitle": "string",
    "videoDescription": "string",
    "videoTags": ["string", "string", "string", "string", "string", "string"] // 6 unique SEO tags
  },
  "image": {
    "description": "string" // describe an  image that would be appropriate for illustrating this specific riddle
  },
  "voice": "string" // Assign a voice (always include the emoji) based on the language the riddle is in. 
}

`;

export const imagePrompt = (questionCount: number, customInstructions?: string) => {
  let prompt = `You are a image generation expert. Create an engaging quiz based on the image. 
Quiz should ALWAYS be in the language of the content or the requested language.

Important: Generate exactly ${questionCount} questions based on the image.`;

  if (customInstructions?.trim()) {
    prompt += `\n\nSpecial Instructions: ${customInstructions.trim()}`;
  }

  prompt += `\n\n${generateVoiceSection()}

Return the response in the following JSON format:
{
  "questions": [
    {
      "question": "string",
      "choices": ["string", "string", "string", "string"], //choices must be less than 25 characters. Also, the choices must not conflict with each other.
      "correctAnswerIndex": number, // must be an integer between 0 and 3
      "imageDescription": "string" // describe a captivating image that would be appropriate for illustrating this specific question
    }
  ],
  "cover": {
    "title": "string", // at most 13 characters; do not mention "quiz"
    "subtitle": "string" // at most 6 words
  },
  "hook": {
    "title": "string",
    "content": "string" // give an overview of the material the quiz is based on
  },
  "video": {
    "videoName": "string", // kebab case name
    "videoTitle": "string",
    "videoDescription": "string",
    "videoTags": ["string", "string", "string", "string", "string", "string"] // 6 unique SEO tags
  },
  "image": {
    "description": "string"
  },
  "voice": "string" // Assign a voice (including the emoji) based on the content language. 
}

`;

  return prompt;
};