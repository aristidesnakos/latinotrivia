import { getArticles } from './_assets/serverUtils';
import { Article } from '@/app/constants';
import CardArticle from './_assets/components/CardArticle';
import { getSEOTags } from "@/lib/seo";
import config from "@/configs/configuration";

export async function generateMetadata() {
  return getSEOTags({
    title: `Blog | ${config.appName}`,
    description: "Explore our latest articles and insights",
    canonicalUrlRelative: "/blog",
  });
}

const BlogPage = async () => {
  const articles: Article[] = getArticles().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <section className="mt-12 mb-24 md:mb-32 max-w-3xl mx-auto text-center">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6 md:mb-12">
          Our Blog
        </h1>
        <p className="md:text-lg opacity-80 max-w-xl mx-auto">
          Discover our latest articles, tutorials, and insights
        </p>
      </section>

      <section className="mb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {articles.map(article => (
            <CardArticle
              key={article.slug}
              article={article}
              tag="h2"
              showCategory={true}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
