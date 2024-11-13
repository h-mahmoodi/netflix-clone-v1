import Loading from "@src/components/ui/loading";
import { fetchMovieTrailers } from "@src/fetchers";
import { MovieTrailer as MovieTrailerType } from "@src/types/movie";
import { useQuery } from "@tanstack/react-query";

type MovieTrailerProps = {
  movieId: string | number;
};

const MovieTrailer = ({ movieId }: MovieTrailerProps) => {
  const {
    data: trailers,
    isFetching,
    error,
  } = useQuery<MovieTrailerType[]>({
    queryKey: ["movieTrailer", movieId],
    queryFn: async () => fetchMovieTrailers(movieId as string),
    staleTime: 1000 * 60 * 5,
  });

  const firstTrailer = trailers?.filter(
    (trailer) => trailer.type === "Trailer"
  )[0];

  if (isFetching) {
    return (
      <div className="flex items-center justify-center w-[700px] h-[400px]">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      {firstTrailer && (
        <iframe
          // src={`https://www.youtube.com/embed/${firstTrailer.key}`}
          src={`https://www.youtube.com/embed/${firstTrailer.key}?autoplay=1`}
          title="YouTube video player"
          allowFullScreen
          allow="autoplay"
          style={{ width: "700px", height: "400px" }}
        />
      )}
      {/* <video src={`https://www.youtube.com/watch?v=${}`}></video> */}
    </div>
  );
};
export default MovieTrailer;
