import { Link, useParams } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';
import { useEffect, useRef, useState } from 'react';
import VoucherMenu from '../../assets/VoucherMenu';
import { listOfVouchers } from '../services/MasterService';

const DisplayFilter = () => {

    const { type } = useParams();
    const [highlightedSuggestionVoucherType, setHighlightedSuggestionVoucherType] = useState(0);
    const [voucherTypeSuggestion, setVoucherTypeSuggestions] = useState([]);
    const [preDefinedVoucherTypeSuggestions, setPreDefinedVoucherTypeSuggestions] = useState(VoucherMenu);
    const inputRef = useRef(null);

    const formatType = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }

        // Only fetch data if the current path is '/voucher/display'
       if (type === 'voucher'){
        listOfVouchers().then(response =>{
            setVoucherTypeSuggestions(response.data);
        }).catch(error => {
            console.log(error);
        })
       }
    },[type]);

  return (
    <>
    <div className="container flex">
        <div className='w-[96%] h-[93.3vh] flex'>
             <div className='w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
             <div className='w-1/2 bg-slate-100 border border-l-blue-400 flex justify-center flex-col items-center'>
                <div className="w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 ">
                    <p className="text-[13px] font-semibold underline underline-offset-4 decoration-gray-400">
                        {formatType(type)} Display
                    </p>
                    <input
                        type="text"
                        id="voucherTypeName"
                        name="voucherTypeName"
                        ref={inputRef}
                        className="w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off"
                    />
                </div>
                <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                    <h2 className="p-1 bg-[#2a67b1] text-white text-left text-[13px] pl-3">
                        List of Groups
                    </h2>
                    <div className='border border-b-slate-400'>
                        <Link><p className='ml-[295px] text-sm'>Create</p></Link>
                        <Link><p className='ml-[303px] text-sm'>Back</p></Link>
                    </div>
                    <div className='overflow-y-scroll h-[73vh]'>
                        <div>
                            <ul className='pl-2'>
                                <p className='text-sm font-medium'>{`Customized ${type}`}</p>
                                {voucherTypeSuggestion.map((voucher,index) => (
                                    <li key={index} className='text-sm capitalize'>
                                        {voucher.voucherTypeName}
                                    </li>
                                ))}
                            </ul>
                             {/* Conditionally render pre-defined items */}
                             <p className='text-sm font-medium pl-2'>{`Pre-Defined ${type}`}</p>
                            {type === 'voucher' && (
                                <ul className='pl-2'>
                                    {preDefinedVoucherTypeSuggestions.map((voucher,index) => (
                                        <li key={index} className='text-sm capitalize'>
                                            {voucher.value}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
             </div>
        </div>
        <RightSideButton />
    </div>
    </>
  )
}

export default DisplayFilter;
