import React, { useState, useRef } from 'react';

const SundryCreditorForm = () => {
  const inputRefs = useRef([]);
  const [inputRows, setInputRows] = useState([
    {
      forexDate: '',
      referenceName: '',
      dueDate: '',
      forexCurrencyType: '',
      forexAmount: '',
      exchangeRate: '',
      referenceAmount: '',
      referenceCreditOrDebit: ''
    }
  ]);

  // Function to handle input changes
  const handleInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...inputRows];
    updatedRows[rowIndex][name] = value;
    setInputRows(updatedRows);
  };

  // Function to handle keydown events
  const handleKeyDown = (e, rowIndex, inputIndex) => {
    if (e.key === 'Enter' && inputIndex === 7) { // Check if Enter key is pressed and it's the last input
      e.preventDefault();
      addNewRow(); // Add a new row
    }
  };

  // Function to add a new row of inputs
  const addNewRow = () => {
    const lastRow = inputRows[inputRows.length - 1];
    const isEmpty = Object.values(lastRow).some(value => value === '');

    if (!isEmpty) {
      setInputRows(prevRows => [...prevRows, {
        forexDate: '',
        referenceName: '',
        dueDate: '',
        forexCurrencyType: '',
        forexAmount: '',
        exchangeRate: '',
        referenceAmount: '',
        referenceCreditOrDebit: ''
      }]);
    }
  };

  return (
    <div>
      {/* Labels */}
      <div className='flex border border-t-slate-400 border-b-slate-400 justify-between'>
        <p className='w-[60px] text-sm'>Date</p>
        <p className='w-[160px] text-sm'>Bill-wise Reference Name</p>
        <p className='text-sm'>Due Date</p>
        <p className='text-sm'>Forex Currency Type</p>
        <p className='text-sm'><span>($)</span> Forex Amount</p>
        <p className='text-sm'><span>(₹)</span> Exchange Rate</p>
        <p className='text-sm'><span>(₹)</span> Amount</p>
        <p>Cr/Dr</p>
      </div>

      {/* Dynamic Input Rows */}
      {inputRows.map((row, rowIndex) => (
        <div key={rowIndex} className='flex justify-between'>
          {Object.keys(row).map((key, inputIndex) => (
            <input
              key={inputIndex}
              type="text"
              id={key}
              name={key}
              value={row[key]}
              onChange={(e) => handleInputChange(e, rowIndex)}
              ref={(input) => (inputRefs.current[rowIndex * 8 + inputIndex] = input)}
              onKeyDown={(e) => handleKeyDown(e, rowIndex, inputIndex)}
              className={`w-[${key === 'referenceCreditOrDebit' ? '50px' : '100px'}] ml-1 h-5 pl-1 font-medium text-sm ${key === 'forexAmount' || key === 'exchangeRate' || key === 'referenceAmount' ? 'text-right' : ''} capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border`}
              autoComplete='off'
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SundryCreditorForm;
