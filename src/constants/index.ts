import {
  FirebaseConfigTypes,
  RequestEndPointsTypes,
  TmdbConfigTypes,
} from "@src/types/constant";

export const TMDB_CONFIGS: TmdbConfigTypes = {
  apiKey: import.meta.env.VITE_APP_TMDB_API_KEY,
  apiToken: import.meta.env.VITE_APP_TMDB_API_TOKEN,
  baseUrl: "https://api.themoviedb.org/3",
  imageUrl: "https://image.tmdb.org/t/p/original/",
};

export const FIREBASE_CONFIGS: FirebaseConfigTypes = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

export const RequestEndPoints: RequestEndPointsTypes = {
  discover: "/discover/movie?include_video=true",
  search: "/search/movie",
  movieDetails: "/movie",
  trailer: "/movie/<Movie_ID>/videos",
  nowPalying: "/movie/now_playing",
  topRated:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc",
  popular:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc",
};

// type EndPoint = "discover" | "search" | "trailer";

// export const requestEndPointsGenerator = (
//   endPoint: EndPoint,
//   movieId?: number
// ) => {
//   return requestEndPoints[endPoint].replace("<Movie_ID>", String(movieId));
// };
