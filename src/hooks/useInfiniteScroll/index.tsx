import { useEffect, useRef, useState } from "react";

type useInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
};

const useInfiniteScroll = ({ fetchNextPage, hasNextPage, isLoading }: useInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isFetchingRef = useRef(false); // Prevent duplicate fetch calls.

  useEffect(() => {
    if (!hasNextPage || !hasScrolled) return; // Stop observing if no more pages are available.

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isFetchingRef.current) {
            isFetchingRef.current = true; // Lock fetch call
            fetchNextPage();
          }
        },
        { threshold: 0.5 }
      );
    }

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    // Cleanup only when the component unmounts or `hasNextPage` changes
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null; // Clear observer
    };
  }, [hasNextPage, hasScrolled, fetchNextPage]);

  // Reset fetching lock after loading completes
  useEffect(() => {
    if (!isLoading) {
      isFetchingRef.current = false;
    }
  }, [isLoading]);

  // Track scroll interaction
  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return loadMoreRef;
};

export default useInfiniteScroll;
