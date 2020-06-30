import React, { useState } from "react";
import { Grid, Segment, Container } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import { Navbar } from "./Navbar";

const Home = () => {
  const [state, setState] = useState({});

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const { activeItem } = state;
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
};

export default Home;
