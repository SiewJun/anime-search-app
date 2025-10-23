import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder }, ref) => {
    return (
      <div className="relative w-full max-w-3xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          className="pl-10 h-10 font-medium border-2 rounded-lg placeholder:text-muted"
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";
