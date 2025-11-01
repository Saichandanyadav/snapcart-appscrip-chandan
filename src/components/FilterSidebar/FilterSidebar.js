import styles from "./FilterSidebar.module.css"

export default function FilterSidebar({ selectedCategories, handleCategoryChange, resetFilters }) {
  const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"]

  return (
    <aside className={styles.sidebar}>
      <h3>Filters</h3>
      {categories.map((cat, i) => (
        <label key={i}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat)}
            onChange={() => handleCategoryChange(cat)}
          />
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </label>
      ))}
      <button className={styles.resetBtn} onClick={resetFilters}>
        Reset Filters & Sort
      </button>
    </aside>
  )
}
