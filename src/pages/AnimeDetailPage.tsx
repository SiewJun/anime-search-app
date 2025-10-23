import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  fetchAnimeById,
  clearSelectedAnime,
} from "../store";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Star,
  ArrowLeft,
  Calendar,
  Tv,
  Users,
  Heart,
  Clock,
  Play,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { AnimeRecommendations } from "../components/AnimeRecommendations";

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAnime, loading, error } = useAppSelector(
    (state) => state.anime
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeById(Number(id)));
    }

    return () => {
      dispatch(clearSelectedAnime());
    };
  }, [id, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background">
          <div className="container mx-auto p-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Skeleton className="w-full aspect-2/3" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background">
          <div className="container mx-auto p-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <Alert className="bg-destructive/10 border-destructive text-destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  if (!selectedAnime) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto p-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <img
                src={
                  selectedAnime.images.jpg.large_image_url ||
                  selectedAnime.images.jpg.image_url
                }
                alt={selectedAnime.title}
                className="w-full h-auto object-cover"
              />
              <CardContent className="p-4 space-y-4">
                {selectedAnime.score > 0 && (
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-2xl">
                        {selectedAnime.score}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedAnime.scored_by?.toLocaleString()} users
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Tv className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{selectedAnime.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Play className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Episodes:</span>
                    <span className="font-medium">
                      {selectedAnime.episodes || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">
                      {selectedAnime.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Members:</span>
                    <span className="font-medium">
                      {selectedAnime.members?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Favorites:</span>
                    <span className="font-medium">
                      {selectedAnime.favorites?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Aired:</span>
                    <span className="font-medium text-xs">
                      {selectedAnime.aired.prop.string}
                    </span>
                  </div>
                </div>

                <div>
                  <Badge
                    variant={
                      selectedAnime.status === "Currently Airing"
                        ? "default"
                        : "secondary"
                    }
                    className="w-full justify-center"
                  >
                    {selectedAnime.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{selectedAnime.title}</h1>
              {selectedAnime.title_english &&
                selectedAnime.title_english !== selectedAnime.title && (
                  <p className="text-xl text-muted-foreground mb-2">
                    {selectedAnime.title_english}
                  </p>
                )}
              {selectedAnime.title_japanese && (
                <p className="text-lg text-muted-foreground mb-4">
                  {selectedAnime.title_japanese}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedAnime.year && (
                  <Badge variant="outline">{selectedAnime.year}</Badge>
                )}
                {selectedAnime.season && (
                  <Badge variant="outline" className="capitalize">
                    {selectedAnime.season}
                  </Badge>
                )}
                {selectedAnime.rating && (
                  <Badge variant="secondary">{selectedAnime.rating}</Badge>
                )}
                <Badge>Rank #{selectedAnime.rank}</Badge>
                <Badge variant="secondary">
                  Popularity #{selectedAnime.popularity}
                </Badge>
              </div>
            </div>

            {selectedAnime.trailer?.youtube_id && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Trailer</h2>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedAnime.trailer.embed_url}
                      title="Anime Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedAnime.synopsis && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Synopsis</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedAnime.synopsis}
                  </p>
                </CardContent>
              </Card>
            )}

            {selectedAnime.background && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Background</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedAnime.background}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Categories</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedAnime.genres.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.genres.map((genre) => (
                        <Badge key={genre.mal_id} variant="default">
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedAnime.themes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Themes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.themes.map((theme) => (
                        <Badge key={theme.mal_id} variant="secondary">
                          {theme.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedAnime.demographics.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Demographics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.demographics.map((demo) => (
                        <Badge key={demo.mal_id} variant="outline">
                          {demo.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Production</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedAnime.studios.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Studios
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.studios.map((studio) => (
                        <Badge key={studio.mal_id} variant="default">
                          {studio.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedAnime.producers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Producers
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.producers.map((producer) => (
                        <Badge key={producer.mal_id} variant="secondary">
                          {producer.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedAnime.licensors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Licensors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.licensors.map((licensor) => (
                        <Badge key={licensor.mal_id} variant="outline">
                          {licensor.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedAnime.streaming && selectedAnime.streaming.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Watch On</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {selectedAnime.streaming.map((platform, index) => (
                      <a
                        key={index}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Badge
                          variant="default"
                          className="cursor-pointer hover:bg-primary/80 transition-colors"
                        >
                          {platform.name} →
                        </Badge>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedAnime.external && selectedAnime.external.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold">External Links</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {selectedAnime.external.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-secondary transition-colors"
                        >
                          {link.name} →
                        </Badge>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedAnime.theme &&
              (selectedAnime.theme.openings?.length > 0 ||
                selectedAnime.theme.endings?.length > 0) && (
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-semibold">Theme Songs</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedAnime.theme.openings &&
                      selectedAnime.theme.openings.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                            Opening Themes
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {selectedAnime.theme.openings.map(
                              (opening, index) => (
                                <li key={index}>{opening}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    {selectedAnime.theme.endings &&
                      selectedAnime.theme.endings.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                            Ending Themes
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {selectedAnime.theme.endings.map(
                              (ending, index) => (
                                <li key={index}>{ending}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </main>

      <AnimeRecommendations animeId={selectedAnime.mal_id} />
    </div>
  );
}
