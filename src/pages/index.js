import { useState, useEffect } from "react"
import Head from "next/head"
import Header from "../components/Header/Header"
import HeroSection from "../components/HeroSection/HeroSection"
import FilterSection from "../components/FilterSection/FilterSection"
import Footer from "../components/Footer/Footer"
import styles from "../styles/Home.module.css"

export default function Home({ products }) {
  const [favorites, setFavorites] = useState([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavorites = () => {
      const stored = localStorage.getItem("favorites")
      if (stored) setFavorites(JSON.parse(stored))
      setMounted(true)
      setTimeout(() => setLoading(false), 1200)
    }
    loadFavorites()
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites, mounted])

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>Snapcart - Product Listing</title>
      </Head>
      {loading ? (
        <>
          <Header favorites={favorites} />
          <div className={styles.loader}></div>
        </>
      ) : (
        <>
          <Header favorites={favorites} />
          <HeroSection />
          <FilterSection
            products={products}
            favorites={favorites}
            setFavorites={setFavorites}
          />
          <Footer />
        </>
      )}
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products")
  const products = await res.json()
  return { props: { products } }
}
