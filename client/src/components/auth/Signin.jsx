import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "../../class/storage";

toast.configure();

const Signup = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Sign In",
  });
  const [error, setError] = useState({});
  const { email, password, buttonText } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "requesting.." });
    // axios({
    //     method:'POST',
    //     url:`http://localhost:8000/api/signup`,
    //     data:{name,email,password,repassword}
    // })
    //     .then(res=>{
    //         console.log(res)
    //         toast.success("Success")
    //         setValues({...values,buttonText: "Submit"})
    //     })
    //     .catch(error=>{
    //         console.log(error);
    //         toast.error("Failed")
    //         setValues({...values,buttonText: "Submit"})
    //     })
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/login`,
        data: { email, password },
      });
      if (result) {
        console.log(result);
        authenticate(result, () => {
          toast.success(result.data.message);
          setValues({ ...values, buttonText: "Submit" });
          history.push("/dashboard");
        });
      }
    } catch (e) {
      toast.error(e.response.data.error);
      setError(e.response.data.error);
      setValues({ ...values, buttonText: "Submit" });
    }
  };

  const signInForm = () => (
    <main className='default-transition'>
      <div className='row h-100'>
        <div className='col-12 col-md-10 mx-auto my-auto'>
          <div className='card auth-card'>
            <div className='form-side'>
              <h1 className='mb-4'>Admin Login Area</h1>
              <form>
                <div className='form-group'>
                  <lable className='text-muted'>Email</lable>
                  <input
                    onChange={handleChange("email")}
                    value={email}
                    type='email'
                    className={
                      error.email ? " form-control is-invalid" : " form-control"
                    }
                  />
                  <div className=' invalid-feedback'>{error.email}</div>
                </div>

                <div className='form-group'>
                  <lable className='text-muted'>Password</lable>
                  <input
                    onChange={handleChange("password")}
                    value={password}
                    type='password'
                    className={
                      error.password
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                  />
                  <div className=' invalid-feedback'>{error.password}</div>
                </div>

                <div>
                  <button className='btn btn-primary' onClick={sendRequest}>
                    {buttonText}
                  </button>
                </div>
                {/* <Link to='/forgetpassword'>Forget Password ?</Link> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <>
      <ToastContainer />
      {isAuth() ? <Redirect to='/dashboard' /> : ""}
      {signInForm()}
    </>
  );
};

export default Signup;
