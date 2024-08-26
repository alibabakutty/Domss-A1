import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate } from 'react-router-dom';
import { createProjectCategoryMaster } from '../services/MasterService';

const ProjectCategoryCreate = () => {
  const [projectCategory, setProjectCategory] = useState({
    projectCategoryName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setProjectCategory({
      ...projectCategory,
      [name]: value
    });
  };

  useEffect(() =>{
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);

  const handleSubmit = async (e) =>{
    (e).preventDefault();

    try {
      const response = await createProjectCategoryMaster(projectCategory);
      console.log(response.data);
      // After the submit
      setProjectCategory({
        projectCategoryName: ''
      });
      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e,index) => {
    const key = e.key;
    if (key === 'Enter'){
      e.preventDefault();    // Prevent default form submission on Enter
      // Only show confirmation if the input field is not empty
      if (e.target.value.trim() !== ''){
        const userConfirmed = window.confirm('Do you want to confirm this submit?');
        if (userConfirmed){
          // Check if it's the last input field
          if (index === inputRefs.current.length - 1){
            handleSubmit(e);
          }
        }
      }
    } else if (key === 'Escape'){
      navigate('/');
    }
  }
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[57.62%] h-[92.9vh] border border-r-blue-400'></div>
        <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]' onSubmit={handleSubmit}>
          <div className='text-sm p-3 flex'>
            <label htmlFor="projectCategoryName" className='w-[35%]'>Project Category Name</label>
            <span>:</span>
            <input type="text" id='projectCategoryName' name='projectCategoryName' value={projectCategory.projectCategoryName} onChange={handleInputChange} ref={el => inputRefs.current[0] = el} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default ProjectCategoryCreate