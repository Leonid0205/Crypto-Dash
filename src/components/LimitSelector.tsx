type LimitSelectorProps = {
  limit: number;
  onLimitChange: (limit: number) => void;
};

const LimitSelector = ({ limit, onLimitChange }: LimitSelectorProps) => {
  return (
    <div className="controls">
      <label htmlFor="limit">Show: </label>
      <select
        onChange={(e) => onLimitChange(Number(e.target.value))}
        value={limit}
        name="limit"
        id="limit"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default LimitSelector;
