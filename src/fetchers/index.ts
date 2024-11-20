import { appAxios } from "@src/configs/axios";
import { RequestEndPoints } from "@src/constants";

const {
  discover,
  movieDetails,
  recommendedMovies,
  similarMovies,
  movieTrailer,
  nowPlaying,
  topRated,
  popular,
  upComing,
  search,
  discoverMovies,
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

export const fetchNowPlayingMovies = async (page = 1) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(nowPlaying(page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopRatedMovies = async (page = 1) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(topRated(page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopularMovies = async (page = 1) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(popular(page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpComingMovies = async (page = 1) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(upComing(page));
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

export const fetchDiscoverMovies = async (page = 1) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await appAxios(discoverMovies(page));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
