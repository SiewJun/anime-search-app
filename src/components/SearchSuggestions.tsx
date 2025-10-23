import { Badge } from "./ui/badge";

interface SearchSuggestionsProps {
  suggestions?: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const DEFAULT_SUGGESTIONS = [
  "Naruto",
  "One Piece",
  "Attack on Titan",
  "Demon Slayer",
];

export function SearchSuggestions({
  suggestions = DEFAULT_SUGGESTIONS,
  onSuggestionClick,
}: SearchSuggestionsProps) {
  return (
    <div className="text-center mt-6 space-y-3">
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((suggestion) => (
          <Badge
            key={suggestion}
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 transition-colors"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  );
}
