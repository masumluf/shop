import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import ModalLayout from "./ModalLayout";
import { getCookie } from "../../../class/storage";
import $ from "jquery";
import axios from "axios";
import Alert from "./Alert";

// import JsBarcode from "jsbarcode";
// import canvg from "canvg";

const ProductMap = ({
  _id,
  title,
  description,
  price,
  category,
  photo,
  createdAt,
  handleModal,
  refreshProducts,
}) => {
  const [success, setSuccess] = useState({});
  const [error, setError] = useState({});
  const removePayment = (id) => {
    $("#ok_button").click(async function () {
      try {
        let result = await axios({
          method: "DELETE",
          url: `${process.env.REACT_APP_API_URL}/removeproduct`,
          data: {
            id,
            token: getCookie("token"),
          },
        });
        if (result) {
          setSuccess("Item Deleted Successfully.");
          refreshProducts();
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      } catch (e) {
        setError(e.response.data.error);
      }
    });
  };
  return (
    <>
      <div id='svg-container'>
        <svg id='barcode' style={{ display: "none" }}></svg>
      </div>
      <div className='card  d-flex flex-row-1 mb-3 active'>
        <div className='pl-2  d-flex flex-grow-1 min-width-zero'>
          <div className='card-body  align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'>
            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              {" "}
              <img
                src={`/product/${photo}`}
                alt='Fat Rascal'
                class='list-thumbnail border-0'
              />
            </p>

            <Link to='#' className='w-10 w-sm-100'>
              <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
                {" "}
                Product Info:{" "}
                <h5 className='text-muted mb-1 text-small'>
                  {title || <Skeleton count={10} />}
                </h5>
              </p>
            </Link>

            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              Price:
              <span className='badge badge-pill badge-outline-theme-2 mb-1'>
                ট {price === null ? "0.00" : price === 0 ? "0.00" : price}
              </span>
            </p>
            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              {" "}
              Added
              <strong className='text-body'>
                {" "}
                {<Moment fromNow>{createdAt}</Moment>}
              </strong>
            </p>

            <div className='btn btn-outline-warning mb-1'>
              <i className='simple-icon-pencil'></i>

              <a
                href='#'
                data-toggle='modal'
                data-backdrop='static'
                data-target='#exampleModalRight'
                onClick={() =>
                  handleModal(_id, title, description, category, price)
                }>
                <strong className=''> &nbsp;Edit</strong>
              </a>
            </div>
          </div>
        </div>
        <div className='d-flex flex-grow-1 min-width-zero'>
          <div className='card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center'>
            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              {" "}
              Product Details:
              <h5 className='text-muted mb-1 text-small'>
                {description.substr(1, 40)}....
              </h5>
            </p>
            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              {" "}
              Product Category:
              <h5 className='text-muted mb-1 text-small'>{category}</h5>
            </p>

            <p className='list-item-heading mb-0 truncate w-xs-100 field-name-g'>
              <span
                className='badge badge-round badge-danger'
                onClick={() => {
                  removePayment(_id);
                }}
                style={{ cursor: "pointer" }}
                data-toggle='modal'
                data-target='.bd-example-modal-lg'>
                <i className='iconsminds-remove'></i> Remove
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
const ProductList = ({ refreshProducts }) => {
  const { products } = useSelector((state) => state);
  const [values, setValues] = useState({});

  const handleModal = (_id, title, description, category, price) => {
    setValues({
      _id,
      title,
      description,
      category,
      price,
    });
  };
  const totalAmount = products.reduce((sum, product) => sum + product.price, 0);
  return (
    <>
      <div className='col-12'>
        <div className='card-body text-right mobile-flex'>
          <p className='desk-hide'>
            <a href='#' onClick={refreshProducts}>
              <span className='btn btn-outline-success mb-1'>All Product</span>
            </a>
          </p>
          <h2>
            Total Amount Found{" "}
            <span className='badge badge-round badge-primary'>
              {totalAmount} Taka
            </span>
          </h2>
        </div>
      </div>
      {products.map((product, index) => (
        <ProductMap
          {...product}
          handleModal={handleModal}
          key={index}
          refreshProducts={refreshProducts}
        />
      ))}
      <ModalLayout {...values} refreshProducts={refreshProducts} />
      <Alert />
    </>
  );
};
export default ProductList;
