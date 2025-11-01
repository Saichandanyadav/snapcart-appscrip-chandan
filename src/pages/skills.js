import { useState, useEffect } from "react"
import { FaShoppingBag, FaChalkboardTeacher, FaCertificate, FaUserGraduate, FaStar } from "react-icons/fa"
import Header from "../components/Header/Header"
import styles from "../styles/NavPages.module.css"
import Head from "next/head"
import Footer from "@/components/Footer/Footer"

export default function Skills() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Snapcart - Skills</title>
      </Head>
      <Header favorites={[]} />
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.container}>
          <section className={styles.section}>
            <FaChalkboardTeacher className={styles.icon} />
            <h2>Personal Styling Courses</h2>
            <p>Enhance your shopping experience by learning the art of outfit curation, color matching, and fashion essentials from top experts.</p>
          </section>

          <section className={styles.section}>
            <FaCertificate className={styles.icon} />
            <h2>Certified Shopper Programs</h2>
            <p>Get exclusive certifications that teach advanced techniques in fashion selection, trend identification, and sustainable shopping.</p>
          </section>

          <section className={styles.section}>
            <FaUserGraduate className={styles.icon} />
            <h2>Online Workshops & Webinars</h2>
            <p>Join live sessions with brand stylists, influencers, and shopping mentors who share insights on the latest retail trends.</p>
          </section>

          <section className={styles.section}>
            <FaShoppingBag className={styles.icon} />
            <h2>Smart Shopping Strategies</h2>
            <p>Learn tips for identifying the best deals, comparing products effectively, and using digital tools to enhance your purchase experience.</p>
          </section>

          <section className={styles.section}>
            <FaStar className={styles.icon} />
            <h2>Exclusive Member Training</h2>
            <p>As a premium member, access bonus content like advanced wardrobe management, seasonal trend reports, and curated brand picks.</p>
          </section>
        </div>
      )}
      <Footer />
    </>
  )
}
