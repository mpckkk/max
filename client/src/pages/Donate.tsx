import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Check } from "lucide-react";
import donateImage from "@assets/stock_images/adorable_shiba_inu_d_30bf54df.jpg";

// Stripe integration - reference from blueprint:javascript_stripe
// Provide a safe dev fallback publishable key so the UI renders locally
const publishableStripeKey =
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
  (import.meta.env.MODE !== "production" ? "pk_test_FAKE_FOR_DEV_ONLY" : undefined);
const stripePromise = publishableStripeKey ? loadStripe(publishableStripeKey) : null;

const presetAmounts = [
  { amount: 5, label: "$5" },
  { amount: 10, label: "$10" },
  { amount: 25, label: "$25" },
  { amount: 50, label: "$50" },
];

function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();

  const finalAmount = selectedAmount || parseFloat(customAmount) || 0;

  const handleCreatePayment = async () => {
    if (!stripePromise) {
      toast({
        title: "Payment Not Available",
        description: "Donation functionality is currently not configured. Please check back later.",
        variant: "destructive",
      });
      return;
    }

    if (finalAmount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount of at least $1",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { amount: finalAmount });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create payment",
        variant: "destructive",
      });
    }
  };

  if (paymentSuccess) {
    return (
      <Card className="p-8 md:p-12 text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-3">
          <h2 className="font-serif text-3xl font-semibold">Thank You!</h2>
          <p className="text-lg text-muted-foreground">
            Your generous donation of ${finalAmount.toFixed(2)} helps keep Max happy and healthy.
          </p>
          <p className="text-base text-foreground">
            Max sends you a virtual tail wag and many happy woofs!
          </p>
        </div>
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-primary/20">
          <img
            src={donateImage}
            alt="Max says thank you!"
            className="w-full h-full object-cover"
          />
        </div>
        <Button
          onClick={() => {
            setPaymentSuccess(false);
            setClientSecret("");
            setSelectedAmount(null);
            setCustomAmount("");
          }}
          variant="outline"
          data-testid="button-make-another-donation"
        >
          Make Another Donation
        </Button>
      </Card>
    );
  }

  if (!clientSecret) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-accent/30">
              <img
                src={donateImage}
                alt="Support Max"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold">
              Support Max's Adventures
            </h2>
            <p className="text-muted-foreground">
              Your donation helps provide treats, toys, and essential vet care
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Select an amount</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {presetAmounts.map(({ amount, label }) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className="h-12"
                  data-testid={`button-amount-${amount}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="custom-amount" className="block text-sm font-medium mb-2">
              Or enter a custom amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="custom-amount"
                type="number"
                min="1"
                step="0.01"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full pl-8 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="25.00"
                data-testid="input-custom-amount"
              />
            </div>
          </div>

          <Button
            onClick={handleCreatePayment}
            disabled={finalAmount < 1}
            className="w-full"
            size="lg"
            data-testid="button-continue-payment"
          >
            <Heart className="mr-2 h-5 w-5" />
            Continue to Payment
          </Button>
        </Card>

        <Card className="p-6 bg-primary/5">
          <h3 className="font-semibold mb-3">How Your Donation Helps</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Premium dog food and healthy treats</li>
            <li>✓ Regular vet checkups and vaccinations</li>
            <li>✓ Fun toys to keep Max active and happy</li>
            <li>✓ Grooming and care essentials</li>
          </ul>
        </Card>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise!} options={{ clientSecret }}>
      <CheckoutForm
        amount={finalAmount}
        onSuccess={() => {
          setPaymentSuccess(true);
        }}
      />
    </Elements>
  );
}

function CheckoutForm({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin + "/donate?success=true" },
        redirect: "if_required",
      });

      if (error) {
        toast({ title: "Payment Failed", description: error.message, variant: "destructive" });
      } else {
        onSuccess();
        toast({ title: "Payment Successful!", description: "Thank you for supporting Max!" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-8 space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-semibold">Complete Your Donation</h2>
        <p className="text-lg font-medium text-primary">Amount: ${amount.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement />
        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full"
          size="lg"
          data-testid="button-submit-payment"
        >
          {isProcessing ? "Processing..." : `Donate $${amount.toFixed(2)}`}
        </Button>
      </form>

      <p className="text-xs text-center text-muted-foreground">Payments are securely processed by Stripe</p>
    </Card>
  );
}

export default function Donate() {
  // Check for success in URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      // Clear the URL param
      window.history.replaceState({}, "", "/donate");
    }
  }, []);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Support Max</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every contribution helps Max live his best life with treats, toys, and excellent care
          </p>
        </div>

        {stripePromise ? (
          <DonationForm />
        ) : (
          <Card className="p-8 md:p-12 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Donations Currently Unavailable</h2>
              <p className="text-muted-foreground">
                The donation system is not configured yet. Please check back later or contact the site administrator.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
