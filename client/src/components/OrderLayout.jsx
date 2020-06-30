import React from "react";
import useCart from "./hook/useCart";
import { Link } from "react-router-dom";

const OrderLayout = ({ _id, title, quantity, price, photo }) => {
  const { removeItem, updatequantity } = useCart();

  return (
    <div className='card d-flex flex-row mb-3'>
      <a className='d-flex' href='#'>
        <img
          src={`/product/${photo}`}
          alt={title}
          className='list-thumbnail responsive border-0 card-img-left'
          width='144'
          height='135'
        />
      </a>
      <div className='pl-2 d-flex flex-grow-1 min-width-zero'>
        <div className='card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'>
          <Link to={`/itemdetails/${_id}`} className='w-40 w-sm-100'>
            <p className='list-item-heading mb-0 truncate'>{title}</p>
          </Link>
          <p className='mb-0 text-muted text-small w-15 w-sm-100'>
            {quantity > 1 && (
              <button
                className='btn btn-sm button-secondary btn-shadow'
                onClick={(e) => {
                  updatequantity(_id, 1, false);
                }}>
                -
              </button>
            )}
            <strong className='text-dark'>{quantity}-Pcs </strong>
            <button
              className='btn btn-sm button-secondary btn-shadow'
              onClick={(e) => {
                updatequantity(_id, 1, true);
              }}>
              +
            </button>
          </p>
          <div className='w-15 w-sm-100'>
            <span className='badge badge-pill badge-primary'>${price}</span>
          </div>

          <div className='w-15 w-sm-100'>
            <button
              type='button'
              className='btn btn-danger mb-1'
              onClick={() => {
                removeItem(_id);
              }}>
              <i className='simple-icon-close'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
