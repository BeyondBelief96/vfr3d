import React, { useState } from 'react';
import { RouteStringInput } from './RouteStringInput';
import Drawer from '../../../ui/ReusableComponents/BottomDrawer';
import { NavLogTable } from './NavLogTable';
import { AircraftPerformanceConfigurationComponent } from './AircraftPerformanceConfigurationComponent';
import { NavlogControls } from './AltitudeAndDepartureControls';
import LoadingSpinner from '../../../ui/ReusableComponents/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { validateNavlogFields } from '../../../redux/slices/navlogSlice';
import { AppState } from '../../../redux/store';

const ROUTE_PLANNER_TEXT = {
  open: 'Open Route Planner',
  close: 'Close Route Planner',
};

export const RoutesPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state: AppState) => state.navlog);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleCalculateNavLog = async () => {
    dispatch(validateNavlogFields());
    if (!Object.values(errors).some((error) => error)) {
      setIsLoading(true);
      // Make the API call to calculate the nav log
      // Once the API call is complete, update the state and show the NavLogTable
      setIsLoading(false);
      handleNextStep();
    }
  };

  return (
    <Drawer
      isOpen={isExpanded}
      toggleOpen={toggleExpansion}
      openText={ROUTE_PLANNER_TEXT.open}
      closeText={ROUTE_PLANNER_TEXT.close}
      initialArrowDirection="down"
    >
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className={`btn btn-primary ${currentStep === 0 ? 'hidden' : ''}`}
          onClick={handlePreviousStep}
        >
          Previous
        </button>
        {currentStep === 2 ? (
          <button className="btn btn-primary" onClick={handleCalculateNavLog}>
            Calculate Nav Log
          </button>
        ) : (
          <button
            className={`btn btn-primary ${currentStep === 3 ? 'hidden' : ''}`}
            onClick={handleNextStep}
          >
            Next
          </button>
        )}
      </div>
      <div className="flex flex-col h-full">
        <ul className="steps">
          <li
            className={`step ${currentStep === 0 ? 'step-primary' : currentStep > 0 ? 'step-success' : ''}`}
          >
            Route
          </li>
          <li
            className={`step ${currentStep === 1 ? 'step-primary' : currentStep > 1 ? 'step-success' : ''}`}
          >
            Performance
          </li>
          <li
            className={`step ${currentStep === 2 ? 'step-primary' : currentStep > 2 ? 'step-success' : ''}`}
          >
            Altitude & Time
          </li>
          <li
            className={`step ${currentStep === 3 ? 'step-primary' : currentStep > 3 ? 'step-success' : ''}`}
          >
            Nav Log
          </li>
        </ul>
        <div className="flex flex-col items-center justify-center flex-grow overflow-y-auto">
          <div className="mt-2">
            {currentStep === 0 && (
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-lg font-bold">Enter Your Route</h3>
                <RouteStringInput />
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-lg font-bold">Fill Out Aircraft Performance Info</h3>
                <AircraftPerformanceConfigurationComponent />
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-lg font-bold">
                  Select Cruising Altitude and Departure Time
                </h3>
                <NavlogControls />
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-lg font-bold">Nav Log</h3>
                {isLoading ? <LoadingSpinner /> : <NavLogTable />}
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
