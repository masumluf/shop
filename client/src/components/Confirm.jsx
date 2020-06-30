import React, { useState } from "react";
import { placeOrder } from "./../class/helper";
import { useSelector } from "react-redux";
import useCart from "./hook/useCart";

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config();
dotenvExpand(myEnv);

const Confirm = () => {
  const { clearItem, total } = useCart();
  const { cartItems } = useSelector((state) => state);
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    number: "",
    address: "",
    buttonText: "Submit",
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const { number, address, buttonText } = values;
  const ClearOrder = async (e) => {
    setError({});
    const result = await placeOrder(
      e,
      number,
      address,
      cartItems,
      total,
      setValues,
    );
    if (result) {
      clearItem();
    } else {
      setError("Please Enter all Information.");
    }
  };

  return (
    <div
      className='modal fade'
      id='exampleModalContent'
      tabIndex='-1'
      role='document'
      style={{ display: "none" }}
      aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              Please Fill up the below Information
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>×</span>
            </button>
          </div>
          <div className='modal-body'>
            <form>
              {Object.keys(error).length !== 0 && (
                <div className='alert alert-danger ' role='alert'>
                  {JSON.stringify(error)}
                </div>
              )}
              <div className='form-group'>
                <label className='col-form-label'>Mobile Number</label>
                <input
                  type='number'
                  className='form-control'
                  id='recipient-name'
                  onChange={handleChange("number")}
                  value={number}
                />
              </div>
              <div className='form-group'>
                <label className='col-form-label'>Address:</label>
                <textarea
                  className='form-control'
                  id='message-text'
                  onChange={handleChange("address")}
                  value={address}></textarea>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={ClearOrder}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
