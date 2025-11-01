import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"
import Image from "next/image"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h1>Be the first to know</h1>
          <p>Sign up for updates from mettā muse.</p>
          <div className={styles.subscribe}>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className={styles.right}>
          <h1>Contact Us</h1>
          <p>+44 221 133 5360</p>
          <p>customercare@mettamuse.com</p>
          <h1>Currency</h1>
          <div className={styles.currency}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              alt="US Flag"
              width={25}
              height={18}
            />
            <span>+ USD</span>
          </div>
          <p className={styles.currencyNote}>
            Transactions will be completed in Euros and a currency reference is available on hover.
          </p>
        </div>
      </div>

      <hr className={styles.line} />

      <div className={styles.middle}>
        <div className={styles.column}>
          <h2>mettā muse</h2>
          <ul>
            <li>Shop</li>
            <li>Skills</li>
            <li>Stories</li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h2>Quick Links</h2>
          <ul>
            <li>Drop Shipping</li>
            <li>Join/Login as Seller</li>
            <li>Payment & Pricing</li>
            <li>Return & Refunds</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h2>Follow Us</h2>
          <div className={styles.socials}>
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
          <p>mettā muse Accepts</p>
          <div className={styles.cards}>
            <Image src="https://cdn-icons-png.flaticon.com/512/196/196561.png" width={40} height={25} alt="Visa" />
            <Image src="https://cdn-icons-png.flaticon.com/512/196/196578.png" width={40} height={25} alt="Mastercard" />
            <Image src="https://cdn-icons-png.flaticon.com/512/349/349230.png" width={40} height={25} alt="PayPal" />
            <Image src="https://cdn-icons-png.flaticon.com/512/5968/5968140.png" width={40} height={25} alt="Amex" />
          </div>
        </div>
      </div>

      <p className={styles.copy}>Copyright © 2023 mettamuse. All rights reserved.</p>
    </footer>
  )
}
