import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "../types/config";

const config: ConfigProps = {
  appName: "Create Quiz Video",
  appDescription:
    "AI Quiz Maker - Content to YouTube in 2 mins",
  keywords: [
    "create math quiz",
    "create english quiz",
    "create geography quiz",
    "create history quiz",
    "create tiktok quiz",
    "create science quiz",
    "create trivia quiz",
    "create quiz online",
    "canva quiz alternative",
    "chatgpt quiz alternative",
    "quiz maker",
    "interactive quizzes",
    "online quiz creator",
    "educational quizzes",
    "custom quiz builder",
    "quiz generation tool",
    "create multiple choice quiz",
    "build your own quiz",
    "quiz video maker",
    "quiz video creator",
    "quiz video generator",
    "create a quiz fast",
    "make a quiz video",
    "make quizzes fast",
    "make quiz fast",
    "how to make a youtube quiz video",
    "how to make a tiktok quiz video",
    "how to make a quiz video on instagram",
    "how to make a quiz video on facebook",
    "how to make a quiz video on twitter",
    "how to make a quiz video on youtube",
  ],
  domainName: "createquiz.video",
  crisp: {
    id: "",
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    plans: [
      {
        name: "Hobby",
        credits: 300,
        creditCost: 9,
        stripeProductId: process.env.STRIPE_HOBBY_PRODUCT_ID!,
        description: "Perfect for getting started with quiz videos",
        features: [
          "up to 300 quiz questions!",
          "Custom Branding", 
          "AI generated video images"
        ],
        limits: {
          maxVideoQuality: "720p"
        }
      },
      {
        name: "Genius",
        credits: 1000,
        creditCost: 25,
        stripeProductId: process.env.STRIPE_GENIUS_PRODUCT_ID!,
        description: "For educators who need more power",
        featured: true,
        features: [
          "Everything in Hobby",
          "up to 1000 quiz questions per month",
          "Post directly to YouTube",
          "Bulk scheduler (Coming Soon!)"
        ],
        limits: {
          maxVideoQuality: "1080p"
        }
      }
    ],
  },
  aws: {
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    subdomain: "mail",
    fromNoReply: `CreateQuiz Video Support <ari@createquiz.video>`,
    fromAdmin: `Ari at Create Quiz Video <ari@createquiz.video>`,
    supportEmail: "ari@createquiz.video",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "ari@createquiz.video",
  },
  colors: {
    theme: "bumblebee",
    main: themes["light"]["primary"],
  },
  auth: {
    loginUrl: "/signin",
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;