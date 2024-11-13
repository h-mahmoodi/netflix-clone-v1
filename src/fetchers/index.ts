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

export const fetchSliderMovies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(discover);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(nowPalying);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(topRated);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopularMovies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(popular);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = async (endPoint: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(endPoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchedMovies = async (title: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(`${search}?query=${title}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetails = async (id: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(`${movieDetails}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecommendedMovies = async (id: string, page = 1) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(recommendedMovies(id, page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchSimilarMovies = async (id: string, page = 1) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(similarMovies(id, page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieTrailers = async (id: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(movieTrailer(id));
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
