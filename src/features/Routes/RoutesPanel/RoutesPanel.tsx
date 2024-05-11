import React, { useState } from 'react';
import { RouteStringInput } from './RouteStringInput';
import Drawer from '../../../ui/ReusableComponents/BottomDrawer';
import { NavLogTable } from './NavLogTable';

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
    <Drawer
      isOpen={isExpanded}
      toggleOpen={toggleExpansion}
      openText={ROUTE_PLANNER_TEXT.open}
      closeText={ROUTE_PLANNER_TEXT.close}
      initialArrowDirection="down"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="mb-4 lg:w-96">
          <RouteStringInput />
        </div>
        <div className="md:flex-1 lg:ml-4">
          <div className="h-full overflow-y-auto">
            <NavLogTable />
          </div>
        </div>
      </div>
    </Drawer>
  );
};
