export const cardAnimationOpt = (type: { [key: string]: boolean }) => {
  let options;
  if (type.Y_Positive) {
    return (options = {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { y: "100%" },
      transition: { duration: 0.5 },
    });
  }
  if (type.X_Positive) {
    return (options = {
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: 0 },
      exit: { x: "100%" },
      transition: { duration: 0.5 },
    });
  }

  if (type.X_Negative) {
    return (options = {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      exit: { x: "100%" },
      transition: { duration: 0.5 },
    });
  }

  return options;
};
