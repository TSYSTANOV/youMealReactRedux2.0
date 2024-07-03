import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/CartSlice";

export const useCart = () => {
  const { isOpen, cart, cartItems } = useSelector((state) => state.cart);
  const cartRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      dispatch(getCartItems(cart));
      cartRef.current.style.height = cartRef.current.scrollHeight + "px";
      cartRef.current.style.overflow = "auto";
    } else {
      cartRef.current.style.height = "0px";
      cartRef.current.style.overflow = "hidden";
    }
  }, [isOpen, cart]);
  const totalSum = useMemo(() => {
    return cartItems.reduce((acc, el) => {
      acc += el.price * el.count;
      return acc;
    }, 0);
  }, [isOpen, cart, cartItems]);
  const totalCount = useMemo(() => {
    return cart.reduce((acc, el) => {
      acc += el.count;
      return acc;
    }, 0);
  }, [isOpen, cart, cartItems]);
  return { totalCount, totalSum, dispatch, cartItems, cartRef, isOpen, cart };
};
