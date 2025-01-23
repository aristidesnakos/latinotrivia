import { StaticImageData } from "next/image";
import ariImg from "@/app/blog/_assets/images/authors/ari.png";

// ==================================================================================================================================================
// BLOG CATEGORIES 🏷️
// ==================================================================================================================================================

// Export the categoryType
export type categoryType = {
  slug: string;
  title: string;
  titleShort?: string;
  description: string;
  descriptionShort?: string;
};

// These slugs are used to generate pages in the /blog/category/[categoryI].js. 
const categorySlugs: { [key: string]: string } = {
  tutorial: "tutorial",
  quickstart: "quickstart",
  youtube: "youtube",
  accessibility: "accessibility",
  shorts: "shorts",
  greekTrivia: "greekTrivia",
  uvRating: "uvRating",
  latinoTrivia: "latinoTrivia",
};

export const categories: categoryType[] = [
  {
    slug: categorySlugs.tutorial,
    title: "Tutorials",
    titleShort: "Tutorials",
    description:
      "Here are the latest tutorials for using CreateQuiz.Video.",
    descriptionShort: "Tutorials for using CreateQuiz.Video",
  },
  {
    slug: categorySlugs.quickstart,
    title: "Quick Start Guides",
    titleShort: "Quick Start",
    description: "Get started quickly with CreateQuiz.Video using these simple guides.",
    descriptionShort: "Quick start guides for CreateQuiz.Video",
  },
  {
    slug: categorySlugs.youtube,
    title: "YouTube Guides",
    titleShort: "YouTube",
    description: "Learn how to use CreateQuiz.Video with YouTube.",
    descriptionShort: "YouTube guides for CreateQuiz.Video",
  },
  {
    slug: categorySlugs.accessibility,
    title: "Accessibility",
    description: "Learn how to make your content more accessible.",
    descriptionShort: "Accessibility guides for CreateQuiz.Video",
  },
  {
    slug: categorySlugs.shorts,
    title: "YouTube Quiz Shorts",
    description: "Learn how to use CreateQuiz.Video with YouTube Shorts.",
    descriptionShort: "YouTube Shorts guides for CreateQuiz.Video",
  },
  {
    slug: categorySlugs.greekTrivia,
    title: "Greek Trivia",
    description: "Learn how to use CreateQuiz.Video with Greek Trivia.",
    descriptionShort: "Greek Trivia guides for CreateQuiz.Video",
  },
  {
    slug: categorySlugs.uvRating,
    title: "UV Rating",
    description: "Learn how to use CreateQuiz.Video with UV Rating.",
    descriptionShort: "UV Rating guides for CreateQuiz.Video",
  },
  {
    slug: categorySlugs.latinoTrivia,
    title: "Latino Trivia",
    description: "Learn how to use CreateQuiz.Video with Latino Trivia.",
    descriptionShort: "Latino Trivia guides for CreateQuiz.Video",
  }
];

// BLOG AUTHORS 📝

export type authorType = {
  slug: string;
  name: string;
  job: string;
  description: string;
  avatar: StaticImageData;
  socials?: {
    name: string;
    icon: JSX.Element;
    url: string;
  }[];
};

// Social icons used in the author's bio.
const socialIcons: {
  [key: string]: {
    name: string;
    svg: JSX.Element;
  };
} = {
  twitter: {
    name: "Twitter",
    svg: (
      <svg
        version="1.1"
        id="svg5"
        x="0px"
        y="0px"
        viewBox="0 0 1668.56 1221.19"
        className="w-9 h-9"
        // Using a dark theme? ->  className="w-9 h-9 fill-white"
      >
        <g id="layer1" transform="translate(52.390088,-25.058597)">
          <path
            id="path1009"
            d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99   h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
          />
        </g>
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
};

const authorSlugs: {
  [key: string]: string;
} = {
  ari: "ari",
};

// All the blog authors data display in the /blog/author/[authorId].js pages.
export const authors: authorType[] = [
  {
    // The slug to use in the URL, from the authorSlugs object above.
    slug: authorSlugs.ari,
    // The name to display in the author's bio. Up to 60 characters.
    name: "Ari Nakos",
    // The job to display in the author's bio. Up to 60 characters.
    job: "Maker of CreateQuiz.Video",
    // The description of the author to display in the author's bio. Up to 160 characters.
    description:
      "Ari is a maker. Currently building tools to unleash creativity in content creation.",
    avatar: ariImg,
    // A list of social links to display in the author's bio.
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://twitter.com/just_aristides",
      },
      {
        name: socialIcons.linkedin.name,
        icon: socialIcons.linkedin.svg,
        url: "https://www.linkedin.com/in/aristidesnakos/",
      },
    ],
  },
];

// ===============================================================================================================================
// BLOG ARTICLES 📚
// ===============================================================================================================================

export type articleType = {
  slug: string;
  title: string;
  description: string;
  categories: categoryType[];
  author: authorType;
  publishedAt: string;
  image: {
    src?: StaticImageData;
    urlRelative: string;
    alt: string;
  };
  content: JSX.Element;
};

// These styles are used in the content of the articles. When you update them, all articles will be updated.
export const styles: {
  [key: string]: string;
} = {
  a: 'text-info font-bold hover:underline',
  h1: 'text-3xl lg: text-6xl font-bold tracking-tight mt-2 mb-2 text-base-content',
  h2: 'text-2xl lg:text-4xl font-bold tracking-tight mt-2 mb-4 text-base-content',
  h3: 'text-xl lg:text-2xl font-bold tracking-tight mb-2 text-base-content',
  caption: 'text-sm text-base-content/70 mb-2',
  p: 'text-base-content/90 leading-relaxed mb-2 md:text-lg',
  ul: 'list-inside list-disc text-base-content/90 leading-relaxed',
  li: 'list-item md:text-lg',
  code: 'text-lg font-mono bg-neutral text-neutral-content p-6 rounded-box my-4 overflow-x-scroll select-all',
  codeInline: 'text-sm font-mono bg-base-300 px-1 py-0.5 rounded-box select-all md:text-lg',
};