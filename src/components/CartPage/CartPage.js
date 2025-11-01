import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import { FaArrowLeft } from "react-icons/fa"
import styles from "./CartPage.module.css"
import Head from "next/head"

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("cart")
      if (stored) setCart(JSON.parse(stored))
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const removeFromCart = (id) => {
    const updated = cart.filter((c) => c.id !== id)
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
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
        <title>Snapcart - My Cart</title>
      </Head>
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => router.push("/")}>
        <FaArrowLeft /> Back
      </button>
      <h1 className={styles.title}>My Cart</h1>
      {cart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div className={styles.grid}>
          {cart.map((p) => (
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
                <p>${p.price}</p>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(p.id)}
                >
                  Remove from Cart
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
