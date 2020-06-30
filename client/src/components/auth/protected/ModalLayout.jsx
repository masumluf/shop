import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCategory } from "../../../class/helper";
import { getCookie } from "../../../class/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import $ from "jquery";

var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);
toast.configure();

const DashboardDiv = (props) => {
  const [categories, setCategories] = useState([]);
  const [bye, setBye] = useState(true);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});

  const [values, setValues] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    (async () => {
      const results = await getCategory();
      setCategories(results);
    })();
    setSuccess({});
    setError({});
    setValues({
      ...values,
      id: props._id,
      title: props.title,
      description: props.description,
      category: props.category,
      price: props.price,
    });
  }, [props]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const { id, title, description, category, price } = values;

  const sendRequest = async (e) => {
    e.preventDefault();

    //console.log();
    setBye(false);
    setTimeout(function () {
      setBye(true);
    }, 1000);

    try {
      let result = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}/updateproduct`,
        data: {
          id,
          title,
          description,
          category,
          price,
          token: getCookie("token"),
        },
      });
      if (result) {
        //console.log(result.data.message);
        setSuccess("Data Updated Successfully");
        setBye(false);
        setTimeout(function () {
          setSuccess({});
          setBye(true);
          props.refreshProducts();
          window.$("#exampleModalRight").modal("hide");
        }, 1000);

        // window.location.href = window.location.href;
      }
    } catch (e) {
      //console.log(e.response.data.error);

      // toast.error(e.response.data.error);
      console.log(e);
      setBye(false);
      setError("Failed to Update.Please Fill Up all Field");
      setTimeout(function () {
        setSuccess({});
        setError({});
        setBye(true);
      }, 1000);
    }
  };
  return (
    <div
      className='modal fade modal-right'
      id='exampleModalRight'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='exampleModalRight'
      aria-hidden='true'
      style={{ display: "none" }}>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Product Information</h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>×</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='form-side'>
              {Object.keys(error).length !== 0 && (
                <div className='alert alert-danger ' role='alert'>
                  {JSON.stringify(error)}
                </div>
              )}
              {Object.keys(success).length !== 0 && (
                <div className='alert alert-success ' role='alert'>
                  {JSON.stringify(success)}
                </div>
              )}
              <div className=''></div>

              {bye && (
                <form>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.title
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      placeholder=''
                      onChange={handleChange("title")}
                      value={values.title}
                    />
                    <div className=' invalid-feedback'>{error.title}</div>
                    <span>Product Title</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <textarea
                      className={
                        error.description
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      onChange={handleChange("description")}
                      value={values.description}></textarea>
                    <div className='invalid-feedback'>{error.description}</div>
                    <span>Product Details</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <select
                      className='custom-select custom-select-lg mb-3'
                      onChange={handleChange("category")}
                      value={values.category}
                      id='namemarchent'>
                      {categories.map((item) => {
                        return <option value={item.text}>{item.text}</option>;
                      })}
                    </select>

                    <div className='invalid-feedback'>{error.category}</div>
                    <span>Select Category</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.price
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='number'
                      placeholder=''
                      onChange={handleChange("price")}
                      value={values.price}
                    />
                    <div className=' invalid-feedback'>{error.price}</div>
                    <span>Price</span>
                  </label>

                  <div className='d-flex justify-content-end align-items-center'></div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-outline-primary'
                      id='modalDismiss'
                      data-dismiss='modal'>
                      Cancel
                    </button>
                    <button
                      className='btn btn-primary btn-lg btn-shadow'
                      type='submit'
                      onClick={sendRequest}>
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export const ModalLayout = (values) => {
  return (
    <>
      <DashboardDiv {...values} />
    </>
  );
};

export default ModalLayout;
