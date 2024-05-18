import { Cartesian2 } from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useCesium } from 'resium';
import { removeCustomWaypointById } from '../../../redux/slices/routeSlice';

interface DeleteWaypointContextMenuProps {
  screenPosition: Cartesian2;
  waypointId: string;
  onClose: () => void;
}

export const DeleteWaypointContextMenu: React.FC<DeleteWaypointContextMenuProps> = ({
  screenPosition,
  waypointId,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { viewer } = useCesium();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    console.log(waypointId);
    dispatch(removeCustomWaypointById(waypointId));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    if (!viewer || !menuRef.current) return;

    if (!screenPosition) return;

    menuRef.current.style.left = `${screenPosition.x + 40}px`;
    menuRef.current.style.top = `${screenPosition.y}px`;
  }, [viewer, screenPosition]);

  return (
    <div ref={menuRef} className="absolute z-50 flex flex-col p-4 rounded-md shadow-md bg-base-100">
      <p className="mb-2 text-sm">Delete waypoint?</p>
      <div className="flex justify-between space-x-2">
        <button
          onClick={handleCancel}
          className="w-24 px-4 py-2 btn text-error-content btn-primary focus:outline-none focus:ring-2"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="w-24 px-4 py-2 btn btn-error text-error-content focus:outline-none focus:ring-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
