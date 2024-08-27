import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBatchSize } from '../services/MasterService';

const BatchSizeDisplay = () => {

    const { datas } = useParams();
  const [batchSize, setBatchSize] = useState({
    batchSizeName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadBatchSize = async () => {
      try {
        const result = await getSpecificBatchSize(datas);
        console.log(result.data);
        setBatchSize(result.data);
      } catch (error) {
        
      }
    }

    loadBatchSize();

    // Event listener for Escape key to go back to the previous page
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        navigate(-1); // Go back to the previous page
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
            <label htmlFor="batchSizeName" className='w-[30%]'>Batch Size Name</label>
            <span>:</span>
            <input type="text" id='batchSizeName' name='batchSizeName' value={batchSize.batchSizeName}  ref={input => inputRefs.current[0] = input} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default BatchSizeDisplay