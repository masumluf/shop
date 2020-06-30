import React, { useState, useEffect } from "react";
import NavbarSearch from "./NavbarSearch";
import { useSelector } from "react-redux";
import useCart from "./hook/useCart";
import { useParams } from "react-router-dom";

const Display = () => {
  const { id } = useParams();
  const { addItemToCart } = useCart();
  const [product, setProduct] = useState({});

  const fetchData = (id) =>
    fetch("http://localhost:8000/api/products/" + id).then((res) => res.json());
  useEffect(() => {
    (async () => {
      const product = await fetchData(id);
      setProduct(product);
    })();
  }, [id]);

  return (
    <>
      <NavbarSearch />
      <main className='default-transition' style={{ opacity: 1 }}>
        <div className='container-fluid disable-text-selection'>
          <div className='row'>
            <div className='col-12'>
              <div className='mb-1'>
                <h1>Product Details</h1>

                <div className='mb-1'>
                  <a
                    className='btn pt-0 pl-0 d-inline-block d-md-none'
                    data-toggle='collapse'
                    href='#displayOptions'
                    role='button'
                    aria-expanded='true'
                    aria-controls='displayOptions'>
                    Display Options
                    <i className='simple-icon-arrow-down align-middle'></i>
                  </a>
                  <div className='collapse d-md-block' id='displayOptions'>
                    <div className='d-block d-md-inline-block'></div>
                  </div>
                </div>
                <div className='separator mb-5'></div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12 list' data-check-all='checkAll'>
              <div className='card mb-4'>
                <div className='position-absolute card-top-buttons'>
                  <button
                    type='button'
                    className='btn btn-success mt-2 mb-1'
                    onClick={() => {
                      addItemToCart(product._id);
                    }}>
                    <i className='simple-icon-basket'></i> {product.price}
                  </button>
                </div>
                <div className='card-body'>
                  <p className='mb-3'>{product.title}</p>

                  <p className='mb-1'>
                    <img
                      src={`/product/${product.photo}`}
                      alt={product.title}
                      className='img-fluid border-radius'
                      width='195'
                      height='182'
                    />
                  </p>
                  <p className='font-weight-bold'>Product Description</p>
                  <p className='mb-3'>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Display;
