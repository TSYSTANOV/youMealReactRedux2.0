import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useReduxHelper = (func) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(func);
  }, []);
  return { dispatch };
};
