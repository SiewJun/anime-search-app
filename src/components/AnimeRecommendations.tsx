import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription } from "./ui/alert";
import { EmptyState } from "./EmptyState";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecommendations, clearRecommendations } from "../store/slices/animeSlice";

interface AnimeRecommendationsProps {
  animeId: number;
}

export function AnimeRecommendations({ animeId }: AnimeRecommendationsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { recommendations, recommendationsLoading, recommendationsError } =
    useAppSelector((state) => state.anime);

  useEffect(() => {
    if (animeId) {
      dispatch(fetchRecommendations(animeId));
    }

    return () => {
      dispatch(clearRecommendations());
    };
  }, [animeId, dispatch]);

  const handleRecommendationClick = (malId: number) => {
    navigate(`/anime/${malId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (recommendationsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="md:text-2xl text-xl font-bold mb-6">Recommendations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, index) => (
            <Skeleton key={index} className="aspect-3/4 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (recommendationsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="md:text-2xl text-xl font-bold mb-6">Recommendations</h2>
        <Alert className="bg-destructive/10 border-destructive text-destructive">
          <AlertDescription>{recommendationsError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="md:text-2xl text-xl font-bold mb-6">Recommendations</h2>
        <EmptyState
          title="No Recommendations"
          description="No recommendations available for this anime."
        />
      </div>
    );
  }

  return (
    <div className="py-12 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="md:text-2xl text-xl font-bold mb-6">Recommendations</h2>
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
                <div className="absolute inset-0" />
              </div>
              <h3 className="mt-2 text-sm font-medium line-clamp-2">
                {rec.entry.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
