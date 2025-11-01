import { useState, useEffect } from "react"
import { FaUsers, FaStore, FaShoppingBag, FaRegSmileBeam, FaCameraRetro } from "react-icons/fa"
import Header from "../components/Header/Header"
import styles from "../styles/NavPages.module.css"
import Head from "next/head"
import Footer from "@/components/Footer/Footer"

export default function Stories() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Snapcart -  Stories</title>
      </Head>
      <Header favorites={[]} />
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.container}>
          <section className={styles.section}>
            <FaUsers className={styles.icon} />
            <h2>Customer Success Stories</h2>
            <p>Discover how thousands of customers found their perfect style through our platform — from first-time shoppers to dedicated trendsetters.</p>
          </section>

          <section className={styles.section}>
            <FaStore className={styles.icon} />
            <h2>Our Brand Journey</h2>
            <p>From a small startup to a global e-commerce hub, our mission has always been to connect people with fashion that defines confidence.</p>
          </section>

          <section className={styles.section}>
            <FaShoppingBag className={styles.icon} />
            <h2>Behind the Scenes</h2>
            <p>Meet the creative teams that design, curate, and craft every experience you see — from photoshoots to packaging innovations.</p>
          </section>

          <section className={styles.section}>
            <FaRegSmileBeam className={styles.icon} />
            <h2>Community Impact</h2>
            <p>We empower small businesses, promote eco-friendly fashion, and support local artisans to ensure every product has a positive story.</p>
          </section>

          <section className={styles.section}>
            <FaCameraRetro className={styles.icon} />
            <h2>Fashion Moments Captured</h2>
            <p>Explore the highlights of our photoshoots, campaigns, and customer moments that celebrate individuality and creativity.</p>
          </section>
        </div>
      )}
      <Footer />
    </>
  )
}
