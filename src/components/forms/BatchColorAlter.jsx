import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBatchColor, updateBatchColorNameMaster } from '../services/MasterService';

const BatchColorAlter = () => {
  const { datas } = useParams();
  const [batchColor, setBatchColor] = useState({
    batchColorName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatchColor({ ...batchColor, [name]: value });
  };

  useEffect(() => {
    const focusAndPulseCursor = () => {
      if (inputRefs.current[0]){
          inputRefs.current[0]?.focus();
          inputRefs.current[0]?.setSelectionRange(0,0);
      }
  }

  setTimeout(focusAndPulseCursor, 100);

  const loadBatchColor = async () => {
    try {
      const result = await getSpecificBatchColor(datas);
      console.log(result.data);
      setBatchColor(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  loadBatchColor();
  },[]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter'){
      e.preventDefault(); // Prevent default form submission on Enter

      // Check if the current input has a value
      if (e.target.value.trim() !== ''){
          // Check if it's the last input field
          if (index === inputRefs.current.length - 1){
          // submit the form
          handleSubmit(e);
          } else{
          // Move focus to the next input
          inputRefs.current[index + 1].focus();
          }
      }
    } else if (key === 'Escape'){
      e.preventDefault();
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm('Do you want to confirm this submit!');
    if (userConfirmed){
        try {
            const response = await updateBatchColorNameMaster(datas, batchColor);
            console.log('Batch color altered successfully!', response.data);
            // Optionally, reset and focus the first input field
            setBatchColor({ batchColorName: '' });

            // Optionally, focus the first input field after reset
            if (inputRefs.current[0]){
                inputRefs.current[0].focus();
            }
        } catch (error) {
            console.error('Error creating batch color master!',error);
        }
    }
    navigate(-1);  // Navigate back after submission
  }
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[54%] h-[92.9vh] border border-r-blue-400'></div>
        <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]'  onSubmit={handleSubmit}>
          <div className='text-sm p-3 flex'>
            <label htmlFor="batchColorName" className='w-[30%]'>Batch Color Name</label>
            <span>:</span>
            <input type="text" id='batchColorName' name='batchColorName' value={batchColor.batchColorName} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 0)} ref={input => inputRefs.current[0] = input} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default BatchColorAlter