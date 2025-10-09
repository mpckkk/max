import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Photo } from "@shared/schema";
import { format } from "date-fns";

const categories = ["All", "Play", "Naps", "Adventures", "Meals", "Silly"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: photos, isLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos?.filter((photo) => photo.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Max's Gallery
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore moments from Max's daily adventures
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              data-testid={`button-filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredPhotos && filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPhotos.map((photo) => (
              <Card
                key={photo.id}
                className="overflow-hidden hover-elevate transition-all group"
                data-testid={`card-photo-${photo.id}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <Badge variant="secondary" data-testid={`badge-category-${photo.id}`}>
                    {photo.category}
                  </Badge>
                  <p className="text-base font-medium leading-relaxed">{photo.caption}</p>
                  <p className="text-sm text-muted-foreground" data-testid={`text-date-${photo.id}`}>
                    {format(new Date(photo.date), "MMMM d, yyyy")}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No photos found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
