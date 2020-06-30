import React, { useState } from "react";

import Sidebar from "./Sidebar";

import AddProductLayout from "./AddProductLayout";
import { Navbar } from "./Navbar";

const Home = () => {
  const [state, setState] = useState({});

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const { activeItem } = state;
  return (
    <>
      <Navbar />
      <Sidebar />
      <AddProductLayout />
    </>
  );
};

export default Home;
