import React from "react";
import NavbarSearch from "./NavbarSearch";
import { useSelector } from "react-redux";
import ProductDisplay from "./ProductDisplay";
import useCart from "./hook/useCart";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const Display = () => {
  const { addItemToCart } = useCart();
  const { products } = useSelector((state) => state);
  return (
    <>
      <NavbarSearch />
      <main className='container-fluid'>
        <div>
          <div className='row'>
            <div className='col-2'>
              <LeftSidebar />
            </div>
            <div className='col-xs-8 col-lg-8 col-8 mb-4'>
              <div className='row list'>
                {products.map((product) => (
                  <ProductDisplay
                    {...product}
                    key={product._id}
                    addItemToCart={addItemToCart}
                  />
                ))}
              </div>
            </div>
            <div className='col-2'>
              <RightSidebar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Display;
