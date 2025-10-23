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

export interface FilterValues {
  type: string;
  rating: string;
  orderBy: string;
  sort: string;
}

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
      <div className="flex items-center gap-2 mb-3">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-accent p-2 -ml-2"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Filters
            </span>
            {isVisible ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
        {hasActiveFilters && onReset && isVisible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="ml-auto text-xs text-primary hover:underline"
          >
            Reset
          </Button>
        )}
      </div>

      <CollapsibleContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Type
          </label>
          <Select
            value={filters.type}
            onValueChange={(value) => onFilterChange("type", value)}
          >
            <SelectTrigger className="w-full">
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

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Rating
          </label>
          <Select
            value={filters.rating}
            onValueChange={(value) => onFilterChange("rating", value)}
          >
            <SelectTrigger className="w-full">
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

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Order By
          </label>
          <Select
            value={filters.orderBy}
            onValueChange={(value) => onFilterChange("orderBy", value)}
          >
            <SelectTrigger className="w-full">
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

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Sort
          </label>
          <Select
            value={filters.sort}
            onValueChange={(value) => onFilterChange("sort", value)}
          >
            <SelectTrigger className="w-full">
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
