/*
 * Runs after `vite build` (browser bundle → dist/) and `vite build --ssr` (dist-ssr/).
 * Renders every route to static HTML so search engines and AI assistants get the full
 * text without running JavaScript, then writes sitemap.xml, llms.txt and 404.html, and a
 * redirect to the home page at each retired URL.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// React and React Router pick their production builds from this, before they are imported below.
process.env.NODE_ENV = "production";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, routes, retiredPaths, siteUrl, buildSitemap, buildLlmsTxt } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
for (const marker of ['<html lang="el">', "<!--app-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}`);
}

// Function replacements, so a "$" in page text is never read as a replace pattern.
const page = (url) => {
  const { html, head, lang } = render(url);
  return template
    .replace('<html lang="el">', () => `<html lang="${lang}">`)
    .replace("<!--app-head-->", () => head)
    .replace("<!--app-html-->", () => html);
};

const write = async (file, content) => {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
};

for (const url of routes) {
  const file = path.join(dist, url, "index.html");
  await write(file, page(url));
  console.log(`prerendered ${url}`);
}

// GitHub Pages can't send a 301, so a retired URL gets a page that forwards everyone at once.
// Search engines treat an immediate meta refresh as a permanent redirect.
const redirectPage = `<!doctype html>
<html lang="el">
  <head>
    <meta charset="UTF-8" />
    <title>White Cane AI Consulting</title>
    <link rel="canonical" href="${siteUrl}/" />
    <meta http-equiv="refresh" content="0; url=/" />
    <script>location.replace("/" + location.hash);</script>
  </head>
  <body>
    <h1><a href="/">White Cane AI Consulting</a></h1>
  </body>
</html>
`;
for (const url of retiredPaths) {
  await write(path.join(dist, url, "index.html"), redirectPage);
  console.log(`redirect ${url} → /`);
}

await write(path.join(dist, "404.html"), page("/404/"));
await write(path.join(dist, "sitemap.xml"), buildSitemap(new Date().toISOString().slice(0, 10)));
await write(path.join(dist, "llms.txt"), buildLlmsTxt());
await fs.rm(ssrDir, { recursive: true, force: true });

console.log(`prerendered 404.html, sitemap.xml and llms.txt (${routes.length} pages)`);
