const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/our-works', changefreq: 'weekly', priority: 0.8 },
  { url: '/loading', changefreq: 'monthly', priority: 0.5 },
];

const sitemap = new SitemapStream({ hostname: 'https://framelync.com' });

(async () => {
  try {
    links.forEach(link => sitemap.write(link));
    sitemap.end();

    const data = await streamToPromise(sitemap);
    fs.writeFileSync('./public/sitemap.xml', data);
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
})();
