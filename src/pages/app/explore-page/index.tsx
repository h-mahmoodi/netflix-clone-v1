import MovieDisplayGrid from "@src/components/app/movie/display-grid";
import AppPageHeading from "@src/components/app/page-heading";
import SelectInput from "@src/components/ui/select-input";
import { fetchDiscoverMovies } from "@src/fetchers";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import { Movie, SortOption } from "@src/types/movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

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

const mockOptions = [
  {
    value: "value 1",
    label: "label 1",
  },
  {
    value: "value 2",
    label: "label 2",
  },
  {
    value: "value 3",
    label: "label 3",
  },
  {
    value: "value 4",
    label: "label 4",
  },
  {
    value: "value 5",
    label: "label 5",
  },
];

type Option = {
  value: string;
  label: string;
};

const AppExplorePage = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const {
    data,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["PopularMoviesPage"],
    queryFn: ({ pageParam }) => fetchDiscoverMovies(pageParam),
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
            <SelectInput
              placeholder="Filter By Genres"
              options={mockOptions}
              value={selectedOptions}
              onChange={setSelectedOptions}
            />
          </div>
          <div className="bg-zinc-950 rounded-md h-20 p-4">
            <SelectInput
              placeholder="Filter By Release Date"
              options={mockOptions}
              value={selectedOptions}
              onChange={setSelectedOptions}
            />
          </div>
          <div className="bg-zinc-950 rounded-md h-20 p-4">
            <SelectInput
              placeholder="Filter By IMDb Rate"
              options={mockOptions}
              value={selectedOptions}
              onChange={setSelectedOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppExplorePage;
