import type { Lang } from "@/lib/translations";

/** Long-form content shown inside the floating service window. */
export type DetailBlock =
  | { kind: "para"; body: string }
  /** The opening sentence of a window, set large. */
  | { kind: "lead"; body: string }
  | { kind: "bullets"; title?: string; items: string[] }
  | { kind: "table"; title?: string; head: [string, string]; rows: [string, string][] }
  | { kind: "note"; tone: "info" | "warn" | "good" | "stop"; icon?: string; title: string; body: string }
  | { kind: "callout"; tone: "info" | "warn"; title: string; body: string }
  /** "change": each row is a before → after pair. "tradeoff": two independent columns, strengths and limits. */
  | { kind: "compare"; tone: "change" | "tradeoff"; title: string; labels: [string, string]; rows: [string, string][] }
  /** Named entries with an optional link to another service window. */
  | { kind: "cards"; title: string; items: DetailCard[] }
  | { kind: "tabs"; title: string; tabs: { label: string; sub: string; rows: [string, string][] }[] }
  /** Layers of a system, top (what people see) to bottom (where the data sits). */
  | { kind: "stack"; title: string; layers: [string, string][] }
  | { kind: "catalog"; title: string; groups: { label: string; body: string; items: string[] }[] }
  | { kind: "checks"; title: string; items: string[] };

export type DetailCard = {
  name: string;
  meta: string;
  body: string;
  chips?: string[];
  link?: ServiceId;
};

export type ServiceDetail = {
  code: string;
  title: string;
  kicker: string;
  blocks: DetailBlock[];
};

export type ServiceId = "A" | "A1" | "A2" | "A3" | "B" | "C" | "D";

