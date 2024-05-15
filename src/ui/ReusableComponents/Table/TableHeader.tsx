interface TableHeaderCellProps {
  colSpan?: number;
  rowSpan?: number;
  width?: number;
  bar?: boolean;
  children: React.ReactNode;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  colSpan,
  rowSpan,
  width,
  children,
}) => {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className="relative no-underline bg-primary"
      style={{ width: width ? `${width}px` : 'auto' }}
    >
      {children}
    </th>
  );
};
