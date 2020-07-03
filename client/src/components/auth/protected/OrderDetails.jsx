import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import OrderDetailsLoop from "./OrderDetailsLoop";
import { invoice } from "../../../class/helper";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

const Display = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});

  const fetchData = (orderId) =>
    fetch(
      `${process.env.REACT_APP_API_URL}/orderdetail/${orderId}`,
    ).then((res) => res.json());
  useEffect(() => {
    (async () => {
      const { products, orderDetails } = await fetchData(id);
      setProducts(products);
      setOrder(orderDetails);
    })();
  }, [id]);
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className='default-transition' style={{ opacity: 1 }}>
        <div className='container-fluid disable-text-selection'>
          <div className='row'>
            <div className='col-12'>
              <div className='mb-1'>
                <h1>Product Details</h1>

                <div className='separator mb-5'></div>
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 mb-4'>
              <div className='mb-1'>
                <div className='card'>
                  <div className='card-body'>
                    <p>
                      <strong>
                        Receiver Number :
                        <i className='text-info'>{order.number}</i>
                      </strong>
                    </p>
                    <p>
                      <strong>Receiver Address : {order.address}</strong>
                    </p>
                    <p>
                      <strong>Total Amount : {order.price}</strong>
                    </p>
                    <p>
                      <button
                        onClick={() => {
                          invoice(order, products);
                        }}
                        className='btn btn-danger mb-1'>
                        {" "}
                        <i className='iconsminds-file'></i>Download Invoice
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-xl-12 col-lg-12 mb-4'>
              <div className='card'>
                <div className='card-body'>
                  <div className='scroll dashboard-list-with-thumbs ps ps--active-y'>
                    {products.map((p) => (
                      <OrderDetailsLoop {...p} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Display;
