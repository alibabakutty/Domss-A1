import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificProjectName } from '../services/MasterService';

const ProjectNameDisplay = () => {

  const { datas } = useParams();
  const [projectName, setProjectName] = useState({
    projectName: '',
    projectCategoryName: ''
  });
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

   const loadProjectNames = async () => {
    try {
      const result = await getSpecificProjectName(datas);
      console.log(result.data);
      setProjectName(result.data);
    } catch (error) {
      console.error(error);
    }
   }
   loadProjectNames();

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
  }, [datas, navigate]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter') {
      e.preventDefault();    // Prevent default form submission on Enter

      if (e.target.value.trim() !== '') {
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          // Move to the next field if the current field is not the last one
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0,0);
        }
      } 
    } else if (key === 'Backspace') {
      const input = inputRefs.current[index];
      const value = input.value;
      const cursorPosition = input.selectionStart;
      if (cursorPosition === 0 && value.length !== 0) {
        const prevField = index - 1;
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
          e.preventDefault();
        }
      } else if (e.target.value !== '') {
        return;
      } else {
        const prevField = index - 1;
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField].focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
          e.preventDefault();
        }
      }
    }
  };

  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[50%] h-[92.9vh] border border-r-blue-400'></div>
        <form className='border border-slate-500 w-[40%] h-[11vh] absolute left-[50%]'>
          <div className='text-sm pl-3 mt-2 flex'>
            <label htmlFor="projectName" className='w-[30%]'>Project Name</label>
            <span>:</span>
            <input type="text" id='projectName' name='projectName' value={projectName.projectName} ref={input => inputRefs.current[0] = input} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex pl-3'>
            <label htmlFor="projectCategoryName" className='w-[29.3%]'>Under</label>
            <span>:</span>
            <input type="text" id='projectCategoryName' name='projectCategoryName' value={projectName.projectCategoryName} ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default ProjectNameDisplay;
