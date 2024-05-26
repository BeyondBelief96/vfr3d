import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useGetAllPirepsQuery } from '../../redux/api/vfr3d/weatherApi';
import { toggleShowPireps } from '../../redux/slices/pirepsSlice';
import LoadingSpinner from '../ReusableComponents/LoadingSpinner';

export const PirepOptions: React.FC = () => {
  const dispatch = useAppDispatch();
  const showPireps = useAppSelector((state) => state.pireps.showPireps);
  const { isLoading, isError } = useGetAllPirepsQuery(undefined, {
    skip: !showPireps,
  });

  return (
    <>
      <h2 className="text-lg font-semibold">Pireps</h2>
      <div className="flex items-center">
        <label htmlFor="airport-toggle" className="mr-2">
          Show Pireps
        </label>
        <input
          id="airport-toggle"
          type="checkbox"
          checked={showPireps}
          onChange={() => dispatch(toggleShowPireps(!showPireps))}
          className="toggle toggle-primary"
        />
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <p className="text-error">Error fetching pireps.</p>
      ) : null}
    </>
  );
};
