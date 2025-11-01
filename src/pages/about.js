import { useState, useEffect } from "react"
import { FaStore, FaBullseye, FaUsers, FaLeaf, FaHandshake } from "react-icons/fa"
import Header from "../components/Header/Header"
import styles from "../styles/NavPages.module.css"
import Head from "next/head"
import Footer from "@/components/Footer/Footer"

export default function About() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Snapcart - About Us</title>
      </Head>
      <Header favorites={[]} />
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.container}>
          <section className={styles.section}>
            <FaStore className={styles.icon} />
            <h2>About Our Brand</h2>
            <p>We’re more than an online store — we’re a lifestyle destination that connects people with products that express who they are and what they love.</p>
          </section>

          <section className={styles.section}>
            <FaBullseye className={styles.icon} />
            <h2>Our Mission & Vision</h2>
            <p>Our mission is to make quality fashion and products accessible to everyone while maintaining transparency, creativity, and innovation in everything we do.</p>
          </section>

          <section className={styles.section}>
            <FaUsers className={styles.icon} />
            <h2>Our Team</h2>
            <p>From visionary designers to expert developers and marketers, our team thrives on collaboration, passion, and a shared love for delivering excellence.</p>
          </section>

          <section className={styles.section}>
            <FaLeaf className={styles.icon} />
            <h2>Sustainability Goals</h2>
            <p>We’re committed to eco-conscious production, responsible sourcing, and supporting green initiatives that help build a sustainable future for all.</p>
          </section>

          <section className={styles.section}>
            <FaHandshake className={styles.icon} />
            <h2>Our Promise</h2>
            <p>Every product we offer is backed by our commitment to quality, trust, and customer satisfaction. We aim to inspire confidence with every purchase.</p>
          </section>
        </div>
      )}
      <Footer />
    </>
  )
}
