import { Link, useNavigate, useParams } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';
import { useEffect, useRef, useState } from 'react';
import { listOfBatchColorNames, listOfBatchSerialNumbers, listOfBatchSizes, listOfBranchOffices, listOfCostCategories, listOfCurrencies, listOfDepartments, listOfHeadOffices, listOfLocations, listOfPreDefinedVouchers, listOfPriceCategories, listOfRevenueCategories, listOfRevenueCenters, listOfStockCategories, listOfStockGroups, listOfStockItems, listOfUnits, listOfVouchers, listsOfBatchCategories, listsOfCostCenters, listsOfProjectCategories, listsOfProjectNames, listsOfSundryCreditors, listsOfSundryDebtors } from '../services/MasterService';
import NameValues from '../../assets/NameValues';

const DisplayFilter = () => {
    const { type } = useParams();
    const [suggestions, setSuggestions] = useState({
        voucherType: [],
        preDefinedVoucherType: [],
        currency: [],
        department: [],
        godown: [],
        headOffice: [],
        branchOffice: [],
        revenueCategory: [],
        revenueCenter: [],
        costCategory: [],
        costCenter: [],
        batchCategory: [],
        batchSerialNumber: [],
        batchColor: [],
        batchSize: [],
        projectCategory: [],
        projectName: [],
        sundryCreditor: [],
        sundryDebtor: [],
        stockGroup: [],
        stockCategory: [],
        priceCategory: [],
        stockItem: [],
        unit: [],
    });
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
        projectName: 'Projects',
        sundryCreditor: 'Sundry Creditors',
        sundryDebtor: 'Sundry Debtors',
        stockGroup: 'Stock Groups',
        stockCategory: 'Stock Categories',
        priceCategory: 'Price Categories',
        stockItem: 'Stock Items',
        unit: 'Units',
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
                const fetchFunctions = {
                    voucher: async () => {
                        const [customResponse, preDefinedResponse] = await Promise.all([
                            listOfVouchers(),
                            listOfPreDefinedVouchers()
                        ]);
                        setSuggestions(prev => ({
                            ...prev,
                            voucherType: customResponse.data,
                            preDefinedVoucherType: preDefinedResponse.data
                        }));
                    },
                    currency: async () => {
                        const response = await listOfCurrencies();
                        setSuggestions(prev => ({ ...prev, currency: response.data }));
                    },
                    department: async () => {
                        const response = await listOfDepartments();
                        setSuggestions(prev => ({ ...prev, department: response.data }));
                    },
                    godown: async () => {
                        const response = await listOfLocations();
                        setSuggestions(prev => ({ ...prev, godown: response.data }));
                    },
                    headOffice: async () => {
                        const response = await listOfHeadOffices();
                        setSuggestions(prev => ({ ...prev, headOffice: response.data }));
                    },
                    branchOffice: async () => {
                        const response = await listOfBranchOffices();
                        setSuggestions(prev => ({ ...prev, branchOffice: response.data }));
                    },
                    revenueCategory: async () => {
                        const response = await listOfRevenueCategories();
                        setSuggestions(prev => ({ ...prev, revenueCategory: response.data }));
                    },
                    revenueCenter: async () => {
                        const response = await listOfRevenueCenters();
                        setSuggestions(prev => ({ ...prev, revenueCenter: response.data }));
                    },
                    costCategory: async () => {
                        const response = await listOfCostCategories();
                        setSuggestions(prev => ({ ...prev, costCategory: response.data }));
                    },
                    costCenter: async () => {
                        const response = await listsOfCostCenters();
                        setSuggestions(prev => ({ ...prev, costCenter: response.data }));
                    },
                    batchCategory: async () => {
                        const response = await listsOfBatchCategories();
                        setSuggestions(prev => ({ ...prev, batchCategory: response.data }));
                    },
                    batchSerialNumber: async () => {
                        const response = await listOfBatchSerialNumbers();
                        setSuggestions(prev => ({ ...prev, batchSerialNumber: response.data }));
                    },
                    batchColor: async () => {
                        const response = await listOfBatchColorNames();
                        setSuggestions(prev => ({ ...prev, batchColor: response.data }));
                    },
                    batchSize: async () => {
                        const response = await listOfBatchSizes();
                        setSuggestions(prev => ({ ...prev, batchSize: response.data }));
                    },
                    projectCategory: async () => {
                        const response = await listsOfProjectCategories();
                        setSuggestions(prev => ({ ...prev, projectCategory: response.data }));
                    },
                    projectName: async () => {
                        const response = await listsOfProjectNames();
                        setSuggestions(prev => ({ ...prev, projectName: response.data }));
                    },
                    sundryCreditor: async () => {
                        const response = await listsOfSundryCreditors();
                        setSuggestions(prev => ({ ...prev, sundryCreditor: response.data }));

                        console.log(response.data)
                    },
                    sundryDebtor: async () => {
                        const response = await listsOfSundryDebtors();
                        setSuggestions(prev => ({ ...prev, sundryDebtor: response.data }));
                    },
                    stockGroup: async () => {
                        const response = await listOfStockGroups();
                        setSuggestions(prev => ({ ...prev, stockGroup: response.data }));
                    },
                    stockCategory: async () => {
                        const response = await listOfStockCategories();
                        setSuggestions(prev => ({ ...prev, stockCategory: response.data }));
                    },
                    priceCategory: async () => {
                        const response = await listOfPriceCategories();
                        setSuggestions(prev => ({ ...prev, priceCategory: response.data }));
                    },
                    stockItem: async () => {
                        const response = await listOfStockItems();
                        setSuggestions(prev => ({ ...prev, stockItem: response.data }));
                    },
                    unit: async () => {
                        const response = await listOfUnits();
                        setSuggestions(prev => ({ ...prev, unit: response.data }));
                    },
                };

                if (fetchFunctions[type]) {
                    await fetchFunctions[type]();
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

    // Filter the suggestions based on user input
    const filteredVoucherTypes = suggestions.voucherType.filter(voucher =>
        voucher.voucherTypeName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredPreDefinedVoucherTypes = suggestions.preDefinedVoucherType.filter(voucher =>
        voucher.voucherType?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredCurrencies = suggestions.currency.filter(currency =>
        currency.forexCurrencyName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredDepartments = suggestions.department.filter(department => 
        department.departmentName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredLocations = suggestions.godown.filter(location =>
        location.godownName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredHeadOffices = suggestions.headOffice.filter(headOffice =>
        headOffice.headOfficeName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredBranchOffices = suggestions.branchOffice.filter(branchOffice => 
        branchOffice.branchOfficeName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredRevenueCategories = suggestions.revenueCategory.filter(revenueCategory => 
        revenueCategory.revenueCategoryName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredRevenueCenters = suggestions.revenueCenter.filter(revenueCenter => 
        revenueCenter.revenueCenterName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredCostCategories = suggestions.costCategory.filter(costCategory =>
        costCategory.costCategoryName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredCostCenters = suggestions.costCenter.filter(costCenter =>
        costCenter.costCenterName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredBatchCategories = suggestions.batchCategory.filter(batchCategory =>
        batchCategory.batchCategoryName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredBatchSerialNumbers = suggestions.batchSerialNumber.filter(batchSerial =>
        batchSerial.batchSerialNumber?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredBatchColors = suggestions.batchColor.filter(batchColor =>
        batchColor.batchColorName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredBatchSizes = suggestions.batchSize.filter(batchSize =>
        batchSize.batchSizeName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredProjectCategories = suggestions.projectCategory.filter(projectCategory =>
        projectCategory.projectCategoryName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredProjectNames = suggestions.projectName.filter(project =>
        project.projectName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredSuppliers = suggestions.sundryCreditor.filter( supplier => 
        supplier.sundryCreditorName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredCustomers = suggestions.sundryDebtor.filter(customer =>
        customer.sundryDebtorName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredStockGroups = suggestions.stockGroup.filter(group => 
        group.stockGroupName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredStockCategories = suggestions.stockCategory.filter(category => 
        category.stockCategoryName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredPriceCategories = suggestions.priceCategory.filter(priceCategory =>
        priceCategory.priceCategoryName?.toLowerCase().includes(filterInput?.toLowerCase() || '')
    );

    const filteredStockItems = suggestions.stockItem.filter(item => 
        item.stockItemName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    const filteredUnits = suggestions.unit.filter(unit => 
        unit.unitSymbolName?.toLowerCase().includes(filterInput?.toLowerCase())
    );

    // Determine if the scrollbar should be shown based on the type
  const shouldShowScroll = (() => {
    const countMap = {
      voucher: filteredVoucherTypes.length + filteredPreDefinedVoucherTypes.length,
      currency: filteredCurrencies.length,
      department: filteredDepartments.length,
      godown: filteredLocations.length,
      headOffice: filteredHeadOffices.length,
      branchOffice: filteredBranchOffices.length,
      revenueCategory: filteredRevenueCategories.length,
      revenueCenter: filteredRevenueCenters.length,
      costCategory: filteredCostCategories.length,
      costCenter: filteredCostCenters.length,
      batchCategory: filteredBatchCategories.length,
      batchSerialNumber: filteredBatchSerialNumbers.length,
      batchColor: filteredBatchColors.length,
      batchSize: filteredBatchSizes.length,
      projectCategory: filteredProjectCategories.length,
      projectName: filteredProjectNames.length,
      sundryCreditor: filteredSuppliers.length,
      sundryDebtor: filteredCustomers.length,
      stockGroup: filteredStockGroups.length,
      stockCategory: filteredStockCategories.length,
      priceCategory: filteredPriceCategories.length,
      stockItem: filteredStockItems.length,
      unit: filteredUnits.length,
    };
    return countMap[type] > 20;
  })();

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
            } else if (type === 'projectName'){
                totalItems = filteredProjectNames.length;
            } else if (type === 'sundryCreditor'){
                totalItems = filteredSuppliers.length;
            } else if (type === 'sundryDebtor'){
                totalItems = filteredCustomers.length;
            } else if (type === 'stockGroup'){
                totalItems = filteredStockGroups.length;
            } else if (type === 'stockCategory'){
                totalItems = filteredStockCategories.length;
            } else if (type === 'priceCategory'){
                totalItems = filteredPriceCategories.length;
            } else if (type === 'stockItem'){
                totalItems = filteredStockItems.length;
            } else if (type === 'unit'){
                totalItems = filteredUnits.length;
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
                } else if (type === 'projectName'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredProjectNames.length){
                        const selectedProject = filteredProjectNames[selectedIndex - 2];
                        if (selectedProject) {
                            navigate(`/projectNameMasterApi/displayProjectName/${selectedProject.projectName}`);
                        }
                    }
                } else if (type === 'sundryCreditor'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredSuppliers.length){
                        const selectedSundryCreditor = filteredSuppliers[selectedIndex - 2];
                        if (selectedSundryCreditor) {
                            navigate(`/sundryCreditorMasterApi/displaySundryCreditor/${selectedSundryCreditor.sundryCreditorName}`);
                        }
                    }
                } else if (type === 'sundryDebtor'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredCustomers.length){
                        const selectedSundryDebtor = filteredCustomers[selectedIndex - 2];
                        if (selectedSundryDebtor){
                            navigate(`/sundryDebtorMasterApi/displaySundryDebtor/${selectedSundryDebtor.sundryDebtorName}`);
                        }
                    }
                } else if (type === 'stockGroup'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredStockGroups.length){
                        const selectedStockGroup = filteredStockGroups[selectedIndex - 2];
                        if (selectedStockGroup){
                            navigate(`/stockGroupMasterApi/displayStockGroup/${selectedStockGroup.stockGroupName}`);
                        }
                    }
                } else if (type === 'stockCategory'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredStockCategories.length){
                        const selectedStockCategory = filteredStockCategories[selectedIndex - 2];
                        if (selectedStockCategory){
                            navigate(`/stockCategoryMasterApi/displayStockCategory/${selectedStockCategory.stockCategoryName}`);
                        }
                    }
                } else if (type === 'priceCategory'){
                   if (selectedIndex >= 2  && selectedIndex < 2 + filteredPriceCategories.length){
                    const selectedPriceCategory = filteredPriceCategories[selectedIndex - 2];
                    if (selectedPriceCategory){
                        navigate(`/priceCategoryMasterApi/displayPriceCategory/${selectedPriceCategory.priceCategoryName}`);
                    }
                   }
                } else if (type === 'stockItem'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredStockItems.length){
                        const selectedStockItem = filteredStockItems[selectedIndex - 2];
                        if (selectedStockItem){
                            navigate(`/stockItemMasterApi/displayStockItem/${selectedStockItem.stockItemName}`);
                        }
                    }
                } else if (type === 'unit'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredUnits.length){
                        const selectedUnit = filteredUnits[selectedIndex - 2];
                        if (selectedUnit){
                            navigate(`/unitMasterApi/displayUnit/${selectedUnit.unitSymbolName}`);
                        }
                    }
                }
            } else if (e.key === 'Escape') {
                navigate(`/menu/${type}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, filteredVoucherTypes, filteredPreDefinedVoucherTypes, filteredCurrencies, filteredDepartments, filteredLocations, filteredHeadOffices, filteredBranchOffices, filteredRevenueCategories, filteredRevenueCenters, filteredCostCategories, filteredCostCenters, filteredBatchCategories, filteredBatchSerialNumbers, filteredBatchColors, filteredBatchSizes, filteredProjectCategories, filteredProjectNames, filteredSuppliers, filteredCustomers, filteredStockGroups, filteredStockCategories, filteredPriceCategories, filteredStockItems, filteredUnits, navigate, type]);

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
                                                   {currency.forexCurrencySymbol} - {currency.forexCurrencyName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'department' && (
                                        <ul>
                                            {filteredDepartments.map((department,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}
                                                >
                                                {department.departmentName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'godown' && (
                                        <ul>
                                            {filteredLocations.map((location,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                   {location.godownName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'headOffice' && (
                                        <ul>
                                            {filteredHeadOffices.map((headOffice,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {headOffice.headOfficeName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'branchOffice' && (
                                        <ul>
                                            {filteredBranchOffices.map((branchOffice,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {branchOffice.branchOfficeName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'revenueCategory' && (
                                        <ul>
                                            {filteredRevenueCategories.map((revenueCategory,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {revenueCategory.revenueCategoryName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'revenueCenter' && (
                                        <ul>
                                            {filteredRevenueCenters.map((revenueCenter,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {revenueCenter.revenueCenterName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'costCategory' && (
                                        <ul>
                                            {filteredCostCategories.map((costCategory,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {costCategory.costCategoryName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'costCenter' && (
                                        <ul>
                                            {filteredCostCenters.map((costCenter,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {costCenter.costCenterName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'batchCategory' && (
                                        <ul>
                                            {filteredBatchCategories.map((batchCategory,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {batchCategory.batchCategoryName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'batchSerialNumber' && (
                                        <ul>
                                            {filteredBatchSerialNumbers.map((batchSerial,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {batchSerial.batchSerialNumber}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'batchColor' && (
                                        <ul>
                                            {filteredBatchColors.map((batchColor,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {batchColor.batchColorName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'batchSize' && (
                                        <ul>
                                            {filteredBatchSizes.map((batchSize,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {batchSize.batchSizeName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'projectCategory' && (
                                        <ul>
                                            {filteredProjectCategories.map((projectCategory,index) =>(
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                   {projectCategory.projectCategoryName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'projectName' && (
                                        <ul>
                                            {filteredProjectNames.map((project,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {project.projectName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'sundryCreditor' && (
                                        <ul>
                                            {filteredSuppliers.map((supplier,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {supplier.sundryCreditorName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'sundryDebtor' && (
                                        <ul>
                                            {filteredCustomers.map((customer,index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {customer.sundryDebtorName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'stockGroup' && (
                                        <ul>
                                            {filteredStockGroups.map((stockGroup, index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {stockGroup.stockGroupName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'stockCategory' && (
                                        <ul>
                                            {filteredStockCategories.map((stockCategory, index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {stockCategory.stockCategoryName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'priceCategory' && (
                                        <ul>
                                            {filteredPriceCategories.map((priceCategory, index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                ref={el => listItemRefs.current[index + 2] = el}>
                                                    {priceCategory.priceCategoryName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'stockItem' && (
                                        <ul>
                                            {filteredStockItems.map((stockItem, index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {stockItem.stockItemCode} - {stockItem.stockItemName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'unit' && (
                                        <ul>
                                            {filteredUnits.map((unit, index) => (
                                                <li key={index} className={`text-sm capitalize font-medium pl-3 cursor-pointer ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}>
                                                    {unit.unitSymbolName} - {unit.formalName}
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
