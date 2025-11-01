import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import { FaArrowLeft } from "react-icons/fa"
import styles from "./FavouritePage.module.css"
import Head from "next/head"

export default function FavouritePage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("favorites")
      if (stored) setFavorites(JSON.parse(stored))
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    )

  return (
    <>
      <Head>
        <title>Snapcart - My Favourites</title>
      </Head>
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => router.push("/")}>
        <FaArrowLeft /> Back
      </button>
      <h1 className={styles.title}>My Favourites</h1>
      {favorites.length === 0 ? (
        <p className={styles.empty}>No favourite products yet.</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((p) => (
            <div key={p.id} className={styles.card}>
              <Image
                src={p.image}
                alt={p.title}
                width={300}
                height={300}
                className={styles.image}
              />
              <div className={styles.content}>
                <h4>{p.title.length > 20 ? p.title.slice(0, 18) + "..." : p.title}</h4>
                <p>
                  {p.description.length > 50
                    ? p.description.slice(0, 48) + "..."
                    : p.description}
                </p>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFavorite(p.id)}
                >
                  Remove Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}
