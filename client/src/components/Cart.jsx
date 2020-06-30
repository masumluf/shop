import React from "react";
import NavbarSearch from "./NavbarSearch";
import { useSelector } from "react-redux";
import useCart from "./hook/useCart";
import OrderLayout from "./OrderLayout";
import Confirm from "./Confirm";

const Display = () => {
  const { total, resetItem } = useCart();
  const { cartItems } = useSelector((state) => state);

  return (
    <>
      <NavbarSearch />
      <main className='default-transition' style={{ opacity: 1 }}>
        <div className='container-fluid disable-text-selection'>
          <div className='row'>
            <div className='col-12'>
              <div className='mb-1'>
                <h1>Check Out</h1>

                <div className='text-zero top-right-button-container'>
                  <h3>Total Amount</h3>
                  <button type='button' className='btn btn-info mb-1'>
                    $ {total}
                  </button>
                </div>
                <div className='mb-1'>
                  <div className='collapse d-md-block' id='displayOptions'>
                    <div className='d-block d-md-inline-block'></div>
                  </div>
                </div>
                <div className='mt-2 mb-2'>
                  <div className=' d-md-block'>
                    {total !== 0 && (
                      <span className='mr-3 mb-2  float-md-left'>
                        <div className='text-zero top-right-button-container'>
                          <button
                            type='button'
                            className='btn btn-warning mb-1'
                            onClick={resetItem}>
                            Clear Cart
                          </button>
                        </div>
                        <div className='text-zero top-right-button-container'>
                          <button
                            type='button'
                            className='btn btn-success mb-1'
                            data-toggle='modal'
                            data-target='#exampleModalContent'
                            data-backdrop='static'>
                            Confirm Order
                          </button>
                        </div>
                      </span>
                    )}
                  </div>
                </div>
                <div className='separator mb-5'></div>
                <Confirm />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12 list' data-check-all='checkAll'>
              {cartItems.map((item) => (
                <OrderLayout {...item} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Display;
