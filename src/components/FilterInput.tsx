type FilterInputProps = {
  filter: string;
  onFilterChange: (filter: string) => void;
};

const FilterInput = ({ filter, onFilterChange }: FilterInputProps) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter coins by name or symbol"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
