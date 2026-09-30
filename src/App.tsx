import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { guides } from "@/lib/guides";
import { applyMeta, getPageMeta, homePath, langFromPath } from "@/lib/seo";
import Index from "./pages/Index.tsx";
import GuidePage from "./pages/GuidePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const isHome = (path: string) => path === homePath.GR || path === homePath.EN || path === "/en";

/**
 * Keeps <head> in step with the URL, and starts a new page at the top. Switching
 * language on the home page keeps the scroll position, since both versions share a layout.
 */
const RouteEffects = () => {
  const { pathname, hash } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    applyMeta(getPageMeta(pathname));
    const from = previous.current;
    previous.current = pathname;
    if (from === pathname || hash || (isHome(from) && isHome(pathname))) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

/** Everything below the router: shared by the browser (BrowserRouter) and the prerender (StaticRouter). */
export const AppShell = () => {
  const { pathname } = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider lang={langFromPath(pathname)}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouteEffects />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/en" element={<Index />} />
            {guides.map((g) => (
              <Route key={g.path} path={g.path} element={<GuidePage guide={g} />} />
            ))}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
