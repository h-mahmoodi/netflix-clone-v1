import { TMDB_CONFIGS } from "@src/constants";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${TMDB_CONFIGS.apiToken}`,
  accept: `application/json`,
};

export const appAxios = axios.create({
  baseURL: TMDB_CONFIGS.baseUrl,
  headers: headers,
});
