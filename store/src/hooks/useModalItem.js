import { useState } from "react";

export const useModalItem = () => {
  const [count, setCount] = useState(1);
  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const increaseCount = () => {
    setCount(count + 1);
  };
  return { count, increaseCount, decreaseCount, setCount };
};
