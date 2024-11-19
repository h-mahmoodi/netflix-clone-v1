export type TmdbConfigTypes = {
  apiKey: string;
  apiToken: string;
  baseUrl: string;
  imageUrl: string;
  imageUrl_w150: string;
  imageUrl_w300: string;
  imageUrl_w500: string;
  imageUrl_w1300: string;
};

export type FirebaseConfigTypes = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

export type RequestEndPointsTypes = {
  discover: string;
  search: (query?: string, page?: number) => string;
  movieDetails: string;
  recommendedMovies: (id: string, page?: number) => string;
  similarMovies: (id?: string, page?: number) => string;
  movieTrailer: (id: string) => string;
  nowPlaying: (page?: number) => string;
  topRated: (page?: number) => string;
  popular: (page?: number) => string;
  upComing: (page?: number) => string;
};
