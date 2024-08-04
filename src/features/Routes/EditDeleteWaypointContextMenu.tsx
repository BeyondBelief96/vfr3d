import { Cartesian2 } from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCesium } from 'resium';
import { removeCustomWaypointById, updateCustomWaypointName } from '../../redux/slices/routeSlice';
import { calculateMenuPosition } from '../../utility/cesiumUtils';

interface EditDeleteWaypointContextMenuProps {
  screenPosition: Cartesian2;
  waypointId: string;
  onClose: () => void;
}

export const EditDeleteWaypointContextMenu: React.FC<EditDeleteWaypointContextMenuProps> = ({
  screenPosition,
  waypointId,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { viewer } = useCesium();
  const [nameError, setNameError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedWaypointName, setEditedWaypointName] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    dispatch(removeCustomWaypointById(waypointId));
    onClose();
  };

  const handleSave = () => {
    setNameError('');
    if (!editedWaypointName.trim()) {
      setNameError('Please enter a name for the waypoint.');
      return;
    } else {
      dispatch(updateCustomWaypointName({ id: waypointId, name: editedWaypointName }));
      onClose();
    }

    setEditedWaypointName('');
  };

  const handleCancel = () => {
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  useEffect(() => {
    if (!viewer || !menuRef.current || !screenPosition) return;

    const menuRect = menuRef.current.getBoundingClientRect();
    const { left, top } = calculateMenuPosition(
      screenPosition.x,
      screenPosition.y,
      menuRect.width,
      menuRect.height,
      40,
      0
    );

    menuRef.current.style.left = `${left}px`;
    menuRef.current.style.top = `${top}px`;
  }, [viewer, screenPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className="absolute z-50 flex flex-col p-4 rounded-md shadow-md bg-base-100">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedWaypointName}
            onChange={(e) => setEditedWaypointName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Waypoint Name"
            autoFocus
            className="px-2 py-1 mb-2 border border-base-content focus:outline-none focus:ring-primary focus:ring-2"
          />
          {nameError && <p className="mb-2 text-sm text-error">{nameError}</p>}
          <div className="flex justify-between space-x-2">
            <button
              onClick={handleCancel}
              className="w-24 px-4 py-2 btn btn-error focus:outline-none focus:ring-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-24 px-4 py-2 btn btn-primary text-primary-content focus:outline-none focus:ring-2"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2 text-sm">Edit or delete waypoint?</p>
          <div className="flex justify-between space-x-2">
            <button
              onClick={handleEdit}
              className="w-24 px-4 py-2 btn btn-primary text-primary-content focus:outline-none focus:ring-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-24 px-4 py-2 btn btn-error text-error-content focus:outline-none focus:ring-2"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};
