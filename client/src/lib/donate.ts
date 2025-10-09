export function resolveDonateUrl(): string {
  const fromEnv = (import.meta.env.VITE_DONATE_URL as string | undefined)?.trim();
  if (fromEnv) return fromEnv;

  if (typeof window !== "undefined") {
    const fromStorage = window.localStorage.getItem("donateUrl")?.trim();
    if (fromStorage) return fromStorage;
  }

  // Generic fallback so the Donate button always works
  return "https://www.buymeacoffee.com/";
}
