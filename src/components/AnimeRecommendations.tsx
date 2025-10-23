import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AnimeRecommendation } from "../types/anime";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription } from "./ui/alert";

interface AnimeRecommendationsProps {
  animeId: number;
}

export function AnimeRecommendations({ animeId }: AnimeRecommendationsProps) {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<AnimeRecommendation[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/recommendations`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        // Limit to first 12 recommendations
        setRecommendations(data.data.slice(0, 12));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load recommendations"
        );
      } finally {
        setLoading(false);
      }
    };

    if (animeId) {
      fetchRecommendations();
    }
  }, [animeId]);

  const handleRecommendationClick = (malId: number) => {
    navigate(`/anime/${malId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Recommendations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, index) => (
            <Skeleton key={index} className="aspect-3/4 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Recommendations</h2>
        <Alert className="bg-destructive/10 border-destructive text-destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/25 py-12 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Recommendations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.entry.mal_id}
              className="group cursor-pointer"
              onClick={() => handleRecommendationClick(rec.entry.mal_id)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-3/4 bg-secondary">
                <img
                  src={
                    rec.entry.images.jpg.large_image_url ||
                    rec.entry.images.jpg.image_url
                  }
                  alt={rec.entry.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {rec.entry.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
