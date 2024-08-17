import React from 'react';

const Filters = ({ filters, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="filters">
      <select name="category" onChange={handleChange} value={filters.category}>
        <option value="">Category</option>
        <option value="Phone">Phone</option>
        <option value="Computer">Computer</option>
        {/* Add other categories */}
      </select>
      <select name="company" onChange={handleChange} value={filters.company}>
        <option value="">Company</option>
        <option value="AM">AM</option>
        <option value="FU">FU</option>
        {/* Add other companies */}
      </select>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        onChange={handleChange}
        value={filters.minPrice}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        onChange={handleChange}
        value={filters.maxPrice}
      />
      <input
        type="number"
        name="rating"
        placeholder="Min Rating"
        onChange={handleChange}
        value={filters.rating}
      />
      <input
        type="checkbox"
        name="availability"
        onChange={(e) => onChange(e.target.name, e.target.checked)}
        checked={filters.availability}
      />
      <label htmlFor="availability">In Stock</label>
    </div>
  );
};

export default Filters;
