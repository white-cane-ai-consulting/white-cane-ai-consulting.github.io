import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CookieBanner, PrivacyModal } from "@/components/site/CookieConsent";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { guides, type Guide, type GuideBlock } from "@/lib/guides";

/*
 * A Greek landing page for one search intent. Reads like the service windows: a heading
 * column on the left, text and hairline-separated rows on the right. No motion on
 * the text beyond a one-time CSS settle of the header, so the prerendered page reads
 * the same with or without scripts.
 */

const easeOut = "ease-[cubic-bezier(0.23,1,0.32,1)]";

const textLink =
  "group inline-flex items-center gap-2 text-sm text-foreground underline decoration-border underline-offset-[6px] transition-colors duration-300 hover:decoration-signal";

const updatedLabel = (iso: string) =>
  new Intl.DateTimeFormat("el-GR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

const Block = ({ block }: { block: GuideBlock }) => {
  switch (block.kind) {
    case "p":
      return <p className="max-w-2xl text-[1.0625rem] leading-[1.8] text-foreground/85">{block.body}</p>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 border-b border-border/60 py-4 text-base leading-[1.7] text-foreground/85 first:pt-0 last:border-b-0">
              <span className="text-signal-bright" aria-hidden="true">–</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol>
          {block.items.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-border/60 py-6 first:pt-0 last:border-b-0">
              <span className="pt-1 font-display text-sm text-signal-bright">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-xl leading-snug">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-base leading-[1.75] text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "rows":
      return (
        <dl>
          {block.rows.map((row) => (
            <div key={row.term} className="grid gap-1.5 border-b border-border/60 py-5 first:pt-0 last:border-b-0 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <dt>
                <span className="block font-display text-base leading-snug text-foreground">{row.term}</span>
                {row.meta && <span className="mt-1 block text-sm leading-snug text-muted-foreground">{row.meta}</span>}
              </dt>
              <dd className="text-base leading-[1.75] text-muted-foreground">{row.body}</dd>
            </div>
          ))}
        </dl>
      );
    case "link": {
      const content = (
        <>
          {block.label}
          <span className={`transition-transform duration-200 ${easeOut} group-hover:translate-x-1`}>→</span>
        </>
      );
      // Another guide opens in-app; a "/#section" anchor loads the home page at that section.
      return block.href.includes("#") ? (
        <a href={block.href} className={textLink}>{content}</a>
      ) : (
        <Link to={block.href} className={textLink}>{content}</Link>
      );
    }
  }
};

/** Heading on the left, content on the right, a hairline above. */
const Section = ({ index, title, children }: { index?: number; title: string; children: ReactNode }) => (
  <section className="grid gap-8 border-t border-border py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
    {/* On wide screens the heading stays in view while its section scrolls past. */}
    <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
      {index !== undefined && <span className="font-display text-sm text-signal-bright">{String(index).padStart(2, "0")}</span>}
      <h2 className="mt-3 font-display text-2xl leading-tight text-balance md:text-3xl">{title}</h2>
    </div>
    <div className="min-w-0 space-y-8 lg:col-span-8">{children}</div>
  </section>
);

/** A hairline under the nav that fills as you read: where you are in a long page. */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-16 z-40 h-[2px] origin-left bg-signal"
    />
  );
};

