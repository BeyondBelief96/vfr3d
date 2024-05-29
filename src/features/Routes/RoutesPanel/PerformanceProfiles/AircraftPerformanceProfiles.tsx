// src/components/AircraftPerformanceProfileForm.tsx
import React, { useState, useEffect } from 'react';
import {
  SaveAircraftPerformanceRequestDTO,
  UpdateAircraftPerformanceRequestDTO,
} from 'vfr3d-shared';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  useDeleteAircraftPerformanceProfileMutation,
  useGetAircraftPerformanceProfilesQuery,
  useSaveAircraftPerformanceProfileMutation,
  useUpdateAircraftPerformanceProfileMutation,
} from '../../../../redux/api/vfr3d/performanceProfiles.api';
import {
  setProfiles,
  setSelectedProfileId,
} from '../../../../redux/slices/aircraftPerformanceSlice';
import { useAuth0 } from '@auth0/auth0-react';
import AircraftProfileLoading from './AircraftProfileLoading';
import AircraftPerformanceProfileErrors from './AircraftPerformanceProfileErrors';
import AircraftPerformanceProfileSelection from './AircraftPerformanceProfileSelection';
import AircraftPerformanceProfileActions from './AircraftPerformanceProfileActions';
import AircraftPerformanceProfilesForm from './AircraftPerformanceProfilesForm';

const AircraftPerformanceProfiles: React.FC = () => {
  const { user } = useAuth0();
  const dispatch = useAppDispatch();
  const { selectedProfileId, profiles } = useAppSelector((state) => state.aircraftPerformance);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<
    Partial<SaveAircraftPerformanceRequestDTO> | Partial<UpdateAircraftPerformanceRequestDTO>
  >({
    userId: user?.sub,
    profileName: '',
    climbTrueAirspeed: 0,
    cruiseTrueAirspeed: 0,
    cruiseFuelBurn: 0,
    climbFuelBurn: 0,
    descentFuelBurn: 0,
    climbFpm: 0,
    descentFpm: 0,
    descentTrueAirSpeed: 0,
    sttFuelGals: 0,
    fuelOnBoardGals: 0,
  });

  const {
    data: profilesData,
    isLoading: isProfilesLoading,
    isError: isProfilesError,
    refetch: refetchProfiles,
  } = useGetAircraftPerformanceProfilesQuery(user?.sub || '');

  const [saveProfile, { isLoading: isSaving, isError: isSaveError }] =
    useSaveAircraftPerformanceProfileMutation();
  const [updateProfile, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateAircraftPerformanceProfileMutation();
  const [deleteProfile, { isLoading: isDeleting, isError: isDeleteError }] =
    useDeleteAircraftPerformanceProfileMutation();

  useEffect(() => {
    if (profilesData) {
      dispatch(setProfiles(profilesData));
    }
  }, [profilesData, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const parseFormData = (
    data: Partial<SaveAircraftPerformanceRequestDTO> | Partial<UpdateAircraftPerformanceRequestDTO>,
    id?: number | null
  ): Partial<SaveAircraftPerformanceRequestDTO> | Partial<UpdateAircraftPerformanceRequestDTO> => {
    return {
      ...(id && { id }),
      userId: user?.sub,
      profileName: data.profileName,
      climbTrueAirspeed: Number(data.climbTrueAirspeed),
      cruiseTrueAirspeed: Number(data.cruiseTrueAirspeed),
      cruiseFuelBurn: Number(data.cruiseFuelBurn),
      climbFuelBurn: Number(data.climbFuelBurn),
      descentFuelBurn: Number(data.descentFuelBurn),
      climbFpm: Number(data.climbFpm),
      descentFpm: Number(data.descentFpm),
      descentTrueAirSpeed: Number(data.descentTrueAirSpeed),
      sttFuelGals: Number(data.sttFuelGals),
      fuelOnBoardGals: Number(data.fuelOnBoardGals),
    };
  };

  const handleSaveProfile = async () => {
    try {
      const parsedFormData = parseFormData(formData, isEditing ? selectedProfileId : null);
      if (isEditing) {
        await updateProfile(parsedFormData as UpdateAircraftPerformanceRequestDTO).unwrap();
      } else {
        await saveProfile(parsedFormData as SaveAircraftPerformanceRequestDTO).unwrap();
      }
      refetchProfiles();
      setIsCreating(false);
      setIsEditing(false);
      setFormData({
        userId: user?.sub,
        profileName: '',
        climbTrueAirspeed: 0,
        cruiseTrueAirspeed: 0,
        cruiseFuelBurn: 0,
        climbFuelBurn: 0,
        descentFuelBurn: 0,
        climbFpm: 0,
        descentFpm: 0,
        descentTrueAirSpeed: 0,
        sttFuelGals: 0,
        fuelOnBoardGals: 0,
      });
    } catch (error) {
      console.error('Error saving/updating profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    if (selectedProfileId) {
      try {
        await deleteProfile(selectedProfileId).unwrap();
        refetchProfiles();
        dispatch(setSelectedProfileId(null));
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  return (
    <div className="p-4">
      {isProfilesLoading ? (
        <AircraftProfileLoading />
      ) : isProfilesError ? (
        <AircraftPerformanceProfileErrors refetchProfiles={refetchProfiles} />
      ) : (
        <>
          {!isCreating && (
            <AircraftPerformanceProfileSelection
              selectedProfileId={selectedProfileId}
              profiles={profiles}
              setIsCreating={setIsCreating}
              setFormData={setFormData}
              setIsEditing={setIsEditing}
              handleDeleteProfile={handleDeleteProfile}
            />
          )}
          {isCreating && (
            <AircraftPerformanceProfilesForm
              selectedProfileId={selectedProfileId}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSaveProfile={handleSaveProfile}
              isSaving={isSaving}
              isUpdating={isUpdating}
              isSaveError={isSaveError}
              isUpdateError={isUpdateError}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        </>
      )}
      <AircraftPerformanceProfileActions isDeleting={isDeleting} isDeleteError={isDeleteError} />
    </div>
  );
};

export default AircraftPerformanceProfiles;
