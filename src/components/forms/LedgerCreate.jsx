import React, { useEffect, useRef } from 'react'

const LedgerCreate = () => {

  const inputRefs = useRef([]);

  useEffect (() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter'){
      event.preventDefault();
      if (inputRefs.current[index + 1]){
        inputRefs.current[index + 1].focus();
      }
    } else if (event.key === 'Backspace'){
      event.preventDefault();
      if (inputRefs.current[index - 1]){
        inputRefs.current[index - 1].focus();
      }
    }
  };
  return (
    <>
      <div className='container'>
        <div className='main-form'>
          <form action="">
            <div className='w-full'>
              <div className='top-ldgr main flex'>
              <div className='top-ldgr border-b pl-2 h-[15vh] w-[95%]'>
                  {/* First Row */}
                  <div className='flex'>
                    <div className='input-ldgr flex mr-6 mt-1'>
                      <label htmlFor="ledgerName" className='text-sm'>Name</label>
                      <span className='absolute left-[50px] top-[44px]'>:</span>
                      <input
                        type="text"
                        name="ledgerName"
                        id="ledgerName"
                        ref={(input) => (inputRefs.current[0] = input)}
                        onKeyDown={(e) => handleKeyDown(e,0)}
                        className='ml-6 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-[500px] focus:border focus:border-blue-500 focus:outline-none'
                        autoComplete='off'
                      />
                    </div>
                    <div className='input-ldgr flex items-start mr-4 mt-1 ml-[54px]'>
                      <label htmlFor="tallySerialNo" className='text-sm mr-3 font-medium text-blue-800'>Tally Serial No</label>
                      <span className='absolute top-11 left-[740px]'>:</span>
                      <input
                        type="text"
                        name="tallySerialNo"
                        id="tallySerialNo"
                        ref={(input) => (inputRefs.current[1] = input)}
                        onKeyDown={(e) => handleKeyDown(e,1)}
                        className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-[200px] focus:border focus:border-blue-500 focus:outline-none'
                        autoComplete='off'
                      />
                    </div>
                    <div className='right-side-opening-balance h-[15vh] w-[20%] border'>
                      <h2 className='text-center underline font-semibold'>Total Opening Balance</h2>
                    </div>
                  </div>
                  {/* Second Row */}
                  <div className='flex absolute top-[75px] left-0'>
                    <div className='input-ldgr flex'>
                      <label htmlFor="aliasName" className='text-sm italic mr-1 ml-2'>(alias)</label>
                      <span>:</span>
                      <input
                        type="text"
                        name="aliasName"
                        id="aliasName"
                        ref={(input) => (inputRefs.current[2] = input)}
                        onKeyDown={(e) => handleKeyDown(e,2)}
                        className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-[250px] focus:border focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div className='middle-box flex'>
                <div className='input-ldgr border w-[44.85%] text-sm'>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="underGroup" className='w-[55%]'>Under</label>
                    <span>:</span>
                    <input type="text" id='underGroup' name='underGroup' ref={(input) => (inputRefs.current[3] = input)} onKeyDown={(e) => handleKeyDown(e,3)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='ml-24'>
                    <label htmlFor="subUnder"></label>
                    <input type="text" id='subUnder' name='subUnder' className='ml-60 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="typeOfLedger" className='w-[55%]'>Type of Ledger</label>
                    <span>:</span>
                    <input type="text" id='typeOfLedger' name='typeOfLedger' ref={(input) => (inputRefs.current[4] = input)} onKeyDown={(e) => handleKeyDown(e,4)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="maintainBalancesBillByBill" className='w-[55%]'>Maintian balances bill-by-bill</label>
                    <span>:</span>
                    <input type="text" id='maintainBalancesBillByBill' name='maintainBalancesBillByBill' ref={(input) => (inputRefs.current[5] = input)} onKeyDown={(e) => handleKeyDown(e,5)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="defaultCreditPeriod" className='w-[55%]'>Default credit period</label>
                    <span>:</span>
                    <input type="text" id='defaultCreditPeriod' name='defaultCreditPeriod' ref={(input) => (inputRefs.current[6] = input)} onKeyDown={(e) => handleKeyDown(e,6)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="checkForCreditDaysDuringVoucherEntry" className='w-[55%]'>Check for credit days during voucher entry</label>
                    <span>:</span>
                    <input type="text" id='checkForCreditDaysDuringVoucherEntry' name='checkForCreditDaysDuringVoucherEntry' ref={(input) => (inputRefs.current[7] = input)} onKeyDown={(e) => handleKeyDown(e,7)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="typeOfDutyOrTax" className='w-[55%]'>Type of Duty/Tax</label>
                    <span>:</span>
                    <input type="text" id='typeOfDutyOrTax' name='typeOfDutyOrTax' ref={(input) => (inputRefs.current[8] = input)} onKeyDown={(e) => handleKeyDown(e,8)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="costsCentresAreApplicable" className='w-[55%]'>Costs centres are applicable</label>
                    <span>:</span>
                    <input type="text" id='costsCentresAreApplicable' name='costsCentresAreApplicable' ref={(input) => (inputRefs.current[9] = input)} onKeyDown={(e) => handleKeyDown(e,9)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="percentageOfCalculation" className='w-[55%]'>Percentage of Calculation</label>
                    <span>:</span>
                    <input type="text" id='percentageOfCalculation' name='percentageOfCalculation' ref={(input) => (inputRefs.current[10] = input)} onKeyDown={(e) => handleKeyDown(e,10)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="odLimit" className='w-[55%]'>Set OD Limit</label>
                    <span>:</span>
                    <input type="text" id='odLimit' name='odLimit' ref={(input) => (inputRefs.current[11] = input)} onKeyDown={(e) => handleKeyDown(e, 11)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  {/* <div className='input-ldgr flex ml-2' id='headUnder'>
                    <h2 className='headUnder underline font-semibold mt-1'>Statutory Details</h2>
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="includeInAssessableValueCalculation" className='w-[55%]'>Include in Assesable value calculation</label>
                    <span>:</span>
                    <input type="text" id='includeInAssessableValueCalculation' name='includeInAssessableValueCalculation' ref={(input) => (inputRefs.current[12] = input)} onKeyDown={(e) => handleKeyDown(e, 12)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="gstApplicability" className='w-[55%]'>GST Applicability</label>
                    <span>:</span>
                    <input type="text" id='gstApplicability' name='gstApplicability' ref={(input) => (inputRefs.current[13] = input)} onKeyDown={(e) => handleKeyDown(e, 13)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='headUnderOne input-ldgr flex ml-2' id='headUnderOne'>
                    <h2 className='headUnderOne underline font-semibold'>HSN/SAC & Related Details</h2>
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="hsnOrSacAndRelatedDetails" className='w-[55%]'>HSN/SAC Details</label>
                    <span>:</span>
                    <input type="text" id='hsnOrSacAndRelatedDetails' name='hsnOrSacAndRelatedDetails' ref={(input) => (inputRefs.current[14] = input)} onKeyDown={(e) => handleKeyDown(e, 14)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="sourceOfDetails" className='w-[55%]'>Source of Details</label>
                    <span>:</span>
                    <input type="text" id='sourceOfDetails' name='sourceOfDetails' ref={(input) => (inputRefs.current[15] = input)} onKeyDown={(e) => handleKeyDown(e, 15)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="hsnOrSac" className='w-[55%]'>HSN/SAC</label>
                    <span>:</span>
                    <input type="text" id='hsnOrSac' name='hsnOrSac' ref={(input) => (inputRefs.current[16] = input)} onKeyDown={(e) => handleKeyDown(e, 16)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="hsnOrSacDescription" className='w-[55%]'>Description</label>
                    <span>:</span>
                    <input type="text" id='hsnOrSacDescription' name='hsnOrSacDescription' ref={(input) => (inputRefs.current[17] = input)} onKeyDown={(e) => handleKeyDown(e, 17)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="classification" className='w-[55%]'>Classification</label>
                    <span>:</span>
                    <input type="text" id='classification' name='classification' ref={(input) => (inputRefs.current[18] = input)} onKeyDown={(e) => handleKeyDown(e, 18)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex headUnderTwo ml-2' id='headUnderTwo'>
                    <h2 className='headUnderTwo underline font-semibold'>GST Rate & Related Details</h2>
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="gstRateDetails" className='w-[55%]'>GST Rate Details</label>
                    <span>:</span>
                    <input type="text" id='gstRateDetails' name='gstRateDetails' ref={(input) => (inputRefs.current[19] = input)} onKeyDown={(e) => handleKeyDown(e, 19)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="sourceOfDetailsGst" className='w-[55%]'>Source of Details</label>
                    <span>:</span>
                    <input type="text" id='sourceOfDetailsGst' name='sourceOfDetailsGst'ref={(input) => (inputRefs.current[20] = input)} onKeyDown={(e) => handleKeyDown(e, 20)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="taxabilityType" className='w-[55%]'>Taxability Type</label>
                    <span>:</span>
                    <input type="text" id='taxabilityType' name='taxabilityType' ref={(input) => (inputRefs.current[21] = input)} onKeyDown={(e) => handleKeyDown(e, 21)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="natureOfTransaction" className='w-[55%]'>Nature of Transaction</label>
                    <span>:</span>
                    <input type="text" id='natureOfTransaction' name='natureOfTransaction' ref={(input) => (inputRefs.current[22] = input)} onKeyDown={(e) => handleKeyDown(e, 22)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="igstRate" className='w-[55%]'>IGST Rate</label>
                    <span>:</span>
                    <input type="text" id='igstRate' name='igstRate' ref={(input) => (inputRefs.current[23] = input)} onKeyDown={(e) => handleKeyDown(e, 23)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="cgstRate" className='w-[55%]'>CGST Rate</label>
                    <span>:</span>
                    <input type="text" id='cgstRate' name='cgstRate' ref={(input) => (inputRefs.current[24] = input)}
                    onKeyDown={(e) => handleKeyDown(e, 24)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="utgstRate" className='w-[55%]'>SGST/UTGST Rate</label>
                    <span>:</span>
                    <input type="text" id='utgstRate' name='utgstRate' ref={(input) => (inputRefs.current[25] = input)}
                    onKeyDown={(e) => handleKeyDown(e, 25)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  {/* <div className='input-ldgr flex ml-2'>
                    <label htmlFor="typeOfSupply" className='w-[55%]'>Type of Supply</label>
                    <span>:</span>
                    <input type="text" id='typeOfSupply' name='typeOfSupply' ref={(input) => (inputRefs.current[26] = input)} onKeyDown={(e) => handleKeyDown(e, 26)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div> */}
                  <div className='headUnderThree input-ldgr ml-2' id='headUnderThree'>
                    <h2 className='headUnderThree underline font-semibold mt-4 mb-2'>Bank Account Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="accountHoldersName" className='w-[55%]'>A/c Holder's Name</label>
                    <span>:</span>
                    <input type="text" id='accountHoldersName' name='accountHoldersName' ref={(input) => (inputRefs.current[27] = input)} onKeyDown={(e) => handleKeyDown(e, 27)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="accountNumber" className='w-[55%]'>A/c No.</label>
                    <span>:</span>
                    <input type="text" id='accountNumber' name='accountNumber' ref={(input) => (inputRefs.current[28] = input)} onKeyDown={(e) => handleKeyDown(e, 28)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="ifscCode" className='w-[55%]'>IFSC Code</label>
                    <span>:</span>
                    <input type="text" id='ifscCode' name='ifscCode' ref={(input) => (inputRefs.current[29] = input)} onKeyDown={(e) => handleKeyDown(e, 29)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="swiftCode" className='w-[55%]'>SWIFT Code</label>
                    <span>:</span>
                    <input type="text" id='swiftCode' name='swiftCode' ref={(input) => (inputRefs.current[30] = input)} onKeyDown={(e) => handleKeyDown(e, 30)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="bankName" className='w-[55%]'>Bank Name</label>
                    <span>:</span>
                    <input type="text" id='bankName' name='bankName' ref={(input) => (inputRefs.current[31] = input)} onKeyDown={(e) => handleKeyDown(e, 31)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="branchName" className='w-[55%]'>Branch</label>
                    <span>:</span>
                    <input type="text" id='branchName' name='branchName' ref={(input) => (inputRefs.current[32] = input)} onKeyDown={(e) => handleKeyDown(e, 32)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr headUnderFour ml-2' id='headUnderFour'>
                    <h2 className='headUnderFour underline font-semibold mt-4 mb-2' id='headUnderFour'>Bank Configuration</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="alterRangeForChequeBooks" className='w-[55%]'>Set/Alter range for Cheque Books</label>
                    <span>:</span>
                    <input type="text" id='alterRangeForChequeBooks' name='alterRangeForChequeBooks' ref={(input) => (inputRefs.current[33] = input)} onKeyDown={(e) => handleKeyDown(e, 33)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="enableChequePrinting" className='w-[55%]'>Enable Cheque Printing</label>
                    <span>:</span>
                    <input type="text" id='enableChequePrinting' name='enableChequePrinting' ref={(input) => (inputRefs.current[34] = input)} onKeyDown={(e) => handleKeyDown(e, 34)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="alterChequePrintingConfiguration" className='w-[55%]'>Set/Alter Cheque Printing Configuration</label>
                    <span>:</span>
                    <input type="text" id='alterChequePrintingConfiguration' name='alterChequePrintingConfiguration' ref={(input) => (inputRefs.current[35] = input)} onKeyDown={(e) => handleKeyDown(e, 35)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="contactPerson" className='w-[55%]'>Contact Person</label>
                    <span>:</span>
                    <input type="text" id='contactPerson' name='contactPerson' ref={(input) => (inputRefs.current[36] = input)} onKeyDown={(e) => handleKeyDown(e, 36)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="contactPhoneNumber" className='w-[55%]'>Contact Phone No</label>
                    <span>:</span>
                    <input type="text" id='contactPhoneNumber' name='contactPhoneNumber' ref={(input) => (inputRefs.current[37] = input)} onKeyDown={(e) => handleKeyDown(e, 37)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="mobileNumber" className='w-[55%]'>Mobile No</label>
                    <span>:</span>
                    <input type="text" id='mobileNumber' name='mobileNumber' ref={(input) => (inputRefs.current[38] = input)} onKeyDown={(e) => handleKeyDown(e, 38)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="email" className='w-[55%]'>Email</label>
                    <span>:</span>
                    <input type="text" id='email' name='email' ref={(input) => (inputRefs.current[39] = input)} onKeyDown={(e) => handleKeyDown(e, 39)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                </div>
                <div className='h-[75vh] w-1/2 border text-sm'>
                  <h2 className='underline font-semibold p-1'>Mailing Details</h2>

                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="mailingName" className='w-[40%]'>Name</label>
                    <span>:</span>
                    <input type="text" id='mailingName' name='mailingName' ref={(input) => (inputRefs.current[40] = input)} onKeyDown={(e) => handleKeyDown(e, 40)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="addressOne" className='w-[40%]'>Address1</label>
                    <span>:</span>
                    <input type="text" id='addressOne' name='addressOne' ref={(input) => (inputRefs.current[41] = input)} onKeyDown={(e) => handleKeyDown(e, 41)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="addressTwo" className='w-[40%]'>Address2</label>
                    <span>:</span>
                    <input type="text" id='addressTwo' name='addressTwo' ref={(input) => (inputRefs.current[42] = input)} onKeyDown={(e) => handleKeyDown(e, 42)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="addressThree" className='w-[40%]'>Address3</label>
                    <span>:</span>
                    <input type="text" id='addressThree' name='addressThree' ref={(input) => (inputRefs.current[43] = input)} onKeyDown={(e) => handleKeyDown(e, 43)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="addressFour" className='w-[40%]'>Address4</label>
                    <span>:</span>
                    <input type="text" id='addressFour' name='addressFour' ref={(input) => (inputRefs.current[44] = input)} onKeyDown={(e) => handleKeyDown(e, 44)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="addressFive" className='w-[40%]'>Address5</label>
                    <span>:</span>
                    <input type="text" id='addressFive' name='addressFive' ref={(input) => (inputRefs.current[45] = input)} onKeyDown={(e) => handleKeyDown(e, 45)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="stateName" className='w-[40%]'>State</label>
                    <span>:</span>
                    <input type="text" id='stateName' name='stateName' ref={(input) => (inputRefs.current[46] = input)}
                    onKeyDown={(e) => handleKeyDown(e, 46)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="countryName" className='w-[40%]'>Country</label>
                    <span>:</span>
                    <input type="text" id='countryName' name='countryName' ref={(input) => (inputRefs.current[47] = input)} onKeyDown={(e) => handleKeyDown(e, 47)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="pinCode" className='w-[40%]'>Pincode</label>
                    <span>:</span>
                    <input type="text" id='pinCode' name='pinCode' ref={(input) => (inputRefs.current[48] = input)}
                    onKeyDown={(e) => handleKeyDown(e, 48)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex' id='headUnderFive'>
                    <h2 className='headUnderFive underline font-semibold mt-5'>Banking Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="provideBankDetails" className='w-[40%]'>Provide bank details</label>
                    <span>:</span>
                    <input type="text" id='provideBankDetails' name='provideBankDetails' ref={(input) => (inputRefs.current[49] = input)} onKeyDown={(e) => handleKeyDown(e, 49)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex p-1' id='headUnderSix'>
                    <h2 className='headUnderSix underline font-semibold mt-5'>Tax Registration Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="panOrItNumber" className='w-[40%]'>PAN/IT No.</label>
                    <span>:</span>
                    <input type="text" id='panOrItNumber' name='panOrItNumber' ref={(input) => (inputRefs.current[50] = input)} onKeyDown={(e) => handleKeyDown(e, 50)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="registrationType" className='w-[40%]'>Registration Type</label>
                    <span>:</span> 
                    <input type="text" id='registrationType' name='registrationType' ref={(input) => (inputRefs.current[51] = input)} onKeyDown={(e) => handleKeyDown(e, 51)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="gstOrUin" className='w-[40%]'>GSTIN/UIN</label>
                    <span>:</span>
                    <input type="text" id='gstOrUin' name='gstOrUin' ref={(input) => (inputRefs.current[52] = input)} onKeyDown={(e) => handleKeyDown(e, 52)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="setOrAlterGstDetails" className='w-[40%]'>Set/Alter additional GST details</label>
                    <span>:</span>
                    <input type="text" id='setOrAlterGstDetails' name='setOrAlterGstDetails' ref={(input) => (inputRefs.current[53] = input)} onKeyDown={(e) => handleKeyDown(e, 53)} className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-sm'>Opening Balance <span>( on 1-Apr-24):</span> Rs.<input type="text" id='openingBalance' name='openingBalance' ref={(input) => (inputRefs.current[54] = input)} onKeyDown={(e) => handleKeyDown(e, 54)} className='h-5 w-[80px] outline-none pl-1 focus:bg-yellow-200 focus:border focus:border-blue-500' autoComplete='off' /></h3>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LedgerCreate