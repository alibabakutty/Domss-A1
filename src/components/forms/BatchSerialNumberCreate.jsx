import React, { useEffect, useRef, useState } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate } from 'react-router-dom';
import { createBatchSerialNumberMaster } from '../services/MasterService';

const BatchSerialNumberCreate = () => {
  const [batchSerial, setBatchSerial] = useState({
    batchSerialNumber: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus on the first input field when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []); // Empty dependency array to run only on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatchSerial({ ...batchSerial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBatchSerialNumberMaster(batchSerial);
      console.log(response.data);
      // Reset form after submit
      setBatchSerial({ batchSerialNumber: '' });
      // Focus on the first input field
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error('Error while creating batch category:', error);
    }
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key
      if (e.target.value.trim() !== '') {
        const userConfirmed = window.confirm('Do you want to confirm this submit?');
        if (userConfirmed) {
          // If it's the last input, submit the form
          if (index === inputRefs.current.length - 1) {
            handleSubmit(e);
          }
        }
      }
    } else if (key === 'Escape') {
      navigate('/');
    }
  };

  return (
    <div className='flex'>
      <div className='bg-slate-400 w-[57.62%] h-[92.9vh] border border-r-blue-400'></div>
      <form className='border border-slate-500 w-[36%] absolute left-[54%]' onSubmit={handleSubmit}>
        <div className='text-sm p-3 flex'>
          <label htmlFor="batchSerialNumber" className='w-[30%]'>Batch Serial Number</label>
          <span>:</span>
          <input
            type="text"
            id="batchSerialNumber"
            name="batchSerialNumber"
            value={batchSerial.batchSerialNumber}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            ref={(input) => inputRefs.current[0] = input}
            className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
            autoComplete='off'
          />
        </div>
      </form>
      <RightSideButton />
    </div>
  );
};

export default BatchSerialNumberCreate;
