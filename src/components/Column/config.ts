export const formAnimationOpt = () => {
  const options = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { y: "100%" },
    transition: { duration: 0.5 },
  };
  return options;
};
