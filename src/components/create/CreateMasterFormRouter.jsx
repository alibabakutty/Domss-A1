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
import ProjectCategoryCreate from '../forms/ProjectCategoryCreate'
import ProjectNameCreate from '../forms/ProjectNameCreate'
import BatchCategoryCreate from '../forms/BatchCategoryCreate'
import BatchSerialNumberCreate from '../forms/BatchSerialNumberCreate'
import BatchColorCreate from '../forms/BatchColorCreate'
import BatchSizeCreate from '../forms/BatchSizeCreate'

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
      case 'godown':
        return <LocationCreate />
      case 'headOffice':
        return <HeadOfficeCreate />
      case 'branchOffice':
        return <BranchOfficeCreate />
      case 'revenueCategory':
        return <RevenueCategoryCreate />
      case 'revenueCenter':
        return <RevenueCentreCreate />
      case 'costCategory':
        return <CostCategoryCreate />
      case 'costCenter':
        return <CostCentreCreate />
      case 'batchCategory':
        return <BatchCategoryCreate />
      case 'batchSerialNumber':
        return <BatchSerialNumberCreate />
      case 'batchColor':
        return <BatchColorCreate />
      case 'batchSize':
        return <BatchSizeCreate />
      case 'projectCategory':
        return <ProjectCategoryCreate />
      case 'project':
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