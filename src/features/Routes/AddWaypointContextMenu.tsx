import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import {
  addCustomWaypointAtIndex,
  removeCustomWaypointById,
  updateCustomWaypointName,
} from '../../redux/slices/routeSlice';
import { Cartesian3, Cartographic, Math, SceneTransforms } from 'cesium';
import { useCesium } from 'resium';

interface RouteContextMenuProps {
  position: Cartesian3;
  onClose: () => void;
  waypointIndex: number;
}

const AddWaypointContextMenu: React.FC<RouteContextMenuProps> = ({
  position,
  onClose,
  waypointIndex,
}) => {
  const dispatch = useDispatch();
  const { viewer } = useCesium();
  const plannedCruisingAltitude = useSelector(
    (state: AppState) => state.navlog.plannedCruisingAltitude
  );
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const temporaryPointIdRef = useRef<string | null>(null);

  const createTemporaryPoint = () => {
    const tempPointId = `route-point-${Date.now()}`;
    dispatch(
      addCustomWaypointAtIndex({
        waypoint: {
          id: tempPointId,
          name: '',
          latitude: Math.toDegrees(Cartographic.fromCartesian(position).latitude),
          longitude: Math.toDegrees(Cartographic.fromCartesian(position).longitude),
          altitude: plannedCruisingAltitude,
        },
        index: waypointIndex,
      })
    );
    temporaryPointIdRef.current = tempPointId;
  };

  useEffect(() => {
    createTemporaryPoint();

    return () => {
      if (temporaryPointIdRef.current) {
        dispatch(removeCustomWaypointById(temporaryPointIdRef.current));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSubmit = () => {
    setNameError('');
    if (!name.trim()) {
      setNameError('Please enter a name for the waypoint.');
      return;
    }
    if (temporaryPointIdRef.current) {
      dispatch(
        updateCustomWaypointName({
          id: `${temporaryPointIdRef.current}`,
          name,
        })
      );
      temporaryPointIdRef.current = null;
    }

    onClose();
    setName('');
  };

  const handleCancel = () => {
    if (temporaryPointIdRef.current) {
      dispatch(removeCustomWaypointById(temporaryPointIdRef.current));
      temporaryPointIdRef.current = null;
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (!viewer || !menuRef.current) return;
    const screenPosition = SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position);

    if (!screenPosition) return;

    menuRef.current.style.left = `${screenPosition.x - 100}px`;
    menuRef.current.style.top = `${screenPosition.y + 100}px`;
  }, [viewer, position]);

  return (
    <div ref={menuRef} className="absolute z-50 flex flex-col p-4 rounded-md shadow-md bg-base-100">
      <input
        type="text"
        value={name}
        autoFocus={true}
        onChange={(e) => {
          setName(e.target.value);
          setNameError('');
        }}
        onKeyDown={handleKeyDown}
        placeholder="Waypoint Name"
        className="px-2 py-1 mb-2 border border-base-content focus:outline-none focus:ring-primary focus:ring-2"
      />
      {nameError && <p className="mb-2 text-sm text-error">{nameError}</p>}
      <div className="flex justify-between space-x-2">
        <button
          onClick={handleCancel}
          className="w-24 px-4 py-2 btn text-error-content btn-primary focus:outline-none focus:ring-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-24 px-4 py-2 btn btn-primary text-primary-content focus:outline-none focus:ring-2"
        >
          Add Waypoint
        </button>
      </div>
    </div>
  );
};

export default AddWaypointContextMenu;
