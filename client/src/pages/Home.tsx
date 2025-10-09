import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Camera, Heart, Smile } from "lucide-react";
import heroImage from "@assets/stock_images/adorable_shiba_inu_d_f58c76b3.jpg";
import photo1 from "@assets/stock_images/adorable_shiba_inu_d_0a7737de.jpg";
import photo2 from "@assets/stock_images/adorable_shiba_inu_d_127300b3.jpg";
import photo3 from "@assets/stock_images/adorable_shiba_inu_d_608d0ad2.jpg";
import { resolveDonateUrl } from "@/lib/donate";

export default function Home() {
  const highlights = [
    {
      icon: Camera,
      title: "Daily Adventures",
      description: "Follow Max's journey through parks, naps, and endless fun",
    },
    {
      icon: Smile,
      title: "9 Years Young",
      description: "Celebrating nearly a decade of joy, fluff, and Shiba sass",
    },
    {
      icon: Heart,
      title: "Support Max",
      description: "Help fund treats, toys, and vet care for this good boy",
    },
  ];

  const donateUrl = resolveDonateUrl();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={heroImage}
          alt="Max the Shiba Inu enjoying a sunny day outdoors"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl space-y-6">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm border-card-border px-4 py-2 text-sm" data-testid="badge-age">
              9 Years Old
            </Badge>
            <h1 className="font-serif text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
              Max
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-medium drop-shadow-md">
              9 years of joy and fluff
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/gallery">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-card/80 backdrop-blur-sm border-card-border hover:bg-card/90 text-base"
                  data-testid="button-see-adventures"
                >
                  See My Adventures
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button asChild size="lg" className="text-base" data-testid="button-support-max">
                {donateUrl ? (
                  <a href={donateUrl} target="_blank" rel="noopener noreferrer">
                    <Heart className="mr-2 h-5 w-5" />
                    Support Max
                  </a>
                ) : (
                  <Link href="/donate">
                    <Heart className="mr-2 h-5 w-5" />
                    Support Max
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 hover-elevate transition-all"
                data-testid={`card-feature-${index}`}
              >
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Photos Preview */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Latest Moments
            </h2>
            <p className="text-lg text-muted-foreground">
              A glimpse into Max's daily adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { src: photo1, caption: "Exploring the neighborhood", category: "Adventures" },
              { src: photo2, caption: "Afternoon relaxation", category: "Naps" },
              { src: photo3, caption: "Ready for playtime", category: "Play" },
            ].map((photo, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-elevate transition-all group"
                data-testid={`card-photo-preview-${index}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2" data-testid={`badge-category-${index}`}>
                    {photo.category}
                  </Badge>
                  <p className="text-base font-medium">{photo.caption}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button size="lg" variant="outline" data-testid="button-view-all-photos">
                View All Photos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-primary/10">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Help Support Max's Adventures
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Your generous donations help provide Max with treats, toys, and essential vet care. 
            Every contribution makes a difference in keeping this good boy happy and healthy!
          </p>
          <Button asChild size="lg" className="text-base" data-testid="button-donate-cta">
            {donateUrl ? (
              <a href={donateUrl} target="_blank" rel="noopener noreferrer">
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation
              </a>
            ) : (
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation
              </Link>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}
