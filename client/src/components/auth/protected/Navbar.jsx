import React from "react";
import { Link, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { isAuth, signout } from "../../../class/storage";

export const Navbar = () => {
  const history = createBrowserHistory();

  return (
    <>
      <nav className='navbar fixed-top' style={{ opacity: 1 }}>
        <div className='container'>
          <div className='d-flex align-items-center navbar-left'></div>

          {isAuth() && (
            <>
              <div className='user d-inline-block'>
                <button
                  className='btn btn-empty p-0'
                  type='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  <span className='name'>{isAuth().name}</span>
                  <span>
                    <img alt='Profile Picture' src='/img/user.png' />
                  </span>
                </button>

                <div className='dropdown-menu dropdown-menu-right mt-3'>
                  <Link className='dropdown-item' to='/setting'>
                    Setting
                  </Link>

                  <Link
                    className='dropdown-item'
                    to='/'
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}>
                    {" "}
                    Signout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navbar);
