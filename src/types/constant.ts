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
  movieDetails: string;
  search: string;
  trailer: string;
  nowPalying: string;
  topRated: string;
  popular: string;
};
