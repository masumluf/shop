import React, { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";

// import JsBarcode from "jsbarcode";
// import canvg from "canvg";

const ProductMap = ({ _id, orderId, status, price, createdAt }) => {
  const [success, setSuccess] = useState({});
  const [error, setError] = useState({});
  // const removePayment = (id) => {
  //   $("#ok_button").click(async function () {
  //     try {
  //       let result = await axios({
  //         method: "DELETE",
  //         url: `${process.env.REACT_APP_API_URL}/removeproduct`,
  //         data: {
  //           id,
  //           token: getCookie("token"),
  //         },
  //       });
  //       if (result) {
  //         setSuccess("Item Deleted Successfully.");
  //         refreshProducts();
  //         document.body.scrollTop = 0;
  //         document.documentElement.scrollTop = 0;
  //       }
  //     } catch (e) {
  //       setError(e.response.data.error);
  //     }
  //   });
  // };
  return (
    <>
      <div id='svg-container'>
        <svg id='barcode' style={{ display: "none" }}></svg>
      </div>
      <div className='card  d-flex flex-row-1 mb-3 active'>
        <div className='pl-2  d-flex flex-grow-1 min-width-zero'>
          <div className='card-body  align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'>
            <Link to={`/orderdetails/${_id}`} className='w-10 w-sm-100'>
              <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
                {" "}
                Order No:{" "}
                <h5 className='text-muted mb-1 text-small'>{orderId}</h5>
              </p>
            </Link>

            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              Status:
              <span className='badge badge-pill badge-outline-theme-2 mb-1'>
                {status}
              </span>
            </p>
            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              {" "}
              Total
              <strong className='text-body'> {price}</strong>
            </p>
            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              {" "}
              Added
              <strong className='text-body'>
                {" "}
                {<Moment fromNow>{createdAt}</Moment>}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
const OrderList = () => {
  const { orderList } = useSelector((state) => state);

  return (
    <>
      <div className='col-12'>
        <div className='card-body text-right mobile-flex'>
          <p className='desk-hide'>
            <a href='#'>
              <span className='btn btn-outline-success mb-1'>All Order</span>
            </a>
          </p>
        </div>
      </div>
      {orderList.map((order, index) => (
        <ProductMap {...order} key={index} />
      ))}
    </>
  );
};
export default OrderList;
