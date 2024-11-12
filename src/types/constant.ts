export type TmdbConfigTypes = {
  apiKey: string;
  apiToken: string;
  baseUrl: string;
  imageUrl: string;
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
  similarMovies: (id: string) => string;
  movieTrailer: (id: string) => string;
  nowPalying: string;
  topRated: string;
  popular: string;
};
