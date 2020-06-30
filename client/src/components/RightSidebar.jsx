import React from "react";

const LeftSidebar = () => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Client FeedBack</h5>

        <div className='scroll dashboard-list-with-user ps ps--active-y'>
          <div className='d-flex flex-row mb-3 pb-3 border-bottom'>
            <div className='pl-3'>
              <a href='#'>
                <p className='font-weight-medium mb-0 '>Well Recomended</p>
              </a>
            </div>
          </div>

          <div className='pl-3'>
            <a href='#'>
              <p className='font-weight-medium mb-0 '>Awesome Service</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
