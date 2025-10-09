import { Card } from "@/components/ui/card";
import { Heart, Utensils, Laugh, Moon } from "lucide-react";
import aboutImage from "@assets/stock_images/adorable_shiba_inu_d_339e76b0.jpg";

export default function About() {
  const funFacts = [
    {
      icon: Heart,
      title: "Favorite Activity",
      description: "Belly rubs and long walks in the park",
    },
    {
      icon: Utensils,
      title: "Favorite Treat",
      description: "Sweet potato chews and the occasional pup cup",
    },
    {
      icon: Laugh,
      title: "Personality",
      description: "Playful, loyal, and full of Shiba sass",
    },
    {
      icon: Moon,
      title: "Nap Schedule",
      description: "Professional napper - 16 hours a day minimum",
    },
  ];

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Meet Max
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most lovable 9-year-old Shiba Inu you'll ever meet
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Photo */}
          <div className="relative">
            <Card className="overflow-hidden">
              <img
                src={aboutImage}
                alt="Max the Shiba Inu portrait"
                className="w-full h-full object-cover aspect-square"
              />
            </Card>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                About Max
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-foreground">
                <p>
                  Max is a spirited 9-year-old Shiba Inu who has been bringing joy and laughter 
                  to his family since he was just a tiny pup. With his signature curly tail 
                  and expressive face, he's mastered the art of getting exactly what he wants.
                </p>
                <p>
                  Whether he's exploring new trails, playing with his favorite squeaky toys, 
                  or simply lounging in a sunny spot, Max approaches every day with enthusiasm 
                  and that classic Shiba independence.
                </p>
                <p className="text-muted-foreground">
                  Born in 2016, Max has spent his years perfecting the "Shiba scream," 
                  mastering the art of selective hearing, and becoming an expert at finding 
                  the coziest napping spots in the house.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts Grid */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">
            Fun Facts About Max
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {funFacts.map((fact, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 hover-elevate transition-all"
                data-testid={`card-fact-${index}`}
              >
                <fact.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">{fact.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{fact.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <Card className="mt-16 p-8 md:p-12 bg-primary/5">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold">
              Why This Website Exists
            </h3>
            <p className="text-base leading-relaxed text-foreground">
              This website is a celebration of Max's life and a way to share his adorable 
              moments with friends, family, and fellow Shiba Inu lovers. Your donations help 
              support Max's ongoing care, including vet visits, quality food, treats, and toys 
              that keep him happy and healthy.
            </p>
            <p className="text-sm text-muted-foreground">
              Every contribution, no matter how small, helps ensure Max continues to live 
              his best life for many more years to come. Thank you for being part of Max's journey!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
