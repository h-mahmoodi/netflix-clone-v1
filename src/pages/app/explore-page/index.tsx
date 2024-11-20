import MovieDisplayGrid from "@src/components/app/movie/display-grid";
import AppPageHeading from "@src/components/app/page-heading";
import { fetchDiscoverMovies } from "@src/fetchers";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import { Movie, SortOption } from "@src/types/movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

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
          <div className=" bg-zinc-950 rounded-md h-20 py-4 px-3">
            <h2 className="text-xl text-zinc-100 mb-4">Filter By Genres</h2>
          </div>
          <div className="bg-zinc-950 rounded-md h-20 p-4">
            <h2 className="text-lg text-zinc-100">Filter By Release Date</h2>
          </div>
          <div className="bg-zinc-950 rounded-md h-20 p-4">
            <h2 className="text-lg text-zinc-100">Filter By IMDb Rate</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppExplorePage;
