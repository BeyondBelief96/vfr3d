export const InfoItem: React.FC<{ label: string; value: string | number | undefined }> = ({
  label,
  value,
}) =>
  value ? (
    <div className="flex items-center justify-between py-1">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  ) : null;
