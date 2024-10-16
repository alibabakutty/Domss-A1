import React, { useEffect, useRef, useState } from 'react'
import { getSpecificDepartment } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentDisplay = () => {

    const { datas } = useParams();
  const [department, setDepartment] = useState({
    departmentName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadDepartment = async () => {
        try {
            const result = await getSpecificDepartment(datas);
            console.log(result.data);
            setDepartment(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    loadDepartment();

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

  },[datas, navigate]);
  
  return (
    <>
      <div className='flex'>
      <div className='bg-slate-400 w-[54.95%] h-[92.9vh] border border-r-blue-400'></div>
      <form className='border border-slate-500 w-[35%] h-[10vh] absolute left-[55%]'>
        <div className='text-sm p-3 flex'>
          <label htmlFor="departmentName" className='w-[30%]'>Department Name</label>
          <span>:</span>
          <input type="text" id='departmentName' name='departmentName' value={department.departmentName} ref={el => (inputRefs.current[0] = el)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border-transparent' autoComplete='off' readOnly />
        </div>
      </form>
      <RightSideButton />
      </div>
    </>
  )
}

export default DepartmentDisplay