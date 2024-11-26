import MovieDisplayGrid from "@src/components/app/movie/display-grid";
import AppPageHeading from "@src/components/app/page-heading";
import { fetchDiscoverMovies } from "@src/fetchers";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import { Movie, SortOption } from "@src/types/movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import ExplorePageSelectGenre from "./components/select-genre";
import { SelectInputOption } from "@src/types/general";

const sortOptions: SortOption[] = [
  {
    display: "Name",
    field: "title",
  },
  {
    display: "IMDb Score",
    field: "vote_average",
  },
  {
    display: "Popularity",
    field: "vote_count",
  },
  {
    display: "Released Date",
    field: "release_date",
  },
];

const AppExplorePage = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectInputOption[]>(
    []
  );
  const {
    data,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "ExploreMoviesPage",
      `&with_genres=${selectedOptions.map((item) => item.value).join(",")}`,
    ],
    queryFn: ({ pageParam }) =>
      fetchDiscoverMovies(
        pageParam,
        `&with_genres=${selectedOptions.map((item) => item.value).join(",")}`
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const movies: Movie[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <AppPageHeading title="Explore Movies" />
      <div className="container mx-auto mt-5 flex gap-3">
        <MovieDisplayGrid
          movies={movies}
          isFetching={isFetching}
          error={error}
          sortOptions={sortOptions}
          defaultGrid={4}
          ref={loadMoreRef}
        />
        <div
          className="w-96 h-screen  mt-2 sticky top-[81px] flex flex-col gap-5
         "
        >
          <div className=" bg-zinc-950 rounded-md py-4 px-3">
            <ExplorePageSelectGenre
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppExplorePage;
