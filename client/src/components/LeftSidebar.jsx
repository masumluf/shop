import React, { useState, useEffect } from "react";
import { getCategory } from "../class/helper";
import { useSelector, useDispatch } from "react-redux";
const LeftSidebar = () => {
  const [category, setCategory] = useState([]);
  const { products, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const results = await getCategory();
      setCategory(results);
    })();
  }, []);

  const filterProduct = (name) => {
    const results = products.filter((product) =>
      product.category.includes(name),
    );
    dispatch({ type: "SET_PRODUCTS", payload: results });
  };

  const refreshProduct = () => {
    dispatch({ type: "REFRESH", payload: Date.now() });
  };

  return (
    <>
      <div className='menu' style={{ opacity: 1 }}>
        <div className='s-layout__sidebar'>
          <a className='s-sidebar__trigger' href='#0'>
            <i className='simple-icon-menu'></i>
          </a>

          <nav className='s-sidebar__nav'>
            <ul className='list-unstyled' id='myUL'>
              <li>
                <a href='#' onClick={refreshProduct}>
                  <p className='font-weight-medium mb-0 '>ALL</p>
                </a>
              </li>
              {category.map((c) => {
                return (
                  <li>
                    <a href='#' onClick={() => filterProduct(c.categoryName)}>
                      <span>{c.categoryName}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
