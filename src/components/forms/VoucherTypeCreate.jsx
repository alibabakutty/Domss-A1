import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'

const VoucherTypeCreate = () => {

  const [voucher, setVoucher] = useState({
    voucherTypeName: '',
    voucherType: '',
    startingNumber: '',
    startingDate: '',
    periodicity: '',
    prefixParticulars: '',
    suffixParticulars: '',
    displaySequence: ''
  });

  const inputRefs = useRef({
    voucherTypeName: null,
    voucherType: null,
    startingNumber: null,
    startingDate: null,
    periodicity: null,
    prefixParticulars: null,
    suffixParticulars: null,
    displaySequence: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoucher((prevVoucher) => ({
      ...prevVoucher, [name]: value 
    }))
  };

  useEffect(() => {
    if (inputRefs.current.voucherTypeName){
      inputRefs.current.voucherTypeName.focus();
    }
  },[]);

  return (
    <>
      <div className="#FFF5E1 w-[90%] h-[90vh]">
        <form action="">
          <div className='w-[110%] h-[10vh] border border-b-slate-300'>
            <label htmlFor="voucherTypeName" className='mr-5 mt-3 ml-1'>Name</label>
            <span>:</span>
            <input type="text" id='voucherTypeName' name='voucherTypeName' value={voucher.voucherTypeName} ref={(input) => (inputRefs.current.voucherTypeName = input)} onChange={handleChange} className='w-[350px] ml-2 pl-1 mt-3 h-5 capitalize text-sm font-medium focus:bg-yellow-200 focus:border focus:border-blue-500 outline-none' autoComplete='off' />
          </div>
          <div className='flex text-sm h-[80vh]'>
            <div className='general w-[45%] border border-r-slate-200'>
              <p className='underline text-center font-medium'>General</p>
              <div className='flex'>
                <label htmlFor="voucherType" className='w-[15%] ml-1'>Under</label>
                <span>:</span>
                <input type="text" id='voucherType' name='voucherType' value={voucher.voucherType} ref={(input) => (inputRefs.current.voucherType = input)} onChange={handleChange} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 outline-none' />
              </div>
            </div>
            <div className='w-[40%] border border-r-slate-200'>
              <p className='underline text-center font-medium'>Sequence Making</p>
              <div className='flex'>
                <label htmlFor="startingNumber" className='w-[45%] ml-1'>Starting Number</label>
                <span>:</span>
                <input type="text" id='startingNumber' name='startingNumber' value={voucher.startingNumber} ref={(input) => (inputRefs.current.startingNumber = input)} onChange={handleChange} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 outline-none' />
              </div>
              <div>
                <p className='underline font-medium'>Restart Numbering</p>
              </div>
              <div className='flex'>
                <label htmlFor="startingDate" className='w-[45%] ml-1'>Starting Date</label>
                <span>:</span>
                <input type="text" id='startingDate' name='startingDate' value={voucher.startingDate} ref={(input) => (inputRefs.current.startingDate = input)} onChange={handleChange} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 outline-none' />
              </div>
              <div className='flex'>
                <label htmlFor="periodicity" className='w-[45%] ml-1'>Periodicity</label>
                <span>:</span>
                <input type="text" id='periodicity' name='periodicity' value={voucher.periodicity} ref={(input) => (inputRefs.current.periodicity = input)} onChange={handleChange} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 outline-none' />
              </div>
              <div>
                <p className='underline font-medium'>Prefix Details</p>
              </div>
              <div className='flex'>
                <label htmlFor="prefixParticulars" className='w-[45%] ml-1'>Particulars</label>
                <span>:</span>
                <input type="text" id='prefixParticulars' name='prefixParticulars'  value={voucher.prefixParticulars} ref={(input) => (inputRefs.current.prefixParticulars = input)} onChange={handleChange} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 outline-none' />
              </div>
              <div>
                <p className='underline font-medium'>Suffix Details</p>
              </div>
              <div className='flex'>
                <label htmlFor="suffixParticulars" className='w-[45%] ml-1'>Particulars</label>
                <span>:</span>
                <input type="text" id='suffixParticulars' name='suffixParticulars' value={voucher.suffixParticulars} ref={(input) => (inputRefs.current.suffixParticulars = input)} onChange={handleChange} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 outline-none' />
              </div>
            </div>
            <div className='w-[20%]'>
              <p className='underline font-medium ml-28'>Display Sequence</p>
              <div className='ml-12'>
                <input type="text" id='displaySequence' name='displaySequence'  value={voucher.displaySequence} ref={(input) => (inputRefs.current.displaySequence = input)} onChange={handleChange} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 outline-none' />
              </div>
            </div>
          </div>
          
        </form>
      </div>
      <RightSideButton />
    </>
  )
}

export default VoucherTypeCreate