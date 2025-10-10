import { useEffect } from 'react';

export default function Donate() {
  useEffect(() => {
    window.location.replace("https://buymeacoffee.com/maxisshibainu");
  }, []);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Support Max</h1>
        <p className="text-lg text-muted-foreground mb-6">Redirecting to Buy Me a Coffee…</p>
        <a
          href="https://buymeacoffee.com/maxisshibainu"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground"
          data-testid="button-donate-external"
        >
          Continue to Buy Me a Coffee
        </a>
      </div>
    </div>
  );
}
