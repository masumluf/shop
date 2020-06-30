import React, { Component } from "react";

import LoaderGif from "./assest/loader.gif";

export const Loader = () => {
  return (
    <>
      <div className='loader-container'>
        <div className='loader'>
          <img src={LoaderGif} />
        </div>
      </div>
    </>
  );
};

export default Loader;
