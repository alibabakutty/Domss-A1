import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { getSpecificHeadOffice, updateHeadOfficeMaster } from '../services/MasterService';
import { useNavigate, useParams } from 'react-router-dom';

const HeadOfficeAlter = () => {

    const { type } = useParams();
  const [headOffice, setHeadOffice] = useState({
    headOfficeName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = e => {
    const {name,value} = e.target;
    setHeadOffice({
        ...headOffice,
        [name]: value
    })
  };

  useEffect(() => {
    const focusAndPulseCursor = () => {
        if (inputRefs.current[0]){
          inputRefs.current[0].focus();
          inputRefs.current[0].setSelectionRange(0, 0);
        }
      }
      setTimeout(focusAndPulseCursor, 100);

    const loadHeadOffice = async () => {
        try {
            const result = await getSpecificHeadOffice(type);
            console.log(result.data);
            setHeadOffice(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    loadHeadOffice();
  },[]);

  const handleSubmit = async e => {
    e.preventDefault();

    const userConfirmed = window.confirm('Do you want to confirm this submit!');
    if (userConfirmed){
      try{
        const response = await updateHeadOfficeMaster(type, headOffice);
        console.log('Godown altered successfully!',response.data);
  
        if (inputRefs.current[0]){
          inputRefs.current[0].focus();
        }
  
      }catch(error){
        console.error(error);
      }
    }
    navigate(-1);
  }

  const handleKeyDown = (e,index) => {
    const key = e.key;

    if (key === 'Enter'){
      if (e.target.value.trim() !== ''){
        handleSubmit(e);  // call handlesubmit if it's the last field
      }
      
    }
  }
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[54%] h-[92.9vh] border border-r-blue-400'></div>   
        <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]' onSubmit={handleSubmit}>
          <div className='text-sm p-3 flex'>
            <label htmlFor="headOfficeName" className='w-[30%]'>Head Office Name</label>
            <span>:</span>
            <input type="text" id='headOfficeName' name='headOfficeName' value={headOffice.headOfficeName} onChange={handleInputChange} onKeyDown={e => handleKeyDown(e, 0)} ref={el => inputRefs.current[0] = el} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default HeadOfficeAlter