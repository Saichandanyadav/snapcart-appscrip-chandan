import { useState, useEffect } from "react"
import { FaPhoneAlt, FaHeadset, FaBriefcase, FaCommentDots } from "react-icons/fa"
import Header from "../components/Header/Header"
import styles from "../styles/NavPages.module.css"
import Head from "next/head"
import Footer from "@/components/Footer/Footer"

export default function Contact() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Snapcart - Contact Us</title>
      </Head>
      <Header favorites={[]} />
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.container}>
          <section className={styles.section}>
            <FaPhoneAlt className={styles.icon} />
            <h2>Contact Information</h2>
            <p>Need assistance? Reach out to us at <strong>support@snapcart.com</strong> or call <strong>+91 98765 43210</strong>. We’re available Monday to Saturday, 9 AM to 7 PM.</p>
          </section>

          <section className={styles.section}>
            <FaHeadset className={styles.icon} />
            <h2>Customer Support</h2>
            <p>Our friendly support team is here to help with orders, returns, or queries. Get personalized solutions through live chat or email support.</p>
          </section>

          <section className={styles.section}>
            <FaBriefcase className={styles.icon} />
            <h2>Business Inquiries</h2>
            <p>Partner with us! For collaborations, vendor tie-ups, or media partnerships, write to <strong>business@snapcart.com</strong>.</p>
          </section>

          <section className={styles.section}>
            <FaCommentDots className={styles.icon} />
            <h2>Feedback Form</h2>
            <p>We value your feedback. Share your shopping experience and help us serve you better with every click and cart!</p>
          </section>
        </div>
      )}
      <Footer />
    </>
  )
}
