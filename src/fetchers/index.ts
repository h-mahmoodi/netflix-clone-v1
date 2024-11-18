import { appAxios } from "@src/configs/axios";
import { RequestEndPoints } from "@src/constants";

const {
  discover,
  movieDetails,
  recommendedMovies,
  similarMovies,
  movieTrailer,
  nowPalying,
  topRated,
  popular,
  search,
} = RequestEndPoints;

export const fetchMovies = async (searchQuery = "") => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const url = searchQuery ? `${discover}?${searchQuery}` : discover;
    console.log(url);
    const response = await appAxios(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSliderMovies = async () => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(discover);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(nowPalying);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(topRated);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopularMovies = async () => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(popular);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchedMovies = async (query: string, page = 1) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await appAxios(search(query, page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetails = async (id: string) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(`${movieDetails}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecommendedMovies = async (id: string, page = 1) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(recommendedMovies(id, page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchSimilarMovies = async (id: string, page = 1) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await appAxios(similarMovies(id, page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieTrailers = async (id: string) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(movieTrailer(id));
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
