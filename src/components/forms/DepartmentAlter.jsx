import React, { useEffect, useRef, useState } from 'react'
import { getSpecificDepartment, updateDepartmentMaster } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentAlter = () => {

    const { type } = useParams();
  const [department, setDepartment] = useState({
    departmentName: ""
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const focusAndPulseCursor = () => {
        if (inputRefs.current[0]){
            inputRefs.current[0].focus();
            inputRefs.current[0].setSelectionRange(0,0);
          }
    }

    setTimeout(focusAndPulseCursor, 100);

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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setDepartment(prev => ({
        ...prev,
        [name]: value
    }));
};

  const handleKeyDown = (e,index) => {
    const key = e.key;
    if (key === 'Enter') {
        if (e.target.value.trim() !== ''){
            handleSubmit(e);  // call handlesubmit if it's the last field
        }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm('Do you want to confirm this submit!');

    if (userConfirmed){
        try {
            const response = await updateDepartmentMaster(type, department)
            console.log('Department master altered successfully!',response.data);

            // Optionally, focus the first input field after reset
            if (inputRefs.current[0]){
                inputRefs.current[0].focus();
            }
        } catch (error) {
            console.error('Error creating department master!', error);
        }
    }
    navigate(-1);
  };
  
  return (
    <>
      <form className="border border-slate-500 w-[50%] h-[10vh]" onSubmit={handleSubmit}>
        <div className="text-sm p-3 flex">
          <label htmlFor="departmentName" className="w-[30%]">
            Department Name
          </label>
          <span>:</span>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            value={department.departmentName}
            onChange={handleInputChange}
            ref={el => (inputRefs.current[0] = el)}
            onKeyDown={e => handleKeyDown(e, 0)}
            className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
            autoComplete="off"
          />
        </div>
      </form>
      <RightSideButton />
    </>
  );
}

export default DepartmentAlter