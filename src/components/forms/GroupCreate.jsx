import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import GroupMenu from '../../assets/GroupMenu'

const GroupCreate = () => {
  const [options, setOptions] = useState(GroupMenu);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [aliasOption, setAliasOption] = useState(false);
  const [renderOption, setRenderOption] = useState({
    value: 'Capital Accounts',
    label: 'Capital Accounts',
    alias: '',
    firstDiv: 'false',
    secondDiv: 'true',
    thirdDiv: 'false'
  });

  const [groupData, setGroupData] = useState({
    groupName: '',
    aliasName: '',
    underGroup: 'Capital Accounts',
    natureOfGroup: 'no',
    grossProfit: 'no',
    subLedger: 'no',
    nettReporting:'no',
    usedForCalculation: 'no',
    purchaseInvoice: 'not applicable',
    hsnDetails: 'as per company group',
    hsnNumber: '',
    hsnDescription: '',
    gstRateDetails: 'as per company group',
    taxType: '',
    natureOfTransaction: '',
    igstRate: '',
    cgstRate: '',
    sgstRate: '',
  });

  const inputRefs = {
    groupName: useRef(null),
    aliasName: useRef(null),
    underGroup: useRef(null),
    natureOfGroup: useRef(null),
    grossProfit: useRef(null),
    subLedger: useRef(null),
    nettReporting: useRef(null),
    usedForCalculation: useRef(null),
    purchaseInvoice: useRef(null),
    hsnDetails: useRef(null),
    hsnNumber: useRef(null),
    hsnDescription: useRef(null),
    gstRateDetails: useRef(null),
    taxType: useRef(null),
    natureOfTransaction: useRef(null),
    igstRate: useRef(null),
    cgstRate: useRef(null),
    sgstRate: useRef(null)
  };

  const handleSelect = (option) => {
    const menu = option.label === 'Primary' ? `♦ ${option.label}` : option.label;
    setGroupData({ ...groupData, underGroup: menu});
    setAliasOption(option.alias || '');
    setRenderOption(option);
    setOpen(false);
    inputRefs.underGroup.current.blur();
  };

  const handleInputKeyDown = (e, fieldName) => {
    if (e.key ==='Tab' || e.key === 'Enter'){
      if (!groupData.groupName.trim()){
        e.preventDefault();
        alert('please enter name!');
      } else if (e.key === 'Enter'){
        e.preventDefault();
        const fieldNames = Object.keys(inputRefs);
        const index = fieldNames.indexOf(fieldName);
        if (index === fieldNames.length - 1){
          setSubmitted(true);
        } else{
          const nextField = getNextField(fieldName);
          if (nextField !== null && inputRefs[nextField] && inputRefs[nextField].current){
            inputRefs[nextField].current.focus();
          } else {
            setSubmitted(true);
          }
        }
      }
    }
  };

  const getNextField = (fieldName) => {
    const fieldNames = Object.keys(inputRefs);
    const index = fieldNames.indexOf(fieldName);
    for (let i = index + 1; i < fieldNames.length; i++){
      const nextField = fieldNames[i];
      if ((renderOption.firstDiv && ['natureOfGroup', 'grossProfit'].includes(nextField)) || (renderOption.secondDiv && ['name', 'aliasName', 'underGroup', 'subLedger', 'debitCreditBalance', 'usedForCalculation', 'purchaseInvoice'].includes(nextField)) || (renderOption.thirdDiv && ['hsnDetails', 'hsnNumber', 'hsnDescription', 'gstRateDetails', 'taxType', 'gstRate'].includes(nextField))){
        return nextField;
      }
    }
    return null;
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setGroupData({ ...groupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupData.groupName.trim()){
      e.preventDefault();
    } else {
      const data = {
        value: groupData.groupName,
        label: groupData.groupName,
        alias: "(" + groupData.underGroup + ")",
        firstDiv: renderOption.firstDiv,
        secondDiv: renderOption.secondDiv,
        thirdDiv: renderOption.thirdDiv,
      };

      setOptions((prevItems) => 
      [...prevItems, data].sort((a,b) => {
        if (a.value === 'primary') return -1;
        if (b.value === 'primary') return 1;
        return a.label.localeCompare(b.label);
      })
      );
    }
    setSubmitted(false);
  };

  useEffect(() => {
    if (groupData.underGroup.trim() === 'Capital Accounts'){
      setFilteredOptions(options);
    } else {
      const filterArray = options.filter(list => list.label.toLowerCase().includes(groupData.underGroup.toLowerCase()));
      setFilteredOptions(filterArray);
    }
  }, [groupData.underGroup, options]);

  const handleFocus = (e) => {
    if (!isDelete){
      setIsDelete(true);
      setGroupData({...groupData, [e.target.name]: ''});
    }
    inputRefs.underGroup.current.setSelectionRange(0,0);
    if (!isDelete){
      setIsDelete(true);
      setGroupData({...groupData, [e.target.name]: ''});
    }
    setOpen(true);
    setIsDelete(false);
  };

  console.log(groupData);
  return (
    <>
      <div>
        <div className='w-[50%] h-[92.9vh] border border-r-slate-400'>
          <form action="">
            <div className='flex leading-4 mt-1'>
              <label htmlFor="groupName" className='w-[6%] text-left text-sm'>Name</label>
              <span className='w-1/12 text-right mr-0.5'>:</span>
              <input type="text" id="groupName" name="groupName" value={groupData.groupName} onKeyDown={(e) => handleInputKeyDown(e, "groupName")} ref={inputRefs.groupName} onChange={handleInputChange} autoFocus className='w-1/2 p-0.5 cursor-default border border-transparent focus:border focus:bg-[#fee8af] focus:border-blue-500 text-sm font-semibold h-[18px] outline-none capitalize' autoComplete='off' />
            </div>
            
            <div className='flex leading-4'>
              <label htmlFor="aliasName" className='w-[6%] text-left italic text-sm'>(alias)</label>
              <span className='w-1/12 text-right mr-0.5'>:</span>
              <input type="text" id="aliasName" name="aliasName" value={groupData.aliasName} ref={inputRefs.aliasName} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "aliasName")} className='w-1/2 p-0.5 cursor-default border focus:border focus:bg-[#fee8af] focus:border-blue-500 text-sm font-semibold h-[18px] outline-none border-transparent capitalize' autoComplete='off' />
            </div>

            <div className='flex leading-4'>
              <label htmlFor="underGroup" className='w-[6%] text-left text-sm'>Under</label>
              <span className='w-1/12 text-right mr-0.5'>:</span>
              <input type="text" id='underGroup' name='underGroup' value={groupData.underGroup} ref={inputRefs.underGroup} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "underGroup")} onFocus={handleFocus} onBlur={() => setOpen(false)} className='w-2/6 p-0.5 cursor-default border focus:border focus:bg-[#fee8af] focus:border-blue-500 text-sm font-semibold h-[18px] outline-none border-transparent' autoComplete='off' />
              {open && (
                <div className='w-[310px] absolute h-[92vh] top-[6.5%] right-[10%] bg-[#def1fc] border'>
                  <h1 className='bg-[#2a47b1] p-0.5 text-white'>List of Groups</h1>
                  <ul tabIndex={0} className='border overflow-y-scroll h-[88vh]' onMouseDown={(e) => e.preventDefault()}>
                    {filteredOptions.map((opt) => (
                      <li key={opt.value} onClick={() => handleSelect(opt)} className='hover:bg-yellow-500 cursor-pointer pl-2 text-[14px]'>
                        {opt.label === 'primary' && <>&diams;</>} {opt.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <p className='italic text-sm text-center pl-9 w-2/4 h-4 mb-2'>{aliasOption}</p>
            </div>

            <hr className='my-2' />

            {renderOption.firstDiv && (
              <div className='first'>
                <div className='flex leading-4'>
                  <label htmlFor="natureOfGroup" className='w-[65%] text-left text-sm'>Nature of Group</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='natureOfGroup' name='natureOfGroup' value={groupData.natureOfGroup} ref={inputRefs.natureOfGroup} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "natureOfGroup")} className='w-24 p-0.5 border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' />
                </div>
                <div className='flex leading-4'>
                  <label htmlFor="grossProfit" className='pl-4 w-[65%] text-left text-sm'>Does it affects gross profits</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='grossProfit' name='grossProfit' value={groupData.grossProfit} ref={inputRefs.grossProfit} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "grossProfit")} className='w-12 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' />
                </div>
              </div>
            )}

            {renderOption.secondDiv && (
              <div className={`second ${renderOption.firstDiv ? '' : 'mt-12'}`}>
                <div className='flex leading-4'>
                  <label htmlFor="subLedger" className='w-[65%] text-left text-sm'>Group behave like a sub-ledger</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='subLedger' name='subLedger' value={groupData.subLedger} ref={inputRefs.subLedger} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "subLedger")} className='w-12 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' />
                </div>
                <div className='flex leading-4'>
                  <label htmlFor="nettReporting" className='w-[65%] text-left text-sm'>Nett Debit/Credit Balances for Reporting</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='nettReporting' name='nettReporting' value={groupData.nettReporting} ref={inputRefs.nettReporting} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "nettReporting")} className='w-12 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' />
                </div>
                <div className='flex leading-4'>
                  <label htmlFor="usedForCalculation" className='w-[65%] text-left text-sm'>Used for Calculation (for example: taxes, discounts)</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='usedForCalculation' name='usedForCalculation' value={groupData.usedForCalculation} ref={inputRefs.usedForCalculation} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "usedForCalculation")} className='w-12 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' />
                </div>
                <div className='flex leading-3'>
                  <p className='pl-4 italic text-sm'>(for sales invoice entry)</p>
                </div>
                <div className='flex leading-4'>
                  <label htmlFor="purchaseInvoice" className='w-[65%] text-left text-sm'>Method to allocate when use in purchase invoice</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='purchaseInvoice' name='purchaseInvoice' value={groupData.purchaseInvoice} ref={inputRefs.purchaseInvoice} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "purchaseInvoice")} className='w-30 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' />
                </div>
              </div>
            )}

            {renderOption.thirdDiv && (
              <div className='third mt-6'>
                <h2 className='font-semibold text-[13px] underline underline-offset-4 decoration-slate-400'>Statuory Details</h2>
                <h2 className='mt-1 font-semibold text-[13px] underline underline-offset-4 decoration-slate-400'>HSN/SAC & Related Details</h2>
                <div className='flex leading-4 mt-1'>
                  <label htmlFor="hsnDetails" className='w-[65%] text-left text-sm'>HSN/SAC Details</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='hsnDetails' name='hsnDetails' value={groupData.hsnDetails} ref={inputRefs.hsnDetails} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "hsnDetails")} className='w-44 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' />
                </div>
                <div className='flex items-center leading-4'>
                  <label htmlFor="sourceDetails" className='w-[65%] text-gray-500 text-left text-sm'>Source of Details</label>
                  <span className='w-[1%] mr-1'>:</span>
                  <p className='w-1/6 p- text-gray-500 font-semibold text-[13px] h-[18px]'>Not Available</p>
                </div>
                <div className='flex items-center leading-4'>
                  <label htmlFor="hsnNumber" className='w-[65%] text-gray-500 text-left text-sm'>HSN/SAC</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='hsnNumber' name='hsnNumber' value={groupData.hsnNumber} ref={inputRefs.hsnNumber} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "hsnNumber")} className='w-30 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' autoComplete='off' />
                </div>
                <div className='flex items-center leading-4'>
                  <label htmlFor="hsnDescription" className='w-[65%] text-gray-500 text-left text-sm'>Description</label>
                  <span className='text-right mr-0.5'>:</span>
                  <input type="text" id='hsnDescription' name='hsnDescription' value={groupData.hsnDescription} ref={inputRefs.hsnDescription} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "hsnDescription")} className='w-30 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' autoComplete='off' />
                </div>
                <h2 className='mt-1 font-semibold text-[13px] underline underline-offset-4 decoration-slate-400'>GST Rate & Related Details</h2>
                <div className='flex leading-4 mt-1'>
                  <label htmlFor="gstRateDetails" className='w-[65%] text-left text-sm'>GST Rate Details</label>
                  <span className='w-[1%] text-right mr-0.5'>:</span>
                  <input type="text" id='gstRateDetails' name='gstRateDetails' value={groupData.gstRateDetails} ref={inputRefs.gstRateDetails} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "gstRateDetails")} className='w-44 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' autoComplete='off' />
                </div>
                <div className='flex items-center leading-4'>
                  <label htmlFor="sourceOfDetails" className='w-[65%] text-gray-500  text-sm'>Source of Details</label>
                  <span className='w-[1%] text-right mr-0.5'>:</span>
                  <p className='p-0.5 text-gray-500 font-semibold text-[13px] h-[18px]'>Not Available</p>
                </div>

                <div className='flex items-center leading-4'>
                  <label htmlFor="taxType" className='w-[65%] text-gray-500 text-left text-sm'>Taxability Type</label>
                  <span className='w-[1%] text-right mr-0.5'>:</span>
                  <input type="text" id='taxType' name='taxType' value={groupData.taxType} ref={inputRefs.taxType} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "taxType")} className='w-40 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' autoComplete='off' />
                </div>

                <div className='flex items-center leading-4'>
                  <label htmlFor="natureOfTransaction" className='w-[65%] text-gray-500 text-left text-sm'>Nature of Transaction</label>
                  <span className='w-[1%] text-right mr-0.5'>:</span>
                  <input type="text" id='natureOfTransaction' name='natureOfTransaction' value={groupData.natureOfTransaction} ref={inputRefs.natureOfTransaction} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "natureOfTransaction")} className='w-40 p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' autoComplete='off' />
                </div>
                <div className='flex items-center leading-4'>
                  <label htmlFor="igstRate" className='w-[64%] text-gray-500 text-left text-sm'>IGST Rate</label>
                  <span className='w-[2%] text-right mr-0.5'>:</span>
                  <input type="text" id='igstRate' name='igstRate' value={groupData.igstRate} ref={inputRefs.igstRate} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "igstRate")} className='w-10 text-right p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' autoComplete='off' />
                  <span className='text-sm'>%</span>
                </div>
                <div className='flex items-center leading-4'>
                  <label htmlFor="cgstRate" className='w-[64%] text-gray-500 text-left text-sm'>CGST Rate</label>
                  <span className='w-[2%] text-right mr-0.5'>:</span>
                  <input type="text" id='cgstRate' name='cgstRate' value={groupData.cgstRate} ref={inputRefs.cgstRate} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "cgstRate")} className='w-10 text-right p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' autoComplete='off' />
                  <span className='text-sm'>%</span>
                </div>
                <div className='flex items-center leading-4'>
                  <label htmlFor="sgstRate" className='w-[64%] text-gray-500 text-left text-sm'>SGST/UTGST Rate</label>
                  <span className='w-[2%] text-right mr-0.5'>:</span>
                  <input type="text" id='sgstRate' name='sgstRate' value={groupData.sgstRate} ref={inputRefs.sgstRate} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e, "sgstRate")} className='w-10 text-right p-0.5 border focus:border border-transparent focus:bg-[#fee8af] focus:border-blue-500 outline-none font-semibold text-[13px] h-[18px] capitalize' autoComplete='off' />
                  <span className='text-sm'>%</span>
                </div>
              </div>
            )}

            {submitted && (
              <div className='w-24 border absolute bottom-0 right-[57%]  border-gray-600 h-16 text-sm text-center'>
                <p className='mt-3'>Accept?</p>
                <div className='mt-2'>
                  <button className='font-semibold text-[14px] text-[#2a47b8]' onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit() : null)} onClick={handleSubmit}>Yes</button>
                  <span className='mx-2'>or</span>
                  <button className='font-semibold text-[14px] text-[#2a47b8]' onClick={(e) => {e.preventDefault(); setSubmitted(false);}}>No</button>
                </div>
              </div>
            )}
          </form>
        </div>
        <RightSideButton />
      </div>
    </>
  )
}

export default GroupCreate