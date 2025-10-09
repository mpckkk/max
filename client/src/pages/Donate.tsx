import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Coffee } from "lucide-react";
import donateImage from "@assets/stock_images/adorable_shiba_inu_d_30bf54df.jpg";
import { resolveDonateUrl } from "@/lib/donate";

export default function Donate() {
  const [donateUrl, setDonateUrl] = useState<string>(resolveDonateUrl());
  const [customUrl, setCustomUrl] = useState<string>("");
  const hasEnvUrl = Boolean((import.meta.env.VITE_DONATE_URL as string | undefined)?.trim());

  useEffect(() => {
    if (typeof window !== "undefined" && !hasEnvUrl) {
      const stored = window.localStorage.getItem("donateUrl") || "";
      setCustomUrl(stored);
    }
  }, [hasEnvUrl]);

  const handleSaveCustomUrl = () => {
    const value = customUrl.trim();
    if (typeof window !== "undefined") {
      if (value) {
        window.localStorage.setItem("donateUrl", value);
      } else {
        window.localStorage.removeItem("donateUrl");
      }
    }
    setDonateUrl(resolveDonateUrl());
  };

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Support Max</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple way to support Max's treats, toys, and vet care.
          </p>
        </div>

        <Card className="p-8 md:p-12 text-center space-y-8 max-w-2xl mx-auto">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-accent/30">
            <img
              src={donateImage}
              alt="Support Max"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold">Buy Me a Coffee</h2>
            <p className="text-muted-foreground">
              Your support helps keep this good boy happy and healthy!
            </p>
          </div>

          <Button asChild size="lg" className="text-base" data-testid="button-donate-external">
            <a href={donateUrl} target="_blank" rel="noopener noreferrer">
              <Coffee className="mr-2 h-5 w-5" />
              Open Donation Page
            </a>
          </Button>

          {!hasEnvUrl && (
            <div className="pt-4 space-y-2">
              <label htmlFor="custom-donate-url" className="block text-sm font-medium">
                Set your donation link (optional)
              </label>
              <input
                id="custom-donate-url"
                type="url"
                placeholder="https://www.buymeacoffee.com/your-handle"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2 justify-center">
                <Button onClick={handleSaveCustomUrl} variant="outline" size="sm">
                  Save link
                </Button>
                <Button
                  onClick={() => {
                    setCustomUrl("");
                    if (typeof window !== "undefined") window.localStorage.removeItem("donateUrl");
                    setDonateUrl(resolveDonateUrl());
                  }}
                  variant="ghost"
                  size="sm"
                >
                  Clear
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Without a custom link, the button opens the Buy Me a Coffee homepage.
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground">Thank you for supporting Max!</p>
        </Card>
      </div>
    </div>
  );
}
