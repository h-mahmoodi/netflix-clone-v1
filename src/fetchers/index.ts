import { appAxios } from "@src/configs/axios";
import { RequestEndPoints } from "@src/constants";

const { discover, nowPalying, topRated, popular } = RequestEndPoints;

export const fetchSliderMovies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await appAxios(discover);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await appAxios(nowPalying);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await appAxios(topRated);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopularMovies = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await appAxios(popular);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = async (endPoint: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await appAxios(endPoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
