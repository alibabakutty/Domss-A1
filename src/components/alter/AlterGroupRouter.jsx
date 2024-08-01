import React from 'react'
import { useParams } from 'react-router-dom'
import AlterGroupFilter from './AlterGroupFilter';

const AlterGroupRouter = () => {
    const {type} = useParams();

    const renderComp = () => {
        switch (type) {
            case 'alterGroupFilter':
                return <AlterGroupFilter />
                
        
            default:
                return <div>404 Not Found</div>
        }
    }
  return (
    <>
    <div className="container">{renderComp()}</div>
    </>
  )
}

export default AlterGroupRouter