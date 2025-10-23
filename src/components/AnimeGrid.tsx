import { AnimeCard } from "./AnimeCard";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";
import type { Anime } from "../types/anime";

interface AnimeGridProps {
  animeList: Anime[];
  loading?: boolean;
  onAnimeClick?: (malId: number) => void;
  skeletonCount?: number;
}

function AnimeCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square sm:aspect-2/3 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  );
}

export function AnimeGrid({
  animeList,
  loading = false,
  onAnimeClick,
  skeletonCount = 10,
}: AnimeGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <AnimeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} onClick={onAnimeClick} />
      ))}
    </div>
  );
}
