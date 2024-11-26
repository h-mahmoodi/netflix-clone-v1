import SelectInput from "@src/components/ui/select-input";
import useGetGenres from "@src/hooks/useGetGenres";
import { SelectInputOption } from "@src/types/general";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

type ExplorePageSelectGenreProps = {
  selectedOptions: SelectInputOption[];
  setSelectedOptions: Dispatch<SetStateAction<SelectInputOption[]>>;
};

const ExplorePageSelectGenre = ({
  selectedOptions,
  setSelectedOptions,
}: ExplorePageSelectGenreProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = useState<SelectInputOption[]>([]);

  const { data, isFetching, error } = useGetGenres();

  const initialSearchOptionParams: SelectInputOption[] = useMemo(() => {
    return (searchParams
      .get("filterByGenres")
      ?.split(",")
      .map((id) => options.find((opt) => opt.value === id))
      .filter(Boolean) || []) as SelectInputOption[];
  }, [options, searchParams]);

  console.log(initialSearchOptionParams);

  useEffect(() => {
    setSelectedOptions(initialSearchOptionParams);
  }, [initialSearchOptionParams]);

  //   console.log(searchParams);

  const onChangeHandler = useCallback(
    (option: SelectInputOption[]) => {
      if (option.length !== 0) {
        setSearchParams((prev) => ({
          ...Object.fromEntries(prev.entries()),
          filterByGenres: option.map((item) => item.value).join(","),
        }));
      } else {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete("filterByGenres");
          return newParams;
        });
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (data?.genres) {
      const formattedOptions = data.genres.map((genre) => ({
        label: genre.name,
        value: `${genre.id}`,
      }));
      setOptions(formattedOptions);
    }
  }, [data]);

  //   useEffect(() => {
  //     if (selectedOptions.length > 0) {
  //       setSearchParams((prev) => {
  //         const newParams = new URLSearchParams(prev);
  //         newParams.set(
  //           "filter_by_genres",
  //           selectedOptions.map((opt) => opt.value).join(",")
  //         );
  //         return newParams;
  //       });
  //     } else {
  //       setSearchParams((prev) => {
  //         const newParams = new URLSearchParams(prev);
  //         newParams.delete("filter_by_genres");
  //         return newParams;
  //       });
  //     }
  //   }, [selectedOptions, setSearchParams]);

  //   useEffect(() => {
  //     const filterByGenres = searchParams.get("filter_by_genres");
  //     if (filterByGenres) {
  //       const genresIdList = filterByGenres.split(",");
  //       const genresList = genresIdList
  //         .map((id) => options.find((genre) => genre.value === id))
  //         .filter(Boolean);

  //       setSelectedOptions(genresList as SelectInputOption[]);
  //     }
  //   }, [searchParams, options]);

  if (error) {
    return <p>Error Loading ExplorePage Select Genre</p>;
  }
  return (
    <SelectInput
      placeholder="Filter By Genres"
      options={options}
      value={selectedOptions}
      onChange={onChangeHandler}
      isLoading={isFetching}
    />
  );
};
export default ExplorePageSelectGenre;
