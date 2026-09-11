import { useScreenClass } from "react-grid-system";

const LARGE_SCREEN_CLASSES = ["lg", "xl", "xxl"];

export const useIsLargeScreen = () => {
  const screenClass = useScreenClass();
  return LARGE_SCREEN_CLASSES.includes(screenClass);
};
