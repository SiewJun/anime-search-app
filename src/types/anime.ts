export interface AnimeImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeImages {
  jpg: AnimeImage;
  webp: AnimeImage;
}

export interface AnimeTrailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

export interface AnimeTitle {
  type: string;
  title: string;
}

export interface AnimeAiredPropDate {
  day: number;
  month: number;
  year: number;
}

export interface AnimeAiredProp {
  from: AnimeAiredPropDate;
  to: AnimeAiredPropDate;
  string: string;
}

export interface AnimeAired {
  from: string;
  to: string;
  prop: AnimeAiredProp;
}

export interface AnimeBroadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface AnimeEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: AnimeTrailer;
  approved: boolean;
  titles: AnimeTitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: AnimeAired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: AnimeBroadcast;
  producers: AnimeEntity[];
  licensors: AnimeEntity[];
  studios: AnimeEntity[];
  genres: AnimeEntity[];
  explicit_genres: AnimeEntity[];
  themes: AnimeEntity[];
  demographics: AnimeEntity[];
}

export interface AnimePaginationItems {
  count: number;
  total: number;
  per_page: number;
}

export interface AnimePagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: AnimePaginationItems;
}

export interface AnimeSearchResponse {
  data: Anime[];
  pagination: AnimePagination;
}

export interface AnimeSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  rating?: string;
  order_by?: string;
  sort?: string;
}

export interface AnimeRelation {
  relation: string;
  entry: AnimeEntity[];
}

export interface AnimeTheme {
  openings: string[];
  endings: string[];
}

export interface AnimeExternal {
  name: string;
  url: string;
}

export interface AnimeStreaming {
  name: string;
  url: string;
}

export interface FullAnime extends Anime {
  relations: AnimeRelation[];
  theme: AnimeTheme;
  external: AnimeExternal[];
  streaming: AnimeStreaming[];
}

export interface FullAnimeResponse {
  data: FullAnime;
}

export interface AnimeState {
  animeList: Anime[];
  selectedAnime: FullAnime | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasNextPage: boolean;
  lastVisiblePage: number;
  totalItems: number;
  searchQuery: string;
  filters: {
    type: string;
    rating: string;
    orderBy: string;
    sort: string;
  };
}

export interface RecommendationImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface RecommendationImages {
  jpg: RecommendationImage;
  webp: RecommendationImage;
}

export interface RecommendationEntry {
  mal_id: number;
  url: string;
  images: RecommendationImages;
  title: string;
}

export interface AnimeRecommendation {
  entry: RecommendationEntry;
}

export interface AnimeRecommendationsResponse {
  data: AnimeRecommendation[];
}