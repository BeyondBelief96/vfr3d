import React, { ReactNode } from 'react';
import { useSwipeable } from 'react-swipeable';
import ExpandableArrow from './ExpandableArrow';

interface DrawerProps {
  isOpen: boolean;
  toggleOpen: () => void;
  children: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleOpen, children }) => {
  const handlers = useSwipeable({
    onSwipedDown: () => {
      if (isOpen) toggleOpen();
    },
    onSwipedUp: () => {
      if (!isOpen) toggleOpen();
    },
    trackMouse: true,
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center rounded-lg">
      <div
        {...handlers}
        className={`overflow-y-auto bg-base-100 bg-opacity-95 rounded-t-lg transition-all duration-300 ${
          isOpen ? 'h-[100dvh] md:h-[500px] w-full' : 'h-8 w-full sm:w-8/12 cursor-pointer'
        }`}
        onClick={toggleOpen}
      >
        <div className="flex items-center justify-center h-8 cursor-pointer">
          <span className="text-primary-content">{isOpen ? 'Close' : 'Open'} Route Planner</span>
          <ExpandableArrow isExpanded={isOpen} />
        </div>
        {isOpen && (
          <div
            className={`p-4 overflow-y-auto z-20 ${isOpen ? 'lg:h-auto' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
