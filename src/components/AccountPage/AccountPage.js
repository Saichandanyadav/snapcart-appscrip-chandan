import { useState, useEffect, useLayoutEffect } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useRouter } from "next/router"
import styles from "./AccountPage.module.css"

export default function AccountPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  })
  const [isEditing, setIsEditing] = useState(false)
  const [popup, setPopup] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const stored = localStorage.getItem("accountDetails")
    if (stored) {
      const parsed = JSON.parse(stored)
      requestAnimationFrame(() => setFormData(parsed))
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email required"
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter 10-digit phone number"
    if (!formData.address) newErrors.address = "Address required"
    if (!formData.city) newErrors.city = "City required"
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Valid pincode required"
    return newErrors
  }

  const handleSave = () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setPopup("Please fix the errors before saving")
      setTimeout(() => setPopup(""), 2500)
      return
    }
    localStorage.setItem("accountDetails", JSON.stringify(formData))
    setIsEditing(false)
    setErrors({})
    setPopup("Account details saved successfully!")
    setTimeout(() => setPopup(""), 2500)
  }

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {popup && <div className={styles.popup}>{popup}</div>}
      <button className={styles.backBtn} onClick={() => router.push("/")}>
        <FaArrowLeft /> Back
      </button>
      <h1 className={styles.title}>My Account Details</h1>
      <div className={styles.formContainer}>
        <input type="text" name="name" value={formData.name} placeholder="Full Name" onChange={handleChange} disabled={!isEditing} />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
        <input type="email" name="email" value={formData.email} placeholder="Email Address" onChange={handleChange} disabled={!isEditing} />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
        <input type="text" name="phone" value={formData.phone} placeholder="Phone Number" onChange={handleChange} disabled={!isEditing} />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        <input type="text" name="address" value={formData.address} placeholder="Street Address" onChange={handleChange} disabled={!isEditing} />
        {errors.address && <span className={styles.error}>{errors.address}</span>}
        <input type="text" name="city" value={formData.city} placeholder="City" onChange={handleChange} disabled={!isEditing} />
        {errors.city && <span className={styles.error}>{errors.city}</span>}
        <input type="text" name="pincode" value={formData.pincode} placeholder="Pincode" onChange={handleChange} disabled={!isEditing} />
        {errors.pincode && <span className={styles.error}>{errors.pincode}</span>}
        <button className={styles.editBtn} onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? "Save Details" : "Edit Details"}
        </button>
      </div>
    </div>
  )
}
