import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificGroupName, updateGroupMaster } from '../services/MasterService';
import GroupMenu from '../../assets/GroupMenu';

const GroupAlter = () => {

  const { datas } = useParams();

  const [group, setGroup] = useState({
    groupName: '',
    under: ''
  });

  const [groupFocused, setGroupFocused] = useState(false);
  const [highlightedSuggestionGroup, setHighlightedSuggestionGroup] = useState(6);
  const [groupSuggestion, setGroupSuggestion] = useState(GroupMenu);
  const inputRefs = useRef([]);
  const groupOptionsRef = useRef(null);
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

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    if (name === 'under'){
      const filtered = GroupMenu.filter(group => 
        group?.label.toLowerCase().includes(value.toLowerCase())
      );
      setGroupSuggestion(filtered);
      setGroupFocused(true);
    }
  };

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
          const userConfirmed = window.confirm('Do you want to confirm this submit?')
          if (userConfirmed){
            handleSubmit(e);
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

  const handleKeyDownGroup = (e) => {
    const key = e.key;
  
    if (key === 'Enter') {
      e.preventDefault(); // Prevent default action
  
      // Select highlighted suggestion if suggestion box is open
      if (groupFocused && groupSuggestion.length > 0) {
        suggestionGroupClick(highlightedSuggestionGroup);
      }
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      // Move highlight down
      setHighlightedSuggestionGroup((prevIndex) => 
        Math.min(prevIndex + 1, groupSuggestion.length - 1)
      );
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      // Move highlight up
      setHighlightedSuggestionGroup((prevIndex) => 
        Math.max(prevIndex - 1, 0)
      );
    } else if (key === 'Backspace'){
      e.preventDefault();
      const currentInputIndex = 1;  // Adjust to the current input index for under

      // Get the current input value
      const currentInputValue = inputRefs.current[currentInputIndex].value;

      if (currentInputValue !== '' && currentInputIndex > 0){
        // Remove the last character from the current input value
        inputRefs.current[currentInputIndex - 1]?.focus();
        inputRefs.current[currentInputIndex - 1]?.setSelectionRange(0, 0);
      }
    }
  };
  
  const suggestionGroupClick = (index) => {
    setGroup((prevState) => ({
      ...prevState,
      under: groupSuggestion[index].label,
    }));
    setGroupFocused(false);
  
    // Refocus the 'under' input
    if (inputRefs.current[2]) {
      inputRefs.current[2]?.focus();
      inputRefs.current[2].setSelectionRange(0,0);
    }
  };  

  const handleSubmit = async () => {
    try {
      const response = await updateGroupMaster(datas, group);
      console.log(response.data);
      navigate(-1);
    } catch (error) {
      console.error(error); // Handle errors appropriately
      // Optionally display a message to the user here
    }
  };
  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[42.5%] h-[32vh] absolute left-[47.5%]' onSubmit={handleSubmit}>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="groupName" className='w-[45%]'>Name</label>
            <span>:</span>
            <input type="text" name='groupName' ref={(input) => (inputRefs.current[0] = input)} onKeyDown={(e) => handleKeyDown(e, 0)} value={group.groupName} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="under" className='w-[45%]'>Under</label>
            <span>:</span>
            <input type="text" name='under' ref={(input) => (inputRefs.current[1] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDownGroup(e, 1)} value={group.under} onFocus={() => setGroupFocused(true)} onBlur={() => setGroupFocused(false)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          {groupFocused && groupSuggestion.length > 0 && (
            <div className='w-[200px] h-[92.5vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute top-0 left-[420px]'>
              <div className='text-left bg-[#003285] text-[13.5px] text-white pl-2'>
                <p>List of Groups</p>
              </div>
              <ul className='suggestions w-full h-[87vh] text-left text-sm mt-2 overflow-y-scroll' ref={groupOptionsRef}>
                {groupSuggestion.map((group,index) => (
                  <li key={index} tabIndex={0} className={`pl-2 cursor-pointer hover:bg-yellow-200 ${highlightedSuggestionGroup === index ? 'bg-yellow-200' : ''}`} onClick={() => suggestionGroupClick(index)} onMouseDown={(e) => e.preventDefault()}>
                    {group.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="behavesLikeSubLedger" className='w-[45%]'>Group behaves like a sub-ledger</label>
            <span>:</span>
            <input type="text" name='behavesLikeSubLedger' ref={(input) => (inputRefs.current[2] = input)} onKeyDown={(e) => handleKeyDown(e, 2)} value={group.behavesLikeSubLedger} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="nettDebitOrCreditBalance" className='w-[45%]'>Nett Debit/Credit Balances for Reporting</label>
            <span>:</span>
            <input type="text" name='nettDebitOrCreditBalance' ref={(input) => (inputRefs.current[3] = input)} onKeyDown={(e) => handleKeyDown(e, 3)} value={group.nettDebitOrCreditBalance} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="usedForCalculation" className='w-[45%]'>Used for Calculation</label>
            <span>:</span>
            <input type="text" name='usedForCalculation' ref={(input) => (inputRefs.current[4] = input)} onKeyDown={(e) => handleKeyDown(e, 4)} value={group.usedForCalculation} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="methodToAllocateForPurchaseInvoice" className='w-[45%]'>Method to allocate when used in purchase invoice</label>
            <span>:</span>
            <input type="text" name='methodToAllocateForPurchaseInvoice' ref={(input) => (inputRefs.current[5] = input)} onKeyDown={(e) => handleKeyDown(e, 5)} value={group.methodToAllocateForPurchaseInvoice} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default GroupAlter