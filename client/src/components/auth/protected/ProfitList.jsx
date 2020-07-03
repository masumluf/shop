import React, { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { updateProduct } from "../../../class/helper";
import { useSelector } from "react-redux";

// import JsBarcode from "jsbarcode";
// import canvg from "canvg";

const ProductMap = () => {
  const { profits } = useSelector((state) => state);

  const totalAmount = profits.reduce((sum, current) => sum + current.price, 0);

  return (
    <>
      <div id='svg-container'>
        <svg id='barcode' style={{ display: "none" }}></svg>
      </div>
      <div className='card  d-flex flex-row-1 mb-3 active'>
        <div className='pl-2  d-flex flex-grow-1 min-width-zero'>
          <div className='card-body  align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'>
            <Link to='#' className='w-15 w-sm-150'>
              <p className='list-item-heading mb-0 w-xs-100 field-name-g '>
                {" "}
                Total Earn:{" "}
                <h1 className='text-success text-large'>{totalAmount} Tk</h1>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
const ProfitList = () => {
  const { orderList } = useSelector((state) => state);

  return (
    <>
      <ProductMap />
    </>
  );
};
export default ProfitList;
