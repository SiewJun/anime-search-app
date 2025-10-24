import { useState, useEffect } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import type { FilterValues } from "../types/anime";

interface FilterBarProps {
  filters: FilterValues;
  onFilterChange: (filterName: keyof FilterValues, value: string) => void;
  onReset?: () => void;
}

const FILTER_VISIBILITY_KEY = "anime-search-filter-visibility";

export function FilterBar({
  filters,
  onFilterChange,
  onReset,
}: FilterBarProps) {
  const [isVisible, setIsVisible] = useState(() => {
    const saved = localStorage.getItem(FILTER_VISIBILITY_KEY);
    return saved === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem(FILTER_VISIBILITY_KEY, String(isVisible));
  }, [isVisible]);

  const hasActiveFilters =
    filters.type !== "all" ||
    filters.rating !== "all" ||
    filters.orderBy !== "mal_id" ||
    filters.sort !== "asc";

  return (
    <Collapsible open={isVisible} onOpenChange={setIsVisible} className="w-full">
      <div className="flex items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-accent p-2 -ml-2 rounded-lg transition-all duration-200 hover:scale-105 group"
          >
            <Filter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              Filters
            </span>
            {hasActiveFilters && (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
            {isVisible ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200" />
            )}
          </Button>
        </CollapsibleTrigger>
        {hasActiveFilters && onReset && isVisible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="ml-auto text-xs text-primary hover:underline hover:text-primary/80 transition-colors duration-200 hover:scale-105"
          >
            Reset
          </Button>
        )}
      </div>

      <CollapsibleContent className="animate-in slide-in-from-top-2 duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <span>Type</span>
            {filters.type !== "all" && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
          </label>
          <Select
            value={filters.type}
            onValueChange={(value) => onFilterChange("type", value)}
          >
            <SelectTrigger className="w-full hover:border-primary/50 transition-colors duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tv">TV</SelectItem>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="ova">OVA</SelectItem>
              <SelectItem value="special">Special</SelectItem>
              <SelectItem value="ona">ONA</SelectItem>
              <SelectItem value="music">Music</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <span>Rating</span>
            {filters.rating !== "all" && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
          </label>
          <Select
            value={filters.rating}
            onValueChange={(value) => onFilterChange("rating", value)}
          >
            <SelectTrigger className="w-full hover:border-primary/50 transition-colors duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="g">G - All Ages</SelectItem>
              <SelectItem value="pg">PG - Children</SelectItem>
              <SelectItem value="pg13">PG-13 - Teens 13+</SelectItem>
              <SelectItem value="r17">
                R - 17+ (violence & profanity)
              </SelectItem>
              <SelectItem value="r">R+ - Mild Nudity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <span>Order By</span>
            {filters.orderBy !== "mal_id" && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
          </label>
          <Select
            value={filters.orderBy}
            onValueChange={(value) => onFilterChange("orderBy", value)}
          >
            <SelectTrigger className="w-full hover:border-primary/50 transition-colors duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mal_id">ID</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="start_date">Start Date</SelectItem>
              <SelectItem value="end_date">End Date</SelectItem>
              <SelectItem value="episodes">Episodes</SelectItem>
              <SelectItem value="score">Score</SelectItem>
              <SelectItem value="scored_by">Scored By</SelectItem>
              <SelectItem value="rank">Rank</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="members">Members</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <span>Sort</span>
            {filters.sort !== "asc" && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
          </label>
          <Select
            value={filters.sort}
            onValueChange={(value) => onFilterChange("sort", value)}
          >
            <SelectTrigger className="w-full hover:border-primary/50 transition-colors duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
