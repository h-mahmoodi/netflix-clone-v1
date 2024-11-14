import styles from "./styles.module.css";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={`${className} ${styles.skeleton} `}></div>;
};
export default Skeleton;
