import React, { useState, useEffect } from "react";
import { isAuth } from "../../../class/storage";
import { getAllOrders } from "../../../class/helper";
import moment from "moment";
import OrderSearch from "./OrderSearch";
import OrderList from "./OrderList";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

export const Allproduct = () => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state);
  useEffect(() => {
    (async () => {
      const results = await getAllOrders();
      dispatch({ type: "SET_ORDERLIST", payload: results });
    })();
  }, [refresh]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <OrderSearch />
        <div className='row'>
          <div className='col-12'>
            <OrderList />
          </div>
        </div>
      </main>
    </>
  );
};

export default Allproduct;
