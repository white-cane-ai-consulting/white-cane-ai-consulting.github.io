import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { Consent, disableAnalytics, enableAnalytics, readConsent, saveConsent } from "@/lib/analytics";

type ConsentContextType = {
  /** null until the visitor has answered (or after a stored answer expires). */
  consent: Consent | null;
  accept: () => void;
  reject: () => void;
  policyOpen: boolean;
  setPolicyOpen: (open: boolean) => void;
};

// Harmless defaults so sections rendered on their own (tests) don't need the provider.
const ConsentContext = createContext<ConsentContextType>({
  consent: null,
  accept: () => {},
  reject: () => {},
  policyOpen: false,
  setPolicyOpen: () => {},
});

export const ConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<Consent | null>(readConsent);
  const [policyOpen, setPolicyOpen] = useState(false);

  useEffect(() => {
    if (consent === "granted") enableAnalytics();
  }, [consent]);

  const accept = useCallback(() => {
    saveConsent("granted");
    setConsent("granted");
  }, []);

  const reject = useCallback(() => {
    saveConsent("denied");
    setConsent("denied");
    disableAnalytics();
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, accept, reject, policyOpen, setPolicyOpen }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => useContext(ConsentContext);
