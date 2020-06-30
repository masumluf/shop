import React from "react";
import Moment from "react-moment";

const OrderCard = ({ amount, description, createdAt }) => {
  return (
    <>
      <div className='d-flex flex-row mb-3'>
        <a className='d-block position-relative' href='#'></a>
        <div className='pl-3 pt-2 pr-2 pb-2'>
          <a href='#'>
            <p className='list-item-heading'>{description}</p>
            <div className='pr-4 d-none d-sm-block'>
              <p className='text-muted mb-1 text-small'>{amount}</p>
            </div>
            <div className='text-primary text-small font-weight-medium d-none d-sm-block'>
              {<Moment fromNow>{createdAt}</Moment>}
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
