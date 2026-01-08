import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <div className="filter-header">
        <h3>Filters</h3>
        {selectedCategory && (
          <button
            className="clear-btn"
            onClick={() => onCategoryChange('')}
          >
            Clear
          </button>
        )}
      </div>

      <div className="filter-section">
        <h4>Category</h4>
        <div className="category-list">
          {categories.map((category) => (
            <label key={category.id} className="category-item">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id.toString()}
                onChange={(e) => onCategoryChange(e.target.value)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
