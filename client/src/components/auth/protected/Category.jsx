import React, { useState } from "react";
import Sidebar from "./Sidebar";

import AddCategoryLayout from "./AddCategoryLayout";
import { Navbar } from "./Navbar";

const Category = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <AddCategoryLayout />
      </main>
    </>
  );
};

export default Category;
