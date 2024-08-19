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
import ProjectCategoryCreate from '../forms/ProjectCategoryCreate'
import ProjectNameCreate from '../forms/ProjectNameCreate'

const CreateMasterFormRouter = () => {
  const { type } = useParams();

  const renderComp = () => {
    switch (type) {
      case 'group':
        return <GroupCreateForm />
      case 'ledger':
        return <LedgerCreateForm />
      case 'voucher': 
        return <VoucherTypeCreateForm />
      case 'currency':
        return <CurrencyCreate />
      case 'stockGroup':
        return <StockGroupCreate />
      case 'stockCategory':
        return <StockCategoryCreate />
      case 'stockItem':
        return <StockItemCreate />
      case 'unit':
        return <UnitCreate />
      case 'sundryCreditors':
        return <SundryCreditorsCreate />
      case 'sundryDebtors':
        return <SundryDebtorsCreate />
      case 'department':
        return <DepartmentCreate />
      case 'location':
        return <LocationCreate />
      case 'headOffice':
        return <HeadOfficeCreate />
      case 'branchOffice':
        return <BranchOfficeCreate />
      case 'revenueCategory':
        return <RevenueCategoryCreate />
      case 'revenueCentre':
        return <RevenueCentreCreate />
      case 'costCategory':
        return <CostCategoryCreate />
      case 'costCentre':
        return <CostCentreCreate />
      case 'batchMasterCategory':
        return <BatchMasterCategoryCreate />
      case 'batchMasterSerialNumber':
        return <BatchMasterSerialNumberCreate />
      case 'batchMasterColor':
        return <BatchMasterColorCreate />
      case 'batchMasterSize':
        return <BatchMasterSizeCreate />
      case 'projectCategory':
        return <ProjectCategoryCreate />
      case 'projectName':
        return <ProjectNameCreate />
    
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

export default CreateMasterFormRouter