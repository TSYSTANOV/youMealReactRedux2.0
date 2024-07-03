import { useDispatch, useSelector } from "react-redux";
import { useReduxHelper } from "../../hooks/useReduxHelper";
import { getCategories } from "../../redux/CategorySlice";
import { useEffect } from "react";
import { NavItem } from "./NavItem";
import { getProducts } from "../../redux/ProductsSlice";

function NavigationCategories() {
  const { categories, activeCategory } = useSelector(
    (state) => state.categories
  );
  useReduxHelper(getCategories());
  useReduxHelper(getProducts(activeCategory));
  return (
    <div className="scrollbar_main">
      <nav className="navigation">
        <div className="container navigation__container">
          <ul className="navigation__list">
            {categories.map((item) => {
              return (
                <NavItem
                  key={item.title}
                  {...item}
                  activeCategory={activeCategory}
                />
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
export { NavigationCategories };
