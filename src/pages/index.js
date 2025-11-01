import { useState, useEffect } from "react"
import Head from "next/head"
import Header from "../components/Header/Header"
import HeroSection from "../components/HeroSection/HeroSection"
import FilterSection from "../components/FilterSection/FilterSection"
import Footer from "../components/Footer/Footer"
import styles from "../styles/Home.module.css"
import { generateJsonLd } from "../utils/seo"

export default function Home({ products }) {
  const [favorites, setFavorites] = useState([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("favorites")
      if (stored) {
        const parsedFavorites = JSON.parse(stored)
        setFavorites(parsedFavorites)
      }
      setMounted(true)
      setLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites, mounted])

  if (!mounted) return null

  const siteUrl = "https://snapcart-appscrip-chandan.vercel.app"
  const jsonLd = generateJsonLd(products, siteUrl)

  return (
    <>
      <Head>
        <title>Snapcart - Product Listing</title>
        <meta
          name="description"
          content="Shop top-quality products with Snapcart – discover, compare, and buy easily with our smart product listing experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Snapcart - Product Listing" />
        <meta
          property="og:description"
          content="Discover and shop amazing products from Snapcart. Find the best deals online!"
        />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/snapcart-banner.png`} />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products")
  const products = await res.json()
  return { props: { products } }
}
