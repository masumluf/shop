import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ProductSearch = ({ refreshProducts }) => {
  const dispatch = useDispatch();
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

  const refreshClick = () => {
    dispatch({ type: "REFRESH", payload: Date.now() });
  };

  const searchItem = async (e, item1, item2) => {
    e.preventDefault();

    const sDate = moment(item1).format("YYYY-MM-DD") + "T00:00:00.000Z";
    const eDate = moment(item2).format("YYYY-MM-DD") + "T23:59:59.000Z";

    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/profit`,
        data: { sDate, eDate },
      });
      if (result) {
        dispatch({ type: "SET_PROFIT", payload: result.data });
        //console.log(result.data);
      }
    } catch (error) {
      return false;
    }

    //dispatch({ type: "SET_ORDERLIST", payload: result });

    //const dateFormat = moment(item1).format("YYYY-MM-DD") + "T00:39:29+06:00";
  };

  return (
    <div className='row '>
      <div className='col-12 col-xl-12 mb-2'>
        <div className='card h-100'>
          <div className='card-body'>
            <h1>Profit Analysis</h1>

            <br />
            <br />

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
              <button
                className='input-sm form-control'
                onClick={(e) => {
                  searchItem(e, startDate, endDate);
                }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
