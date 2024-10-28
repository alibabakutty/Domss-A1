import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificGroupName } from '../services/MasterService';

const GroupDisplay = () => {

  const { datas } = useParams();

  const [group, setGroup] = useState({
    groupName: '',
    under: '',
    behavesLikeSubLedger: '',
    nettDebitOrCreditBalance: '',
    usedForCalculation: '',
    methodToAllocateForPurchaseInvoice: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadGroups = async () => {
        try {
            const result = await getSpecificGroupName(datas);
            console.log(result.data);
            setGroup(result.data);
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
        } else if (e.target.name === 'methodToAllocateForPurchaseInvoice'){
          // Show confirmation dialog only if methodtoallocateforpurchaseinvoice is filled
          const userConfirmed = window.confirm('Do you want to exist this form?')
          if (userConfirmed) {
            navigate(-1);
          } else {
            e.preventDefault();
          }
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() !== '' && index > 0){
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
  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[42.5%] h-[32vh] absolute left-[47.5%]'>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="groupName" className='w-[45%]'>Name</label>
            <span>:</span>
            <input type="text" name='groupName' ref={(input) => (inputRefs.current[0] = input)} onKeyDown={(e) => handleKeyDown(e, 0)} value={group.groupName}  className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="under" className='w-[45%]'>Under</label>
            <span>:</span>
            <input type="text" name='under' ref={(input) => (inputRefs.current[1] = input)}  onKeyDown={(e) => handleKeyDown(e, 1)} value={group.under} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="behavesLikeSubLedger" className='w-[45%]'>Group behaves like a sub-ledger</label>
            <span>:</span>
            <input type="text" name='behavesLikeSubLedger' ref={(input) => (inputRefs.current[2] = input)} onKeyDown={(e) => handleKeyDown(e, 2)} value={group.behavesLikeSubLedger}  className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="nettDebitOrCreditBalance" className='w-[45%]'>Nett Debit/Credit Balances for Reporting</label>
            <span>:</span>
            <input type="text" name='nettDebitOrCreditBalance' ref={(input) => (inputRefs.current[3] = input)} onKeyDown={(e) => handleKeyDown(e, 3)} value={group.nettDebitOrCreditBalance}  className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="usedForCalculation" className='w-[45%]'>Used for Calculation</label>
            <span>:</span>
            <input type="text" name='usedForCalculation' ref={(input) => (inputRefs.current[4] = input)} onKeyDown={(e) => handleKeyDown(e, 4)} value={group.usedForCalculation}  className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="methodToAllocateForPurchaseInvoice" className='w-[45%]'>Method to allocate when used in purchase invoice</label>
            <span>:</span>
            <input type="text" name='methodToAllocateForPurchaseInvoice' ref={(input) => (inputRefs.current[5] = input)} onKeyDown={(e) => handleKeyDown(e, 5)} value={group.methodToAllocateForPurchaseInvoice}  className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default GroupDisplay