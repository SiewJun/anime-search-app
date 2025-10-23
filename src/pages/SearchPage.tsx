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
      {showCenteredLayout ? (
        <div className="flex flex-col items-center min-h-screen px-4 py-12">
          <div className="w-full max-w-2xl flex flex-col items-center gap-6">
            <SearchHeader />

            <div className="w-full mt-2">
              <SearchBar
                ref={inputRef}
                value={inputValue}
                onChange={setInputValue}
                placeholder="Search for Naruto, One Piece, etc."
              />
              {!inputValue.trim() && (
                <SearchSuggestions onSuggestionClick={setInputValue} />
              )}
            </div>

            <div className="w-full">
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>

            {error && (
              <Alert className="w-full bg-destructive/10 border-destructive text-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {hasSearched &&
              !loading &&
              animeList.length === 0 &&
              inputValue.trim() && (
                <EmptyState
                  title="No Results Found"
                  description="Try searching for a different anime title"
                />
              )}
          </div>
        </div>
      ) : (
        <>
          <header className="border-border border-b sticky top-0 z-10 bg-background">
            <div className="container mx-auto p-4">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4">
                <img
                  src={SearchAnimeIcon}
                  className="w-16 h-16"
                  alt="Search Anime"
                />
                <SearchBar
                  ref={inputRef}
                  value={inputValue}
                  onChange={setInputValue}
                  placeholder="Search for Naruto, One Piece, etc."
                />
              </div>
              <div className="mt-4">
                <FilterBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
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

            <div className="mt-6">
              <AnimeGrid
                animeList={animeList}
                loading={loading}
                onAnimeClick={handleAnimeClick}
              />
            </div>

            {!loading && animeList.length > 0 && (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Found {totalItems.toLocaleString()} results for "{searchQuery}
                  "
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
