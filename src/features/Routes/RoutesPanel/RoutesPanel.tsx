import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import Drawer from '../../../components/ReusableComponents/BottomDrawer';
import LoadingSpinner from '../../../components/ReusableComponents/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useCalculateNavLogMutation } from '../../../redux/api/vfr3d/navlog.api';
import { setNavlogCalculationEnabled, setNavlogReady } from '../../../redux/slices/navlogSlice';
import { NavlogControls } from './AltitudeAndDepartureControls';
import { NavLogPDF } from './NavLogPdf';
import { NavLogTable } from './NavLogTable';
import AircraftPerformanceProfiles from './PerformanceProfiles/AircraftPerformanceProfiles';
import { RoutePointsStep } from './RoutePointsStep';
import { RouteStringInput } from './RouteStringInput';

export const RoutesPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isNavlogCalculationEnabled, plannedCruisingAltitude, timeOfDepartureUtc } =
    useAppSelector((state) => state.navlog);
  const { route } = useAppSelector((state) => state.route);
  const { navlog } = useAppSelector((state) => state.navlog);
  const { profiles, selectedProfileId } = useAppSelector((state) => state.aircraftPerformance);
  const [calculateNavLog, { isLoading: navlogLoading }] = useCalculateNavLogMutation();

  const selectedProfile = profiles?.find((profile) => profile.id === selectedProfileId);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    dispatch(setNavlogReady(currentStep === 4));
  }, [dispatch, currentStep]);

  useEffect(() => {
    const hasEnoughRoutePoints = route.routePoints.length >= 2;
    dispatch(setNavlogCalculationEnabled(hasEnoughRoutePoints));
  }, [dispatch, route.routePoints]);

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
    if (!selectedProfile) {
      console.error('Please select a valid aircraft performance profile.');
      return;
    }

    try {
      handleNextStep();
      await calculateNavLog({
        waypoints: route?.routePoints || [],
        aircraftPerformanceConfiguration: selectedProfile,
        plannedCruisingAltitude,
        timeOfDeparture: new Date(timeOfDepartureUtc),
      });
    } catch (error) {
      console.error('Error calculating nav log:', error);
    }
  };

  return (
    <Drawer isOpen={isExpanded} toggleOpen={toggleExpansion} initialArrowDirection="down">
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
              disabled={!selectedProfile}
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
          <li
            className={`step ${currentStep >= 0 ? 'step-primary' : ''} text-xs sm:text-base px-1 sm:px-2`}
          >
            Route
          </li>
          <li
            className={`step ${currentStep >= 1 ? 'step-primary' : ''} text-xs sm:text-base px-1 sm:px-2`}
          >
            Waypoints
          </li>
          <li
            className={`step ${currentStep >= 2 ? 'step-primary' : ''} text-xs sm:text-base px-1 sm:px-2`}
          >
            Performance
          </li>
          <li
            className={`step ${currentStep >= 3 ? 'step-primary' : ''} text-xs sm:text-base px-1 sm:px-2`}
          >
            Altitude & Time
          </li>
          <li
            className={`step ${currentStep >= 4 ? 'step-primary' : ''} text-xs sm:text-base px-1 sm:px-2`}
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
                <h3 className="mb-2 text-lg font-bold">Add Custom Waypoints</h3>
                <RoutePointsStep />
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col items-center">
                <AircraftPerformanceProfiles />
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
                {navlogLoading ? <LoadingSpinner fullScreen={false} /> : <NavLogTable />}
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
