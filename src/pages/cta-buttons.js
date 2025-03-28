"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const CTAButtons = () => {
  // State for demo form modal
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [demoFormData, setDemoFormData] = useState({
    firstName: "",
    titleDesignation: "",
    organization: "",
    email: "",
    phoneNumber: "",
  })

  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleDemoInputChange = (e) => {
    const { name, value } = e.target
    setDemoFormData({
      ...demoFormData,
      [name]: value,
    })
  }

  const handleDemoSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to Google Sheets (Sheet 4)
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...demoFormData,
          sheet: "Sheet4", // Specify Sheet 4
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({ success: true, message: "Thank you for requesting a demo! We'll be in touch soon." })
        // Reset form
        setDemoFormData({
          firstName: "",
          titleDesignation: "",
          organization: "",
          email: "",
          phoneNumber: "",
        })

        // Close modal after 2 seconds
        setTimeout(() => {
          setShowDemoModal(false)
          setSubmitStatus(null)
        }, 2000)
      } else {
        setSubmitStatus({ success: false, message: "There was an error submitting the form. Please try again." })
      }
    } catch (error) {
      console.error("Error submitting demo form:", error)
      setSubmitStatus({ success: false, message: "There was an error submitting the form. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRequestCall = () => {
    // Initiate call functionality
    window.location.href = "tel:+1234567890" // Replace with actual phone number
  }

  return (
    <>
      <div className="row">
        <div className="col-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="fw-bold">MySmartGRC – The Go To Choice of Chief Risk and Compliance Officers!</h2>
          </motion.div>
        </div>
      </div>

      <div className="row">
        {[
          {
            title: "Take Quick Tour",
            description: "Learn how MySmartGRC can transform your risk management through a tour",
            icon: "play-circle",
            buttonText: "Request a Tour",
            onClick: () => window.open("https://lissomsoft.com/contact", "_blank"),
          },
          {
            title: "Request Call Back",
            description: "Leave your contact details and our experts will reach out to discuss your needs",
            icon: "phone",
            buttonText: "Request a Call",
            onClick: handleRequestCall,
          },
          {
            title: "Experience a Demo",
            description: "Schedule a personalized demo with our expert guidance",
            icon: "laptop",
            buttonText: "Request a Demo",
            onClick: () => setShowDemoModal(true),
          },
        ].map((cta, index) => (
          <motion.div
            className="col-md-4 mb-4"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
          >
            <motion.div
              className="card h-100 border-0 shadow"
              style={{
                background: "linear-gradient(135deg, #0077b6, #00a8e8)",
              }}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="card-body text-center p-4">
                <motion.div
                  className="mb-3"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <i className={`fas fa-${cta.icon} fa-3x`}></i>
                </motion.div>
                <h4>{cta.title}</h4>
                <p>{cta.description}</p>
                <motion.button
                  className="btn btn-light mt-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cta.onClick}
                >
                  {cta.buttonText}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Demo Form Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1050,
            }}
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              className="modal-content bg-white p-4 rounded shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ width: "90%", maxWidth: "500px", maxHeight: "90vh", overflow: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="modal-logo">
                  <img
                    src="https://lissomsoft.com/smart-grc/assets/logo/logo.png"
                    alt="MySmartGRC Logo"
                    style={{ height: "40px" }}
                  />
                </div>
                <button className="btn-close" onClick={() => setShowDemoModal(false)} aria-label="Close"></button>
              </div>

              <h4 className="text-center mb-4" style={{color:"red"}}>
                Fill out the form below to get started on optimizing your risk strategy today!
              </h4>

              <form onSubmit={handleDemoSubmit} style={{color:"red"}}>
                <div className="mb-3" >
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={demoFormData.firstName}
                    onChange={handleDemoInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="titleDesignation" className="form-label">
                    Title/Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titleDesignation"
                    name="titleDesignation"
                    value={demoFormData.titleDesignation}
                    onChange={handleDemoInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="organization" className="form-label">
                    Organization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="organization"
                    name="organization"
                    value={demoFormData.organization}
                    onChange={handleDemoInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={demoFormData.email}
                    onChange={handleDemoInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={demoFormData.phoneNumber}
                    onChange={handleDemoInputChange}
                    required
                  />
                </div>

                <div className="text-center">
                  <motion.button
                    type="submit"
                    className="btn btn-primary px-4 py-2 w-100"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </motion.button>
                </div>

                {submitStatus && (
                  <div className={`alert ${submitStatus.success ? "alert-success" : "alert-danger"} mt-3`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CTAButtons

