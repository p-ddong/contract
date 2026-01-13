  export const InputCell = ({
    label,
    value,
    name,
    className = "",
  }: {
    label?: string;
    value?: string;
    name?: string;
    className?: string;
  }) => (
    <div
      className={`flex items-center px-2 py-1 border-r border-black last:border-r-0 ${className}`}
    >
      {label && (
        <span className="font-bold mr-1 whitespace-nowrap">{label}:</span>
      )}
      <p>{value}</p>
    </div>
  );