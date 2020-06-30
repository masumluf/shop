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
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Category</h5>

        <div className='scroll dashboard-list-with-user ps ps--active-y'>
          <div className='d-flex flex-row mb-3 pb-3 border-bottom'>
            <div className='pl-3'>
              <a href='#' onClick={refreshProduct}>
                <p className='font-weight-medium mb-0 '>ALL</p>
              </a>
            </div>
          </div>
          {category.map((c) => {
            return (
              <div className='d-flex flex-row mb-3 pb-3 border-bottom'>
                <div className='pl-3'>
                  <a href='#' onClick={() => filterProduct(c.text)}>
                    <p className='font-weight-medium mb-0 '>{c.text}</p>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
