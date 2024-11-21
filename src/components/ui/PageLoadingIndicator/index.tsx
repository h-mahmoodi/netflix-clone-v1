import NProgress from "@src/configs/nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const PageLoadingIndicator: React.FC = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching || isMutating) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching, isMutating]);

  return null; // This component doesn't render anything visible
};

export default PageLoadingIndicator;
