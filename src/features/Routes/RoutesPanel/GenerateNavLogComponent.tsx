import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { validateNavlogFields } from '../../../redux/slices/navlogSlice';

export const GenerateNavLogComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state: AppState) => state.navlog);

  const handleGenerateNavLog = () => {
    
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleGenerateNavLog}>
      Calculate Nav Log
    </button>
  );
};
