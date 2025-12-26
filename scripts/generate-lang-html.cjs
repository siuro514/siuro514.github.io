const fs = require('fs');
const path = require('path');

// 路由列表
const routes = [
  '', // root
  'tools/gantt',
  'tools/json-parser',
  'tools/base64',
  'tools/crypto',
  'tools/image-compressor',
  'about',
  'privacy',
  'terms',
  'gantt-guide',
  'faq'
];

// 需要建立重定向的 legacy routes (root level) -> target default language (en)
// 這些是不帶語言前綴的路徑，為了避免 404，我們產生靜態的重定向頁面
const legacyRoutes = [
  { path: 'tools/gantt', target: 'en/tools/gantt' },
  { path: 'tools/json-parser', target: 'en/tools/json-parser' },
  { path: 'tools/base64', target: 'en/tools/base64' },
  { path: 'tools/crypto', target: 'en/tools/crypto' },
  { path: 'tools/image-compressor', target: 'en/tools/image-compressor' },
  { path: 'about', target: 'en/about' },
  { path: 'privacy', target: 'en/privacy' },
  { path: 'terms', target: 'en/terms' },
  { path: 'gantt-guide', target: 'en/gantt-guide' },
  { path: 'faq', target: 'en/faq' }
];

// 语言配置
const languages = [
  {
    code: 'en',
    path: 'en',
    i18nCode: 'en',
    htmlLang: 'en',
    title: 'Ganttleman - Free Online Tools Collection | Gantt Chart, JSON, Base64, Image Compressor',
    description: 'Ganttleman - Free online tools collection including Gantt charts, JSON formatter, Base64 encoder/decoder, image compressor and more. Fast, simple, secure and free.',
    keywords: 'online tools,free tools,gantt chart,JSON formatter,Base64,image compressor,productivity tools,developer tools'
  },
  {
    code: 'zh-TW',
    path: 'zh-tw',
    i18nCode: 'zh-TW',
    htmlLang: 'zh-TW',
    title: 'Ganttleman - 免費線上工具集合 | 甘特圖、JSON、Base64、圖片壓縮',
    description: 'Ganttleman - 免費線上工具集合，提供甘特圖、JSON 格式化、Base64 編解碼、圖片壓縮等實用工具。快速、簡單、安全、免費。',
    keywords: '線上工具,免費工具,甘特圖,JSON格式化,Base64,圖片壓縮,效率工具,開發工具'
  },
  {
    code: 'zh-CN',
    path: 'zh-cn',
    i18nCode: 'zh-CN',
    htmlLang: 'zh-CN',
    title: 'Ganttleman - 免费在线工具集合 | 甘特图、JSON、Base64、图片压缩',
    description: 'Ganttleman - 免费在线工具集合，提供甘特图、JSON 格式化、Base64 编解码、图片压缩等实用工具。快速、简单、安全、免费。',
    keywords: '在线工具,免费工具,甘特图,JSON格式化,Base64,图片压缩,效率工具,开发工具'
  },
  {
    code: 'ja',
    path: 'ja',
    i18nCode: 'ja',
    htmlLang: 'ja',
    title: 'Ganttleman - 無料オンラインツールコレクション | ガントチャート、JSON、Base64、画像圧縮',
    description: 'Ganttleman - ガントチャート、JSON フォーマッター、Base64 エンコーダー/デコーダー、画像圧縮などの無料オンラインツールコレクション。高速、シンプル、安全、無料。',
    keywords: 'オンラインツール,無料ツール,ガントチャート,JSONフォーマッター,Base64,画像圧縮,生産性ツール,開発者ツール'
  },
  {
    code: 'ko',
    path: 'ko',
    i18nCode: 'ko',
    htmlLang: 'ko',
    title: 'Ganttleman - 무료 온라인 도구 모음 | 간트 차트, JSON, Base64, 이미지 압축',
    description: 'Ganttleman - 간트 차트, JSON 포맷터, Base64 인코더/디코더, 이미지 압축 등 무료 온라인 도구 모음. 빠르고, 간단하고, 안전하고, 무료입니다.',
    keywords: '온라인 도구,무료 도구,간트 차트,JSON 포맷터,Base64,이미지 압축,생산성 도구,개발자 도구'
  },
  {
    code: 'es',
    path: 'es',
    i18nCode: 'es',
    htmlLang: 'es',
    title: 'Ganttleman - Colección de Herramientas Gratuitas en Línea | Diagrama de Gantt, JSON, Base64, Compresor de Imágenes',
    description: 'Ganttleman - Colección de herramientas en línea gratuitas que incluyen diagramas de Gantt, formateador JSON, codificador/decodificador Base64, compresor de imágenes y más. Rápido, simple, seguro y gratuito.',
    keywords: 'herramientas en línea,herramientas gratuitas,diagrama de gantt,formateador JSON,Base64,compresor de imágenes,herramientas de productividad,herramientas de desarrollo'
  }
];

