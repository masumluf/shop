import React from "react";
import { isAuth } from "../../../class/storage";
import {
  BrowserRouter as Router,
  Link,
  withRouter,
  Route,
} from "react-router-dom";

const LayoutView = ({ match }) => {
  const LinkChecker = (path) => {
    // if (match.path === path) return true;
    // else return false;
  };

  return (
    <>
      <div className='menu' style={{ opacity: 1 }}>
        <div className='s-layout__sidebar'>
          <a className='s-sidebar__trigger' href='#0'>
            <i className='simple-icon-menu'></i>
          </a>

          <nav className='s-sidebar__nav'>
            <ul className='list-unstyled' id='myUL'>
              <li>
                <Link to='/dashboard'>
                  <i className='iconsminds-pie-chart-3'></i>
                  <span>Dashboards</span>
                </Link>
              </li>

              <li>
                <Link to='/order'>
                  <i className='simple-icon-basket-loaded'></i> Order
                </Link>
              </li>

              {isAuth().role === "admin" && (
                <li>
                  <Link to='/profit'>
                    <i className='iconsminds-line-chart-1'></i> Profit
                  </Link>
                </li>
              )}

              {isAuth().role !== "super" && (
                <li>
                  <Link to='/allproduct'>
                    <i className='iconsminds-box-close'></i> Product
                  </Link>
                </li>
              )}

              <li>
                <Link to='/addcategory'>
                  <i className='iconsminds-check'></i> Category
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
const Layout = () => {
  return (
    <>
      <LayoutView />
    </>
  );
};

export default withRouter(Layout);
