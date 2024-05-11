import React, { useState } from 'react';
import { RouteStringInput } from './RouteStringInput';
import { RoutesTable } from './RoutesTable';
import Drawer from '../../../ui/ReusableComponents/BottomDrawer';

const ROUTE_PLANNER_TEXT = {
  open: 'Open Route Planner',
  close: 'Close Route Planner',
};

export const RoutesPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <Drawer
        isOpen={isExpanded}
        toggleOpen={toggleExpansion}
        openText={ROUTE_PLANNER_TEXT.open}
        closeText={ROUTE_PLANNER_TEXT.close}
        initialArrowDirection="down"
      >
        <h2 className="mb-4 text-2xl font-bold">Routes Panel</h2>
        <div className="md:flex">
          <div className="mb-4 md:w-96">
            <RouteStringInput />
          </div>
          <div className="md:flex-1 md:ml-4">
            <div className="h-full overflow-y-auto">
              <RoutesTable />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
