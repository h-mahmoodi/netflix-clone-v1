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
  search: string;
  movieDetails: string;
  recommendedMovies: (id: string, page: number) => string;
  similarMovies: (id: string, page: number) => string;
  movieTrailer: (id: string) => string;
  nowPalying: string;
  topRated: string;
  popular: string;
};
