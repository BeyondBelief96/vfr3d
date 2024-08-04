import ExpandableArrow from './ExpandableArrow';

interface CollapsibleSectionProps {
  title: string;
  expanded: boolean;
  toggleSection: () => void;
  children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  expanded,
  toggleSection,
  children,
}) => (
  <div className="mb-4 rounded-lg shadow-sm bg-base-200">
    <button
      className="flex justify-between w-full px-4 py-2 text-left bg-primary hover:bg-secondary"
      onClick={toggleSection}
    >
      <span className="font-semibold">{title}</span>
      <ExpandableArrow isExpanded={expanded} />
    </button>
    {expanded && <div className="p-4">{children}</div>}
  </div>
);
