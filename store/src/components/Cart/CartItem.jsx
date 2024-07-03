import { useDispatch } from "react-redux";
import { decreaseCount, increaseCount } from "../../redux/CartSlice";
import { BASE_URL } from "../../api/api";

function CartItem({ title, weight, price, count, id, image }) {
  const dispatch = useDispatch();
  return (
    <div className="cart_container_content_card">
      <img src={BASE_URL + "/" + image} alt={title} />
      <div className="card_text">
        <h2>{title}</h2>
        <span>{weight}г</span>
        <p>
          {price}
          <span>₽</span>
        </p>
      </div>
      <div className="card_number">
        <button
          className="minus_number"
          onClick={() => dispatch(decreaseCount(id))}
        >
          -
        </button>
        <p>{count}</p>
        <button
          className="plus_number"
          onClick={() => dispatch(increaseCount(id))}
        >
          +
        </button>
      </div>
    </div>
  );
}
export { CartItem };
