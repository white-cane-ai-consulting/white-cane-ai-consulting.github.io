import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// Web3Forms emails each submission to the address the key was created for. The key is public
// by design (it is sent from the browser); set it as VITE_WEB3FORMS_KEY at build time.
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const FORM_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const softEase = [0.16, 1, 0.3, 1] as const;

const field =
  "w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink/40 transition-colors focus:border-ink/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal/30 aria-[invalid=true]:border-signal";
const label = "mb-2 block text-xs uppercase tracking-[0.12em] text-ink/65";

/** Marks a field the form will not send without. */
const Req = () => <span aria-hidden="true" className="ml-1 text-signal">*</span>;

/**
 * The site is static, so submissions go to a form-delivery service that emails them to us,
 * with the package in the subject. The visitor never needs an email app.
 */
export const ContactForm = () => {
  const { t } = useLanguage();
  const f = t.cta.form;
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const schema = z.object({
    pkg: z.number().int().min(0).max(f.packages.length - 1),
    name: z.string().trim().min(2, f.errors.name),
    email: z.string().trim().email(f.errors.email),
    company: z.string().trim().optional(),
    subject: z.string().trim().min(2, f.errors.subject),
    message: z.string().trim().min(10, f.errors.message),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { pkg: 0, name: "", email: "", company: "", subject: "", message: "" },
  });
  const pkg = watch("pkg");

  const onSubmit = async (v: Values) => {
    setFailed(false);
    const packageName = f.packages[v.pkg];
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `[${packageName}] ${v.subject}`,
          from_name: "White Cane website",
          name: v.name,
          email: v.email,
          company: v.company || "-",
          package: packageName,
          message: v.message,
          botcheck: "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? res.statusText);
      setSent(true);
    } catch {
      setFailed(true);
    }
  };

  const error = (msg?: string) =>
    msg ? <p className="mt-1.5 text-xs text-signal">{msg}</p> : null;

  return (
    <div className="rounded-3xl bg-bone text-ink p-5 sm:p-7">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: softEase }}
            role="status"
          >
            <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-signal/10 text-signal">
              <Check className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <p className="font-display text-xl leading-snug">{f.sentTitle}</p>
            <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink/70">{f.sentBody}</p>
            <button
              type="button"
              onClick={() => {
                reset();
                setSent(false);
              }}
              className="mt-6 rounded-full bg-ink px-5 py-3 text-xs uppercase tracking-[0.14em] text-bone transition-colors hover:bg-signal"
            >
              {f.again}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: softEase }}
            className="space-y-5"
          >
            <fieldset>
              <legend className={label}>{f.packageLabel}</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {f.packages.map((name, i) => {
                  const active = pkg === i;
                  return (
                    <label
                      key={name}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm leading-snug transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal/40",
                        active
                          ? "border-signal bg-signal/[0.07] text-ink"
                          : "border-ink/15 bg-white text-ink/70 hover:border-ink/35 hover:text-ink",
                      )}
                    >
                      <input
                        type="radio"
                        name="pkg"
                        value={i}
                        checked={active}
                        onChange={() => setValue("pkg", i)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors",
                          active ? "border-signal bg-signal" : "border-ink/30",
                        )}
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                      {name}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className={label}>{f.name}<Req /></label>
                <input id="cf-name" autoComplete="name" aria-required="true" className={field} aria-invalid={!!errors.name} {...register("name")} />
                {error(errors.name?.message)}
              </div>
              <div>
                <label htmlFor="cf-email" className={label}>{f.email}<Req /></label>
                <input id="cf-email" type="email" aria-required="true" autoComplete="email" className={field} aria-invalid={!!errors.email} {...register("email")} />
                {error(errors.email?.message)}
              </div>
            </div>

            <div>
              <label htmlFor="cf-company" className={label}>{f.company} <span className="normal-case tracking-normal text-ink/45">({f.optional})</span></label>
              <input id="cf-company" autoComplete="organization" placeholder={f.companyPlaceholder} className={field} {...register("company")} />
            </div>

            <div>
              <label htmlFor="cf-subject" className={label}>{f.subject}<Req /></label>
              <input id="cf-subject" aria-required="true" placeholder={f.subjectPlaceholder} className={field} aria-invalid={!!errors.subject} {...register("subject")} />
              {error(errors.subject?.message)}
            </div>

            <div>
              <label htmlFor="cf-message" className={label}>{f.message}<Req /></label>
              <textarea
                id="cf-message"
                aria-required="true"
                rows={4}
                placeholder={f.messagePlaceholder}
                className={cn(field, "resize-y leading-[1.7]")}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {error(errors.message?.message)}
            </div>

            {failed && <p role="alert" className="text-sm text-signal">{f.sendError}</p>}

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-[1.6] text-ink/60 sm:max-w-[16rem]">
                <span className="text-signal">*</span> {f.required}. {f.note}
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group disabled:opacity-60 inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 text-xs uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:bg-signal"
              >
                {isSubmitting ? f.sending : f.submit}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
