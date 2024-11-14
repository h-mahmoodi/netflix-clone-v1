import { useEffect, useRef, useState } from "react";

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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!hasNextPage || isLoading || !hasScrolled) return;

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
  }, [fetchNextPage, isLoading, hasNextPage, hasScrolled]);

  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return loadMoreRef;
};
export default useInfiniteScroll;
