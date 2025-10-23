import { Input } from "./ui/input";
import { Search, X } from "lucide-react";
import { forwardRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder }, ref) => {
    return (
      <div className="relative w-full max-w-3xl group">
        <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-200 z-5" />
          <Input
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
            className="pl-12 pr-12 h-12 font-medium border-2 rounded-lg shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-300 bg-background/80 backdrop-blur-sm border-border/50 hover:border-primary/50 focus:border-primary group-hover:scale-[1.02] transform"
          />
          {value && (
            <X
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-destructive transition-all duration-200 hover:scale-110"
              onClick={() => onChange("")}
            />
          )}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";
