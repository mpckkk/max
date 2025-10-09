import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Coffee } from "lucide-react";
import donateImage from "@assets/stock_images/adorable_shiba_inu_d_30bf54df.jpg";

export default function Donate() {
  const donateUrl = import.meta.env.VITE_DONATE_URL as string | undefined;

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

          {donateUrl ? (
            <Button asChild size="lg" className="text-base" data-testid="button-donate-external">
              <a href={donateUrl} target="_blank" rel="noopener noreferrer">
                <Coffee className="mr-2 h-5 w-5" />
                Open Donation Page
              </a>
            </Button>
          ) : (
            <Card className="p-6 bg-primary/5">
              <h3 className="font-semibold mb-2">Donations Currently Unavailable</h3>
              <p className="text-sm text-muted-foreground">
                Set <code>VITE_DONATE_URL</code> in your environment to enable the donation button.
              </p>
            </Card>
          )}

          <p className="text-sm text-muted-foreground">
            Thank you for supporting Max!
          </p>
        </Card>
      </div>
    </div>
  );
}
