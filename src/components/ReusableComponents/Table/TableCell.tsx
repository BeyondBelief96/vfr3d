interface TableCellProps {
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  width?: number; // Add width prop
  children: React.ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({
  colSpan,
  rowSpan,
  className,
  width,
  children,
}) => (
  <td
    colSpan={colSpan}
    rowSpan={rowSpan}
    className={`px-2 py-3 transition-colors duration-200 hover:bg-primary hover:text-primary-content ${className}`}
    style={{ width: width ? `${width}px` : 'auto' }}
  >
    {children}
  </td>
);
