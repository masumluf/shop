import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config();
dotenvExpand(myEnv);

toast.configure();

const AddCategoryLayout = () => {
  const [state, setState] = useState({});
  const [error, setError] = useState({});
  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const { activeItem } = state;
  const [values, setValues] = useState({
    categoryName: "",
    buttonText: "Save",
  });

  const { categoryName, buttonText } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "requesting.." });

    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/addcategory`,
        data: { categoryName },
      });
      if (result) {
        //console.log(result)
        toast.success("Category Added Successfully.");
        setError({});
        setValues({ ...values, buttonText: "Save", categoryName: "" });
      }
    } catch (e) {
      //console.log(e.response.data.error);
      toast.error(e.response.data.error);
      setError(e.response.data.error);
      setValues({ ...values, buttonText: "Save" });
    }
  };
  return (
    <main className='default-transition'>
      <div className='row h-100'>
        <div className='col-12 col-md-10 mx-auto my-auto'>
          <div className='card auth-card'>
            <div className='form-side'>
              <h1 className='mb-4'>Add a Category</h1>

              <form>
                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.categoryName
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    type='text'
                    onChange={handleChange("categoryName")}
                    value={categoryName}
                  />
                  <div className='invalid-feedback'>{error.categoryName}</div>
                  <span>Category Name</span>
                </label>

                <div className='d-flex justify-content-end align-items-center'>
                  <button
                    className='btn btn-primary btn-lg btn-shadow'
                    type='submit'
                    onClick={sendRequest}>
                    {buttonText}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddCategoryLayout;
