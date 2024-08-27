import { Link, useNavigate, useParams } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';
import { useEffect, useRef, useState } from 'react';
import { listOfBatchColorNames, listOfBatchSerialNumbers, listOfBatchSizes, listOfBranchOffices, listOfCostCategories, listOfCurrencies, listOfDepartments, listOfHeadOffices, listOfLocations, listOfPreDefinedVouchers, listOfRevenueCategories, listOfRevenueCenters, listOfVouchers, listsOfBatchCategories, listsOfCostCenters, listsOfProjectCategories, listsOfProjectNames } from '../services/MasterService';
import NameValues from '../../assets/NameValues';

const DisplayFilter = () => {
    const { type } = useParams();
    const [voucherTypeSuggestions, setVoucherTypeSuggestions] = useState([]);
    const [preDefinedVoucherTypeSuggestions, setPreDefinedVoucherTypeSuggestions] = useState([]);
    const [currencySuggestions, setCurrencySuggestions] = useState([]);
    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [headOfficeSuggestions, setHeadOfficeSuggestions] = useState([]);
    const [branchOfficeSuggestions, setBranchOfficeSuggestions] = useState([]);
    const [revenueCategorySuggestions, setRevenueCategorySuggestions] = useState([]);
    const [revenueCenterSuggestions, setRevenueCenterSuggestions] = useState([]);
    const [costCategorySuggestions, setCostCategorySuggestions] = useState([]);
    const [costCenterSuggestions, setCostCenterSuggestions] = useState([]);
    const [batchCategorySuggestions, setBatchCategorySuggestions] = useState([]);
    const [batchSerialNumberSuggestions, setBatchSerialNumberSuggestions] = useState([]);
    const [batchColorSuggestions, setBatchColorSuggestions] = useState([]);
    const [batchSizeSuggestions, setBatchSizeSuggestions] = useState([]);
    const [projectCategorySuggestions, setProjectCategorySuggestions] = useState([]);
    const [projectNameSuggestions, setProjectNameSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(2);
    const [filterInput, setFilterInput] = useState('');
    const inputRef = useRef(null);
    const listItemRefs = useRef([]);
    const navigate = useNavigate();
    const typeNames = {
        currency: 'Currencies',
        voucher: 'Vouchers',
        department: 'Departments',
        godownn: 'Locations',
        headOffice: 'Head Offices',
        branchOffice: 'Branch Offices',
        revenueCategory: 'Revenue Categories',
        revenueCenter: 'Revenue Centers',
        costCategory: 'Cost Categories',
        costCenter: 'Cost Centers',
        batchCategory: 'Batch Categories',
        batchSerialNumber: 'Batch Serial Numbers',
        batchColor: 'Batch Colors',
        batchSize: 'Batch Sizes',
        projectCategory: 'Project Categories',
        project: 'Projects'
      };

    const formatType = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        const fetchData = async () => {
            try {
                if (type === 'voucher') {
                    const [customResponse, predefinedResponse] = await Promise.all([listOfVouchers(), listOfPreDefinedVouchers()]);
                    setVoucherTypeSuggestions(customResponse.data);
                    setPreDefinedVoucherTypeSuggestions(predefinedResponse.data);
                } else if (type === 'currency') {
                    const response = await listOfCurrencies();
                    setCurrencySuggestions(response.data);
                } else if (type === 'department') {
                    const response = await listOfDepartments();
                    setDepartmentSuggestions(response.data);
                } else if (type === 'godown') {
                    const response = await listOfLocations();
                    setLocationSuggestions(response.data);
                } else if (type === 'headOffice') {
                    const response = await listOfHeadOffices();
                    setHeadOfficeSuggestions(response.data);
                } else if (type === 'branchOffice') {
                    const response = await listOfBranchOffices();
                    setBranchOfficeSuggestions(response.data);
                } else if (type === 'revenueCategory'){
                    const response = await listOfRevenueCategories();
                    setRevenueCategorySuggestions(response.data);
                } else if (type === 'revenueCenter'){
                    const response = await listOfRevenueCenters();
                    setRevenueCenterSuggestions(response.data);
                } else if (type === 'costCategory'){
                    const response = await listOfCostCategories();
                    setCostCategorySuggestions(response.data);
                } else if (type === 'costCenter'){
                    const response = await listsOfCostCenters();
                    setCostCenterSuggestions(response.data);
                } else if (type === 'batchCategory'){
                    const response = await listsOfBatchCategories();
                    setBatchCategorySuggestions(response.data);
                } else if (type === 'batchSerialNumber'){
                    const response = await listOfBatchSerialNumbers();
                    setBatchSerialNumberSuggestions(response.data);
                } else if (type === 'batchColor'){
                    const response = await listOfBatchColorNames();
                    setBatchColorSuggestions(response.data);
                } else if (type === 'batchSize'){
                    const response = await listOfBatchSizes();
                    setBatchSizeSuggestions(response.data);
                } else if (type === 'projectCategory'){
                    const response = await listsOfProjectCategories();
                    setProjectCategorySuggestions(response.data);
                } else if (type === 'project'){
                    const response = await listsOfProjectNames();
                    setProjectNameSuggestions(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [type]);

    const handleInputChange = (e) => {
        setFilterInput(e.target.value);
        setSelectedIndex(2); // Reset focus to the first item on input change
    };

    const filteredVoucherTypes = voucherTypeSuggestions.filter(voucher =>
        voucher.voucherTypeName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredPreDefinedVoucherTypes = preDefinedVoucherTypeSuggestions.filter(voucher =>
        voucher.voucherType.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredCurrencies = currencySuggestions.filter(currency =>
        currency.forexCurrencyName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredDepartments = departmentSuggestions.filter(department => 
        department.departmentName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredLocations = locationSuggestions.filter(location =>
        location.godownName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredHeadOffices = headOfficeSuggestions.filter(headOffice =>
        headOffice.headOfficeName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredBranchOffices = branchOfficeSuggestions.filter(branchOffice => 
        branchOffice.branchOfficeName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredRevenueCategories = revenueCategorySuggestions.filter(revenueCategory => 
        revenueCategory.revenueCategoryName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredRevenueCenters = revenueCenterSuggestions.filter(revenueCenter => 
        revenueCenter.revenueCenterName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredCostCategories = costCategorySuggestions.filter(costCategory =>
        costCategory.costCategoryName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredCostCenters = costCenterSuggestions.filter(costCenter =>
        costCenter.costCenterName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredBatchCategories = batchCategorySuggestions.filter(batchCategory =>
        batchCategory.batchCategoryName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredBatchSerialNumbers = batchSerialNumberSuggestions.filter(batchSerial =>
        batchSerial.batchSerialNumber.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredBatchColors = batchColorSuggestions.filter(batchColor =>
        batchColor.batchColorName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredBatchSizes = batchSizeSuggestions.filter(batchSize =>
        batchSize.batchSizeName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredProjectCategories = projectCategorySuggestions.filter(projectCategory =>
        projectCategory.projectCategoryName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredProjectNames = projectNameSuggestions.filter(project =>
        project.projectName.toLowerCase().includes(filterInput.toLowerCase())
    );

    // Logic to determine if the scrollbar should be shown based on the type
    let shouldShowScroll;
    
    if (type === 'voucher') {
        shouldShowScroll = (filteredVoucherTypes.length + filteredPreDefinedVoucherTypes.length > 20);
    } else if (type === 'currency'){
        shouldShowScroll = (filteredCurrencies.length > 20);
    } else if (type === 'department'){
        shouldShowScroll = (filteredDepartments.length > 20);
    } else if (type === 'godown'){
        shouldShowScroll = (filteredLocations.length > 20);
    } else if (type === 'headOffice'){
        shouldShowScroll = (filteredHeadOffices.length > 20);
    } else if (type === 'branchOffice'){
        shouldShowScroll = (filteredBranchOffices.length > 20);
    } else if (type === 'revenueCategory'){
        shouldShowScroll = (filteredRevenueCategories.length > 20);
    } else if (type === 'revenueCenter'){
        shouldShowScroll = (filteredRevenueCenters.length > 20);
    } else if (type === 'costCategory'){
        shouldShowScroll = (filteredCostCategories.length > 20);
    } else if (type === 'costCenter'){
        shouldShowScroll = (filteredCostCenters.length > 20);
    } else if (type === 'batchCategory'){
        shouldShowScroll = (filteredBatchCategories.length > 20);
    } else if (type === 'batchSerialNumber'){
        shouldShowScroll = (filteredBatchSerialNumbers.length > 20);
    } else if (type === 'batchColor'){
        shouldShowScroll = (filteredBatchColors.length > 20);
    } else if (type === 'batchSize'){
        shouldShowScroll = (filteredBatchSizes.length > 20);
    } else if (type === 'projectCategory'){
        shouldShowScroll = (filteredProjectCategories.length > 20);
    } else if (type === 'project'){
        shouldShowScroll = (filteredProjectNames.length > 20);
    } else{
        shouldShowScroll = false;
    }

    const filteredNameValues = NameValues.filter(item => item.value.toLowerCase().includes(type.toLowerCase()));

    useEffect(() => {
        const handleKeyDown = (e) => {
            let totalItems = 0;
            if (type === 'currency') {
                totalItems = filteredCurrencies.length;
            } else if (type === 'voucher') {
                totalItems = filteredVoucherTypes.length + filteredPreDefinedVoucherTypes.length;
            } else if (type === 'department'){
                totalItems = filteredDepartments.length;
            } else if (type === 'godown'){
                totalItems = filteredLocations.length;
            } else if (type === 'headOffice'){
                totalItems = filteredHeadOffices.length;
            } else if (type === 'branchOffice'){
                totalItems = filteredBranchOffices.length;
            } else if (type === 'revenueCategory'){
                totalItems = filteredRevenueCategories.length;
            } else if (type === 'revenueCenter'){
                totalItems = filteredRevenueCenters.length;
            } else if (type === 'costCategory'){
                totalItems = filteredCostCategories.length;
            } else if (type === 'costCenter'){
                totalItems = filteredCostCenters.length;
            } else if (type === 'batchCategory'){
                totalItems = filteredBatchCategories.length;
            } else if (type === 'batchSerialNumber'){
                totalItems = filteredBatchSerialNumbers.length;
            } else if (type === 'batchColor'){
                totalItems = filteredBatchColors.length;
            } else if (type === 'batchSize'){
                totalItems = filteredBatchSizes.length;
            } else if (type === 'projectCategory'){
                totalItems = filteredProjectCategories.length;
            } else if (type === 'project'){
                totalItems = filteredProjectNames.length;
            }

            if (e.key === 'ArrowDown') {
                setSelectedIndex(prev => {
                    const newIndex = Math.min(prev + 1, totalItems + 1); // Ensures the focus doesn't exceed the list length
                    listItemRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    return newIndex;
                });
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex(prev => {
                    const newIndex = Math.max(prev - 1, 0); // Ensures the focus doesn't go below 0
                    listItemRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    return newIndex;
                });
            } else if (e.key === 'Enter') {
                if (selectedIndex === 0) {
                    navigate(`/menu/${type}`);
                } else if (selectedIndex === 1) {
                    navigate('/');
                } else if (type === 'voucher') {
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredVoucherTypes.length) {
                        const selectedVoucher = filteredVoucherTypes[selectedIndex - 2];
                        if (selectedVoucher) {
                            navigate(`/voucherTypeMasterApi/display/${selectedVoucher.voucherTypeName}`);
                        }
                    } else if (selectedIndex >= 2 + filteredVoucherTypes.length && selectedIndex < 2 + filteredVoucherTypes.length + filteredPreDefinedVoucherTypes.length) {
                        const selectedPreDefinedVoucher = filteredPreDefinedVoucherTypes[selectedIndex - 2 - filteredVoucherTypes.length];
                        if (selectedPreDefinedVoucher) {
                            navigate(`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${selectedPreDefinedVoucher.voucherType}`);
                        }
                    }
                } else if (type === 'currency') {
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredCurrencies.length) {
                        const selectedCurrency = filteredCurrencies[selectedIndex - 2];
                        if (selectedCurrency) {
                            navigate(`/currencyMasterApi/displayCurrency/${selectedCurrency.forexCurrencySymbol}`);
                        }
                    }
                } else if (type === 'department'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredDepartments.length){
                        const selectedDepartment = filteredDepartments[selectedIndex - 2];
                        if (selectedDepartment) {
                            navigate(`/departmentMasterApi/displayDepartment/${selectedDepartment.departmentName}`);
                        }
                    }
                } else if (type === 'godown'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredLocations.length){
                        const selectedLocation = filteredLocations[selectedIndex - 2];
                        if (selectedLocation) {
                            navigate(`/locationMasterApi/displayGodown/${selectedLocation.godownName}`);
                        }
                    }
                } else if (type === 'headOffice'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredHeadOffices.length){
                        const selectedHeadOffice = filteredHeadOffices[selectedIndex - 2];
                        if (selectedHeadOffice) {
                            navigate(`/headOfficeMasterApi/displayHeadOffice/${selectedHeadOffice.headOfficeName}`);
                        }
                    }
                } else if (type === 'branchOffice'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredBranchOffices.length){
                        const selectedBranchOffice = filteredBranchOffices[selectedIndex - 2];
                        if (selectedBranchOffice) {
                            navigate(`/branchOfficeMasterApi/displayBranchOffice/${selectedBranchOffice.branchOfficeName}`);
                        }
                    }
                } else if (type === 'revenueCategory'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredRevenueCategories.length){
                        const selectedRevenueCategory = filteredRevenueCategories[selectedIndex - 2];
                        if (selectedRevenueCategory) {
                            navigate(`/revenueCategoryMasterApi/displayRevenueCategory/${selectedRevenueCategory.revenueCategoryName}`);
                        }
                    }
                } else if (type === 'revenueCenter'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredRevenueCenters.length){
                        const selectedRevenueCenter = filteredRevenueCenters[selectedIndex - 2];
                        if (selectedRevenueCenter) {
                            navigate(`/revenueCenterMasterApi/displayRevenueCenter/${selectedRevenueCenter.revenueCenterName}`);
                        }
                    }
                } else if (type === 'costCategory'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredCostCategories.length){
                        const selectedCostCategory = filteredCostCategories[selectedIndex - 2];
                        if (selectedCostCategory) {
                            navigate(`/costCategoryMasterApi/displayCostCategory/${selectedCostCategory.costCategoryName}`);
                        }
                    }
                } else if (type === 'costCenter'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredCostCenters.length){
                        const selectedCostCenter = filteredCostCenters[selectedIndex - 2];
                        if (selectedCostCenter) {
                            navigate(`/costCenterMasterApi/displayCostCenter/${selectedCostCenter.costCenterName}`);
                        }
                    }
                } else if (type === 'batchCategory'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredBatchCategories.length){
                        const selectedBatchCategory = filteredBatchCategories[selectedIndex - 2];
                        if (selectedBatchCategory) {
                            navigate(`/batchCategoryMasterApi/displayBatchCategory/${selectedBatchCategory.batchCategoryName}`);
                        }
                    }
                } else if (type === 'batchSerialNumber'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredBatchSerialNumbers.length){
                        const selectedBatchSerialNumber = filteredBatchSerialNumbers[selectedIndex - 2];
                        if (selectedBatchSerialNumber){
                            navigate(`/batchSerialNumberMasterApi/displayBatchSerialNumber/${selectedBatchSerialNumber.batchSerialNumber}`);
                        }
                    }
                } else if (type === 'batchColor'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredBatchColors.length){
                        const selectedBatchColor = filteredBatchColors[selectedIndex - 2];
                        if (selectedBatchColor){
                            navigate(`/batchColorMasterApi/displayBatchColor/${selectedBatchColor.batchColorName}`)
                        }
                    }
                } else if (type === 'batchSize'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredBatchSizes.length){
                        const selectedBatchSize = filteredBatchSizes[selectedIndex - 2];
                        if (selectedBatchSize){
                            navigate(`/batchSizeMasterApi/displayBatchSize/${selectedBatchSize.batchSizeName}`);
                        }
                    }
                } else if (type === 'projectCategory'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredProjectCategories.length){
                        const selectedProjectCategory = filteredProjectCategories[selectedIndex - 2];
                        if (selectedProjectCategory) {
                            navigate(`/projectCategoryMasterApi/displayProjectCategory/${selectedProjectCategory.projectCategoryName}`);
                        }
                    }
                } else if (type === 'project'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredProjectNames.length){
                        const selectedProject = filteredProjectNames[selectedIndex - 2];
                        if (selectedProject) {
                            navigate(`/projectNameMasterApi/displayProjectName/${selectedProject.projectName}`);
                        }
                    }
                }
            } else if (e.key === 'Escape') {
                navigate(`/menu/${type}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, filteredVoucherTypes, filteredPreDefinedVoucherTypes, filteredCurrencies, filteredDepartments, filteredLocations, filteredHeadOffices, filteredBranchOffices, filteredRevenueCategories, filteredRevenueCenters, filteredCostCategories, filteredCostCenters, filteredBatchCategories, filteredBatchSerialNumbers, filteredBatchColors, filteredBatchSizes, filteredProjectCategories, filteredProjectNames, navigate, type]);

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    };
    

    return (
        <>
            <div className="container flex">
                <div className='w-[96%] h-[92.9vh] flex'>
                    <div className='w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
                    <div className='w-1/2 bg-slate-100 border border-l-blue-400 flex justify-center flex-col items-center'>
                        <div className="w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 ">
                            <p className="text-[13px] font-semibold underline underline-offset-4 decoration-gray-400">
                                {formatType(type)} Display
                            </p>
                            {filteredNameValues.map(({ id, value }) => (
                                <input
                                    key={id}
                                    type="text"
                                    id={value}
                                    name={value}
                                    value={filterInput}
                                    onChange={handleInputChange}
                                    ref={inputRef}
                                    className="w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-0 relative z-10"
                                    autoComplete="off"
                                />
                            ))}
                        </div>
                        <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                            <h2 className="p-1 bg-[#2a67b1] text-white text-left text-[13px] pl-3">
                                List of {typeNames[type] || 'Items'}
                            </h2>
                            <div className='border border-b-slate-400'>
                                <div className={`w-full ${selectedIndex === 0 ? 'bg-yellow-200' : ''}`}>
                                    <Link to={`/menu/${type}`} className=''>
                                        <p className={`ml-[295px] text-sm`}>Create</p>
                                    </Link>
                                </div>
                                <div className={`w-full ${selectedIndex === 1 ? 'bg-yellow-200' : ''}`}>
                                    <Link to={`/`} className=''>
                                        <p className={`ml-[296px] text-sm`}>Home</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={`h-[70vh] ${shouldShowScroll ? 'overflow-y-scroll' : ''}`}>
                                <div>
                                    {type === 'voucher' && (
                                        <>
                                            <ul className=''>
                                                {filteredVoucherTypes.map((voucher, index) => (
                                                    <li
                                                        key={index}
                                                        className={`text-sm ${selectedIndex === index + 2 ? '' : ''}`}
                                                        ref={el => listItemRefs.current[index + 2] = el}
                                                    >
                                                        <Link to={`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucher.voucherType}`}>
                                                            <p className='text-sm capitalize pl-3 font-medium'>{voucher.voucherType}</p>
                                                        </Link>
                                                        <Link
                                                            to={`/voucherTypeMasterApi/display/${voucher.voucherTypeName}`}
                                                            className={`pl-4 ${selectedIndex === index + 2 ? 'bg-yellow-200 block' : ''}`}
                                                        >
                                                            {capitalizeWords(voucher.voucherTypeName)}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className=''>
                                                {filteredPreDefinedVoucherTypes.map((voucher, index) => (
                                                    <li
                                                        key={index + filteredVoucherTypes.length}
                                                        className={`text-sm capitalize font-medium pl-3 ${selectedIndex === index + filteredVoucherTypes.length + 2 ? 'bg-yellow-200' : ''}`}
                                                        ref={el => listItemRefs.current[index + filteredVoucherTypes.length + 2] = el}
                                                    >
                                                        <Link to={`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucher.voucherType}`} className='text-sm capitalize font-medium'>
                                                        {voucher.voucherType}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                    {type === 'currency' && (
                                        <ul className=''>
                                            {filteredCurrencies.map((currency, index) => (
                                                <li
                                                    key={index}
                                                    className={`text-sm capitalize font-medium pl-3 ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                    ref={el => listItemRefs.current[index + 2] = el}
                                                >
                                                    <Link to={`/currencyMasterApi/displayCurrency/${currency.forexCurrencySymbol}`}>
                                                    {currency.forexCurrencySymbol} - {currency.forexCurrencyName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'department' && (
                                        <ul>
                                            {filteredDepartments.map((department,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}
                                                >
                                                <Link to={`/departmentMasterApi/displayDepartment/${type}`}>
                                                    {department.departmentName}
                                                </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'godown' && (
                                        <ul>
                                            {filteredLocations.map((location,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                   <Link to={`/locationMasterApi/displayGodown/${location.godownName}`}>
                                                    {location.godownName}
                                                   </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'headOffice' && (
                                        <ul>
                                            {filteredHeadOffices.map((headOffice,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/headOfficeMasterApi/displayHeadOffice/${headOffice.headOfficeName}`}>
                                                        {headOffice.headOfficeName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'branchOffice' && (
                                        <ul>
                                            {filteredBranchOffices.map((branchOffice,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/branchOfficeMasterApi/displayBranchOffice/${branchOffice.branchOfficeName}`}>
                                                        {branchOffice.branchOfficeName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'revenueCategory' && (
                                        <ul>
                                            {filteredRevenueCategories.map((revenueCategory,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/revenueCategoryMasterApi/displayRevenueCategory/${revenueCategory.revenueCategoryName}`}>
                                                        {revenueCategory.revenueCategoryName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'revenueCenter' && (
                                        <ul>
                                            {filteredRevenueCenters.map((revenueCenter,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/revenueCenterMasterApi/displayRevenueCenter/${revenueCenter.revenueCenterName}`}>
                                                        {revenueCenter.revenueCenterName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'costCategory' && (
                                        <ul>
                                            {filteredCostCategories.map((costCategory,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/costCategoryMasterApi/displayCostCategory/${costCategory.costCategoryName}`}>
                                                        {costCategory.costCategoryName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'costCenter' && (
                                        <ul>
                                            {filteredCostCenters.map((costCenter,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/costCenterMasterApi/displayCostCenter/${costCenter.costCenterName}`}>
                                                        {costCenter.costCenterName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'batchCategory' && (
                                        <ul>
                                            {filteredBatchCategories.map((batchCategory,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/batchCategoryMasterApi/displayBatchCategory/${batchCategory.batchCategoryName}`}>
                                                        {batchCategory.batchCategoryName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'batchSerialNumber' && (
                                        <ul>
                                            {filteredBatchSerialNumbers.map((batchSerial,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/batchSerialNumberMasterApi/displayBatchSerialNumber/${batchSerial.batchSerialNumber}`}>
                                                        {batchSerial.batchSerialNumber}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'batchColor' && (
                                        <ul>
                                            {filteredBatchColors.map((batchColor,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/batchColorMasterApi/displayBatchColor/${batchColor.batchColorName}`}>
                                                        {batchColor.batchColorName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'batchSize' && (
                                        <ul>
                                            {filteredBatchSizes.map((batchSize,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/batchSizeMasterApi/displayBatchSize/${batchSize.batchSizeName}`}>
                                                        {batchSize.batchSizeName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'projectCategory' && (
                                        <ul>
                                            {filteredProjectCategories.map((projectCategory,index) =>(
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/projectCategoryMasterApi/displayProjectCategory/${projectCategory.projectCategoryName}`}>
                                                        {projectCategory.projectCategoryName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'project' && (
                                        <ul>
                                            {filteredProjectNames.map((project,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    <Link to={`/projectNameMasterApi/displayProjectName/${project.projectName}`}>
                                                        {project.projectName}
                                                    </Link>
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
    );
};

export default DisplayFilter;
