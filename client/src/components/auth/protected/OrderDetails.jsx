import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import OrderDetailsLoop from "./OrderDetailsLoop";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

const Display = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const fetchData = (orderId) =>
    fetch(
      `${process.env.REACT_APP_API_URL}/orderdetail/${orderId}`,
    ).then((res) => res.json());
  useEffect(() => {
    (async () => {
      const product = await fetchData(id);
      setProducts(product);
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

                <div className='mb-1'>
                  <a
                    className='btn pt-0 pl-0 d-inline-block d-md-none'
                    data-toggle='collapse'
                    href='#displayOptions'
                    role='button'
                    aria-expanded='true'
                    aria-controls='displayOptions'>
                    Display Options
                    <i className='simple-icon-arrow-down align-middle'></i>
                  </a>
                  <div className='collapse d-md-block' id='displayOptions'>
                    <div className='d-block d-md-inline-block'></div>
                  </div>
                </div>
                <div className='separator mb-5'></div>
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
