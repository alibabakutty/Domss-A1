import { useParams } from 'react-router-dom'
import CreateMasterFilter from './create/CreateMasterFilter';
import AlterMasterFilter from './alter/AlterMasterFilter';
import DisplayMasterFilter from './display/DisplayMasterFilter';

const MasterRouter = () => {
    const {type} = useParams();

    const renderComp = () => {
        switch (type) {
            case 'create':
                return <CreateMasterFilter />;
            case 'alter':
                return <AlterMasterFilter />;
            case 'display':
                return <DisplayMasterFilter />;
            default:
                return <div>404 Not Found</div>;
        }
    }
  return (
    <>
        <div>
            {renderComp()}
        </div>
    </>
  )
}

export default MasterRouter