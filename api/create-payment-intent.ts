import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!stripe) {
    res.status(503).json({ message: "Donation functionality is not configured. Please contact the administrator to set up payment processing." });
    return;
  }

  const { amount } = req.body || {};
  if (!amount || amount < 1) {
    res.status(400).json({ message: "Invalid amount" });
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { purpose: "Max the Shiba Inu donation" },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating payment intent: " + error.message });
  }
}
