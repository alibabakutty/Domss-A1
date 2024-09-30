import React from 'react'

const StockGroupCreate = () => {
  return (
    <>
      <div>
        <div>
          <label htmlFor="">Name</label>
          <span>:</span>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">alias</label>
          <span>:</span>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Under</label>
          <span>:</span>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Should quantities of items be added</label>
          <span>:</span>
          <input type="text" />
        </div>
        <p className='underline'>Statutory Details</p>
        <div>
          <p>HSN/SAC & Related Details</p>
          <div>
            <label htmlFor="">HSN/SAC Details</label>
            <span>:</span>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Source of Details</label>
            <span>:</span>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">HSN/SAC</label>
            <span>:</span>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <span>:</span>
            <input type="text" />
          </div>
        </div>
      </div>
    </>
  )
}

export default StockGroupCreate