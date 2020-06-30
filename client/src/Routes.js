import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import AccountActivation from "./components/auth/AccountActivation";
import Profile from "./components/auth/protected/Profile";
import PageAlert from "./components/PageAlert";
import PrivateRoute from "./components/auth/protected/PrivateRoute";
import ForgetPassword from "./components/auth/ForgetPassword";
import ActiveForgetPassword from "./components/auth/ActiveForgetPassword";
import Admin from "./components/auth/Admin";
import Cart from "./components/Cart";
import ItemDetails from "./components/ItemDetails";
import AdminRoute from "./components/auth/protected/AdminRoute";
import Home from "./components/auth/protected/Home";
import AddProduct from "./components/auth/protected/AddProduct";
import Order from "./components/auth/protected/Order";
import OrderDetails from "./components/auth/protected/OrderDetails";
import Product from "./components/auth/protected/Products";
import Dashboard from "./components/auth/protected/Dashboard";
import Category from "./components/auth/protected/Category";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signup' component={Signup} />

        <Route path='/pagealert' component={PageAlert} />
        <Route path='/auth/activation/:token' component={AccountActivation} />
        <Route path='/forgetpassword' component={ForgetPassword} />
        <Route
          path='/api/user/forget/password/active/:token'
          component={ActiveForgetPassword}
        />
        <Route path='/itemdetails/:id' component={ItemDetails} />
        <Route path='/signin' component={Signin} />
        <Route path='/checkout' component={Cart} />
        <AdminRoute path='/orderdetails/:id' Component={OrderDetails} />
        <AdminRoute path='/order' Component={Order} />
        <AdminRoute path='/allproduct' Component={Product} />
        <AdminRoute path='/addproduct' Component={AddProduct} />
        <AdminRoute path='/addcategory' Component={Category} />
        <AdminRoute path='/dashboard' Component={Dashboard} />
        <PrivateRoute path='/profile' Component={Profile} exact />
        <AdminRoute path='/admin' Component={Admin} exact />
        <AdminRoute path='/home' Component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
