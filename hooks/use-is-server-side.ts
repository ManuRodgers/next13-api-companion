import { useState, useEffect } from "react";

// this hook is used to handle React Hydration Error in nextjs
export const useIsServerSide = () => {
  const [isServerSide, setIsServerSide] = useState(true);

  useEffect(() => {
    setIsServerSide(false);
  }, [setIsServerSide]);

  return isServerSide;
};
