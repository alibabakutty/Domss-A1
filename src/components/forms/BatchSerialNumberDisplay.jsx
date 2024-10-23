import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBatchSerialNumber } from '../services/MasterService';

const BatchSerialNumberDisplay = () => {

    const { datas } = useParams();
  const [batchSerial, setBatchSerial] = useState({
    batchSerialNumber: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadBatchSerial = async () => {
      try {
        const result = await getSpecificBatchSerialNumber(datas);
        console.log(result.data);
        setBatchSerial(result.data);
      } catch (error) {
        
      }
    }

    loadBatchSerial();

    // Event listener for Escape key to go back to the previous page
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        navigate(-2); // Go back to the previous page
      }
    };

    // Attach the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[datas,navigate]);

  
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[54%] h-[92.9vh] border border-r-blue-400'></div>    
        <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]'>
          <div className='text-sm p-3 flex'>
            <label htmlFor="batchSerialNumber" className='w-[30%]'>Batch Serial Number</label>
            <span>:</span>
            <input type="text" id='batchSerialNumber' name='batchSerialNumber' value={batchSerial.batchSerialNumber}  ref={input => inputRefs.current[0] = input} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default BatchSerialNumberDisplay