import { TableCell } from './TableCell';

interface InputCellProps {
  defaultValue?: string;
  width?: number; // Add width prop
}

export const InputCell: React.FC<InputCellProps> = ({ defaultValue, width }) => (
  <TableCell width={width}>
    <input
      type="text"
      defaultValue={defaultValue}
      className="w-full text-center bg-transparent input input-bordered input-xs input-ghost"
    />
  </TableCell>
);