const EN: Record<ServiceId, ServiceDetail> = {
  A: {
    code: "A",
    title: "AI tool set-up",
    kicker: "Our core service",
    blocks: [
      {
        kind: "lead",
        body: "We set up your company's AI tools so they work on your own data, with company accounts and security that has been checked. What we hand over is something the team opens and uses from the first day.",
      },
      {
        kind: "compare",
        tone: "change",
        title: "Before and after",
        labels: ["Usually today", "After the set-up"],
        rows: [
          ["Every employee on their own, often free, account.", "Company accounts the company controls."],
          ["Company files in tools that may train on them.", "No model training on your data."],
          ["The tool knows nothing about the company.", "It answers from your own documents and shows the source."],
          ["Copy and paste from system to system.", "Connected to email, files, CRM and ERP."],
        ],
      },
      {
        kind: "cards",
        title: "The three levels",
        items: [
          { name: "Enterprise AI platforms", meta: "A1 · Almost every company", body: "ChatGPT, Claude, Gemini or Microsoft Copilot. The everyday tool for the whole team.", link: "A1" },
          { name: "Local AI", meta: "A2 · When there is sensitive data", body: "Mistral, Llama, Qwen or Gemma, on your own infrastructure.", link: "A2" },
          { name: "Specialised tools and connections", meta: "A3 · For specific jobs", body: "ElevenLabs, Lovable, Notion AI, n8n, and the links to your systems.", link: "A3" },
        ],
      },
      {
        kind: "tabs",
        title: "By company size",
        tabs: [
          {
            label: "5–15 people",
            sub: "Small Business AI Kickstart",
            rows: [
              ["Tools", "One platform (ChatGPT, Claude, Gemini or Copilot) and 1–3 specialised tools."],
              ["Where it runs", "Cloud, on a Team or Business plan. No servers, no IT department needed."],
              ["Connections", "Shared files and email."],
              ["Security", "Company accounts, no training on your data, GDPR."],
              ["Duration", "About 5 working days."],
            ],
          },
          {
            label: "20–100 people",
            sub: "Mid-Market AI Accelerator",
            rows: [
              ["Tools", "One main platform and 3–7 tools and connections."],
              ["Where it runs", "Cloud. A local model only for specific sensitive data."],
              ["Connections", "CRM, ERP (e.g. SoftOne, Entersoft) and automations."],
              ["Security", "Company sign-in (SSO), roles per department, rights per connection."],
              ["Duration", "5–15 working days."],
            ],
          },
          {
            label: "100+ people",
            sub: "Enterprise Transformation",
            rows: [
              ["Tools", "Enterprise plan and 5–10+ tools."],
              ["Where it runs", "Hybrid: cloud, plus local models on your own infrastructure."],
              ["Connections", "Internal systems and APIs, together with your IT team."],
              ["Security", "Audit logs, central administration, GDPR and AI Act review."],
              ["Duration", "10–30 working days."],
            ],
          },
        ],
      },
      {
        kind: "checks",
        title: "Whatever we set up",
        items: [
          "No model training on your data.",
          "Sign-in only with a company account, closed centrally when someone leaves.",
          "Each person sees only what they should.",
          "We know where the data is stored and for how long.",
          "A data processing agreement (DPA) and a GDPR review.",
          "A written guide on where to trust AI and where a person checks.",
        ],
      },
    ],
  },
  A1: {
    code: "A1",
    title: "Enterprise AI platforms",
    kicker: "ChatGPT · Claude · Gemini · Microsoft Copilot",
    blocks: [
      {
        kind: "lead",
        body: "For most companies, AI starts with one of these four platforms, on a business plan, set up for the whole team.",
      },
      {
        kind: "cards",
        title: "Which platform, for which company",
        items: [
          { name: "Microsoft 365 Copilot", meta: "If you work in Microsoft 365", body: "Works inside Outlook, Teams, Word and Excel, and sees files and email through the permissions you already have." },
          { name: "Gemini", meta: "If you work in Google Workspace", body: "Works inside Gmail, Drive and Docs. Included in the business plans, so it is often the fastest start." },
          { name: "ChatGPT Business or Enterprise", meta: "If you want the most widely used", body: "General purpose, with good data analysis and the largest ecosystem of apps." },
          { name: "Claude Team or Enterprise", meta: "If you work with long documents", body: "Contracts, analysis, reports and code, where accuracy and writing matter most." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "One is usually enough.",
        body: "We add a second platform only when a department has a need the first cannot cover.",
      },
      {
        kind: "checks",
        title: "What we configure",
        items: [
          "Company accounts with SSO: when someone leaves, their access closes too.",
          "A separate workspace per department, with its own instructions and documents.",
          "Templates for quotes, reports and replies to customers.",
          "Answers from your own documents, citing the source.",
          "Connections to Drive, SharePoint, email and CRM.",
          "No training on your data, retention limits, audit logs.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "The first thing we close.",
        body: "Employees uploading company files to free personal accounts. On those plans, the data may be used to train models.",
      },
    ],
  },
  A2: {
    code: "A2",
    title: "Local AI (on-premise)",
    kicker: "Mistral · Llama · Qwen · Gemma",
    blocks: [
      {
        kind: "lead",
        body: "When the law, a client contract or your own policy does not allow data to leave the company, we set up models that run on your own infrastructure. Contracts, medical records, financial data and customer personal data are not sent anywhere.",
      },
      {
        kind: "cards",
        title: "Where we set it up",
        items: [
          { name: "A workstation in the office", meta: "Small teams", body: "One machine with a strong GPU. The cost of a powerful computer, not of a server room.", chips: ["NVIDIA DGX Spark", "Mac Studio", "GPU PC"] },
          { name: "A server on your premises", meta: "20–100 users", body: "A server with one or more GPUs, in your rack or a data centre, for the whole company at once." },
          { name: "Private cloud in the EU", meta: "No hardware of your own", body: "A dedicated server with a European provider, with the data kept inside the EU under contract." },
          { name: "Isolated network", meta: "Strict compliance", body: "No internet connection at all (air-gapped)." },
        ],
      },
      {
        kind: "stack",
        title: "What runs",
        layers: [
          ["What people see", "Open WebUI or LibreChat: a ChatGPT-style page with company logins."],
          ["Model", "Mistral, Llama, Qwen, Gemma or gpt-oss, depending on the task. We test them in Greek."],
          ["Serving", "Ollama or LM Studio for a few users, vLLM for many at once."],
          ["Documents", "Search across your documents with Qdrant or pgvector, inside the network."],
          ["Connections", "ERP, file server and internal databases, with no data moving outside."],
        ],
      },
      {
        kind: "compare",
        tone: "tradeoff",
        title: "What to expect",
        labels: ["Does well", "Where it falls short"],
        rows: [
          ["Searching your documents", "Complex analysis, compared with the top cloud models"],
          ["Extracting data from invoices and contracts", "Up-front hardware cost"],
          ["Summaries", "Needs maintenance and updates"],
          ["Sorting documents and requests", "Fewer ready-made connections than the cloud platforms"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "We usually recommend hybrid.",
        body: "Sensitive work stays local, and a cloud platform (A1) handles everything else.",
      },
    ],
  },
  A3: {
    code: "A3",
    title: "Specialised tools and connections",
    kicker: "Tools for specific jobs",
    blocks: [
      {
        kind: "lead",
        body: "The big platforms cover most of the work. For some jobs, though, there is a tool built exactly for them. We recommend only those that solve a real need, and only after they pass a security check.",
      },
      {
        kind: "catalog",
        title: "Tools by job",
        groups: [
          { label: "Voice and audio", body: "Voiceovers, multilingual material, voice assistants.", items: ["ElevenLabs"] },
          { label: "Meetings", body: "Minutes and action items, without taking notes.", items: ["Copilot in Teams", "Gemini in Meet", "Fireflies", "Granola"] },
          { label: "Presentations and marketing", body: "In hours instead of days.", items: ["Gamma", "Canva AI"] },
          { label: "Image and video", body: "Visual material and training videos without a crew.", items: ["Midjourney", "Runway", "HeyGen", "Synthesia"] },
          { label: "Internal knowledge", body: "Search and summaries over your documentation.", items: ["Notion AI", "NotebookLM"] },
          { label: "Research", body: "Market research with sources.", items: ["Perplexity"] },
          { label: "Apps and prototypes", body: "Internal tools in days.", items: ["Lovable", "v0", "Cursor", "Claude Code"] },
          { label: "Automation", body: "Nobody moves data by hand.", items: ["n8n", "Make", "Zapier", "Power Automate"] },
        ],
      },
      {
        kind: "cards",
        title: "Connectors and plugins",
        items: [
          { name: "Connectors", meta: "Ready-made links", body: "The platforms connect directly to the tools you already use.", chips: ["Google Drive", "SharePoint", "Gmail", "Outlook", "Slack", "Notion", "HubSpot", "Salesforce"] },
          { name: "MCP servers", meta: "For your own systems", body: "An open standard for connecting AI to your ERP, CRM and databases, where no ready connector exists." },
          { name: "Plugins and extensions", meta: "Approved only", body: "Only from official sources and only those you approve. A plugin can read whatever the user sees." },
        ],
      },
      {
        kind: "checks",
        title: "A tool goes in only if",
        items: [
          "It has a business plan with a data processing agreement (DPA).",
          "It commits in writing not to train on your data.",
          "We know where it stores data (EU or not) and for how long.",
          "It supports company sign-in (SSO) and central shut-off.",
          "It asks only for the rights it needs.",
          "It holds certifications (SOC 2, ISO 27001) where your industry requires them.",
          "It performs well in Greek, where the job needs it.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "If it fails the check, it stays out.",
        body: "We propose an alternative, or do the job with a local model (A2).",
      },
    ],
  },
  B: {
    code: "B",
    title: "Training & Adoption",
    kicker: "So the team actually uses what we built",
    blocks: [
      {
        kind: "para",
        body: "Structured seminars, hands-on courses and written guides that help your employees genuinely adopt the AI tools — and use them the right way.",
      },
      {
        kind: "bullets",
        title: "What it includes",
        items: [
          "Seminars on the client's real data and real cases, not generic demos.",
          "Hands-on sessions per role — each person learns what they will actually use.",
          "Written guides that stay in the company and work for new hires too.",
        ],
      },
      {
        kind: "note",
        tone: "good",
        icon: "✅",
        title: "Example",
        body: "A two-hour hands-on seminar, \"Claude for legal counsel\", with real examples worked through the client's own filings — not a generic demo.",
      },
    ],
  },
  C: {
    code: "C",
    title: "Research & Tool Evaluation",
    kicker: "Tested on your files, not on a review site",
    blocks: [
      {
        kind: "para",
        body: "We research and evaluate AI tools across domains and industries to find the ones that genuinely fit — not the ones everyone is talking about.",
      },
      {
        kind: "bullets",
        title: "How we work",
        items: [
          "We define exactly what the tool has to do and the criteria it will be judged on.",
          "We find the candidates on the market.",
          "We check how the tool performs in Greek, since many are built and tested only in English.",
          "We test them on the client's real files and data.",
          "We deliver a comparison and a reasoned recommendation.",
        ],
      },
      {
        kind: "note",
        tone: "good",
        icon: "✅",
        title: "Example",
        body: "A client asked about an AI transcription tool. We tested three against their own recordings and picked the one with the best accuracy on Greek.",
      },
      {
        kind: "note",
        tone: "stop",
        icon: "🚫",
        title: "When it does not fit",
        body: "When the client already knows which tool they want — then we go straight to Service A.",
      },
    ],
  },
  D: {
    code: "D",
    title: "Continuous Updates",
    kicker: "Filtered, not a newsletter",
    blocks: [
      {
        kind: "para",
        body: "When new tools, models or capabilities appear that are relevant to the client's business, we reach out and tell them.",
      },
      {
        kind: "bullets",
        title: "What it includes",
        items: [
          "We track what ships on the platforms the client already uses.",
          "We filter: we send only what changes something in their work and would be useful to them.",
          "Every update comes with a concrete proposal, not just news.",
        ],
      },
      {
        kind: "note",
        tone: "good",
        icon: "✅",
        title: "Example",
        body: "Claude Agent Skills shipped. We sent a short message to the three clients who needed them, with a proposal for the set-up.",
      },
      {
        kind: "note",
        tone: "stop",
        icon: "🚫",
        title: "When it does not fit",
        body: "Clients with no active stack with us — the service presupposes continuity.",
      },
    ],
  },
};

const GR: Record<ServiceId, ServiceDetail> = {
  A: {
    code: "A",
    title: "Στήσιμο εργαλείων AI",
    kicker: "Η βασική μας υπηρεσία",
    blocks: [
      {
        kind: "lead",
        body: "Στήνουμε τα εργαλεία AI της εταιρείας σας ώστε να δουλεύουν πάνω στα δικά σας δεδομένα, με εταιρικούς λογαριασμούς και ελεγμένη ασφάλεια. Παραδίδουμε κάτι που η ομάδα ανοίγει και χρησιμοποιεί από την πρώτη μέρα.",
      },
      {
        kind: "compare",
        tone: "change",
        title: "Πριν και μετά",
        labels: ["Συνήθως σήμερα", "Μετά το στήσιμο"],
        rows: [
          ["Κάθε υπάλληλος με δικό του, συχνά δωρεάν, λογαριασμό.", "Εταιρικοί λογαριασμοί που ελέγχει η εταιρεία."],
          ["Εταιρικά αρχεία σε εργαλεία που μπορεί να εκπαιδεύονται πάνω τους.", "Καμία εκπαίδευση μοντέλων στα δεδομένα σας."],
          ["Το εργαλείο δεν ξέρει τίποτα για την εταιρεία.", "Απαντά από τα δικά σας έγγραφα και δείχνει την πηγή."],
          ["Αντιγραφή και επικόλληση από σύστημα σε σύστημα.", "Σύνδεση με email, αρχεία, CRM και ERP."],
        ],
      },
      {
        kind: "cards",
        title: "Τα τρία επίπεδα",
        items: [
          { name: "Enterprise AI πλατφόρμες", meta: "A1 · Σχεδόν κάθε εταιρεία", body: "ChatGPT, Claude, Gemini ή Microsoft Copilot. Το καθημερινό εργαλείο όλης της ομάδας.", link: "A1" },
          { name: "Τοπικό AI", meta: "A2 · Όταν υπάρχουν ευαίσθητα δεδομένα", body: "Mistral, Llama, Qwen ή Gemma, σε δική σας υποδομή.", link: "A2" },
          { name: "Εξειδικευμένα εργαλεία και συνδέσεις", meta: "A3 · Για συγκεκριμένες δουλειές", body: "ElevenLabs, Lovable, Notion AI, n8n, και οι συνδέσεις με τα συστήματά σας.", link: "A3" },
        ],
      },
      {
        kind: "tabs",
        title: "Ανάλογα με το μέγεθος",
        tabs: [
          {
            label: "5–15 άτομα",
            sub: "Small Business AI Kickstart",
            rows: [
              ["Εργαλεία", "Τουλάχιστον μία πλατφόρμα (ChatGPT, Claude, Gemini ή Copilot) και 2–5 εξειδικευμένα εργαλεία."],
              ["Πού τρέχει", "Cloud, σε Team ή Business πλάνο. Χωρίς servers, χωρίς τμήμα IT."],
              ["Συνδέσεις", "Κοινόχρηστα αρχεία και email."],
              ["Ασφάλεια", "Εταιρικοί λογαριασμοί, καμία εκπαίδευση στα δεδομένα σας, GDPR."],
              ["Διάρκεια", "Περίπου 5 εργάσιμες."],
            ],
          },
          {
            label: "20–100 άτομα",
            sub: "Mid-Market AI Accelerator",
            rows: [
              ["Εργαλεία", "Τουλάχιστον μία κύρια πλατφόρμα και 5–15 εργαλεία και συνδέσεις."],
              ["Πού τρέχει", "Cloud. Τοπικό μοντέλο μόνο για συγκεκριμένα ευαίσθητα δεδομένα."],
              ["Συνδέσεις", "CRM, ERP και αυτοματισμοί."],
              ["Ασφάλεια", "Είσοδος με εταιρικό λογαριασμό (SSO), ρόλοι ανά τμήμα, δικαιώματα ανά σύνδεση."],
              ["Διάρκεια", "5–15 εργάσιμες."],
            ],
          },
          {
            label: "100+ άτομα",
            sub: "Enterprise Transformation",
            rows: [
              ["Εργαλεία", "Enterprise πλάνο και 10+ εργαλεία."],
              ["Πού τρέχει", "Υβριδικά: cloud, και τοπικά μοντέλα στη δική σας υποδομή."],
              ["Συνδέσεις", "Εσωτερικά συστήματα και APIs, μαζί με το IT σας."],
              ["Ασφάλεια", "Audit logs, κεντρική διαχείριση, έλεγχος GDPR και AI Act."],
              ["Διάρκεια", "10–30 εργάσιμες."],
            ],
          },
        ],
      },
      {
        kind: "checks",
        title: "Ό,τι κι αν στήσουμε",
        items: [
          "Καμία εκπαίδευση μοντέλων στα δεδομένα σας.",
          "Είσοδος μόνο με εταιρικό λογαριασμό, με κεντρικό κλείσιμο όταν φεύγει κάποιος.",
          "Κάθε χρήστης βλέπει μόνο ό,τι του αναλογεί.",
          "Γνωρίζουμε πού αποθηκεύονται τα δεδομένα και για πόσο.",
          "Σύμβαση επεξεργασίας δεδομένων (DPA) και έλεγχος GDPR.",
          "Γραπτός οδηγός για το πού εμπιστεύεστε το AI και πού ελέγχει άνθρωπος.",
        ],
      },
    ],
  },
  A1: {
    code: "A1",
    title: "Enterprise AI πλατφόρμες",
    kicker: "ChatGPT · Claude · Gemini · Microsoft Copilot",
    blocks: [
      {
        kind: "lead",
        body: "Για τις περισσότερες εταιρείες το AI ξεκινά από μία από αυτές τις τέσσερις πλατφόρμες, σε εταιρικό πλάνο, στημένη για όλη την ομάδα.",
      },
      {
        kind: "cards",
        title: "Ποια πλατφόρμα, για ποια εταιρεία",
        items: [
          { name: "Claude Team ή Enterprise", meta: "Αν δουλεύετε με μεγάλα έγγραφα", body: "Συμβάσεις, αναλύσεις, αναφορές και κώδικας, όπου μετράει η ακρίβεια και η γραφή." },
          { name: "ChatGPT Business ή Enterprise", meta: "Αν θέλετε το πιο διαδεδομένο", body: "Γενικής χρήσης, με καλή ανάλυση δεδομένων και το μεγαλύτερο οικοσύστημα εφαρμογών." },
          { name: "Gemini", meta: "Αν δουλεύετε σε Google Workspace", body: "Λειτουργεί μέσα σε Gmail, Drive και Docs. Περιλαμβάνεται στα business πλάνα, οπότε συχνά είναι η πιο γρήγορη αρχή." },
          { name: "Microsoft 365 Copilot", meta: "Αν δουλεύετε σε Microsoft 365", body: "Λειτουργεί μέσα σε Outlook, Teams, Word και Excel, και βλέπει αρχεία και email με τα δικαιώματα που ήδη υπάρχουν." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Συνήθως αρκεί μία.",
        body: "Δεύτερη πλατφόρμα προσθέτουμε μόνο αν κάποιο τμήμα έχει ανάγκη που η πρώτη δεν καλύπτει.",
      },
      {
        kind: "checks",
        title: "Τι ρυθμίζουμε",
        items: [
          "Εταιρικοί λογαριασμοί με SSO: όταν φεύγει κάποιος, κλείνει και η πρόσβαση.",
          "Ξεχωριστός χώρος ανά τμήμα, με τις δικές του οδηγίες και έγγραφα.",
          "Πρότυπα για προσφορές, αναφορές και απαντήσεις σε πελάτες.",
          "Απαντήσεις από τα δικά σας έγγραφα, με παραπομπή στην πηγή.",
          "Σύνδεση με Drive, SharePoint, email και CRM.",
          "Καμία εκπαίδευση στα δεδομένα σας, όρια διατήρησης, audit logs.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Το πρώτο που κλείνουμε.",
        body: "Υπάλληλοι που ανεβάζουν εταιρικά αρχεία σε δωρεάν προσωπικούς λογαριασμούς. Σε αυτά τα πλάνα, τα δεδομένα μπορεί να χρησιμοποιηθούν για την εκπαίδευση μοντέλων.",
      },
    ],
  },
  A2: {
    code: "A2",
    title: "Τοπικό AI (on-premise)",
    kicker: "Mistral · Llama · Qwen · Gemma",
    blocks: [
      {
        kind: "lead",
        body: "Όταν ο νόμος, μια σύμβαση πελάτη ή η δική σας πολιτική δεν επιτρέπει να βγουν δεδομένα από την εταιρεία, στήνουμε μοντέλα που τρέχουν στη δική σας υποδομή. Συμβάσεις, ιατρικά αρχεία, οικονομικά στοιχεία και προσωπικά δεδομένα πελατών δεν στέλνονται πουθενά.",
      },
      {
        kind: "cards",
        title: "Πού το στήνουμε",
        items: [
          { name: "Σταθμός εργασίας στο γραφείο", meta: "Μικρές ομάδες", body: "Ένα μηχάνημα με ισχυρή GPU. Το κόστος ενός δυνατού υπολογιστή, όχι αίθουσας server.", chips: ["NVIDIA DGX Spark", "Mac Studio", "PC με GPU"] },
          { name: "Server στην εταιρεία", meta: "20–100 χρήστες", body: "Server με μία ή περισσότερες GPU, στο rack σας ή σε data center, για όλη την εταιρεία ταυτόχρονα." },
          { name: "Ιδιωτικό cloud στην ΕΕ", meta: "Χωρίς δικό σας hardware", body: "Αποκλειστικός server σε ευρωπαϊκό πάροχο, με τα δεδομένα συμβατικά μέσα στην ΕΕ." },
          { name: "Απομονωμένο δίκτυο", meta: "Αυστηρή συμμόρφωση", body: "Χωρίς καμία σύνδεση στο internet (air-gapped)." },
        ],
      },
      {
        kind: "stack",
        title: "Τι τρέχει",
        layers: [
          ["Τι βλέπουν οι χρήστες", "Open WebUI ή LibreChat: μια σελίδα σαν το ChatGPT, με εταιρικούς λογαριασμούς."],
          ["Μοντέλο", "Mistral, Llama, Qwen, Gemma ή gpt-oss, ανάλογα με την εργασία. Τα δοκιμάζουμε στα ελληνικά."],
          ["Εκτέλεση", "Ollama ή LM Studio για λίγους χρήστες, vLLM για πολλούς ταυτόχρονα."],
          ["Έγγραφα", "Αναζήτηση στα έγγραφά σας με Qdrant ή pgvector, μέσα στο δίκτυο."],
          ["Συνδέσεις", "ERP, file server και εσωτερικές βάσεις, χωρίς κίνηση δεδομένων προς τα έξω."],
        ],
      },
      {
        kind: "compare",
        tone: "tradeoff",
        title: "Τι να περιμένετε",
        labels: ["Κάνει καλά", "Πού υστερεί"],
        rows: [
          ["Αναζήτηση στα έγγραφά σας", "Σύνθετη ανάλυση, σε σχέση με τα κορυφαία cloud μοντέλα"],
          ["Εξαγωγή στοιχείων από τιμολόγια και συμβάσεις", "Θέλει αρχικό κόστος hardware"],
          ["Περιλήψεις", "Θέλει συντήρηση και ενημερώσεις"],
          ["Κατηγοριοποίηση εγγράφων και αιτημάτων", "Λιγότερες έτοιμες συνδέσεις από τις cloud πλατφόρμες"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Συνήθως προτείνουμε υβριδικό.",
        body: "Τοπικά ό,τι είναι ευαίσθητο, και μια cloud πλατφόρμα (A1) για όλα τα υπόλοιπα.",
      },
    ],
  },
  A3: {
    code: "A3",
    title: "Εξειδικευμένα εργαλεία και συνδέσεις",
    kicker: "Εργαλεία για συγκεκριμένες δουλειές",
    blocks: [
      {
        kind: "lead",
        body: "Οι μεγάλες πλατφόρμες καλύπτουν το μεγαλύτερο μέρος της δουλειάς. Για κάποιες εργασίες όμως υπάρχει εργαλείο φτιαγμένο ακριβώς γι’ αυτές. Προτείνουμε μόνο όσα λύνουν πραγματική ανάγκη, και μόνο αφού περάσουν έλεγχο ασφάλειας.",
      },
      {
        kind: "catalog",
        title: "Εργαλεία ανά δουλειά",
        groups: [
          { label: "Φωνή και ήχος", body: "Εκφωνήσεις, υλικό σε πολλές γλώσσες, φωνητικοί βοηθοί.", items: ["ElevenLabs"] },
          { label: "Συναντήσεις", body: "Πρακτικά και εκκρεμότητες, χωρίς σημειώσεις.", items: ["Copilot στο Teams", "Gemini στο Meet", "Fireflies", "Granola"] },
          { label: "Παρουσιάσεις και marketing", body: "Σε ώρες αντί για μέρες.", items: ["Gamma", "Canva AI"] },
          { label: "Εικόνα και βίντεο", body: "Οπτικό υλικό και εκπαιδευτικά βίντεο χωρίς συνεργείο.", items: ["Midjourney", "Runway", "HeyGen", "Synthesia"] },
          { label: "Εσωτερική γνώση", body: "Αναζήτηση και περιλήψεις στην τεκμηρίωσή σας.", items: ["Notion AI", "NotebookLM"] },
          { label: "Έρευνα", body: "Έρευνα αγοράς με πηγές.", items: ["Perplexity"] },
          { label: "Εφαρμογές και πρωτότυπα", body: "Εσωτερικά εργαλεία σε μέρες.", items: ["Lovable", "v0", "Cursor", "Claude Code"] },
          { label: "Αυτοματισμοί", body: "Κανείς δεν μεταφέρει δεδομένα με το χέρι.", items: ["n8n", "Make", "Zapier", "Power Automate"] },
        ],
      },
      {
        kind: "cards",
        title: "Connectors και plugins",
        items: [
          { name: "Connectors", meta: "Έτοιμες συνδέσεις", body: "Οι πλατφόρμες συνδέονται απευθείας με τα εργαλεία που ήδη χρησιμοποιείτε.", chips: ["Google Drive", "SharePoint", "Gmail", "Outlook", "Slack", "Notion", "HubSpot", "Salesforce"] },
          { name: "MCP servers", meta: "Για τα δικά σας συστήματα", body: "Ανοιχτό πρότυπο για να συνδεθεί το AI με ERP, CRM και βάσεις δεδομένων, όπου δεν υπάρχει έτοιμος connector." },
          { name: "Plugins και extensions", meta: "Μόνο εγκεκριμένα", body: "Μόνο από επίσημες πηγές και μόνο όσα εγκρίνετε. Ένα plugin μπορεί να διαβάσει ό,τι βλέπει ο χρήστης." },
        ],
      },
      {
        kind: "checks",
        title: "Ένα εργαλείο μπαίνει μόνο αν",
        items: [
          "Έχει business πλάνο με σύμβαση επεξεργασίας δεδομένων (DPA).",
          "Δεσμεύεται γραπτώς ότι δεν εκπαιδεύεται στα δεδομένα σας.",
          "Ξέρουμε πού αποθηκεύει τα δεδομένα (ΕΕ ή όχι) και για πόσο.",
          "Υποστηρίζει εταιρική είσοδο (SSO) και κεντρικό κλείσιμο πρόσβασης.",
          "Ζητά μόνο τα δικαιώματα που χρειάζεται.",
          "Έχει πιστοποιήσεις (SOC 2, ISO 27001) όπου τις απαιτεί ο κλάδος σας.",
          "Αποδίδει καλά στα ελληνικά, όπου η δουλειά το απαιτεί.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Αν δεν περάσει τον έλεγχο, δεν μπαίνει.",
        body: "Προτείνουμε εναλλακτικό, ή κάνουμε τη δουλειά με τοπικό μοντέλο (A2).",
      },
    ],
  },
  B: {
    code: "B",
    title: "Εκπαίδευση & Υιοθέτηση",
    kicker: "Για να χρησιμοποιηθεί πραγματικά ό,τι στήσαμε",
    blocks: [
      {
        kind: "para",
        body: "Δομημένα σεμινάρια, πρακτικά μαθήματα και οδηγοί που βοηθούν τους υπαλλήλους του πελάτη να υιοθετήσουν πραγματικά τα εργαλεία AI — και να τα χρησιμοποιούν σωστά.",
      },
      {
        kind: "bullets",
        title: "Τι περιλαμβάνει",
        items: [
          "Σεμινάρια πάνω στα πραγματικά δεδομένα και τις υποθέσεις του πελάτη, όχι γενικά demos.",
          "Πρακτικά μαθήματα ανά ρόλο — ο καθένας μαθαίνει αυτό που θα χρησιμοποιεί.",
          "Γραπτοί οδηγοί που μένουν στην εταιρεία και δουλεύουν και για νέους υπαλλήλους.",
        ],
      },
      {
        kind: "note",
        tone: "good",
        icon: "✅",
        title: "Παράδειγμα",
        body: "Δίωρο hands-on σεμινάριο «Claude για νομικούς συμβούλους», με πραγματικά παραδείγματα πάνω σε δικόγραφα του πελάτη — όχι γενικό demo.",
      },
    ],
  },
  C: {
    code: "C",
    title: "Έρευνα & Αξιολόγηση Εργαλείων",
    kicker: "Δοκιμασμένα στα δικά σας αρχεία, όχι σε review site",
    blocks: [
      {
        kind: "para",
        body: "Ερευνούμε και αξιολογούμε εργαλεία AI σε διαφορετικούς τομείς και κλάδους για να βρούμε αυτά που ταιριάζουν πραγματικά — όχι αυτά που συζητάει ο κόσμος.",
      },
      {
        kind: "bullets",
        title: "Πώς δουλεύουμε",
        items: [
          "Ορίζουμε τι ακριβώς πρέπει να κάνει το εργαλείο και με τι κριτήρια θα κριθεί.",
          "Βρίσκουμε τα υποψήφια εργαλεία της αγοράς.",
          "Ελέγχουμε πώς αποδίδει το εργαλείο στα ελληνικά, αφού πολλά είναι φτιαγμένα και δοκιμασμένα μόνο στα αγγλικά.",
          "Τα δοκιμάζουμε πάνω στα πραγματικά αρχεία και δεδομένα του πελάτη.",
          "Παραδίδουμε σύγκριση και τεκμηριωμένη πρόταση.",
        ],
      },
      {
        kind: "note",
        tone: "good",
        icon: "✅",
        title: "Παράδειγμα",
        body: "Πελάτης ρώτησε για AI εργαλείο μεταγραφής. Δοκιμάσαμε 3 εργαλεία πάνω στα δικά του αρχεία και επιλέξαμε αυτό με το καλύτερο accuracy στα ελληνικά.",
      },
      {
        kind: "note",
        tone: "stop",
        icon: "🚫",
        title: "Πότε δεν ταιριάζει",
        body: "Όταν ο πελάτης ήδη ξέρει ποιο εργαλείο θέλει — τότε πάμε κατευθείαν στην Υπηρεσία Α.",
      },
    ],
  },
  D: {
    code: "D",
    title: "Συνεχής Ενημέρωση",
    kicker: "Φιλτραρισμένη, όχι newsletter",
    blocks: [
      {
        kind: "para",
        body: "Όταν εμφανίζονται νέα εργαλεία, μοντέλα ή δυνατότητες που σχετίζονται με την επιχείρηση του πελάτη, επικοινωνούμε και τον ενημερώνουμε.",
      },
      {
        kind: "bullets",
        title: "Τι περιλαμβάνει",
        items: [
          "Παρακολουθούμε τι βγαίνει από τις πλατφόρμες που ήδη χρησιμοποιεί ο πελάτης.",
          "Φιλτράρουμε: στέλνουμε μόνο ό,τι αλλάζει κάτι στη δική του δουλειά και θα του ήταν χρήσιμο.",
          "Κάθε ενημέρωση συνοδεύεται από συγκεκριμένη πρόταση, όχι απλώς είδηση.",
        ],
      },
      {
        kind: "note",
        tone: "good",
        icon: "✅",
        title: "Παράδειγμα",
        body: "Βγήκαν τα Claude Agent Skills. Στείλαμε σύντομο μήνυμα σε 3 πελάτες που τα χρειάζονταν, μαζί με πρόταση για setup.",
      },
      {
        kind: "note",
        tone: "stop",
        icon: "🚫",
        title: "Πότε δεν ταιριάζει",
        body: "Σε πελάτες χωρίς ενεργό stack μαζί μας — η υπηρεσία προϋποθέτει συνέχεια.",
      },
    ],
  },
};

export const serviceDetails: Record<Lang, Record<ServiceId, ServiceDetail>> = { EN, GR };
