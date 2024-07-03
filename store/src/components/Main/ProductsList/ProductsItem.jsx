import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../api/api";
import { handleModal } from "../../../redux/ModalItemSlice";
import { useMemo } from "react";

function ProductsItem(props) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const inCart = useMemo(() => {
    return cart.some((el) => el.id === props.id);
  }, [cart]);
  return (
    <div className="item__product">
      <img src={BASE_URL + "/" + props.image} alt="burger" />
      <p className="item__product1">
        {props.price}
        <span> ₽</span>
      </p>
      <p className="product_name">{props.title}</p>
      <p className="product_detail">{props.weight}г</p>
      <button
        onClick={() => {
          dispatch(handleModal(props));
        }}
        disabled={inCart}
      >
        {inCart ? "В корзине" : "Добавить"}
      </button>
    </div>
  );
}
export { ProductsItem };
