import React from "react";
import { Link } from "react-router-dom";

const OrderDetailsLoop = ({
  price,
  quantity,
  product: { _id, title, photo, description },
}) => {
  return (
    <>
      <div className='d-flex flex-row mb-3'>
        <a className='d-block position-relative' href='#'>
          <img
            src={`/product/${photo}`}
            alt='Marble Cake'
            className='list-thumbnail border-0'
            width='150'
            height='120'
          />
          <span className='badge badge-pill badge-theme-2 position-absolute badge-top-right'>
            ${price}
          </span>
        </a>
        <div className='pl-3 pt-2 pr-2 pb-2'>
          <a href='#'>
            <p className='list-item-heading'>{title}</p>
            <div className='pr-4 d-none d-sm-block'>
              <p className='text-muted mb-1 text-small'>{description}</p>
            </div>
            <div className='text-primary text-small font-weight-medium d-none d-sm-block'>
              <strong>Quantity</strong>-{quantity}
            </div>
          </a>
        </div>
      </div>
      <hr />
    </>
  );
};

export default OrderDetailsLoop;
