import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import type { Anime } from "../types/anime";

interface AnimeCardProps {
  anime: Anime;
  onClick?: (malId: number) => void;
}

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(anime.mal_id)}
    >
      <div className="relative aspect-square sm:aspect-2/3 overflow-hidden">
        <img
          src={
            anime.images.jpg.large_image_url || anime.images.jpg.image_url
          }
          alt={anime.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {anime.score > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{anime.score}</span>
          </div>
        )}
      </div>

      <CardHeader className="px-3">
        <h3 className="font-semibold text-sm line-clamp-2 min-h-8 sm:min-h-10">
          {anime.title}
        </h3>
      </CardHeader>

      <CardContent className="px-3">
        <div className="flex flex-wrap gap-1 mb-2">
          {anime.type && (
            <Badge variant="secondary" className="text-xs">
              {anime.type}
            </Badge>
          )}
          {anime.year && (
            <Badge variant="outline" className="text-xs">
              {anime.year}
            </Badge>
          )}
        </div>
        {anime.episodes && (
          <p className="text-xs text-muted-foreground">
            {anime.episodes} episodes
          </p>
        )}
      </CardContent>
    </Card>
  );
}
