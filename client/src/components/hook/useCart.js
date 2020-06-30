import React from "react";

import { useSelector, useDispatch } from "react-redux";

const useCart = () => {
  const { products, cartItems } = useSelector((state) => state);
  const dispatch = useDispatch();

  const setCartItems = (item) => {
    //dispatch(setCart(item));
    dispatch({ type: "SET_CART_ITEMS", payload: item });
  };

  const addItemToCart = (id) => {
    const item = products.find((product) => product._id === id);

    const itemIndex = cartItems.findIndex(
      (currentItem) => currentItem._id === id,
    );
    if (itemIndex === -1) {
      setCartItems([
        ...cartItems,
        {
          ...item,
          quantity: 1,
        },
      ]);
    } else {
      setCartItems(
        cartItems.map((currentItem) =>
          currentItem._id === id
            ? {
                ...item,
                quantity: parseInt(currentItem.quantity) + 1,
              }
            : currentItem,
        ),
      );
    }
  };

  const updatequantity = (id, number, operation) => {
    const item = products.find((product) => product._id === id);
    if (operation) {
      setCartItems(
        cartItems.map((currentItem) =>
          currentItem._id === id
            ? {
                ...item,
                quantity: parseInt(currentItem.quantity) + number,
              }
            : currentItem,
        ),
      );
    } else {
      setCartItems(
        cartItems.map((currentItem) =>
          currentItem._id === id
            ? {
                ...item,
                quantity: parseInt(currentItem.quantity) - number,
              }
            : currentItem,
        ),
      );
    }
  };

  const total = cartItems.reduce(
    (sum, current) => sum + current.price * current.quantity,
    0,
  );

  const removeItem = (id) => {
    console.log(id);

    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const resetItem = () => {
    const res = window.confirm("are you sure ?");
    if (res) {
      setCartItems([]);
    }
  };

  const clearItem = () => {
    setCartItems([]);
  };

  return {
    total,
    cartItems,
    addItemToCart,
    removeItem,
    resetItem,
    clearItem,
    updatequantity,
  };
}; //use cart ends

export default useCart;
