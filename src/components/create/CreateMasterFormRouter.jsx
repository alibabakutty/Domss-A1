import React from 'react'
import { useParams } from 'react-router-dom'
import GroupCreateForm from '../forms/GroupCreateForm'
import LedgerCreateForm from '../forms/LedgerCreateForm'

const CreateMasterFormRouter = () => {
  const { type } = useParams();

  const renderComp = () => {
    switch (type) {
      case 'createGroup':
        return <GroupCreateForm />
      case 'createLedger':
        return <LedgerCreateForm />
    
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