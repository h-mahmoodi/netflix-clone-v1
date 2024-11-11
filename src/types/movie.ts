type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title?: string;
  tagline?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string;
  vote_average?: number;
  poster_path?: string;
  release_date?: string;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  genres?: Genre[];
};

export type MovieTrailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
