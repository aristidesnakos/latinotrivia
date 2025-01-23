import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { authors, authorType, styles } from '../_assets/content';
import { getSEOTags } from '@/lib/seo';

// Define the interface for the page props
interface PageProps {
  params: {
    articleId: string;
  };
}

// Define the interface for the article metadata
interface ArticleData {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  categories: string[];
  image: {
    src: string;
    alt: string;
  };
}

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'app/blog/_assets/articles');
  const filenames = fs.readdirSync(articlesDirectory);

  return filenames.map((filename) => {
    const articleId = filename.replace(/\.md$/, '');
    return { articleId };
  });
}

const CustomImage = ({ src, alt, ...props }: React.ComponentPropsWithoutRef<'img'>) => {
  const isExternal = src?.startsWith('http') || false;
  
  return (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={600}
      height={330}
      className="rounded-lg object-cover"
      unoptimized={isExternal}
      {...(props as any)}
    />
  );
}

// The page component can be an async function
export default async function ArticlePage({ params }: PageProps) {
  const { articleId } = params;
  const articlesDirectory = path.join(process.cwd(), 'app/blog/_assets/articles');
  const fullPath = path.join(articlesDirectory, `${articleId}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse the Markdown file's metadata and content
  const matterResult = matter(fileContents);
  const data = matterResult.data as ArticleData;
  const content = matterResult.content;

  // Find the article's author
  const author = authors.find((a: authorType) => a.slug === data.author);

  return (
    <div className="article-container">
      <h1 className={styles.h1}>{data.title}</h1>
      <p className={styles.p}>
        By {author?.name} on {data.publishedAt}
      </p>
      {/* Render the Markdown content with custom styles */}
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => <h2 className={styles.h2} {...props} />,
          h3: ({ node, ...props }) => <h3 className={styles.h3} {...props} />,
          p: ({ node, ...props }) => <p className={styles.p} {...props} />,
          ul: ({ node, ...props }) => <ul className={styles.ul} {...props} />,
          li: ({ node, ...props }) => <li className={styles.li} {...props} />,
          a: ({ node, ...props }) => <a className={styles.a} {...props} />,
          img: CustomImage,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function generateMetadata({ params }: { params: { articleId: string } }) {
  const { articleId } = params;
  const articlesDirectory = path.join(process.cwd(), 'app/blog/_assets/articles');
  const fullPath = path.join(articlesDirectory, `${articleId}.md`);
  
  if (!fs.existsSync(fullPath)) {
    redirect('/404');
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const data = matterResult.data as ArticleData;

  return getSEOTags({
    title: data.title,
    description: data.description,
    canonicalUrlRelative: `/blog/${articleId}`,
    extraTags: {
      openGraph: {
        title: data.title,
        description: data.description,
        url: `/blog/${articleId}`,
        images: [
          {
            url: data.image.src,
            alt: data.image.alt,
            width: 600,
            height: 330,
          },
        ],
        locale: 'en_US',
        type: 'article',
      },
    },
  });
}
