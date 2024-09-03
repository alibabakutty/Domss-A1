import React, { useState, useRef } from 'react';

const SundryCreditorSubForm = () => {
  const [tableRows, setTableRows] = useState([
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

  const inputRefs = useRef([]);

  const handleTableInputChange = (index, event) => {
    const { name, value } = event.target;
    const newTableRows = [...tableRows];
    newTableRows[index][name] = value;

    if (name === 'forexDate' && !value.trim()) {
      setTableRows(newTableRows.slice(0, index + 1));
      return;
    }

    if (name === 'referenceCreditOrDebit' && value.trim() !== '' && index === tableRows.length - 1) {
      setTableRows([
        ...newTableRows,
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
    } else {
      setTableRows(newTableRows);
    }
  };

  const handleKeyDown = (index, event) => {
    const { key } = event;
    if (key === 'Enter') {
      event.preventDefault();
      if (index < tableRows.length - 1) {
        // Focus the next row's first input
        inputRefs.current[index + 1][0].focus();
      } else {
        // Optionally add a new row if at the last row
        handleTableInputChange(index, { target: { name: 'referenceCreditOrDebit', value: tableRows[index].referenceCreditOrDebit } });
      }
    } else if (key === 'Backspace') {
      if (event.target.value === '') {
        event.preventDefault();
        if (index > 0) {
          // Focus the previous row's last input if the current input is empty
          const prevRow = inputRefs.current[index - 1];
          prevRow[prevRow.length - 1].focus();
        }
      }
    }
  };

  return (
    <div>
      <table className='border-collapse border border-slate-400 table-fixed'>
        <thead className='text-sm'>
          <tr className='border-t border-b border-slate-400'>
            <th>Date</th>
            <th>Reference Name</th>
            <th>Due Date</th>
            <th>Forex Currency Type</th>
            <th><span>($)</span> Forex Amount</th>
            <th><span>(₹)</span> Exchange Rate</th>
            <th><span>(₹)</span> Amount</th>
            <th>Cr/Dr</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name='forexDate'
                  value={row.forexDate}
                  onChange={(e) => handleTableInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = [el])}
                  className='w-full h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
                  autoComplete='off'
                />
              </td>
              <td>
                <input
                  type="text"
                  name='referenceName'
                  value={row.referenceName}
                  onChange={(e) => handleTableInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = [...(inputRefs.current[index] || []), el])}
                  className='w-full h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
                  autoComplete='off'
                />
              </td>
              <td>
                <input
                  type="text"
                  name='dueDate'
                  value={row.dueDate}
                  onChange={(e) => handleTableInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = [...(inputRefs.current[index] || []), el])}
                  className='w-full h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
                  autoComplete='off'
                />
              </td>
              <td>
                <input
                  type="text"
                  name='forexCurrencyType'
                  value={row.forexCurrencyType}
                  onChange={(e) => handleTableInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = [...(inputRefs.current[index] || []), el])}
                  className='w-full h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
                  autoComplete='off'
                />
              </td>
              <td>
                <input
                  type="text"
                  name='forexAmount'
                  value={row.forexAmount}
                  onChange={(e) => handleTableInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = [...(inputRefs.current[index] || []), el])}
                  className='w-full h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
                  autoComplete='off'
                />
              </td>
              <td>
                <input
                  type="text"
                  name='exchangeRate'
                  value={row.exchangeRate}
                  onChange={(e) => handleTableInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = [...(inputRefs.current[index] || []), el])}
                  className='w-full h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
                  autoComplete='off'
                />
              </td>
              <td>
                <input
                  type="text"
                  name='referenceAmount'
                  value={row.referenceAmount}
                  onChange={(e) => handleTableInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = [...(inputRefs.current[index] || []), el])}
                  className='w-full h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
                  autoComplete='off'
                />
              </td>
              <td>
                <input
                  type="text"
                  name='referenceCreditOrDebit'
                  value={row.referenceCreditOrDebit}
                  onChange={(e) => handleTableInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = [...(inputRefs.current[index] || []), el])}
                  className='w-full h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border'
                  autoComplete='off'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SundryCreditorSubForm;
