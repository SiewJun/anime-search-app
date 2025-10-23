import SearchAnimeIcon from "../assets/search-anime.svg";

interface SearchHeaderProps {
  title?: string;
  description?: string;
}

export function SearchHeader({
  title = "Anime Search",
  description = "Discover your next favorite anime from thousands of titles",
}: SearchHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-2">
      <img
        src={SearchAnimeIcon}
        className="w-24 h-24 opacity-90"
        alt="Search Anime"
      />
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="text-muted-foreground text-base max-w-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
