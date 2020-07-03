import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  getCategory,
  checkFileSize,
  checkMimeType,
  onSubmit,
} from "../../../class/helper";

import { Navbar } from "./Navbar";

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config();
dotenvExpand(myEnv);

toast.configure();

const AddProductLayout = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState({});
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    buttonText: "Submit",
  });

  const { title, description, category, price, buttonText } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  useEffect(() => {
    (async () => {
      const results = await getCategory();
      setCategories(results);
    })();
  }, []);

  const onChangeFile = (e) => {
    if (!checkMimeType(e)) {
      e.target.value = null;
      return toast.error("Please select only Image. JPG/PNG/GIF");
    } else if (!checkFileSize(e)) {
      e.target.value = null;
      return toast.error("File size must be below 2M");
    } else {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <>
      <Navbar />
      <main className='default-transition'>
        <div className='row h-100'>
          <div className='col-12 col-md-10 mx-auto my-auto'>
            <div className='card auth-card'>
              <div className='form-side'>
                <h1 className='mb-4'>Add a Product</h1>

                <form>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.title
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("title")}
                      value={title}
                    />
                    <div className='invalid-feedback'>{error.title}</div>
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
                      value={description}></textarea>
                    <div className=' invalid-feedback'>{error.description}</div>
                    <span>Product Description</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <select
                      className='custom-select custom-select-lg mb-3'
                      onChange={handleChange("category")}
                      value={category}
                      id='namemarchent'>
                      {categories.map((c) => {
                        return (
                          <option value={c.categoryName}>
                            {c.categoryName}
                          </option>
                        );
                      })}
                    </select>
                    <div className=' invalid-feedback'>
                      {error.categoryName}
                    </div>
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
                      onChange={handleChange("price")}
                      value={price}
                    />{" "}
                    <div className=' invalid-feedback'>{error.price}</div>
                    <span>Price</span>
                  </label>
                  {photo ? photo.name : ""}
                  <div className='custom-file mb-5'>
                    <input
                      type='file'
                      className={
                        error.photo
                          ? " custom-file-input is-invalid"
                          : " custom-file-input"
                      }
                      id='inputGroupFile01'
                      onChange={onChangeFile}
                    />
                    <div className=' invalid-feedback'>{error.photo}</div>
                    <label className='custom-file-label' for='inputGroupFile01'>
                      Choose file
                    </label>
                  </div>

                  <div className='d-flex justify-content-end align-items-center'>
                    <button
                      className='btn btn-primary btn-lg btn-shadow'
                      type='submit'
                      onClick={(e) => {
                        onSubmit(
                          e,
                          title,
                          description,
                          price,
                          category,
                          photo,
                          setValues,
                          setError,
                          setPhoto,
                        );
                      }}>
                      {buttonText}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddProductLayout;
