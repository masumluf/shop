import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ProductSearch = ({ refreshProducts }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // const handleChange = (name) => (e) => {
  //   if (name === "marchent" && e.target.value !== "Select Marchent") {
  //     searchProductByMarchent(e.target.value);
  //   } else if (name === "man" && e.target.value !== "Choose Delivery Person") {
  //     searchProductByMan(e.target.value);
  //   } else {
  //     refreshProducts();
  //   }
  // };

  return (
    <div className='row '>
      <div className='col-12 col-xl-12 mb-2'>
        <div className='card h-100'>
          <div className='card-body'>
            <h1>Product List</h1>

            <div className='top-right-button-container'>
              <Link
                to='/addproduct'
                className='btn btn-primary btn-lg top-right-button mr-1'>
                ADD PRODUCT
              </Link>
            </div>
            <br></br>
            <nav
              className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
              aria-label='breadcrumb'>
              <ol className='breadcrumb pt-0'>
                <li className='breadcrumb-item'>
                  <a href='#'>Home</a>
                </li>
                <li className='breadcrumb-item'>
                  <a href='#'>Add Product</a>
                </li>
              </ol>
            </nav>
            {/* <div className='form-group mb-3'>
              <label>
                <strong className='text-info'>Search By Phone Number</strong>
              </label>
              <input
                className='form-control'
                onChange={(e) => searchByPhoneNumber(e.target.value)}
                placeholder='Receiver Phone Number/Address/Product Name'
              />
            </div> */}

            <div className='form-group mb-3'>
              <label>
                <strong className='text-danger'>Search By Date Range</strong>
              </label>
              <div className='input-daterange input-group' id='datepicker'>
                <DatePicker
                  className='form-control'
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <span className='input-group-addon'></span>

                <DatePicker
                  className='input-sm form-control'
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>

            <div className='form-group mb-1'>
              <button className='input-sm form-control'>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
