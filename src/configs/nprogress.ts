import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false, // Disable the spinner
  speed: 500, // Animation speed in ms
  minimum: 0.1, // Minimum progress percentage
  trickle: true,
});

export default NProgress;