// 读取模板 HTML
const distPath = path.join(__dirname, '../dist');
const templateHtmlPath = path.join(distPath, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error('❌ dist/index.html not found. Please run "npm run build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templateHtmlPath, 'utf-8');

console.log('🌍 Generating language-specific HTML files...\n');

// 準備 Sitemap 內容
let sitemapUrls = [];
const baseUrl = 'https://ganttleman.com';

// 1. 為每種語言生成 HTML
languages.forEach(lang => {
  console.log(`📝 Processing language: ${lang.code} (${lang.path})`);

  const langBaseDir = path.join(distPath, lang.path);

  // 替換 HTML 元數據
  let langHtml = templateHtml;
  langHtml = langHtml.replace(/<html lang="[^"]*"/, `<html lang="${lang.htmlLang}"`);
  langHtml = langHtml.replace(/<title>.*?<\/title>/, `<title>${lang.title}</title>`);
  langHtml = langHtml.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${lang.description}"`
  );
  langHtml = langHtml.replace(
    /<meta name="keywords" content="[^"]*"/,
    `<meta name="keywords" content="${lang.keywords}"`
  );

  // 為每個路由生成 index.html
  routes.forEach(route => {
    const routeDir = path.join(langBaseDir, route);

    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    const htmlPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(htmlPath, langHtml, 'utf-8');

    // 加入到 Sitemap URL 列表
    // 如果是 root 路由，最後不加 '/' 以保持整潔 (或者統一加，這裡選擇標準化處理)
    const fullUrl = route === ''
      ? `${baseUrl}/${lang.path}`
      : `${baseUrl}/${lang.path}/${route}`;

    sitemapUrls.push({
      loc: fullUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: route === '' ? '1.0' : '0.8'
    });
  });

  console.log(`   ✨ Generated ${routes.length} route files for ${lang.code}`);
});

// 2. 生成 Legacy Route Redirects
console.log('\n🔄 Generating legacy redirects...');
legacyRoutes.forEach(route => {
  const routeDir = path.join(distPath, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  // 創建一個簡單的 HTML 進行 Meta Refresh 重定向
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=/${route.target}">
    <link rel="canonical" href="${baseUrl}/${route.target}">
    <title>Redirecting...</title>
    <script>window.location.href = "/${route.target}"</script>
</head>
<body>
    <p>Redirecting to <a href="/${route.target}">/${route.target}</a>...</p>
</body>
</html>`;

  fs.writeFileSync(path.join(routeDir, 'index.html'), redirectHtml);
  console.log(`   ↪️  Redirect: /${route.path} -> /${route.target}`);
});

// 3. 生成 Sitemap.xml
console.log('\n🗺️  Generating sitemap.xml...');
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapContent);
console.log(`   ✅ sitemap.xml generated with ${sitemapUrls.length} URLs`);

// 4. 生成 robots.txt
console.log('\n🤖 Generating robots.txt...');
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(distPath, 'robots.txt'), robotsContent);
console.log('   ✅ robots.txt generated');

console.log('\n✨ All static files generation completed successfully!\n');
