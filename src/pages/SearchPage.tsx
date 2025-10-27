import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import type { FilterValues } from "../types/anime";
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
    if (!showCenteredLayout) {
      return;
    }

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => clearTimeout(focusTimer);
  }, [showCenteredLayout]);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

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
            signal: abortController.signal,
          })
        );
      } else {
        setHasSearched(false);
        dispatch(clearAnimeList());
      }
    }, 250);

    return () => {
      clearTimeout(debounceTimer);
      abortController.abort();
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

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

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
        signal: abortController.signal,
      })
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnimeClick = (malId: number) => {
    navigate(`/anime/${malId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header
        className={`transition-all duration-700 ease-in-out ${
          showCenteredLayout
            ? "flex flex-col items-center justify-center min-h-screen px-4 py-12"
            : "border-border border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm"
        }`}
      >
        <div
          className={
            showCenteredLayout
              ? "w-full max-w-2xl flex flex-col items-center gap-6"
              : "container mx-auto p-4 flex flex-col gap-4"
          }
        >
          <div
            className={
              showCenteredLayout
                ? "w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                : "hidden"
            }
          >
            <SearchHeader />
          </div>

          <div
            className={
              showCenteredLayout
                ? "w-full mt-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-100 flex flex-col items-center gap-4"
                : "flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4"
            }
          >
            <img
              src={SearchAnimeIcon}
              className={
                showCenteredLayout
                  ? "hidden"
                  : "w-16 h-16 hover:scale-105 transition-transform duration-200"
              }
              alt="Search Anime"
            />
            <div className={showCenteredLayout ? "w-full" : "w-full lg:max-w-3xl"}>
              <SearchBar
                ref={inputRef}
                value={inputValue}
                onChange={setInputValue}
                placeholder="Search for Naruto, One Piece, etc."
              />
              {showCenteredLayout && !inputValue.trim() && (
                <div className="mt-2 animate-in fade-in-0 slide-in-from-bottom-1 duration-300 delay-200">
                  <SearchSuggestions onSuggestionClick={setInputValue} />
                </div>
              )}
            </div>
          </div>

          <div
            className={`w-full ${
              showCenteredLayout
                ? "animate-in fade-in-0 slide-in-from-bottom-1 duration-500 delay-300"
                : "mt-4"
            }`}
          >
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {showCenteredLayout && error && (
            <div className="w-full animate-in fade-in-0 slide-in-from-bottom-1 duration-300 delay-400">
              <Alert className="w-full bg-destructive/10 border-destructive text-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {showCenteredLayout &&
            hasSearched &&
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
      </header>

      {!showCenteredLayout && (
        <main className="container mx-auto p-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-200">
          {error && (
            <Alert className="mb-4 bg-destructive/10 border-destructive text-destructive animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6">
            {!loading && animeList.length > 0 && (
              <div className="mb-4 text-sm text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
                Found {totalItems.toLocaleString()} results for "
                <span className="font-medium text-foreground">{searchQuery}</span>"
              </div>
            )}
            <AnimeGrid
              animeList={animeList}
              loading={loading}
              onAnimeClick={handleAnimeClick}
            />
          </div>

          {!loading && animeList.length > 0 && (
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
          )}
        </main>
      )}
    </div>
  );
}
