import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { createGroupMaster, getSpecificGroupName, updateGroupMaster } from '../services/MasterService';

const GroupAlter = () => {

  const { datas } = useParams();

  const [group, setGroup] = useState({
    groupName: '',
    under: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadGroups = async () => {
        try {
            const response = await getSpecificGroupName(datas);
            console.log(response.data);
            setGroup(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    loadGroups();
  }, []);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      (e).preventDefault();

      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField]?.focus();
          inputRefs.current[nextField]?.setSelectionRange(0, 0);
        } else if (e.target.name === 'under'){
          // Show confirmation dialog only if revenueCategoryName is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?');
          if (userConfirmed) {
            handleSubmit(e);
          } else {
            (e).preventDefault();
          }
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        (e).preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField]?.setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape'){
      navigate(-1);
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    (e).preventDefault();
    try {
      const response = await updateGroupMaster(datas, group);
      console.log(response.data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[42.5%] h-[12vh] absolute left-[47.5%]' onSubmit={handleSubmit}>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="groupName" className='w-[15%]'>Name</label>
            <span>:</span>
            <input type="text" name='groupName' ref={(input) => (inputRefs.current[0] = input)} onKeyDown={(e) => handleKeyDown(e, 0)} value={group.groupName} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="under" className='w-[15%]'>Under</label>
            <span>:</span>
            <input type="text" name='under' ref={(input) => (inputRefs.current[1] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 1)} value={group.under} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default GroupAlter