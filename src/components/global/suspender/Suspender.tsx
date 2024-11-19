import Loading from "@src/components/ui/loading";
import { ReactNode, Suspense } from "react";

type SuspenderProps = {
  component: ReactNode;
};

const Suspender = ({ component }: SuspenderProps) => {
  return <Suspense fallback={<Loading />}>{component}</Suspense>;
};
export default Suspender;
