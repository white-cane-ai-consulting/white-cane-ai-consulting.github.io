export const translations = {
  EN: {
    nav: {
      links: [
        { label: "Services", href: "#offer" },
        { label: "Team", href: "#who" },
        { label: "Achievements", href: "#proof" },
        { label: "Vision", href: "#vision" },
      ],
      contact: "Contact Us",
    },
    hero: {
      eyebrow: "White Cane / AI Consulting",
      lines: ["Clarity", "in the era", "of AI."],
      lineHighlight: "AI",
      sub: "We help businesses cut through the noise — selecting, integrating, and operationalizing the right AI tools for the work that actually matters.",
      cta: "Explore the Services",
      sideLabel: "EST. 2026 — Clarity Engineered",
      sideMetricLabel: "Currently",
      sideMetricValue: "● Onboarding Q3",
      marquee: ["Strategy", "● Tooling Audits", "Implementation", "● Training", "Workflow Design", "● Vendor Selection", "Governance", "● Continuous Care"],
    },
    who: {
      label: "Who we are",
      h2a: "A small team that was there",
      h2b: "before it was obvious —",
      h2c: "and stayed.",
      body: "We didn't start White Cane because AI became a buzzword. We started it because we spent years inside large organisations watching good companies make expensive mistakes — choosing the wrong tools, skipping the adoption phase, or buying platforms nobody opened. We've been close enough to the problem to know exactly where it breaks.",
      team: [
        {
          bio: [
            [
              [
                { text: "Before founding White Cane, we worked at Greece's largest consulting firms — where we built and trained " },
                { text: "some of the country's first Generative AI teams from scratch", b: true, s: true },
                { text: ". We were among the first in Greece to implement AI at enterprise scale, before most organisations had it on their agenda." },
              ],
              [
                { text: "We also worked inside " },
                { text: "large, high-seniority AI teams", b: true, s: true },
                { text: ", gaining hands-on experience across every major sector: audit, energy, law, real estate, retail, logistics, and commercial operations. Since day one we've been tracking the AI tooling landscape — testing every new model the week it drops and building intuition for what's genuinely useful versus what's noise." },
              ],
            ],
            [
              [{ text: "We've seen from the inside what goes wrong even in the best tech teams — wrong tools, zero adoption, expensive platforms nobody opens. We track every new AI tool and model from day one, so we always know what's genuinely useful — and what's just noise." }],
            ],
          ],
        },
      ],
      proof: [
        { k: "3 yrs", v: "Prior enterprise AI experience" },
        { k: "Day one", v: "In the Greek AI market" },
        { k: "EST. 2026", v: "Founded in Athens" },
        { k: "Q3", v: "Currently onboarding" },
      ],
    },
    offer: {
      label: "What we offer",
      h2a: "Four practices.",
      h2b: "One outcome —",
      h2c: "work that thinks for itself.",
      serviceA: {
        title: "AI Platform Deployment & Configuration",
        body: "We deploy and configure leading AI platforms — Claude, GPT, and Gemini — for your organization. We initialize agents, author your CLAUDE.md and SKILLS.md files to encode your company's workflows, infrastructure, and data context, then write precise model instructions that produce consistent, reliable results. We select the right MCP servers, built-in features, and integrations so your agents connect to the right data and return answers your teams can actually use — with security as the foundation of every decision.",
        flowSteps: [
          { n: "01", label: "Deploy Platforms", sub: "Claude · ChatGPT · Gemini", bullets: ["Claude Sonnet & Opus", "ChatGPT-4o", "Gemini 2.0 Flash", "Platform selected to fit your specific needs"] },
          { n: "02", label: "Initialize Agents", sub: "Agentic workflows", bullets: ["Define agent roles and permissions", "Configure tool access and capabilities", "Set behavioral boundaries", "Run initial testing cycles"] },
          { n: "03", label: "Author Context Files", sub: "CLAUDE.md & SKILLS.md", bullets: ["CLAUDE.md encodes company context", "SKILLS.md defines custom workflows", "Infrastructure and data references", "Role-specific instructions per team"] },
          { n: "04", label: "Write Instructions", sub: "Precise model prompts", bullets: ["System-level prompt engineering", "Consistent output formatting", "Role-based instruction sets", "Iterative quality validation"] },
          { n: "05", label: "Connect Data", sub: "MCP servers & integrations", bullets: ["Select and configure MCP servers", "Secure API and database connections", "Real-time data access setup", "Permissions and access control"] },
          { n: "06", label: "Secure by Design", sub: "Security as foundation", bullets: ["Access control and role review", "Data privacy compliance", "Audit trail configuration", "Security-first at every layer"] },
        ],
        tags: ["Claude", "ChatGPT", "Gemini", "MCP", "Agents", "Security"],
      },
      servicesRow: [
        {
          title: "Training & Enablement",
          body: "Structured seminars, hands-on courses, and practical guides that help your employees actually adopt AI tools — and use them the right way.",
          tags: ["Seminars", "Courses", "Guides"],
        },
        {
          title: "AI Research & Tool Selection",
          body: "We research and evaluate AI tools across domains and industries to find the ones that genuinely fit your needs — not just the ones everyone is talking about.",
          tags: ["Research", "Evaluation", "Fit Analysis"],
        },
        {
          title: "Staying Current",
          body: "When new tools, models, or capabilities emerge that are relevant to your business, we'll reach out and let you know.",
          tags: ["Updates", "Model Releases", "New Tools"],
        },
      ],
    },
    achievements: {
      label: "What we've achieved",
      h2a: "Numbers that",
      h2b: "survived",
      h2c: "the audit.",
      stats: [
        { value: 47, suffix: "+", label: "Engagements delivered", note: "Across SaaS, finance, healthcare and creative industries." },
        { value: 12000, suffix: "h", label: "Hours returned to teams", note: "Measured pre/post implementation in client workflows." },
        { value: 92, suffix: "%", label: "Adoption after 90 days", note: "Tools we ship are still in daily use a quarter later." },
        { value: 3.4, suffix: "×", label: "Median ROI on engagement", note: "Based on documented cost savings within 6 months." },
      ],
      toolsLabel: "AI tools we've set up & tested",
    },
    vision: {
      label: "Methodology",
      h2a: "A method,",
      h2b: "not a deck.",
      sub: "Every engagement follows the same rhythm. Here's exactly how we work with you.",
      slides: [
        { k: "01 / LISTEN", t: "We listen first.", d: "Before we recommend anything, we sit with your team. We identify the bottlenecks, the repetitive tasks, and the real business problems — then research solutions built around the infrastructure you already have." },
        { k: "02 / DESIGN", t: "We design the solution.", d: "We configure the tools around your specific requirements and integrate them into your workflows. Realistic outcomes, grounded in your reality — we don't promise what we can't deliver." },
        { k: "03 / TRAIN", t: "We teach you how.", d: "We don't just hand over a tool and walk away. We show you how to use it, how to get real value from it every day — and we point the way to what comes next." },
        { k: "04 / STAY", t: "We stay in touch.", d: "We keep the line open and let you know about new features, use cases, and better models relevant to your work — so you're always a step ahead." },
      ],
    },
    cta: {
      eyebrow: "— Begin",
      h2a: "Stop guessing",
      h2b: "at",
      h2c: "Start",
      h2d: "choosing.",
      sub: "A 30-minute call. No pitch, no slides — we'll listen, ask hard questions, and tell you honestly whether we're the right fit.",
      directLine: "Direct line",
      footerTagline: "Clarity in the era of AI.",
      practice: "Practice",
      practiceLinks: ["Strategy", "Selection", "Integration"],
      company: "Company",
      companyLinks: ["Who we are", "Work", "Contact"],
      elsewhere: "Elsewhere",
      elsewhereLinks: ["LinkedIn", "Substack", "X / Twitter"],
      accepting: "● Currently accepting Q3 engagements",
    },
  },

  GR: {
    nav: {
      links: [
        { label: "Υπηρεσίες", href: "#offer" },
        { label: "Ομάδα", href: "#who" },
        { label: "Επιτεύγματα", href: "#proof" },
        { label: "Μέθοδος", href: "#vision" },
      ],
      contact: "Επικοινωνία",
    },
    hero: {
      eyebrow: "White Cane / AI Consulting",
      lines: ["Καθοδηγούμε", "όσους βαδίζουν τυφλά", "στην εποχή του "],
      lineHighlight: "AI.",
      sub: "Βοηθάμε επιχειρήσεις να βρουν τη σωστή κατεύθυνση — επιλέγοντας, ενσωματώνοντας και αξιοποιώντας τα κατάλληλα εργαλεία AI για τη δουλειά που πραγματικά μετράει.",
      cta: "Εξερευνήστε τις Υπηρεσίες",
      sideLabel: "ΙΔΡΥΣΗ 2026 — Σαφήνεια με Τεχνολογία",
      sideMetricLabel: "Τρέχον",
      sideMetricValue: "● Q3 Onboarding",
      marquee: ["Στρατηγική", "● Αξιολόγηση Εργαλείων", "Υλοποίηση", "● Εκπαίδευση", "Σχεδιασμός Ροών", "● Επιλογή Προμηθευτών", "Διακυβέρνηση", "● Συνεχής Φροντίδα"],
    },
    who: {
      label: "Ποιοι είμαστε",
      h2a: "Χτίσαμε enterprise AI",
      h2b: "πριν γίνει μόδα —",
      h2c: "ξέρουμε πού σπάει.",
      body: "",
      team: [
        {
          bio: [
            [
              [
                { text: "Έχουμε " },
                { text: "εργαστεί στις κορυφαίες συμβουλευτικές εταιρείες", b: true, s: true },
                { text: " της χώρας και έχουμε συμβάλει στη δημιουργία, από το μηδέν, μερικών από τις " },
                { text: "πρώτες ομάδες Generative AI", b: true, s: true },
                { text: " στην Ελλάδα, ενώ έχουμε υπάρξει και μέρος μιας από τις μεγαλύτερες και πιο τεχνολογικά προηγμένες ομάδες AI στη χώρα." },
              ],
              [
                { text: "Έχουμε σχεδιάσει και " },
                { text: "αναπτύξει AI applications και AI tools", b: true, s: true },
                { text: " για τις μεγαλύτερες ελληνικές επιχειρήσεις, σε διαφορετικούς κλάδους, φέρνοντας το AI στην πράξη — εκεί που δημιουργεί πραγματική αξία, ενώ παράλληλα έχουμε εκπαιδεύσει ομάδες και επαγγελματίες ώστε να αξιοποιούν ουσιαστικά τις δυνατότητές του. Ταυτόχρονα, έχουμε υλοποιήσει λύσεις προσαρμοσμένες σε πραγματικές ανάγκες, συνδυάζοντας τεχνική υλοποίηση με πρακτική κατανόηση του πώς το AI ενσωματώνεται σε έναν οργανισμό." },
              ],
              [
                { text: "Για εμάς, το AI δεν είναι απλώς δουλειά — είναι κάτι που μας ενθουσιάζει πραγματικά, γι' αυτό " },
                { text: "δοκιμάζουμε κάθε νέο εργαλείο", b: true, s: true },
                { text: " και μοντέλο από την πρώτη στιγμή. Όλα ξεκίνησαν επειδή θέλαμε να βοηθήσουμε έναν συνάδελφο να κάνει τη δουλειά του πιο εύκολα με το AI και να εξελιχθεί — και κάπως έτσι " },
                { text: "ήρθε η ιδέα για την White Cane AI", b: true, s: true },
                { text: "." },
              ],
            ],
            [
              [{ text: "Έχουμε δει από μέσα τι πάει λάθος ακόμη και στις καλύτερες τεχνολογικές ομάδες — λάθος εργαλεία, κανένα adoption, ακριβές πλατφόρμες που κανείς δεν χρησιμοποιεί. Παρακολουθούμε εμπράκτως κάθε νέο εργαλείο και μοντέλο AI από την πρώτη μέρα, ώστε να ξέρουμε πάντα τι είναι πραγματικά χρήσιμο — και τι απλώς θόρυβος." }],
            ],
          ],
        },
      ],
      proof: [
        { k: "3 χρόνια", v: "Εμπειρία enterprise AI" },
        { k: "Από πρώτη στιγμή", v: "Στην αγορά AI της Ελλάδας" },
        { k: "2026", v: "Ιδρύθηκε στην Αθήνα" },
        { k: "Q3", v: "Τώρα δεχόμαστε πελάτες" },
      ],
    },
    offer: {
      label: "Τι προσφέρουμε",
      h2a: "Τέσσερις τομείς.",
      h2b: "Ένα αποτέλεσμα —",
      h2c: "ευφυΐα και αυτονομία στην εργασία.",
      serviceA: {
        title: "Set-up & Ρύθμιση AI Εργαλείων",
        body: "Εγκαθιστούμε και ρυθμίζουμε κορυφαίες πλατφόρμες AI — Claude, ChatGPT και Gemini — για τον οργανισμό σας. Αρχικοποιούμε agents, συντάσσουμε τα αρχεία CLAUDE.md και SKILLS.md για να κωδικοποιήσουμε τις ροές εργασίας, την υποδομή και το πλαίσιο δεδομένων της εταιρείας σας, και γράφουμε ακριβείς οδηγίες μοντέλου που παράγουν σταθερά, αξιόπιστα αποτελέσματα. Επιλέγουμε τους κατάλληλους MCP servers και ενσωματώσεις ώστε οι agents σας να συνδέονται με τα σωστά δεδομένα — με την ασφάλεια ως θεμέλιο κάθε απόφασης.",
        flowSteps: [
          { n: "01", label: "Set-up περιβαλλον AI", sub: "AI Platforms & Environments", bullets: ["Claude  Sonnet, ChatGPT-5.5 & Gemini 3.0 Pro, Mistral", "Cursor & Claude Code για AI-assisted development", "v0 & Lovable για UI/UX & web generation", "Διαμόρφωση περιβάλλοντος πολλαπλών AI εργαλείων"] },
          { n: "02", label: "Instructions & Prompts", sub: "System Prompts & Roles", bullets: ["Custom instructions για Claude, ChatGPT και Gemini", "Καθορισμός ρόλων και ορίων συμπεριφοράς (behavioral limits)", "Σταθερή μορφή αποτελεσμάτων (JSON, Markdown)", "Επαναληπτικός έλεγχος οδηγιών"] },
          { n: "03", label: "Skills & Actions", sub: "Custom Tools & Skills", bullets: ["Δημιουργία αρχείου SKILLS.md", "Ορισμός συγκεκριμένων δεξιοτήτων (capabilities, reference, connector)", "Οδηγίες εκτέλεσης βημάτων (workflows)", "Δοκιμή, κοινή χρήση και βελτιστοποίηση ικανοτήτων"] },
          { n: "04", label: "Data & Context (RAG)", sub: "Knowledge Base & Context", bullets: ["Ενσωμάτωση αρχείων CLAUDE.md και RAG contexts", "Φόρτωση δεδομένων υποδομής, αναφορών και εγγράφων", "Data ingestion για ακριβές context σε πολλαπλά μοντέλα", "Ενημέρωση context για βελτιωμένη μνήμη"] },
          { n: "05", label: "MCP & Connections", sub: "MCP Servers & APIs", bullets: ["Επιλογή και ρύθμιση Model Context Protocol (MCP) servers", "Σύνδεση με βάσεις δεδομένων, APIs και πλατφόρμες (Slack, M365)", "Πρόσβαση σε real-time δεδομένα με ασφάλεια", "Έλεγχος δικαιωμάτων πρόσβασης και συνδέσεων"] },
          { n: "06", label: "Review, Compliance & Security", sub: "Enterprise Security & Governance", bullets: ["Single Sign-On (SSO) & SCIM για διαχείριση ταυτοτήτων", "Audit logs & Compliance API για παρακολούθηση", "Έλεγχος πολιτικών: No model training, IP allowlisting", "GDPR compliance, custom data retention & ρόλοι πρόσβασης"] },
        ],
        tags: ["Claude", "ChatGPT", "Gemini", "MCP", "Agents", "Security"],
      },
      servicesRow: [
        {
          title: "Εκπαίδευση & Upskilling",
          body: "Δομημένα σεμινάρια, πρακτικά μαθήματα και οδηγοί που βοηθούν τους υπαλλήλους σας να υιοθετήσουν πραγματικά τα εργαλεία AI — και να τα χρησιμοποιούν σωστά.",
          tags: ["Σεμινάρια", "Μαθήματα", "Οδηγοί"],
        },
        {
          title: "Έρευνα AI & Επιλογή Κατάλληλων Εργαλείων",
          body: "Ερευνούμε και αξιολογούμε εργαλεία AI σε διαφορετικούς τομείς και κλάδους για να βρούμε αυτά που ταιριάζουν πραγματικά στις ανάγκες σας — όχι απλώς αυτά που συζητάει ο κόσμος.",
          tags: ["Έρευνα", "Αξιολόγηση", "Ανάλυση Συμβατότητας"],
        },
        {
          title: "Συνεχή Ενημέρωση",
          body: "Όταν εμφανίζονται νέα εργαλεία, μοντέλα ή δυνατότητες που σχετίζονται με την επιχείρησή σας, θα επικοινωνήσουμε και θα σας ενημερώσουμε.",
          tags: ["Ενημερώσεις", "Νέα Μοντέλα", "Νέα Εργαλεία"],
        },
      ],
    },
    achievements: {
      label: "Τι έχουμε πετύχει",
      h2a: "Αριθμοί",
      h2b: "από την πράξη —",
      h2c: "χωρίς υπερβολή.",
      stats: [
        { value: 150, suffix: "+", label: "Εργαλεία AI αξιολογημένα", note: "Δοκιμάσαμε και τεκμηριώσαμε κάθε σημαντικό εργαλείο — από μοντέλα ως πλατφόρμες αυτοματισμού." },
        { value: 40, suffix: "%", label: "Μέση εξοικονόμηση χρόνου", note: "Στις ροές εργασίας που αυτοματοποιήσαμε στο πλαίσιο της εμπειρίας μας." },
        { value: 10, suffix: "+", label: "Κλάδοι εφαρμογής", note: "Χρηματοοικονομικά, ενέργεια, νομικά, real estate, logistics, retail, μάρκετινγκ, τουρισμός, τεχνολογία και εκπαίδευση." },
        { value: 15, suffix: "+", label: "AI use cases — ελληνική αγορά", note: "Ανάπτυξη κώδικα, web design, social media, δημιουργία περιεχομένου, SEO, εξυπηρέτηση πελατών, μεταφράσεις, νομικά, λογιστικά και άλλα." },
      ],
      toolsLabel: "Εργαλεία AI που έχουμε εγκαταστήσει & δοκιμάσει",
    },
    vision: {
      label: "Μεθοδολογία",
      h2a: "Μια μέθοδος,",
      h2b: "όχι μια παρουσίαση.",
      sub: "Κάθε συνεργασία ακολουθεί τον ίδιο ρυθμό. Σας δείχνουμε ακριβώς πώς θα δουλέψουμε μαζί σας.",
      slides: [
        { k: "01 / ΑΚΟΥΜΕ", t: "Βρίσκουμε τα εμπόδια σας.", d: "Πριν προτείνουμε οτιδήποτε, σας ακούμε. Εντοπίζουμε τα εμπόδια, τις επαναλαμβανόμενες διαδικασίες και τα πραγματικά επιχειρηματικά προβλήματα — και αναζητάμε λύσεις πάνω στην υποδομή που ήδη έχετε." },
        { k: "02 / ΣΧΕΔΙΑΖΟΥΜΕ", t: "Οργανώνουμε και υλοποιούμε τη λύση.", d: "Ρυθμίζουμε τα εργαλεία με βάση τις δικές σας ανάγκες και τα ενσωματώνουμε στις ροές εργασίας σας. Ρεαλιστικά αποτελέσματα, βασισμένα στην πραγματικότητα — δεν σας πουλάμε ψέματα." },
        { k: "03 / ΕΚΠΑΙΔΕΥΟΥΜΕ", t: "Βοηθαμε στην υοθέτηση των εργαλείων.", d: "Δεν αφήνουμε ένα εργαλείο και φεύγουμε. Σας δείχνουμε πώς να το χρησιμοποιείτε και πώς να αντλείτε αξία από αυτό στην καθημερινή εργασία — και σας δείχνουμε τον δρόμο για ό,τι έρχεται." },
        { k: "04 / ΠΑΡΑΜΕΝΟΥΜΕ", t: "Επικοινωνούμε μαζί σας", d: "Κρατάμε επαφή και σας ενημερώνουμε για νέα features, use cases και καλύτερα μοντέλα που μπορούν να σας φανούν χρήσιμα — ώστε να είστε πάντα ένα βήμα μπροστά." },
      ],
    },
    cta: {
      eyebrow: "— Ξεκινήστε",
      h2a: "Σταματήστε να ψάχνετε.",
      h2c: "Ξεκινήστε",
      h2d: "να επιλέγετε.",
      sub: "Μια κλήση 30 λεπτών. Χωρίς παρουσίαση, χωρίς διαφάνειες — θα ακούσουμε, θα κάνουμε δύσκολες ερωτήσεις, και θα σας πούμε ειλικρινά αν είμαστε η κατάλληλη επιλογή.",
      directLine: "Άμεση επικοινωνία",
      footerTagline: "Σαφήνεια στην εποχή της AI.",
      practice: "Τομείς",
      practiceLinks: ["Στρατηγική", "Επιλογή", "Ενσωμάτωση"],
      company: "Εταιρεία",
      companyLinks: ["Ποιοι είμαστε", "Έργο", "Επικοινωνία"],
      elsewhere: "Αλλού",
      elsewhereLinks: ["LinkedIn", "Substack", "X / Twitter"],
      accepting: "● Δεχόμαστε συνεργασίες Γ' Τριμήνου",
    },
  },
} as const;

export type Lang = "EN" | "GR";
export type Translations = (typeof translations)[Lang];
