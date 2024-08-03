import React from 'react'

const LedgerCreate = () => {
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
                    <input type="text" id='underGroup' name='underGroup' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='ml-24'>
                    <label htmlFor="subUnder"></label>
                    <input type="text" id='subUnder' name='subUnder' className='ml-60 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="typeOfLedger" className='w-[55%]'>Type of Ledger</label>
                    <span>:</span>
                    <input type="text" id='typeOfLedger' name='typeOfLedger' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="maintainBalancesBillByBill" className='w-[55%]'>Maintian balances bill-by-bill</label>
                    <span>:</span>
                    <input type="text" id='maintainBalancesBillByBill' name='maintainBalancesBillByBill' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="defaultCreditPeriod" className='w-[55%]'>Default credit period</label>
                    <span>:</span>
                    <input type="text" id='defaultCreditPeriod' name='defaultCreditPeriod' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="checkForCreditDaysDuringVoucherEntry" className='w-[55%]'>Check for credit days during voucher entry</label>
                    <span>:</span>
                    <input type="text" id='checkForCreditDaysDuringVoucherEntry' name='checkForCreditDaysDuringVoucherEntry' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="typeOfDutyOrTax" className='w-[55%]'>Type of Duty/Tax</label>
                    <span>:</span>
                    <input type="text" id='typeOfDutyOrTax' name='typeOfDutyOrTax' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="costsCentresAreApplicable" className='w-[55%]'>Costs centres are applicable</label>
                    <span>:</span>
                    <input type="text" id='costsCentresAreApplicable' name='costsCentresAreApplicable' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="percentageOfCalculation" className='w-[55%]'>Percentage of Calculation</label>
                    <span>:</span>
                    <input type="text" id='percentageOfCalculation' name='percentageOfCalculation' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="odLimit" className='w-[55%]'>Set OD Limit</label>
                    <span>:</span>
                    <input type="text" id='odLimit' name='odLimit' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2' id='headUnder'>
                    <h2 className='headUnder underline font-semibold mt-1'>Statutory Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="includeInAssessableValueCalculation" className='w-[55%]'>Include in Assesable value calculation</label>
                    <span>:</span>
                    <input type="text" id='includeInAssessableValueCalculation' name='includeInAssessableValueCalculation' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="gstApplicability" className='w-[55%]'>GST Applicability</label>
                    <span>:</span>
                    <input type="text" id='gstApplicability' name='gstApplicability' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='headUnderOne input-ldgr flex ml-2' id='headUnderOne'>
                    <h2 className='headUnderOne underline font-semibold'>HSN/SAC & Related Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="hsnOrSacAndRelatedDetails" className='w-[55%]'>HSN/SAC Details</label>
                    <span>:</span>
                    <input type="text" id='hsnOrSacAndRelatedDetails' name='hsnOrSacAndRelatedDetails' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="sourceOfDetails" className='w-[55%]'>Source of Details</label>
                    <span>:</span>
                    <input type="text" id='sourceOfDetails' name='sourceOfDetails' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="hsnOrSac" className='w-[55%]'>HSN/SAC</label>
                    <span>:</span>
                    <input type="text" id='hsnOrSac' name='hsnOrSac' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="hsnOrSacDescription" className='w-[55%]'>Description</label>
                    <span>:</span>
                    <input type="text" id='hsnOrSacDescription' name='hsnOrSacDescription' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="classification">Classification</label>
                    <span>:</span>
                    <input type="text" id='classification' name='classification' className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex headUnderTwo ml-2' id='headUnderTwo'>
                    <h2 className='headUnderTwo underline font-semibold'>GST Rate & Related Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">GST Rate Details</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Source of Details</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Taxability Type</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Nature of Transaction</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">IGST Rate</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">CGST Rate</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">SGST/UTGST Rate</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Type of Supply</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='headUnderThree input-ldgr ml-2' id='headUnderThree'>
                    <h2 className='headUnderThree underline font-semibold mt-4 mb-2'>Bank Account Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">A/c Holder's Name</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">A/c No.</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">IFSC Code</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">SWIFT Code</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Bank Name</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Branch</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr headUnderFour ml-2' id='headUnderFour'>
                    <h2 className='headUnderFour underline font-semibold mt-4 mb-2' id='headUnderFour'>Bank Configuration</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Set/Alter range for Cheque Books</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Enable Cheque Printing</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Set/Alter Cheque Printing Configuration</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Contact Person</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Contact Phone No</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Mobile No</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Email</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                </div>
                <div className='h-[75vh] w-1/2 border text-sm'>
                  <h2 className='underline font-semibold p-1'>Mailing Details</h2>

                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Name</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Address1</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Address2</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Address3</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Address4</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Address5</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">State</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Country</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Pincode</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex' id='headUnderFive'>
                    <h2 className='headUnderFive underline font-semibold mt-5'>Banking Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Provide bank details</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex p-1' id='headUnderSix'>
                    <h2 className='headUnderSix underline font-semibold mt-5'>Tax Registration Details</h2>
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">PAN/IT No.</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Registration Type</label>
                    <span>:</span> 
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">GSTIN/UIN</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                  <div className='input-ldgr flex ml-2'>
                    <label htmlFor="">Set/Alter additional GST details</label>
                    <span>:</span>
                    <input type="text" className='ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 w-1/3 focus:border focus:border-blue-500 focus:outline-none' />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-sm'>Opening Balance <span>( on 1-Apr-24):</span> Rs.<input type="text" id='openingBalance' name='openingBalance' className='h-5 w-[80px] outline-none pl-1 focus:bg-yellow-200 focus:border focus:border-blue-500' autoComplete='off' /></h3>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LedgerCreate