import React from "react";
import "./FilterDropdown.scss";

const FilterDropdown = () => (
  <select className="filter-dropdown">
    <option value="">All difficulties</option>
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
  </select>
);

export default FilterDropdown;
