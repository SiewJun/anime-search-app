import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import type { FilterValues } from "../components/FilterBar";
import { SearchHeader } from "../components/SearchHeader";
import { SearchSuggestions } from "../components/SearchSuggestions";
import { AnimeGrid } from "../components/AnimeGrid";
import { EmptyState } from "../components/EmptyState";
import SearchAnimeIcon from "../assets/search-anime.svg";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  searchAnime,
  setSearchQuery,
  setCurrentPage,
  setFilter,
  resetFilters,
  clearAnimeList,
} from "../store";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Pagination } from "../components/ui/pagination";

export function SearchPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    animeList,
    loading,
    error,
    currentPage,
    searchQuery,
    totalItems,
    filters,
  } = useAppSelector((state) => state.anime);

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
        dispatch(
          searchAnime({
            q: inputValue,
            page: 1,
            limit: 20,
            type: filters.type,
            rating: filters.rating,
            order_by: filters.orderBy,
            sort: filters.sort,
          })
        );
      } else {
        setHasSearched(false);
        dispatch(clearAnimeList());
      }
    }, 250);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputValue, filters, dispatch]);

  const handleFilterChange = (
    filterName: keyof FilterValues,
    value: string
  ) => {
    dispatch(setFilter({ name: filterName, value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;

    dispatch(setCurrentPage(newPage));
    dispatch(
      searchAnime({
        q: searchQuery,
        page: newPage,
        limit: 20,
        type: filters.type,
        rating: filters.rating,
        order_by: filters.orderBy,
        sort: filters.sort,
      })
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnimeClick = (malId: number) => {
    navigate(`/anime/${malId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className={`transition-all duration-700 ease-in-out ${showCenteredLayout ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
        {showCenteredLayout && (
          <div className="flex flex-col items-center min-h-screen px-4 py-12">
            <div className="w-full max-w-2xl flex flex-col items-center gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <SearchHeader />

              <div className="w-full mt-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-100">
                <SearchBar
                  ref={inputRef}
                  value={inputValue}
                  onChange={setInputValue}
                  placeholder="Search for Naruto, One Piece, etc."
                />
                {!inputValue.trim() && (
                  <div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300 delay-200">
                    <SearchSuggestions onSuggestionClick={setInputValue} />
                  </div>
                )}
              </div>

              <div className="w-full animate-in fade-in-0 slide-in-from-bottom-1 duration-500 delay-300">
                <FilterBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>

              {error && (
                <div className="w-full animate-in fade-in-0 slide-in-from-bottom-1 duration-300 delay-400">
                  <Alert className="w-full bg-destructive/10 border-destructive text-destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </div>
              )}

              {hasSearched &&
                !loading &&
                animeList.length === 0 &&
                inputValue.trim() && (
                  <div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300 delay-500">
                    <EmptyState
                      title="No Results Found"
                      description="Try searching for a different anime title"
                    />
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

      <div className={`transition-all duration-700 ease-in-out ${!showCenteredLayout ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
        {!showCenteredLayout && (
          <>
            <header className="border-border border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
              <div className="container mx-auto p-4">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4">
                  <img
                    src={SearchAnimeIcon}
                    className="w-16 h-16 hover:scale-105 transition-transform duration-200"
                    alt="Search Anime"
                  />
                  <SearchBar
                    ref={inputRef}
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Search for Naruto, One Piece, etc."
                  />
                </div>
                <div className="mt-4 animate-in fade-in-0 slide-in-from-top-1 duration-300 delay-100">
                  <FilterBar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onReset={handleResetFilters}
                  />
                </div>
              </div>
            </header>

            <main className="container mx-auto p-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-200">
              {error && (
                <Alert className="mb-4 bg-destructive/10 border-destructive text-destructive animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="mt-6">
                {!loading && animeList.length > 0 && (
                  <>
                    <div className="mb-4 text-sm text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
                      Found {totalItems.toLocaleString()} results for "
                      <span className="font-medium text-foreground">{searchQuery}</span>"
                    </div>
                  </>
                )}
                <AnimeGrid
                  animeList={animeList}
                  loading={loading}
                  onAnimeClick={handleAnimeClick}
                />
              </div>

              {!loading && animeList.length > 0 && (
                <>
                  <div className="mt-8 mb-4 animate-in fade-in-0 slide-in-from-bottom-1 duration-300 delay-300">
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
    </div>
  );
}
