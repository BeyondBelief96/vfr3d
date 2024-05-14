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
  bar,
}) => {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`px-2 py-1 bg-primary relative ${bar ? 'pb-2' : ''}`}
      style={{ width: width ? `${width}px` : 'auto' }}
    >
      {children}
    </th>
  );
};
