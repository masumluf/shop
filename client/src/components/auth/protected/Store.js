import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const init = {
  keyword: "",
  products: [],
  cartItems: [],
  orders: [],
  orderList: [],
  refresh: "",
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_KEYWORD":
      return {
        ...state,
        keyword: action.payload,
      };

    case "SET_ORDER":
      return {
        ...state,
        orders: action.payload,
      };

    case "SET_ORDERLIST":
      return {
        ...state,
        orderList: action.payload,
      };

    case "REFRESH":
      return {
        ...state,
        refresh: action.payload,
      };

    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartItems"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const persistore = persistStore(store);

const StateProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistore}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export { store, StateProvider };
