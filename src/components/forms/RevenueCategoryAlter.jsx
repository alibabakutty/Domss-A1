import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';
import { getSpecificRevenueCategory, updateRevenueCategoryMaster } from '../services/MasterService';

const RevenueCategoryAlter = () => {

    const { datas } = useParams();
    const [revenueCategory, setRevenueCategory] = useState({
        revenueCategoryName: ''
    });

    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleInputChange = e => {
        const {name,value} = e.target;
        setRevenueCategory({
          ...revenueCategory,
        [name]: value,    
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
    
        const loadRevenueCategory = async () => {
          try {
            const result = await getSpecificRevenueCategory(datas);
            console.log(result.data);
            setRevenueCategory(result.data);
          } catch (error) {
            console.error(error);
          }
        }
    
        loadRevenueCategory();
      },[]);

      const handleSubmit = async e => {
        e.preventDefault();
    
        const userConfirmed = window.confirm('Do you want to confirm this submit!');
        if (userConfirmed){
          try{
            const response = await updateRevenueCategoryMaster(datas, revenueCategory);
            console.log('Godown altered successfully!',response.data);
      
            if (inputRefs.current[0]){
              inputRefs.current[0].focus();
            }
      
          }catch(error){
            console.error(error);
          }
        }
        navigate(-1);
    };

    const handleKeyDown = (e,index) => {
        const key = e.key;
    
        if (key === 'Enter'){
          if (e.target.value.trim() !== ''){
            handleSubmit(e);  // call handlesubmit if it's the last field
          }
          
        } else if (key === 'Escape'){
          navigate(-1);
        }
      }
  return (
    <>
        <div className='flex'>
            <div className='bg-slate-400 w-[54%] h-[92.9vh] border border-r-blue-400'></div>
            <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]' onSubmit={handleSubmit}>
                <div className='text-sm p-3 flex'>
                    <label htmlFor="revenueCategoryName">Revenue Category Name</label>
                    <span>:</span>
                    <input type="text" id='revenueCategoryName' name="revenueCategoryName" value={revenueCategory.revenueCategoryName} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e,0)} ref={(input) => (inputRefs.current[0] = input)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
            </form>
            <RightSideButton />
      </div>
    </>
  )
}

export default RevenueCategoryAlter