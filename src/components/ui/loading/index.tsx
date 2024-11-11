import classes from "./loading.module.css";
import image from "@src/assets/logo.png";

const Loading = () => {
  return (
    <div className={classes.loading}>
      <img src={image} alt="Netflix loader" className={classes.image} />
    </div>
  );
};
export default Loading;
