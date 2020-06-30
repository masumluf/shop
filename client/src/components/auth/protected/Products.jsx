import React, { useState, useEffect } from "react";
import { isAuth } from "../../../class/storage";
import { getAllProducts } from "../../../class/helper";
import moment from "moment";
import ProductSearch from "./ProductSearch";
import ProductList from "./ProductList";
import { useDispatch } from "react-redux";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

export const Allproduct = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState("");
  useEffect(() => {
    //setLoader(true);
    (async () => {
      const results = await getAllProducts();
      dispatch({ type: "SET_PRODUCTS", payload: results });
      //setProducts(results);
      //setLoader(false);
    })();
  }, [refresh]);

  //   const searchByPhoneNumber = (number) => {
  //     if (number.toString().length === 0) {
  //       setPhoneNumber(Date.now());
  //       //console.log(phoneNumber);
  //     }
  //     const results = products.filter(
  //       (d) =>
  //         d.receiverPhone.includes(number) ||
  //         d.receiverName.includes(number) ||
  //         d.description.includes(number) ||
  //         d.receiverAddress.includes(number),
  //     );
  //     setProducts(results);
  //   };

  //   const searchItem = (item1, item2) => {
  //     let result = products.filter(
  //       (d) =>
  //         d.createdAt >= moment(item1).format() &&
  //         d.createdAt <= moment(item2).format(),
  //     );
  //     setProducts(result);

  //     //console.log(moment(item1).format(), moment(item2).format());
  //   };

  //   const searchProductByStatus = (status) => {
  //     const results = products.filter((d) => d.productStatus.includes(status));
  //     setProducts(results);
  //   };

  //   const searchProductByMarchent = (id) => {
  //     //console.log(id.toString());

  //     const results = products.filter((d) => d.marchent._id === id);
  //     setProducts(results);
  //   };

  //   const searchProductByMan = (id) => {
  //     const results = products.filter((d) => d.deliveryman._id === id);
  //     setProducts(results);
  //   };

  const refreshProducts = () => {
    setRefresh(Date.now());
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <ProductSearch refreshProducts={refreshProducts} />
        <div className='row'>
          <div className='col-12'>
            <ProductList refreshProducts={refreshProducts} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Allproduct;
