import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.6, 0.05, 0.1, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease },
});

export const Who = () => {
  const { t } = useLanguage();
  const w = t.who;

  return (
    <section id="who" className="relative py-32 md:py-44 bg-bone text-ink border-t border-border/50">
      <div className="container">

        {/* Header row */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mb-20">

          {/* Logo */}
          <motion.div
            {...fadeUp(0)}
            className="md:col-span-4 flex items-start justify-start -ml-24 pt-2"
          >
            <img
              src={logo}
              alt="White Cane AI Consulting"
              className="w-80 md:w-[26rem] lg:w-[32rem] mix-blend-multiply"
            />
          </motion.div>

          {/* Headline + intro */}
          <div className="md:col-span-8 flex flex-col gap-8">
            <motion.div {...fadeUp(0)} className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-signal">02 —</span>
              <span className="text-xs uppercase tracking-[0.3em] text-ink/50">{w.label}</span>
            </motion.div>

            <motion.h2
              {...fadeUp(0.1)}
              className="font-display font-light text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-balance"
            >
              {w.h2a}
              <br />
              <span className="text-ink/35">{w.h2b}</span>{" "}
              <span className="italic font-normal">{w.h2c}</span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.2)}
              className="text-ink/60 leading-relaxed max-w-2xl border-l-2 border-signal pl-5"
            >
              {w.body}
            </motion.p>
          </div>
        </div>

        {/* Team cards */}
        <div className="grid md:grid-cols-2 gap-px bg-ink/10">
          {w.team.map((member, i) => (
            <motion.div
              key={member.role}
              {...fadeUp(0.1 + i * 0.15)}
              className="bg-bone p-8 md:p-10 flex flex-col gap-6"
            >
              {/* Role */}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-signal">{`0${i + 1}`}</span>
                <span className="font-display text-lg text-ink">{member.role}</span>
              </div>

              {/* Credential tags */}
              <div className="flex flex-wrap gap-2">
                {member.credentials.map((c: string) => (
                  <span
                    key={c}
                    className="text-xs border border-ink/20 text-ink/60 px-3 py-1 tracking-wide"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-sm text-ink/55 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Proof strip */}
        <motion.div
          {...fadeUp(0.3)}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 mt-px"
        >
          {w.proof.map((p) => (
            <div
              key={p.k}
              className="group bg-bone hover:bg-ink transition-colors duration-500 p-6 cursor-default"
            >
              <div className="font-display text-2xl text-signal mb-1 group-hover:text-bone transition-colors duration-500">
                {p.k}
              </div>
              <div className="text-xs text-ink/50 group-hover:text-bone/50 transition-colors duration-500 leading-relaxed">
                {p.v}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
