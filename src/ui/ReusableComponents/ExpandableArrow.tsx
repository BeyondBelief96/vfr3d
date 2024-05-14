import React from 'react';

interface ExpandableArrowProps {
  isExpanded: boolean;
  initialDirection?: 'up' | 'down';
  className?: string;
}

const ExpandableArrow: React.FC<ExpandableArrowProps> = ({
  isExpanded,
  initialDirection = 'up',
  className,
}) => {
  const rotateDirection = initialDirection === 'down' ? isExpanded : !isExpanded;

  return (
    <span
      className={`transition-transform ${rotateDirection ? 'rotate-180' : ''} ${className || ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
};

export default ExpandableArrow;
