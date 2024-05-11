interface TableHeaderCellProps {
  colSpan?: number;
  rowSpan?: number;
  width?: number;
  children: React.ReactNode;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  colSpan,
  rowSpan,
  width,
  children,
}) => (
  <th
    colSpan={colSpan}
    rowSpan={rowSpan}
    className="px-2 py-1 bg-primary"
    style={{ width: width ? `${width}px` : 'auto' }}
  >
    {children}
  </th>
);
