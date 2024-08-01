import React from 'react'
import { useParams } from 'react-router-dom'
import DisplayGroupFilter from './DisplayGroupFilter';

const DisplayGroupRouter = () => {
    const {type} = useParams();

    const renderComp = () => {
        switch (type) {
            case 'displayGroupFilter':
                return <DisplayGroupFilter />
                break;
        
            default:
                <div>404 Not Found</div>
        }
    }
  return (
    <>
        <div>{renderComp()}</div>
    </>
  )
}

export default DisplayGroupRouter