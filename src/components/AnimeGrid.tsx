import { AnimeCard } from "./AnimeCard";
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
    <Card className="overflow-hidden animate-pulse">
      <div className="relative aspect-square sm:aspect-2/3 overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-muted-foreground/10 to-transparent" />
      </div>
      <CardHeader className="px-3">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse mt-1 w-3/4" />
      </CardHeader>
      <CardContent className="px-3">
        <div className="flex gap-2 mb-2">
          <div className="h-5 w-12 bg-muted rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
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
