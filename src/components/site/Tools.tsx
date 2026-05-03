import { motion } from "framer-motion";

const ease = [0.6, 0.05, 0.1, 1] as const;

const tools = [
  { name: "Claude",           file: "claude.svg" },
  { name: "ChatGPT",          file: "chatgpt.svg" },
  { name: "Gemini",           file: "gemini.svg" },
  { name: "Cursor",           file: "cursor.svg" },
  { name: "GitHub Copilot",   file: "github-copilot.svg" },
  { name: "Perplexity",       file: "perplexity.svg" },
  { name: "Notion AI",        file: "notion.svg" },
  { name: "Microsoft Copilot",file: "microsoft-copilot.svg" },
  { name: "Make",             file: "make.svg" },
  { name: "n8n",              file: "n8n.svg" },
  { name: "ElevenLabs",       file: "elevenlabs.svg" },
  { name: "Midjourney",       file: "midjourney.svg" },
  { name: "Runway",           file: "runway.svg" },
  { name: "Zapier",           file: "zapier.svg" },
];

export const Tools = () => (
  <section className="relative py-24 md:py-32 border-b border-border/50 overflow-hidden">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="flex items-center gap-3 mb-16"
      >
        <span className="h-px w-12 bg-signal" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          AI tools we've set up &amp; tested
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-px bg-border/40"
      >
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04, ease }}
            className="group flex flex-col items-center justify-center gap-3 bg-background hover:bg-card transition-colors duration-500 p-6 aspect-square"
          >
            <img
              src={`/logos/${tool.file}`}
              alt={tool.name}
              className="w-8 h-8 object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
            <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-500 text-center leading-tight">
              {tool.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
