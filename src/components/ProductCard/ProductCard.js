import { FaHeart } from "react-icons/fa"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "./ProductCard.module.css"

export default function ProductCard({ product, favorites, setFavorites }) {
  const router = useRouter()
  const isFav = favorites.some((f) => f.id === product.id)

  const toggleFavorite = (e) => {
    e.stopPropagation()
    if (isFav) setFavorites(favorites.filter((f) => f.id !== product.id))
    else setFavorites([...favorites, product])
  }

  const shortTitle =
    product.title.length > 20 ? product.title.substring(0, 18) + "..." : product.title
  const shortDesc =
    product.description.length > 50
      ? product.description.substring(0, 48) + "..."
      : product.description

  const openProduct = () => {
    router.push(`/product/${product.id}`)
  }

  return (
    <div className={styles.card} onClick={openProduct}>
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className={styles.image}
      />
      <div className={styles.content}>
        <h4>{shortTitle}</h4>
        <p>{shortDesc}</p>
        <FaHeart
          className={`${styles.heart} ${isFav ? styles.active : ""}`}
          onClick={toggleFavorite}
        />
      </div>
    </div>
  )
}
