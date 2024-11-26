import { fetchGenres } from "@src/fetchers";
import { GenreResponseData } from "@src/types/genre";
import { useQuery } from "@tanstack/react-query";

const useGetGenres = () => {
  const { data, isFetching, error } = useQuery<GenreResponseData, Error>({
    queryKey: ["GetGenres"],
    queryFn: fetchGenres,
  });
  return { data, isFetching, error };
};
export default useGetGenres;
