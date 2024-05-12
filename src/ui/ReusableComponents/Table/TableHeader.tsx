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
  const underlineWidth = colSpan && width ? colSpan * width : 0;

  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`px-2 py-1 bg-primary relative ${bar ? 'pb-2' : ''}`}
      style={{ width: width ? `${width}px` : 'auto' }}
    >
      {children}
      {bar && (
        <div
          className="absolute ml-2 mr-2  bottom-0 left-0 h-0.5 bg-primary-content"
          style={{ width: `${underlineWidth}px` }}
        />
      )}
    </th>
  );
};
