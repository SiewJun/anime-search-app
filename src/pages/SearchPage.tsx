import { SearchBar } from "../components/SearchBar";
import SearchAnimeIcon from "../assets/search-anime.svg";
import { useState, useEffect, useRef } from "react";
import { 
  useAppDispatch, 
  useAppSelector,
  searchAnime, 
  setSearchQuery, 
  setCurrentPage, 
  clearAnimeList 
} from "../store";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Star } from "lucide-react";
import { Pagination } from "../components/ui/pagination";

export function SearchPage() {
  const dispatch = useAppDispatch();
  const { animeList, loading, error, currentPage, searchQuery, totalItems } = useAppSelector(
    (state) => state.anime
  );
  
  const [inputValue, setInputValue] = useState(searchQuery);
  const [hasSearched, setHasSearched] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showCenteredLayout = !loading && animeList.length === 0;

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => clearTimeout(focusTimer);
  }, [showCenteredLayout]);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const debounceTimer = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
      
      if (inputValue.trim()) {
        setHasSearched(true);
        dispatch(searchAnime({ 
          q: inputValue, 
          page: 1, 
          limit: 20 
        }));
      } else {
        setHasSearched(false);
        dispatch(clearAnimeList());
      }
    }, 250);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputValue, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    
    dispatch(setCurrentPage(newPage));
    dispatch(searchAnime({ 
      q: searchQuery, 
      page: newPage, 
      limit: 20
    }));
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnimeClick = (malId: number) => {
    console.log("Navigating to anime with MAL ID:", malId);
  };

  return (
    <div className="min-h-screen bg-background">
      {showCenteredLayout ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="w-full max-w-2xl flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4 mb-2">
              <img 
                src={SearchAnimeIcon} 
                className="w-24 h-24 opacity-90" 
                alt="Search Anime" 
              />
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Anime Search</span>
                </h1>
                <p className="text-muted-foreground text-base max-w-lg">
                  Discover your next favorite anime from thousands of titles
                </p>
              </div>
            </div>

            <div className="w-full mt-2">
              <SearchBar
                ref={inputRef}
                value={inputValue}
                onChange={setInputValue}
                placeholder="Search for Naruto, One Piece, etc."
              />
            </div>

            {error && (
              <Alert className="w-full bg-destructive/10 border-destructive text-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {hasSearched && !loading && animeList.length === 0 && inputValue.trim() && (
              <div className="text-center space-y-2 mt-4">
                <p className="text-lg font-semibold text-muted-foreground">
                  No Results Found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try searching for a different anime title
                </p>
              </div>
            )}

            {!inputValue.trim() && (
              <div className="text-center mt-6 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Try searching for popular anime like:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => setInputValue("Naruto")}
                  >
                    Naruto
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => setInputValue("One Piece")}
                  >
                    One Piece
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => setInputValue("Attack on Titan")}
                  >
                    Attack on Titan
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => setInputValue("Demon Slayer")}
                  >
                    Demon Slayer
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <header className="border-border border-b sticky top-0 z-10 bg-background">
            <div className="container mx-auto lg:p-2 p-4">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4">
                <img src={SearchAnimeIcon} className="w-16 h-16" alt="Search Anime" />
                <SearchBar
                  ref={inputRef}
                  value={inputValue}
                  onChange={setInputValue}
                  placeholder="Search for Naruto, One Piece, etc."
                />
              </div>
            </div>
          </header>

          <main className="container mx-auto p-4">
            {error && (
              <Alert className="mb-4 bg-destructive/10 border-destructive text-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Skeleton className="w-full h-[300px]" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && animeList.length > 0 && (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Found {totalItems.toLocaleString()} results for "{searchQuery}"
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {animeList.map((anime) => (
                    <Card 
                      key={anime.mal_id} 
                      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleAnimeClick(anime.mal_id)}
                    >
                      <div className="relative aspect-2/3 overflow-hidden">
                        <img
                          src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                          alt={anime.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {anime.score > 0 && (
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{anime.score}</span>
                          </div>
                        )}
                      </div>
                      
                      <CardHeader className="p-3">
                        <h3 className="font-semibold text-sm line-clamp-2 min-h-10">
                          {anime.title}
                        </h3>
                      </CardHeader>
                      
                      <CardContent className="p-3 pt-0">
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
                      
                      <CardFooter className="p-3 pt-0">
                        <Badge 
                          variant={anime.status === "Currently Airing" ? "default" : "secondary"}
                          className="text-xs w-full justify-center"
                        >
                          {anime.status}
                        </Badge>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 mb-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalItems > 0 ? Math.ceil(totalItems / 20) : 1}
                    onPageChange={handlePageChange}
                    disabled={loading}
                    siblingCount={1}
                    boundaryCount={1}
                  />
                </div>
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}
