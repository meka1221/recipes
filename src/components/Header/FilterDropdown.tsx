import React from "react";
import "./FilterDropdown.scss";

type FilterDropdownProps = {
  value: string;
  onChange: (v: string) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, onChange }) => (
  <select
    className="filter-dropdown"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Все сложности</option>
    <option value="easy">Легко</option>
    <option value="medium">Средне</option>
    <option value="hard">Сложно</option>
  </select>
);

export default FilterDropdown;
