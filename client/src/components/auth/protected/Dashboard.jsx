import React, { useState, useEffect } from "react";
import axios from "axios";

import { isAuth, getCookie } from "../../../class/storage";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import OrderCard from "./OrderCard";

export const Dashboard = () => {
  const { products, orders } = useSelector((state) => state);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/dashboard`,
      });
      return result.data.result;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    (async () => {
      const { order, products } = await fetchData();
      dispatch({ type: "SET_ORDER", payload: order });
      dispatch({ type: "SET_PRODUCTS", payload: products });
    })();
  }, []);

  const delivered = orders.filter((o) => o.status === "delivered");
  //let { name } = JSON.stringify(marchent[0][1]);

  //const totalMoney = payments.reduce((sum, current) => sum + current.amount, 0);

  return (
    <>
      <Navbar />
      <Sidebar />

      <main>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h1>Dashboard</h1>
              <nav
                className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
                aria-label='breadcrumb'>
                <ol className='breadcrumb pt-0'>
                  <li className='breadcrumb-item'>
                    <a href='#'>Home</a>
                  </li>
                  <li className='breadcrumb-item'>
                    <a href='#'>Library</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    Data
                  </li>
                </ol>
              </nav>
              <div className='separator mb-5'></div>
            </div>
          </div>
          <div className='col-lg-12 col-xl-12'>
            <div className='row icon-cards-row mb-4 sortable'>
              <div
                className='col-md-3 col-lg-3 col-sm-4 col-6 mb-2'
                draggable='false'>
                <a href='#' className='card' draggable='false'>
                  <div className='card-body text-center'>
                    <i className='iconsminds-ambulance'></i>
                    <p className='card-text mb-0'>Total products</p>
                    <p className='lead text-center'>{products.length}</p>
                  </div>
                </a>
              </div>

              <div
                className='col-md-3 col-lg-3 col-sm-4 col-6 mb-2'
                draggable='false'>
                <a href='#' className='card' draggable='false'>
                  <div className='card-body text-center'>
                    <i className='iconsminds-checkout'></i>
                    <p className='card-text mb-0'>Total Order</p>
                    <p className='lead text-center'>{orders.length}</p>
                  </div>
                </a>
              </div>

              <div
                className='col-md-3 col-lg-3 col-sm-4 col-6 mb-2'
                draggable='false'>
                <a href='#' className='card' draggable='false'>
                  <div className='card-body text-center'>
                    <i className='iconsminds-checkout'></i>
                    <p className='card-text mb-0'>Total Delivered Product</p>
                    <p className='lead text-center'>{delivered.length}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className='col-xl-12 col-lg-12 mb-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Recent Payments History</h5>
                <div className='scroll dashboard-list-with-thumbs ps ps--active-y'>
                  {orders.map((order) => (
                    <OrderCard {...order} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
