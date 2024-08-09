import React from 'react'
import { useParams } from 'react-router-dom'
import GroupCreateForm from '../forms/GroupCreate'
import LedgerCreateForm from '../forms/LedgerCreate'
import VoucherTypeCreateForm from '../forms/VoucherTypeCreate'
import CurrencyCreate from '../forms/CurrencyCreate'
import StockGroupCreate from '../forms/StockGroupCreate'
import StockCategoryCreate from '../forms/StockCategoryCreate'
import StockItemCreate from '../forms/StockItemCreate'
import UnitCreate from '../forms/UnitCreate'
import SundryCreditorsCreate from '../forms/SundryCreditorsCreate'
import SundryDebtorsCreate from '../forms/SundryDebtorsCreate'
import DepartmentCreate from '../forms/DepartmentCreate'
import LocationCreate from '../forms/LocationCreate'
import HeadOfficeCreate from '../forms/HeadOfficeCreate'
import BranchOfficeCreate from '../forms/BranchOfficeCreate'
import RevenueCategoryCreate from '../forms/RevenueCategoryCreate'
import RevenueCentreCreate from '../forms/RevenueCentreCreate'
import CostCategoryCreate from '../forms/CostCategoryCreate'
import CostCentreCreate from '../forms/CostCentreCreate'
import BatchMasterCategoryCreate from '../forms/BatchMasterCategoryCreate'
import BatchMasterSerialNumberCreate from '../forms/BatchMasterSerialNumberCreate'
import BatchMasterColorCreate from '../forms/BatchMasterColorCreate'
import BatchMasterSizeCreate from '../forms/BatchMasterSizeCreate'
import ProjectMasterCreate from '../forms/ProjectMasterCreate'

const DisplayMasterFormRouter = () => {
  const { type } = useParams();

  const renderComp = () => {
    switch (type) {
      case 'groupDisplay':
        return <GroupCreateForm />
      case 'ledgerDisplay':
        return <LedgerCreateForm />
      case 'voucherDisplay': 
        return <VoucherTypeCreateForm />
      case 'currencyDisplay':
        return <CurrencyCreate />
      case 'stockGroupDisplay':
        return <StockGroupCreate />
      case 'stockCategoryDisplay':
        return <StockCategoryCreate />
      case 'stockItemDisplay':
        return <StockItemCreate />
      case 'unitDisplay':
        return <UnitCreate />
      case 'sundryCreditorsDisplay':
        return <SundryCreditorsCreate />
      case 'sundryDebtorsDisplay':
        return <SundryDebtorsCreate />
      case 'departmentDisplay':
        return <DepartmentCreate />
      case 'locationDisplay':
        return <LocationCreate />
      case 'headOfficeDisplay':
        return <HeadOfficeCreate />
      case 'branchOfficeDisplay':
        return <BranchOfficeCreate />
      case 'revenueCategoryDisplay':
        return <RevenueCategoryCreate />
      case 'revenueCentreDisplay':
        return <RevenueCentreCreate />
      case 'costCategoryDisplay':
        return <CostCategoryCreate />
      case 'costCentreDisplay':
        return <CostCentreCreate />
      case 'batchMasterCategoryDisplay':
        return <BatchMasterCategoryCreate />
      case 'batchMasterSerialNumberDisplay':
        return <BatchMasterSerialNumberCreate />
      case 'batchMasterColorDisplay':
        return <BatchMasterColorCreate />
      case 'batchMasterSizeDisplay':
        return <BatchMasterSizeCreate />
      case 'projectMasterDisplay':
        return <ProjectMasterCreate />
    
      default:
        return <div>404 Not Found!</div>;
    }
  }
  return (
    <>
      <div className="container">{renderComp()}</div>
    </>
  )
}

export default DisplayMasterFormRouter