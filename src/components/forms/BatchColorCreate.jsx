import React, { useEffect, useRef, useState } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate } from 'react-router-dom';
import { createBatchColorMaster } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const BatchColorCreate = () => {
  const [batchColor, setBatchColor] = useState({
    batchColorName: ''
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
    setBatchColor({ ...batchColor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBatchColorMaster(batchColor);
      console.log(response.data);
      // Reset form after submit
      setBatchColor({ batchColorName: '' });
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
      <LeftSideMenu />
      <form className='border border-slate-500 w-[45.5%] h-[10vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
        <div className='text-sm pl-3 mt-4 flex'>
          <label htmlFor="batchColorName" className='w-[25%]'>Batch Color Name</label>
          <span>:</span>
          <input
            type="text"
            id="batchColorName"
            name="batchColorName"
            value={batchColor.batchColorName}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            ref={(input) => inputRefs.current[0] = input}
            className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
            autoComplete='off'
          />
        </div>
      </form>
      <RightSideButton />
    </div>
  );
};

export default BatchColorCreate;
