import React from "react";

const Alert = () => {
  return (
    <>
      <div
        className='modal fade bd-example-modal-lg'
        tabIndex='-1'
        id='alertmodal'
        role='dialog'
        style={{ display: "none" }}
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                Are You Sure Want to Delete this Item?
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <button
                type='button'
                className='btn btn-default'
                data-dismiss='modal'>
                Cancel
              </button>
              <button
                type='button'
                name='ok_button'
                id='ok_button'
                data-dismiss='modal'
                className='btn btn-danger'>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
