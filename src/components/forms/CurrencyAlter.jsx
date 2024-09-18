import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificCurrency, updateCurrencyMaster } from '../services/MasterService';

const CurrencyAlter = () => {

    const { datas } = useParams();

  const [currency, setCurrency] = useState({
    forexCurrencySymbol: '',
    forexCurrencyName: '',
    country: '',
    voucherDate: '',
    currencySymbol: '',
    rateForPerSalesCurrency: '',
    rateForSalesInvoice: '',
    rateForPerPurchaseCurrency: '',
    rateForPurchaseInvoice: '',
    rateForPerPaymentCurrency: '',
    rateForPaymentInvoice: '',
    rateForPerReceiptCurrency: '',
    rateForReceiptInvoice: '',
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const focusAndPulseCursor = () => {
        if (inputRefs.current[0]){
            inputRefs.current[0]?.focus();
            inputRefs.current[0]?.setSelectionRange(0,0);
        }
    }

    setTimeout(focusAndPulseCursor, 100);

    const loadCurrency = async () => {
        try{
            const result = await getSpecificCurrency(datas);
            console.log(result.data);
            // Format the rates to 2 decimal places
            const formattedData = {
              ...result.data,
              rateForPerSalesCurrency: result.data.rateForPerSalesCurrency.toFixed(2),
              rateForSalesInvoice: result.data.rateForSalesInvoice.toFixed(2),
              rateForPerPurchaseCurrency: result.data.rateForPerPurchaseCurrency.toFixed(2),
              rateForPurchaseInvoice: result.data.rateForPurchaseInvoice.toFixed(2),
              rateForPerPaymentCurrency: result.data.rateForPerPaymentCurrency.toFixed(2),
              rateForPaymentInvoice: result.data.rateForPaymentInvoice.toFixed(2),
              rateForPerReceiptCurrency: result.data.rateForPerReceiptCurrency.toFixed(2),
              rateForReceiptInvoice: result.data.rateForReceiptInvoice.toFixed(2),
            }
            setCurrency(formattedData);

        }catch(error){
            console.log(error);
        }
    }

    loadCurrency();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCurrency({...currency, 
        [name]: value,
        // if the field is forexcurrencysymbol, also update currencysymbol input
        ...(name === 'forexCurrencySymbol' && { currencySymbol: value }),
    });
  }

  const handleKeyDown = (e,index) => {
    const key = e.key;
    if (key === 'Enter'){
      e.preventDefault();
      if (e.target.value.trim() !== ''){
        const nextField = index + 1;
        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0,0);
        } else{
            handleSubmit(e); // Call handleSubmit if it's the last field
        }
      }
    } else if (key === 'Backspace'){
      const input = inputRefs.current[index];
      const cursorPosition = input.selectionStart;

      if (cursorPosition === 0 && input.value.length !== 0){
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0,0);
          e.preventDefault();
        }
      }
    } else if (key === 'Escape'){
      e.preventDefault();
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm('Do you want to confirm this submit!');
    if (userConfirmed){
        try {
            const response = await updateCurrencyMaster(datas, currency);
            console.log('Currency altered successfully!', response.data);

            // Optionally, focus the first input field after reset
            if (inputRefs.current[0]){
                inputRefs.current[0].focus();
            }
        } catch (error) {
            console.error('Error creating currency master!',error);
        }
    }
    navigate(-1);
  };

  const numberFormat = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (isNaN(rawValue) || rawValue === ''){
      return;
    }
    const formattedValue = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(rawValue);
    // Update the input field's value to the formatted result
    e.target.value = formattedValue;
    // Update the state with the formatted value
    handleInputChange({ target: { name: e.target.name, value: formattedValue }});
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='ml-2 flex leading-4 mt-3'>
            <label htmlFor="forexCurrencySymbol" className='text-sm w-[15%]'>Forex Currency Symbol</label>
            <span>:</span>
            <input type="text" id='forexCurrencySymbol' name='forexCurrencySymbol' value={currency.forexCurrencySymbol} onChange={handleInputChange}  ref={(input) => (inputRefs.current[0] = input)} onKeyDown={e => handleKeyDown(e, 0)} className='w-[60px] ml-2 h-5 font-medium uppercase pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
          </div>
          <div className='ml-2 flex leading-4'>
            <label htmlFor="forexCurrencyName" className='text-sm w-[15%]'>Forex Currency Name</label>
            <span>:</span>
            <input type="text" id='forexCurrencyName' name='forexCurrencyName' value={currency.forexCurrencyName} onChange={handleInputChange}  ref={(input) => (inputRefs.current[1] = input)} onKeyDown={e => handleKeyDown(e, 1)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off'  />
          </div>
          <div className='ml-2 flex leading-4'>
            <label htmlFor="country" className='text-sm w-[15%]'>Country</label>
            <span>:</span>
            <input type="text" id='country' name='country' value={currency.country} onChange={handleInputChange} ref={(input) => (inputRefs.current[2] = input)} onKeyDown={e => handleKeyDown(e, 2)} className='w-[200px] ml-2 h-5 font-medium pl-1 text-sm uppercase focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
          </div>
          <div className='w-[63%] h-[79.5vh] border border-slate-500 mt-2'>
            <div className='flex justify-center border border-b-slate-500'>
              <p className='text-sm'>Rates of Exchange</p>
            </div>
            <div className='flex'>
              <div className='w-[105px] h-[75.6vh] border border-r-slate-500'>
                <div>
                  <div className='flex justify-center border border-b-slate-500'>
                    <p className='text-sm'>Voucher Date</p>
                  </div>
                  <div className='flex'>
                    <div>
                      <label htmlFor="voucherDate"></label>
                      <input type="text" id='voucherDate' name='voucherDate' value={currency.voucherDate} onChange={handleInputChange} ref={(input) => (inputRefs.current[3] = input)} onKeyDown={e => handleKeyDown(e, 3)} className='w-[100px] h-5 font-medium pl-2 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[115px] h-[75.6vh] border border-r-slate-500'>
                <div>
                  <div className='flex justify-center border border-b-slate-500'>
                  <p className='text-sm'>Currency Symbol</p>
                  </div>
                <div className='flex justify-center'>
                    <div>
                      <label htmlFor="currencySymbol"></label>
                      <input type="text" id='currencySymbol' name='currencySymbol' value={currency.currencySymbol} onChange={handleInputChange} ref={(input) => (inputRefs.current[4] = input)} onKeyDown={e => handleKeyDown(e, 4)} className='w-[40px] h-5 font-medium uppercase pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[160px] h-[75.6vh] border border-r-slate-500'>
                <div>
                  <div className='flex justify-center border border-b-slate-500'>
                    <p className='text-sm'>Rate for Sales Invoice</p>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <label htmlFor="rateForPerSalesCurrency"></label>
                      <input type="text" id='rateForPerSalesCurrency' name='rateForPerSalesCurrency' value={currency.rateForPerSalesCurrency} onChange={handleInputChange} ref={(input) => (inputRefs.current[5] = input)} onKeyDown={e => handleKeyDown(e, 5)} onBlur={(e) => {numberFormat(e)}} className='w-[35px] h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                      <span className='font-medium'>{currency.forexCurrencySymbol.toUpperCase() || '$'}</span>
                    </div>
                    
                    <div>
                      <label htmlFor="rateForSalesInvoice"></label>
                      <span className='font-medium'>₹</span>
                      <input type="text" id='rateForSalesInvoice' name='rateForSalesInvoice' value={currency.rateForSalesInvoice} onChange={handleInputChange} ref={(input) => (inputRefs.current[6] = input)} onKeyDown={e => handleKeyDown(e, 6)} onBlur={(e) => {numberFormat(e)}} className='w-[50px] h-5 font-medium text-right pr-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[160px] h-[75.6vh] border border-r-slate-500'>
                <div>
                  <div className='flex justify-center border border-b-slate-500'>
                    <p className='text-sm'>Rate for Purchase Invoice</p>
                  </div>
                  <div className='flex justify-between'>
                  <div>
                      <label htmlFor="rateForPerPurchaseCurrency"></label>
                      <input type="text" id='rateForPerPurchaseCurrency' name='rateForPerPurchaseCurrency' value={currency.rateForPerPurchaseCurrency} onChange={handleInputChange} ref={(input) => (inputRefs.current[7] = input)} onKeyDown={e => handleKeyDown(e, 7)} onBlur={(e) => {numberFormat(e)}} className='w-[35px] h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                      <span className='font-medium'>{currency.forexCurrencySymbol.toUpperCase() || '$'}</span>
                    </div>
                    <div>
                      <label htmlFor="rateForPurchaseInvoice"></label>
                      <span className='font-medium'>₹</span>
                      <input type="text" id='rateForPurchaseInvoice' name='rateForPurchaseInvoice' value={currency.rateForPurchaseInvoice} onChange={handleInputChange} ref={(input) => (inputRefs.current[8] = input)} onKeyDown={e => handleKeyDown(e, 8)} onBlur={(e) => {numberFormat(e)}} className='w-[50px] h-5 font-medium text-right pr-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[160px] h-[75.6vh] border border-r-slate-500'>
                <div>
                  <div className='flex justify-center border border-b-slate-500'>
                    <p className='text-sm'>Rate for Payment Invoice</p>
                  </div>
                  <div className='flex justify-between'>
                  <div>
                      <label htmlFor="rateForPerPaymentCurrency"></label>
                      <input type="text" id='rateForPerPaymentCurrency' name='rateForPerPaymentCurrency' value={currency.rateForPerPaymentCurrency} onChange={handleInputChange} ref={(input) => (inputRefs.current[9] = input)} onKeyDown={e => handleKeyDown(e, 9)} onBlur={(e) => {numberFormat(e)}} className='w-[35px] h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                      <span className='font-medium'>{currency.forexCurrencySymbol.toUpperCase() || '$'}</span>
                    </div>
                    <div>
                      <label htmlFor="rateForPaymentInvoice"></label>
                      <span className='font-medium'>₹</span>
                      <input type="text" id='rateForPaymentInvoice' name='rateForPaymentInvoice' value={currency.rateForPaymentInvoice} onChange={handleInputChange} ref={(input) => (inputRefs.current[10] = input)} onKeyDown={e => handleKeyDown(e, 10)} onBlur={(e) => {numberFormat(e)}} className='w-[50px] h-5 font-medium text-right pr-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[160px] h-[75.6vh] border border-r-slate-500'>
                <div>
                  <div className='flex justify-center border border-b-slate-500'>
                    <p className='text-sm'>Rate for Receipt Invoice</p>
                  </div>
                  <div className='flex justify-between'>
                  <div>
                      <label htmlFor="rateForPerReceiptCurrency"></label> 
                      <input type="text" id='rateForPerReceiptCurrency' name='rateForPerReceiptCurrency' value={currency.rateForPerReceiptCurrency} onChange={handleInputChange} ref={(input) => (inputRefs.current[11] = input)} onKeyDown={e => handleKeyDown(e, 11)} onBlur={(e) => {numberFormat(e)}} className='w-[35px] h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                      <span className='font-medium'>{currency.forexCurrencySymbol.toUpperCase() || '$'}</span>
                    </div>
                    <div>
                      <label htmlFor="rateForReceiptInvoice"></label>
                      <span className='font-medium'>₹</span>
                      <input type="text" id='rateForReceiptInvoice' name='rateForReceiptInvoice' value={currency.rateForReceiptInvoice} onChange={handleInputChange} ref={(input) => (inputRefs.current[12] = input)} onKeyDown={e => handleKeyDown(e, 12)} onBlur={(e) => {numberFormat(e)}} className='w-[50px] h-5 font-medium text-right pr-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default CurrencyAlter