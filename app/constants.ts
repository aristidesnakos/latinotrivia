import { StaticImageData } from "next/image";
import { categoryType, authorType } from "@/app/blog/_assets/content";

export type Article = {
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
  content: string;
}; 