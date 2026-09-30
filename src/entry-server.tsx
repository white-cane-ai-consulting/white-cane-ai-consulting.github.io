import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App.tsx";
import { buildLlmsTxt, buildSitemap, getPageMeta, htmlLang, renderHead, routes } from "@/lib/seo";

/** Build-time entry: scripts/prerender.mjs calls `render` once per URL and writes the HTML. */
export const render = (url: string) => {
  const meta = getPageMeta(url);
  const html = renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  );
  return { html, head: renderHead(meta), lang: htmlLang[meta.lang] };
};

export { buildLlmsTxt, buildSitemap, routes };
