import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import { FaArrowLeft } from "react-icons/fa"
import styles from "./ProductView.module.css"

export default function ProductView() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [popup, setPopup] = useState("")

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await res.json()
        setProduct(data)
        setLoading(false)
      }
      fetchProduct()
    }
  }, [id])

  const addToCart = () => {
    const stored = JSON.parse(localStorage.getItem("cart")) || []
    const updated = [...stored, product]
    localStorage.setItem("cart", JSON.stringify(updated))
    setCart(updated)
    setPopup("Product added to cart!")
    setTimeout(() => setPopup(""), 2500)
  }

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    )

  return (
    <div className={styles.container}>
      {popup && <div className={styles.popup}>{popup}</div>}
      <button className={styles.backBtn} onClick={() => router.push("/")}>
        <FaArrowLeft /> Back
      </button>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={700}
            className={styles.image}
          />
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.desc}>{product.description}</p>
          <p className={styles.category}>Category: {product.category}</p>
          <p className={styles.price}>Price: ${product.price}</p>
          <p className={styles.rating}>Rating: ⭐ {product.rating.rate} / 5</p>
          <p className={styles.count}>Reviews: {product.rating.count}</p>
          <button className={styles.cartBtn} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
