import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
  postOrder,
  setOrder,
} from "../redux/ModalOrderSlice";

export const useOrder = () => {
  const { isOpen, order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeModal());
  };

  const handleForm = (e) => {
    dispatch(
      setOrder({
        title: e.target.name,
        value: e.target.value,
      })
    );
  };
  const postOrderToServet = () => {
    dispatch(postOrder(order));
  };
  return { isOpen, close, handleForm, postOrderToServet };
};
