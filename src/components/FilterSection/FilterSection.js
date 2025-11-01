import { useState, useEffect } from "react"
import { FaChevronDown, FaEye, FaEyeSlash } from "react-icons/fa"
import FilterSidebar from "../FilterSidebar/FilterSidebar"
import ProductCard from "../ProductCard/ProductCard"
import styles from "./FilterSection.module.css"

export default function FilterSection({ products, favorites, setFavorites }) {
  const [showFilter, setShowFilter] = useState(false)
  const [sortOption, setSortOption] = useState("recommended")
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const sortLabels = {
    recommended: "Recommended",
    newly: "Newly First",
    popular: "Popular",
    priceHigh: "Price High to Low",
    priceLow: "Price Low to High",
    alphabetical: "Alphabetical"
  }

  const handleSort = (option) => {
    setLoading(true)
    setSortOption(option)
    setShowDropdown(false)
    setTimeout(() => {
      let sorted = [...filteredProducts]
      if (option === "newly") sorted.reverse()
      else if (option === "popular") sorted = sorted.sort((a, b) => b.rating.count - a.rating.count)
      else if (option === "priceHigh") sorted = sorted.sort((a, b) => b.price - a.price)
      else if (option === "priceLow") sorted = sorted.sort((a, b) => a.price - b.price)
      else if (option === "alphabetical") sorted = sorted.sort((a, b) => a.title.localeCompare(b.title))
      else sorted = [...products]
      setFilteredProducts(sorted)
      setLoading(false)
    }, 600)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSortOption("recommended")
    setFilteredProducts(products)
  }

  useEffect(() => {
    queueMicrotask(() => setLoading(true))
    const timer = setTimeout(() => {
      let updated = [...products]
      if (selectedCategories.length > 0)
        updated = updated.filter((p) => selectedCategories.includes(p.category))
      setFilteredProducts(updated)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [selectedCategories, products])

  return (
    <section className={styles.container}>
      <div className={styles.topBarWrapper}>
        <div className={styles.topBar}>
          <div className={styles.leftSection}>
            <span>{filteredProducts.length} ITEMS</span>
            <button onClick={() => setShowFilter(!showFilter)}>
              {showFilter ? (
                <>
                  <FaEyeSlash className={styles.iconBtn} /> HIDE FILTER
                </>
              ) : (
                <>
                  <FaEye className={styles.iconBtn} /> SHOW FILTER
                </>
              )}
            </button>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.recommended} onClick={() => setShowDropdown(!showDropdown)}>
              <span>{sortLabels[sortOption]}</span>
              <FaChevronDown className={styles.icon} />
            </div>
            {showDropdown && (
              <div className={styles.dropdown}>
                {Object.entries(sortLabels).map(([key, label]) => (
                  <div key={key} onClick={() => handleSort(key)}>
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        {showFilter && (
          <FilterSidebar
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
            resetFilters={resetFilters}
          />
        )}
        <div
          className={styles.productGrid}
          style={{
            gridTemplateColumns: showFilter
              ? "repeat(auto-fit, minmax(300px, 1fr))"
              : "repeat(auto-fit, minmax(250px, 1fr))"
          }}
        >
          {loading ? (
            <div className={styles.loader}></div>
          ) : (
            filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
