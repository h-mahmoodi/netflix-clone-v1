import { useEffect, useRef } from "react";

type useInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
};

const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isLoading,
}: useInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [fetchNextPage, isLoading, hasNextPage]);

  return loadMoreRef;
};
export default useInfiniteScroll;
