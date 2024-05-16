import React, { useEffect, useState } from 'react';
import { RouteStringInput } from './RouteStringInput';
import Drawer from '../../../ui/ReusableComponents/BottomDrawer';
import { NavLogTable } from './NavLogTable';
import { AircraftPerformanceConfigurationComponent } from './AircraftPerformanceConfigurationComponent';
import { NavlogControls } from './AltitudeAndDepartureControls';
import LoadingSpinner from '../../../ui/ReusableComponents/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNavlogCalculationEnabled,
  setNavlogReady,
  validateNavlogFields,
} from '../../../redux/slices/navlogSlice';
import { AppState } from '../../../redux/store';
import { useCalculateNavLogMutation } from '../../../redux/api/vfr3d/navlog.api';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { NavLogPDF } from './NavLogPdf';
import { RoutePointsStep } from './RoutePointsStep';

const ROUTE_PLANNER_TEXT = {
  open: 'Open Route Planner',
  close: 'Close Route Planner',
};

export const RoutesPanel: React.FC = () => {
  const dispatch = useDispatch();
  const {
    errors,
    isNavlogCalculationEnabled,
    aircraftPerformanceProfile,
    plannedCruisingAltitude,
    timeOfDepartureUtc,
  } = useSelector((state: AppState) => state.navlog);
  const { route } = useSelector((state: AppState) => state.route);
  const { navlog } = useSelector((state: AppState) => state.navlog);
  const [calculateNavLog, { isLoading: navlogLoading }] = useCalculateNavLogMutation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    dispatch(setNavlogReady(currentStep === 4));
  }, [dispatch, currentStep]);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    const hasEnoughRoutePoints = route.routePoints.length >= 2;
    dispatch(setNavlogCalculationEnabled(!hasErrors && hasEnoughRoutePoints));
  }, [dispatch, errors, route.routePoints]);

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
      try {
        handleNextStep();
        await calculateNavLog({
          waypoints: route?.routePoints || [],
          aircraftPerformanceConfiguration: aircraftPerformanceProfile,
          plannedCruisingAltitude,
          timeOfDeparture: new Date(timeOfDepartureUtc),
        });
      } catch (error) {
        console.error('Error calculating nav log:', error);
      }
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
      <div className="flex justify-center mb-4 space-x-4">
        <button
          className={`btn btn-primary w-32 ${currentStep === 0 ? 'hidden' : ''}`}
          onClick={handlePreviousStep}
        >
          Previous
        </button>
        {currentStep === 3 ? (
          <>
            <button
              className={`btn btn-primary w-32 ${isNavlogCalculationEnabled ? '' : 'btn-disabled'}`}
              onClick={handleCalculateNavLog}
            >
              Calculate Nav Log
            </button>
          </>
        ) : (
          <button
            className={`btn btn-primary w-32 ${currentStep === 4 ? 'hidden' : ''}`}
            onClick={handleNextStep}
          >
            Next
          </button>
        )}
        {currentStep === 4 && !navlogLoading ? (
          <PDFDownloadLink
            className="btn btn-primary"
            document={<NavLogPDF navlog={navlog} />}
            fileName="navlog.pdf"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        ) : null}
      </div>
      <div className="flex flex-col h-full">
        <ul className="steps">
          <li className={`step ${currentStep >= 0 ? 'step-primary' : ''}`}>Route</li>
          <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Add Waypoints</li>
          <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Performance</li>
          <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Altitude & Time</li>
          <li className={`step ${currentStep >= 4 ? 'step-primary' : ''}`}>Nav Log</li>
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
                <h3 className="mb-2 text-lg font-bold">Add Custom Waypoints</h3>
                <RoutePointsStep />
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-lg font-bold">Fill Out Aircraft Performance Info</h3>
                <AircraftPerformanceConfigurationComponent />
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-lg font-bold">
                  Select Cruising Altitude and Departure Time
                </h3>
                <NavlogControls />
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-lg font-bold">Nav Log</h3>
                {navlogLoading ? <LoadingSpinner /> : <NavLogTable />}
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
