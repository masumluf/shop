import React from "react";

import ProfitSearch from "./ProfitSearch";
import ProfitList from "./ProfitList";

import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

export const Profit = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <ProfitSearch />
        <div className='row'>
          <div className='col-12'>
            <ProfitList />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profit;
