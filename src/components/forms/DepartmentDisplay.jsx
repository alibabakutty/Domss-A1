import React, { useEffect, useRef, useState } from 'react'
import { createDepartmentMaster, getSpecificDepartment } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
import { useParams } from 'react-router-dom';

const DepartmentDisplay = () => {

    const { type } = useParams();
  const [department, setDepartment] = useState({
    departmentName: ''
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadDepartment = async () => {
        try {
            const result = await getSpecificDepartment(type);
            console.log(result.data);
            setDepartment(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    loadDepartment();
  },[]);
  
  return (
    <>
      <form className='border border-slate-500 w-[50%] h-[10vh]'>
        <div className='text-sm p-3 flex'>
          <label htmlFor="departmentName" className='w-[30%]'>Department Name</label>
          <span>:</span>
          <input type="text" id='departmentName' name='departmentName' value={department.departmentName} ref={el => (inputRefs.current[0] = el)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
        </div>
      </form>
      <RightSideButton />
    </>
  )
}

export default DepartmentDisplay