import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductDisplay = ({
  _id,
  title,
  description,
  photo,
  price,
  addItemToCart,
}) => {
  return (
    <div className='col-xl-3 col-lg-4 col-12 col-sm-4 mb-4'>
      <div className='card'>
        <div className='position-relative'>
          <img
            src={`/product/${photo}`}
            alt={title}
            className='card-img-top'
            width='195'
            height='182'
          />
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-10'>
              <Link to={`/itemdetails/${_id}`}>
                <p className='list-item-heading mb-4 pt-1'>{title}</p>
              </Link>
              <footer>
                <p className='text-muted text-small mb-0 font-weight-light'>
                  {description.substr(0, 40)}
                </p>
              </footer>
              <button
                type='button'
                className='btn btn-success mt-2 mb-1'
                onClick={() => {
                  addItemToCart(_id);
                }}>
                <i className='simple-icon-basket'></i> {price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
