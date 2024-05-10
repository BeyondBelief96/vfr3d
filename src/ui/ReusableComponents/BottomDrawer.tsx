import React, { ReactNode } from 'react';
import ExpandableArrow from './ExpandableArrow';

interface DrawerProps {
  isOpen: boolean;
  toggleOpen: () => void;
  openText: string;
  closeText: string;
  initialArrowDirection?: 'up' | 'down';
  children: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  toggleOpen,
  openText,
  closeText,
  initialArrowDirection = 'down',
  children,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      <div
        className={`bg-base-100 opacity-90 rounded-t-lg cursor-pointer transition-all duration-300 ${
          isOpen ? 'h-96' : 'h-8'
        }`}
        onClick={toggleOpen}
      >
        <div className="flex items-center justify-center h-8">
          <span className="text-primary-content">{isOpen ? closeText : openText}</span>
          <ExpandableArrow isExpanded={isOpen} initialDirection={initialArrowDirection} />
        </div>
        {isOpen && (
          <div
            className={`p-4 overflow-y-auto z-20 ${isOpen ? 'h-80 sm:h-64 md:h-auto' : ''}`}
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