const GuidePage = ({ guide }: { guide: Guide }) => {
  const related = guides.filter((g) => g.path !== guide.path);

  return (
    <ConsentProvider>
      <main className="min-h-screen overflow-x-clip bg-background text-foreground">
        <Nav />
        <ReadingProgress />

        <article>
          <header className="container pb-16 pt-36 md:pb-24 md:pt-44">
            <nav aria-label="Breadcrumb" className="guide-rise mb-10 flex items-center gap-3 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors duration-200 hover:text-foreground">Αρχική</Link>
              <span className="h-px w-6 bg-signal" aria-hidden="true" />
              <span className="text-foreground/80" aria-current="page">{guide.label}</span>
            </nav>
            <h1 className="guide-rise max-w-5xl font-display text-4xl font-light leading-[1.05] text-balance [--rise-delay:60ms] md:text-6xl lg:text-7xl">
              {guide.h1}
            </h1>
            <p className="guide-rise mt-10 max-w-3xl text-lg leading-[1.65] text-foreground/85 [--rise-delay:120ms] md:text-xl">{guide.lead}</p>
            {/* Whoever lands here from a search sees at once that there is a whole company behind the guide. */}
            <div className="guide-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 [--rise-delay:180ms]">
              <Link
                to="/"
                className={`group inline-flex items-center gap-3 rounded-full border border-border bg-card/40 py-2.5 pl-4 pr-5 text-sm text-foreground transition-[border-color,background-color,transform] duration-200 ${easeOut} hover:border-foreground/60 hover:bg-card active:scale-[0.97]`}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                <span>
                  <span className="font-display">White Cane AI</span>
                  <span className="text-muted-foreground">: δείτε τι στήνουμε και τα πακέτα</span>
                </span>
                <span className={`transition-transform duration-200 ${easeOut} group-hover:translate-x-1`} aria-hidden="true">→</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Τελευταία ενημέρωση <time dateTime={guide.updated}>{updatedLabel(guide.updated)}</time>
              </p>
            </div>
          </header>

          <div className="container">
            {guide.sections.map((section, i) => (
              <Section key={section.h2} index={i + 1} title={section.h2}>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </Section>
            ))}

            <Section title="Συχνές ερωτήσεις">
              <div id="faq">
                {guide.faq.map((item) => (
                  <div key={item.q} className="border-b border-border/60 py-6 first:pt-0 last:border-b-0">
                    <h3 className="font-display text-lg leading-snug">{item.q}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-[1.75] text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Κλείστε μια δωρεάν κλήση 30 λεπτών">
              <p className="max-w-2xl text-[1.0625rem] leading-[1.8] text-foreground/85">
                Πείτε μας τι θέλετε να λύσετε και ποια εργαλεία χρησιμοποιείτε σήμερα. Στην κλήση σας λέμε τι θα στήναμε και ποιο πακέτο ταιριάζει στην εταιρεία σας.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                <a
                  href="/#contact"
                  className={`group inline-flex items-center gap-2 rounded-full bg-bone px-8 py-4 text-xs font-medium uppercase tracking-[0.14em] text-ink transition-[background-color,color,transform] duration-300 ${easeOut} hover:bg-signal hover:text-bone active:scale-[0.97]`}
                >
                  Φόρμα επικοινωνίας
                  <span className={`inline-block transition-transform duration-200 ${easeOut} group-hover:translate-x-1`}>→</span>
                </a>
                <a href="mailto:consulting@whitecane-ai.com" className={textLink}>
                  consulting@whitecane-ai.com
                </a>
              </div>
            </Section>

            <Section title="Διαβάστε επίσης">
              <ul>
                {related.map((g) => (
                  <li key={g.path} className="border-b border-border/60 py-5 first:pt-0 last:border-b-0">
                    <Link to={g.path} className="group grid grid-cols-[1fr_auto] items-center gap-4">
                      <span>
                        <span className="block font-display text-xl leading-snug transition-colors duration-200 group-hover:text-signal-bright">{g.h1}</span>
                        <span className="mt-1.5 block max-w-2xl text-[0.9375rem] leading-[1.65] text-muted-foreground">{g.description}</span>
                      </span>
                      <span className={`text-muted-foreground transition-[transform,color] duration-200 ${easeOut} group-hover:translate-x-1 group-hover:text-foreground`} aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </article>

        <Footer />
        <CookieBanner />
        <PrivacyModal />
      </main>
    </ConsentProvider>
  );
};

export default GuidePage;
