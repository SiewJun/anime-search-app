import { SearchBar } from "../components/SearchBar";
import SearchAnimeIcon from "../assets/search-anime.svg";
import { useState } from "react";
export function SearchPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-border border-b sticky top-0 z-10">
        <div className="container mx-auto lg:p-2 p-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4">
            <img src={SearchAnimeIcon} className="w-16 h-16"/>
            <SearchBar
              value={inputValue}
              onChange={setInputValue}
              placeholder="Search for Naruto, One Piece, etc."
            />
          </div>
        </div>
      </header>
    </div>
  );
}
