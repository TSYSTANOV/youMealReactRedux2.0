import { useDispatch } from "react-redux";
import { changeActiveCategory } from "../../redux/CategorySlice";
import { getProducts } from "../../redux/ProductsSlice";

function NavItem({ title, rus, image, activeCategory }) {
  const dispatch = useDispatch();
  return (
    <li className="navigation__item">
      <button
        onClick={() => {
          dispatch(changeActiveCategory(title));
          dispatch(getProducts(title));
        }}
        className={
          activeCategory === title
            ? `navigation__button navigation__button_${title} navigation__button_active`
            : `navigation__button navigation__button_${title}`
        }
      >
        {rus}
      </button>
    </li>
  );
}
export { NavItem };
