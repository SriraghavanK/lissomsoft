"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import HeroSection from "../components/Herosection"
import { submitContactForm } from "../actions/contact-form"
import { styleText } from "util"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreeTerms: false,
  })

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const formRef = useRef(null)
  const [validationErrors, setValidationErrors] = useState({})
  // Add a touched state to track which fields have been interacted with
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
    agreeTerms: false,
  })

  // Hero content for the contact page
  const heroContent = {
    title: "Ready to Connect or Explore New Avenues?",
    subtitle: "Get in touch – We're here to assist You!",
    buttonText: "Contact Us Now",
    buttonLink: "#contact-form",
    imageSrc:
      "https://imgs.search.brave.com/ABnldHNiuyLJV_QhWSi0GgUJ6tTq63c9s_hPqLhYGhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZ2xv/YmUtY29udGFjdC11/cy1lMm9kMXExbGZu/ZXFydnpxLmpwZw",
  }

  // Contact methods data
  const contactMethods = [
    {
      icon: "at",
      title: "Email",
      description: "Send us an email anytime",
      action: "sales@lissomsoft.com",
      link: "mailto:sales@lissomsoft.com",
    },
    {
      icon: "phone",
      title: "Phone",
      description: "Call us during business hours",
      action: "+91 9361829552",
      link: "tel:+919361829552",
    },

    {
      icon: "envelope",
      title: "Message",
      description: "Send us a message",
      action: "Send message",
      link: "#contact-form",
    },
  ]

  // In the officeLocations array, add an images array to include multiple office photos
  const officeLocations = [
    {
      city: "Chennai",
      address: "3, Chakrapani Rd, Ramapuram, Ramapuram, Chennai, Tamil Nadu 600032",
      phone: "+91 9361829552",
      email: "sales@lissomsoft.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.506366230087!2d80.20867307524588!3d13.003393787314899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525e88875e0359%3A0x55634d593f082105!2sLissomsoft%20Technologies!5e0!3m2!1sen!2sin!4v1742192313588!5m2!1sen!2sin",
      images: [
        {
          src: require("../assets/Lissomsoft.jpg"),
          alt: "Lissomsoft Office Exterior",
        },
        {
          src: require("../assets/outside.jpg"),
          alt: "Lissomsoft Chennai Office Building",
          style:{width:"20px" ,height:"20px"},
        },
        {
          src: require("../assets/inside.jpg"),
          alt: "Lissomsoft Chennai Office Building",
          style:{width:"20px" ,height:"20px"},
        },
       
      
      ],
    },
  ]

  // Add state for the active image in the component
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // FAQ data
  const faqs = [
    {
      question: "What services does Lissomsoft offer?",
      answer:
        "Lissomsoft offers a comprehensive range of services including Risk Management, Digital Transformation, Cloud Services, and Growth Marketing. Our solutions are designed to help businesses overcome challenges and achieve their goals.",
    },
    {
      question: "How can Lissomsoft help my business?",
      answer:
        "Lissomsoft can help your business by providing innovative solutions that address your specific challenges. Whether you need to manage risks, transform your digital presence, leverage cloud technologies, or accelerate your growth through marketing, our team of experts is here to help.",
    },
    {
      question: "What industries does Lissomsoft serve?",
      answer:
        "Lissomsoft serves a wide range of industries including BFSI, Manufacturing, BPO, Startups, Retail, Information/Technology, Healthcare, and NGOs. Our solutions are adaptable to the specific needs and requirements of different industries.",
    },
    {
      question: "Where is Lissomsoft located?",
      answer:
        "Lissomsoft has its headquarters in Chennai, India, and serves clients globally through strategic partnerships in India, GCC, Africa, Oceania, Europe, UK, and North America.",
    },
  ]

  // Update the handleChange function to validate on-the-fly and clear errors when input is valid
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Track that the field has been touched/dirty
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }))
    }

    // Validate the field as the user types and clear error if valid
    if (name === "firstName") {
      if (value.trim() === "") {
        setValidationErrors((prev) => ({ ...prev, [name]: "First name is required" }))
      } else {
        setValidationErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    } else if (name === "lastName") {
      if (value.trim() === "") {
        setValidationErrors((prev) => ({ ...prev, [name]: "Last name is required" }))
      } else {
        setValidationErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    } else if (name === "email") {
      // More strict email validation - require complete email with domain and TLD
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      if (value.trim() === "") {
        setValidationErrors((prev) => ({ ...prev, [name]: "Email is required" }))
      } else if (!emailRegex.test(value)) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Please enter a valid email address (example@domain.com)" }))
      } else {
        setValidationErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    } else if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "")
      if (value.trim() === "") {
        setValidationErrors((prev) => ({ ...prev, [name]: "Phone number is required" }))
      } else if (digitsOnly.length !== 10) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Phone number must be exactly 10 digits" }))
      } else {
        setValidationErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    } else if (name === "message") {
      if (value.trim() === "") {
        setValidationErrors((prev) => ({ ...prev, [name]: "Message is required" }))
      } else if (value.trim().length < 10) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Message must be at least 10 characters long" }))
      } else {
        setValidationErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    }
  }

  // Add a handleBlur function to mark fields as touched and validate
  const handleBlur = (e) => {
    const { name, value } = e.target

    // Mark the field as touched
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate on blur
    if (name === "firstName") {
      if (!value.trim()) {
        setValidationErrors((prev) => ({ ...prev, [name]: "First name is required" }))
      }
    } else if (name === "lastName") {
      if (!value.trim()) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Last name is required" }))
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Email is required" }))
      } else if (!emailRegex.test(value)) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Please enter a valid email address (example@domain.com)" }))
      }
    } else if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "")
      if (!value.trim()) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Phone number is required" }))
      } else if (digitsOnly.length !== 10) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Phone number must be exactly 10 digits" }))
      }
    } else if (name === "message") {
      if (!value.trim()) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Message is required" }))
      } else if (value.trim().length < 10) {
        setValidationErrors((prev) => ({ ...prev, [name]: "Message must be at least 10 characters long" }))
      }
    }
  }

  // Client-side validation function
  const validateForm = () => {
    const errors = {}

    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    // Email validation with stricter regex
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address (example@domain.com)"
      }
    }

    // Phone validation - specifically for 10 digits
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    } else {
      // Remove any non-digit characters for validation
      const digitsOnly = formData.phone.replace(/\D/g, "")
      if (digitsOnly.length !== 10) {
        errors.phone = "Phone number must be exactly 10 digits"
      }
    }

    // Message validation - require at least 10 characters
    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long"
    }

    return errors
  }

  // Update the handleSubmit function to mark all fields as touched on submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")

    // Mark all fields as touched on submit
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      message: true,
      agreeTerms: true,
    })

    // Perform client-side validation
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setIsSubmitting(false)
      return
    }

    try {
      // Create FormData object to pass to server action
      const formDataObj = new FormData()
      formDataObj.append("firstName", formData.firstName)
      formDataObj.append("lastName", formData.lastName)
      formDataObj.append("email", formData.email)
      formDataObj.append("phone", formData.phone)
      formDataObj.append("message", formData.message)

      // Submit form data to server action
      const result = await submitContactForm(formDataObj)

      if (result.success) {
        setFormSubmitted(true)
        // Reset form after submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          agreeTerms: false,
        })
        setValidationErrors({})
        setTouched({
          firstName: false,
          lastName: false,
          email: false,
          phone: false,
          message: false,
          agreeTerms: false,
        })

        // Reset form submission status after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false)
        }, 5000)
      } else {
        // Handle server-side validation errors
        if (result.errors) {
          setValidationErrors(result.errors)
        }
        setFormError(result.message || "An error occurred. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isElementVisible = rect.top < window.innerHeight - 100

        if (isElementVisible) {
          element.classList.add("animate-slide-up")
          setIsVisible((prev) => ({ ...prev, [element.dataset.id]: true }))
        }
      })
    }

    // Initial check
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Initialize Bootstrap tooltips and accordions
  useEffect(() => {
    // Check if Bootstrap is available
    if (typeof window !== "undefined" && window.bootstrap) {
      // Initialize tooltips
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl))

      // Initialize accordions
      const accordionList = [].slice.call(document.querySelectorAll(".accordion"))
      accordionList.map((accordionEl) => {
        // No initialization needed for accordions in Bootstrap 5
      })
    }
  }, [])

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <HeroSection
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        buttonText={heroContent.buttonText}
        buttonLink="#contact-form"
        imageSrc="https://imgs.search.brave.com/ABnldHNiuyLJV_QhWSi0GgUJ6tTq63c9s_hPqLhYGhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZ2xv/YmUtY29udGFjdC11/cy1lMm9kMXExbGZu/ZXFydnpxLmpwZw"
      />
      {/* Contact Methods Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3 animate-on-scroll" data-id="methods-title">
                Choose your zone of interest and let us reach out to you shortly
              </h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="contact-methods-grid">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="contact-method-item animate-on-scroll"
                    data-id={`method-${index}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <a
                      href={method.link}
                      className="contact-method-link"
                      onClick={(e) => {
                        if (method.link === "#contact-form") {
                          e.preventDefault()
                          scrollToForm()
                        }
                      }}
                    >
                      <div className="contact-icon-wrapper">
                        <i className={`fas fa-${method.icon}`}></i>
                      </div>
                      <div className="contact-method-content">
                        <h3 className="contact-method-title">{method.title}</h3>
                        <p className="contact-method-description">{method.description}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form and Map Section */}
      <section className="py-5 bg-light" id="contact-form" ref={formRef}>
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card border-0 shadow-lg h-100">
                <div className="card-body p-4 p-md-5">
                  <h3 className="fw-bold mb-4 animate-on-scroll" data-id="form-title">
                    Contact Lissomsoft
                  </h3>

                  {formSubmitted && (
                    <div className="alert alert-success" role="alert">
                      Thank you for your message! We'll get back to you shortly.
                    </div>
                  )}

                  {formError && (
                    <div className="alert alert-danger" role="alert">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${touched.firstName && validationErrors.firstName ? "is-invalid" : touched.firstName && formData.firstName.trim() !== "" ? "is-valid" : ""}`}
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched.firstName && validationErrors.firstName && (
                        <div className="invalid-feedback">
                          <i className="fas fa-exclamation-circle me-1"></i>
                          {validationErrors.firstName}
                        </div>
                      )}
                      {touched.firstName && formData.firstName.trim() !== "" && !validationErrors.firstName && (
                        <div className="valid-feedback">
                          <i className="fas fa-check-circle me-1"></i>
                          Looks good!
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${touched.lastName && validationErrors.lastName ? "is-invalid" : touched.lastName && formData.lastName.trim() !== "" ? "is-valid" : ""}`}
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched.lastName && validationErrors.lastName && (
                        <div className="invalid-feedback">
                          <i className="fas fa-exclamation-circle me-1"></i>
                          {validationErrors.lastName}
                        </div>
                      )}
                      {touched.lastName && formData.lastName.trim() !== "" && !validationErrors.lastName && (
                        <div className="valid-feedback">
                          <i className="fas fa-check-circle me-1"></i>
                          Looks good!
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Business Email <span className="text-danger">*</span>
                      </label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className={`form-control ${touched.email && validationErrors.email ? "is-invalid" : touched.email && formData.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email) ? "is-valid" : ""}`}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="example@domain.com"
                        />
                        {touched.email && validationErrors.email && (
                          <div className="invalid-feedback">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {validationErrors.email}
                          </div>
                        )}
                        {touched.email &&
                          formData.email.trim() !== "" &&
                          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email) &&
                          !validationErrors.email && (
                            <div className="valid-feedback">
                              <i className="fas fa-check-circle me-1"></i>
                              Valid email format!
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">
                          <i className="fas fa-phone"></i>
                        </span>
                        <input
                          type="tel"
                          className={`form-control ${touched.phone && validationErrors.phone ? "is-invalid" : touched.phone && formData.phone.trim() !== "" && formData.phone.replace(/\D/g, "").length === 10 ? "is-valid" : ""}`}
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="10-digit phone number"
                        />
                        {touched.phone && validationErrors.phone && (
                          <div className="invalid-feedback">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {validationErrors.phone}
                          </div>
                        )}
                        {touched.phone &&
                          formData.phone.trim() !== "" &&
                          formData.phone.replace(/\D/g, "").length === 10 &&
                          !validationErrors.phone && (
                            <div className="valid-feedback">
                              <i className="fas fa-check-circle me-1"></i>
                              Valid phone number!
                            </div>
                          )}
                      </div>
                      <small className="text-muted">
                        <i className="fas fa-info-circle me-1"></i>
                        Phone number must be exactly 10 digits
                      </small>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${
                          touched.message && validationErrors.message
                            ? "is-invalid"
                            : touched.message && formData.message.trim().length >= 10
                              ? "is-valid"
                              : ""
                        }`}
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      ></textarea>
                      {touched.message && validationErrors.message && (
                        <div className="invalid-feedback">
                          <i className="fas fa-exclamation-circle me-1"></i>
                          {validationErrors.message}
                        </div>
                      )}
                      {touched.message && formData.message.trim().length >= 10 && !validationErrors.message && (
                        <div className="valid-feedback">
                          <i className="fas fa-check-circle me-1"></i>
                          Message looks good!
                        </div>
                      )}
                      <small className="text-muted">
                        <i className="fas fa-info-circle me-1"></i>
                        Please provide a detailed message (minimum 10 characters)
                      </small>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree with Lissomsoft's <Link to="/terms">Terms of Use</Link> and{" "}
                        <Link to="/privacy">Privacy Policy</Link>
                      </label>
                    </div>

                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-primary-modern" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Submitting...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg h-100">
                <div className="card-body p-0">
                  <div className="map-container h-100">
                    <iframe
                      src={officeLocations[0].mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lissomsoft Office Location"
                      className="office-map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Replace the entire Office Locations Section with this new implementation */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3 animate-on-scroll" data-id="locations-title">
                Our Office
              </h2>
              <p className="lead text-muted animate-on-scroll" data-id="locations-subtitle">
                Visit us at our headquarters or connect with us virtually
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mb-4">
              <div className="card border-0 shadow-lg h-100 animate-on-scroll" data-id="office-card">
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-md-7">
                      <div className="office-gallery-container">
                        <div className="office-main-image-container">
                          <img
                            src={officeLocations[0].images[activeImageIndex].src || "/placeholder.svg"}
                            alt={officeLocations[0].images[activeImageIndex].alt}
                            className="office-featured-image"
                          />
                        </div>
                        <div className="office-thumbnails">
                          {officeLocations[0].images.map((image, index) => (
                            <div
                              key={index}
                              className={`office-thumbnail ${activeImageIndex === index ? "active" : ""}`}
                              onClick={() => setActiveImageIndex(index)}
                            >
                              <img src={image.src || "/placeholder.svg"} alt={image.alt} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="p-4">
                        <h3 className="h4 fw-bold mb-3">Chennai Headquarters</h3>
                        <div className="office-details">
                          <div className="office-detail-item mb-3">
                            <div className="office-detail-icon">
                              <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="office-detail-content">
                              <h4 className="h6 mb-1">Address</h4>
                              <p className="mb-0">{officeLocations[0].address}</p>
                            </div>
                          </div>

                          <div className="office-detail-item mb-3">
                            <div className="office-detail-icon">
                              <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className="office-detail-content">
                              <h4 className="h6 mb-1">Phone</h4>
                              <p className="mb-0">
                                <a href={`tel:${officeLocations[0].phone}`} className="text-decoration-none">
                                  {officeLocations[0].phone}
                                </a>
                              </p>
                            </div>
                          </div>

                          <div className="office-detail-item mb-3">
                            <div className="office-detail-icon">
                              <i className="fas fa-envelope"></i>
                            </div>
                            <div className="office-detail-content">
                              <h4 className="h6 mb-1">Email</h4>
                              <p className="mb-0">
                                <a href={`mailto:${officeLocations[0].email}`} className="text-decoration-none">
                                  {officeLocations[0].email}
                                </a>
                              </p>
                            </div>
                          </div>

                          <div className="office-detail-item">
                            <div className="office-detail-icon">
                              <i className="fas fa-clock"></i>
                            </div>
                            <div className="office-detail-content">
                              <h4 className="h6 mb-1">Business Hours</h4>
                              <p className="mb-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
                              <p className="mb-0">Saturday - Sunday: Closed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="card border-0 shadow-lg animate-on-scroll" data-id="global-presence">
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold mb-4 text-center">Our Global Presence</h3>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="global-location text-center">
                        <div className="global-location-icon mb-3">
                          <i className="fas fa-globe-asia fa-2x text-primary"></i>
                        </div>
                        <h4 className="h5 mb-2">Asia Pacific</h4>
                        <p className="mb-0">India, Singapore, Australia</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="global-location text-center">
                        <div className="global-location-icon mb-3">
                          <i className="fas fa-globe-europe fa-2x text-primary"></i>
                        </div>
                        <h4 className="h5 mb-2">Europe & UK</h4>
                        <p className="mb-0">United Kingdom, Germany, France</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="global-location text-center">
                        <div className="global-location-icon mb-3">
                          <i className="fas fa-globe-americas fa-2x text-primary"></i>
                        </div>
                        <h4 className="h5 mb-2">Americas</h4>
                        <p className="mb-0">United States, Canada</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3 animate-on-scroll" data-id="faq-title">
                Frequently Asked Questions
              </h2>
              <p className="lead text-muted animate-on-scroll" data-id="faq-subtitle">
                Find answers to common questions about our services
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="accordion-item border-0 mb-3 shadow-sm animate-on-scroll"
                    data-id={`faq-${index}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded={index === 0 ? "true" : "false"}
                        aria-controls={`collapse${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary text-white">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="animate-on-scroll" data-id="cta-content">
                <h2 className="fw-bold mb-4">Ready to Transform Your Business?</h2>
                <p className="lead mb-4">Partner with Lissomsoft and unlock your organization's full potential</p>
                <button className="btn btn-light btn-lg px-4 py-3" onClick={scrollToForm}>
                  <i className="fas fa-paper-plane me-2"></i>
                  Contact Us Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CSS for enhanced styling */}
      <style jsx>{`
        /* Contact Methods Grid */
        .contact-methods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .contact-method-item {
          transition: all 0.3s ease;
        }
        
        .contact-method-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1.5rem;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          text-decoration: none;
          color: inherit;
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .contact-method-link:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .contact-icon-wrapper {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: white;
          font-size: 2rem;
          transition: all 0.3s ease;
        }
        
        .contact-method-link:hover .contact-icon-wrapper {
          transform: scale(1.1);
        }
        
        .contact-method-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #0f172a;
        }
        
        .contact-method-description {
          color: #64748b;
          margin-bottom: 0;
        }
        
        /* Contact Form Styles */
        .contact-form .form-control {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        
        .contact-form .form-control:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25);
        }
        
        .contact-form .form-label {
          font-weight: 500;
          color: #334155;
        }
        
        /* Map Container */
        .map-container {
          border-radius: 8px;
          overflow: hidden;
          height: 100%;
          min-height: 400px;
        }
        
        .office-map {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        /* Enhanced Button Styles */
        .btn-primary-modern {
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary-modern::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.5s ease;
        }
        
        .btn-primary-modern:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
          color: white;
        }
        
        .btn-primary-modern:hover::before {
          left: 100%;
        }
        
        .btn-primary-modern:disabled {
          background: linear-gradient(90deg, #93c5fd, #67e8f9);
          transform: none;
          cursor: not-allowed;
        }
        
        /* Accordion Styles */
        .accordion-item {
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .accordion-button {
          padding: 1.25rem;
          font-weight: 600;
          color: #0f172a;
          background-color: white;
        }
        
        .accordion-button:not(.collapsed) {
          color: #3b82f6;
          background-color: #f0f9ff;
        }
        
        .accordion-button:focus {
          box-shadow: none;
          border-color: rgba(59, 130, 246, 0.25);
        }
        
        .accordion-body {
          padding: 1.25rem;
          color: #64748b;
        }
        
        /* Background Gradients */
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0f172a, #1e293b);
        }
        
        /* Hover Effects */
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        
        /* Animate on scroll */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-slide-up {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Responsive styles */
        @media (max-width: 991.98px) {
          .contact-methods-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
          
          .contact-icon-wrapper {
            width: 70px;
            height: 70px;
            font-size: 1.75rem;
          }
          
          .map-container {
            min-height: 350px;
          }
        }
        
        @media (max-width: 767.98px) {
          .contact-methods-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 0.75rem;
          }
          
          .contact-method-link {
            padding: 1.5rem 1rem;
          }
          
          .contact-icon-wrapper {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          
          .contact-method-title {
            font-size: 1.1rem;
          }
          
          .contact-method-description {
            font-size: 0.9rem;
          }
          
          .map-container {
            min-height: 300px;
          }
        }
        
        @media (max-width: 575.98px) {
          .contact-methods-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }
          
          .contact-icon-wrapper {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
          
          .contact-method-title {
            font-size: 1rem;
          }
          
          .contact-method-description {
            font-size: 0.8rem;
          }
          
          .map-container {
            min-height: 250px;
          }
        }

        /* Additional validation styling */
        .form-control.is-invalid {
          background-image: none !important;
          padding-right: 0.75rem !important;
          border-color: #dc3545;
        }
        
        .form-control.is-valid {
          background-image: none !important;
          padding-right: 0.75rem !important;
          border-color: #198754;
        }
        
        .invalid-feedback {
          display: block;
          font-weight: 500;
          font-size: 0.85rem;
          padding: 0.25rem 0.5rem;
          margin-top: 0.25rem;
          border-radius: 4px;
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }
        
        .valid-feedback {
          display: none;
          font-weight: 500;
          font-size: 0.85rem;
          padding: 0.25rem 0.5rem;
          margin-top: 0.25rem;
          border-radius: 4px;
          background-color: rgba(25, 135, 84, 0.1);
          color: #198754;
        }
        
        .form-control.is-valid ~ .valid-feedback {
          display: block;
        }
        
        .input-group .form-control:focus {
          z-index: 1;
        }
        
        .input-group .form-control.is-invalid,
        .input-group .form-control.is-valid {
          z-index: 1;
        }
        
        /* Add a subtle required field indicator */
        .form-label .text-danger {
          font-weight: bold;
          margin-left: 2px;
        }
        
        /* Improve focus states */
        .form-control:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        
        .form-control.is-invalid:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
        }
        
        .form-control.is-valid:focus {
          border-color: #198754;
          box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
        }

        /* Office Location Section Styling */
        .office-image-container {
          height: 100%;
          overflow: hidden;
        }

        .office-featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.3s ease;
        }

        .office-featured-image:hover {
          transform: scale(1.05);
        }

        .office-details {
          padding: 0;
        }

        .office-detail-item {
          display: flex;
          align-items: center;
        }

        .office-detail-icon {
          width: 30px;
          margin-right: 10px;
          color: #3b82f6;
        }

        .office-detail-content h4 {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .global-location-icon {
          color: #3b82f6;
        }
      `}</style>
      {/* Add additional CSS for the enhanced office section */}
      <style jsx>{`
        /* Office Section Enhancements */
        .office-image-container {
          height: 100%;
          overflow: hidden;
        }
        
        .office-featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .office-details {
          color: #4b5563;
        }
        
        .office-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .office-detail-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .office-detail-content h4 {
          color: #1f2937;
          font-weight: 600;
        }
        
        .office-detail-content p {
          color: #4b5563;
        }
        
        .office-detail-content a {
          color: #3b82f6;
          transition: color 0.3s ease;
        }
        
        .office-detail-content a:hover {
          color: #2563eb;
        }
        
        .global-location {
          padding: 1.5rem;
          border-radius: 8px;
          background-color: #f9fafb;
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .global-location:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .global-location-icon {
          color: #3b82f6;
        }
        
        @media (max-width: 767.98px) {
          .office-image-container {
            height: 200px;
          }
        }
      `}</style>
      {/* Add these styles at the end of your existing styles */}
      <style jsx>{`
        /* Office Gallery Styling */
        .office-gallery-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .office-main-image-container {
          flex: 1;
          overflow: hidden;
          position: relative;
          min-height: 300px;
          max-height: 400px; /* Add max-height to maintain consistency */
          display: flex; /* Add flex display */
          align-items: center; /* Center vertically */
          justify-content: center; /* Center horizontally */
          background-color: #f8fafc;
        }

        .office-featured-image {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Change to contain to preserve aspect ratio */
          object-position: center;
          transition: transform 0.5s ease;
          max-height: 400px; /* Ensure consistent max height */
        }

        .office-featured-image:hover {
          transform: scale(1.05);
        }

        .office-thumbnails {
          display: flex;
          gap: 8px;
          padding: 10px;
          background-color: #f8fafc;
          justify-content: center; /* Center thumbnails */
        }

        .office-thumbnail {
          width: 80px;
          height: 60px;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          display: flex; /* Add flex display */
          align-items: center; /* Center vertically */
          justify-content: center; /* Center horizontally */
          background-color: #f0f0f0;
        }

        .office-thumbnail.active {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }

        .office-thumbnail:hover {
          transform: translateY(-2px);
        }

        .office-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Change to contain to preserve aspect ratio */
          object-position: center;
        }

        @media (max-width: 767.98px) {
          .office-main-image-container {
            min-height: 250px;
          }

          .office-thumbnail {
            width: 60px;
            height: 45px;
          }
        }

        @media (max-width: 575.98px) {
          .office-main-image-container {
            min-height: 200px;
          }

          .office-thumbnails {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default ContactPage

