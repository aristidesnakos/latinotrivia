const path = require('path');
const fs = require('fs');

const config = {
  siteUrl: process.env.SITE_URL || "https://www.createquiz.video",
  generateRobotsTxt: true,
  exclude: [
    "/twitter-image.*",
    "/opengraph-image.*",
    "/icon.*",
    "/apple-icon.png",
    "/api/*",
    "/favicon.ico",
    "/data/hotsprings.json"
  ],

  additionalPaths: async (config) => {
    const result = [];
    const baseUrl = config.siteUrl;

    console.log('Starting sitemap generation...');

    try {
      // Add blog articles
      const blogDir = path.join(process.cwd(), 'app', 'blog', '_assets', 'articles');
      
      if (!fs.existsSync(blogDir)) {
        console.warn(`Blog directory not found at: ${blogDir}`);
        return result;
      }

      const blogFiles = fs.readdirSync(blogDir);
      console.log(`Found ${blogFiles.length} files in blog directory.`);

      for (const file of blogFiles) {
        if (!file.endsWith('.md')) continue;

        try {
          const filePath = path.join(blogDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const slugMatch = content.match(/slug:\s*"(.+)"/);
          
          if (slugMatch && slugMatch[1]) {
            const slug = slugMatch[1];
            result.push({
              loc: `${baseUrl}/blog/${slug}`,
              changefreq: 'weekly',
              lastmod: new Date().toISOString(),
              priority: 0.7,
            });
          } else {
            console.warn(`No slug found in file: ${file}`);
          }
        } catch (error) {
          console.error(`Error processing blog file ${file}:`, error);
          // Continue with other files even if one fails
          continue;
        }
      }

      console.log(`Successfully added ${result.length} blog articles to sitemap.`);

    } catch (error) {
      console.error('Error generating sitemap:', error);
    }

    return result;
  },

  // Add robots.txt rules
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/admin/*']
      }
    ]
  }
};

module.exports = config;
