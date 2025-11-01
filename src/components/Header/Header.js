import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { FaThLarge, FaSearch, FaHeart, FaShoppingBag, FaUser, FaBars, FaTimes } from "react-icons/fa"
import styles from "./Header.module.css"

export default function Header({ favorites }) {
  const [showLanguages, setShowLanguages] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()
  const path = router.pathname

  const navItems = [
    { label: "SHOP", path: "/" },
    { label: "SKILLS", path: "/skills" },
    { label: "STORIES", path: "/stories" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT US", path: "/contact" },
  ]

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      const count = JSON.parse(storedCart).length
      setTimeout(() => setCartCount(count), 0)
    }
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles["header-top"]}>
        <div className={styles["header-left-icon"]} onClick={() => router.push("/")} style={{ cursor: "pointer" }}><FaThLarge /></div>
        <div className={styles["logo-text"]}>Snapcart</div>
        <div className={styles["header-right-icons"]}>
          <FaSearch />
          <div className={styles.favoriteIcon} onClick={() => router.push("/favourites")}>
            <FaHeart />
            {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
          </div>
          <div className={styles.cartIcon} onClick={() => router.push("/cart")}>
            <FaShoppingBag />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </div>
          <FaUser onClick={() => router.push("/account")} style={{ cursor: "pointer" }} />
          <div
            className={styles["language-dropdown"]}
            onClick={() => setShowLanguages(!showLanguages)}
          >
            ENG ▼
            {showLanguages && (
              <div className={styles["dropdown-list"]}>
                {["English", "Spanish", "French", "German", "Hindi", "Japanese"].map((lang, i) => (
                  <span key={i}>{lang}</span>
                ))}
              </div>
            )}
          </div>
          <div className={styles.hamburger} onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
      <nav className={`${styles.navbar} ${showMenu ? styles.showMenu : ""}`}>
        {navItems.map((item) => (
          <span
            key={item.path}
            className={`${styles["nav-item"]} ${path === item.path ? styles.active : ""}`}
            onClick={() => {
              router.push(item.path)
              setShowMenu(false)
            }}
          >
            {item.label}
          </span>
        ))}
      </nav>
    </header>
  )
}
