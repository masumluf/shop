import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const NavbarSearch = () => {
  const { keyword, cartItems, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = () =>
    fetch(
      `${process.env.REACT_APP_API_URL}/products?keyword=${keyword}`,
    ).then((res) => res.json());

  useEffect(() => {
    (async () => {
      const results = await fetchData(keyword);
      dispatch({ type: "SET_PRODUCTS", payload: results });
    })();
  }, [keyword, refresh]);
  return (
    <>
      <nav className='navbar fixed-top' style={{ opacity: 1 }}>
        <div className='container'>
          <Link className='navbar-logo' to='/'>
            <span className='logo d-none d-xs-block'></span>
            <span className='logo-mobile d-block d-xs-none'></span>
          </Link>
          <div className='search'>
            <input
              type='text'
              className='form-control'
              placeholder='Type Product Name'
              onChange={(e) => {
                dispatch({
                  type: "SET_KEYWORD",
                  payload: e.target.value,
                });
              }}
            />
            <span className='search-icon'>
              <i className='simple-icon-magnifier'></i>
            </span>
          </div>
          <div className='navbar-right'>
            <Link to='/checkout' className='btn btn-primary'>
              <strong>Cart</strong>{" "}
              {cartItems.length > 0 && (
                <span className='badge badge-light'>{cartItems.length}</span>
              )}
            </Link>
            <Link to='/signin'>
              <span className='badge badge-light'>Signin</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarSearch;
