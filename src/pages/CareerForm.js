// career-form.js
"use client"

import { useState, useRef, useEffect } from "react"
import { toast } from "react-hot-toast"

const CareerForm = () => {
  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    position: "",
    location: "",
    experience: "",
    message: "",
  })

  // Form validation state - similar to Angular's form validation
  const [formValidation, setFormValidation] = useState({
    fullName: { touched: false, dirty: false, valid: false, error: "" },
    email: { touched: false, dirty: false, valid: false, error: "" },
    position: { touched: false, dirty: false, valid: false, error: "" },
    location: { touched: false, dirty: false, valid: false, error: "" },
    experience: { touched: false, dirty: false, valid: false, error: "" },
    resume: { touched: false, dirty: false, valid: false, error: "" },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState("No file chosen")

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Marketing Specialist",
    "Project Manager",
    "QA Engineer",
  ]

  const experienceYears = ["0-1 year", "1-2 years", "2-3 years", "3-5 years", "5+ years"]

  // Validate form whenever data changes
  useEffect(() => {
    validateForm()
  }, [formData, fileName])

  // Validate the entire form
  const validateForm = () => {
    const newValidation = { ...formValidation }

    // Validate fullName
    if (formData.fullName.trim()) {
      newValidation.fullName.valid = true
      newValidation.fullName.error = ""
    } else {
      newValidation.fullName.valid = false
      newValidation.fullName.error = "Full name is required"
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newValidation.email.valid = false
      newValidation.email.error = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newValidation.email.valid = false
      newValidation.email.error = "Please enter a valid email address"
    } else {
      newValidation.email.valid = true
      newValidation.email.error = ""
    }

    // Validate position
    if (formData.position) {
      newValidation.position.valid = true
      newValidation.position.error = ""
    } else {
      newValidation.position.valid = false
      newValidation.position.error = "Please select a position"
    }

    // Validate location
    if (formData.location.trim()) {
      newValidation.location.valid = true
      newValidation.location.error = ""
    } else {
      newValidation.location.valid = false
      newValidation.location.error = "Location is required"
    }

    // Validate experience
    if (formData.experience) {
      newValidation.experience.valid = true
      newValidation.experience.error = ""
    } else {
      newValidation.experience.valid = false
      newValidation.experience.error = "Please select your experience level"
    }

    // Validate resume
    if (fileName !== "No file chosen") {
      newValidation.resume.valid = true
      newValidation.resume.error = ""
    } else {
      newValidation.resume.valid = false
      newValidation.resume.error = "Please upload your resume"
    }

    setFormValidation(newValidation)
  }

  // Check if the entire form is valid
  const isFormValid = () => {
    return Object.values(formValidation).every((field) => field.valid)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    })

    // Mark field as dirty (value changed)
    setFormValidation((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        dirty: true,
      },
    }))
  }

  const handleInputBlur = (e) => {
    const { name } = e.target

    // Mark field as touched (focus lost)
    setFormValidation((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
      },
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null

    if (file) {
      // Validate file type
      const validTypes = [".pdf", ".doc", ".docx"]
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()

      if (!validTypes.includes(fileExtension)) {
        setFileName("Invalid file type")
        setFormValidation((prev) => ({
          ...prev,
          resume: {
            ...prev.resume,
            touched: true,
            dirty: true,
            valid: false,
            error: "Only PDF, DOC, and DOCX files are allowed",
          },
        }))
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setFileName("File too large")
        setFormValidation((prev) => ({
          ...prev,
          resume: {
            ...prev.resume,
            touched: true,
            dirty: true,
            valid: false,
            error: "File size must be less than 10MB",
          },
        }))
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }

      setFileName(file.name)
    } else {
      setFileName("No file chosen")
    }

    // Mark resume as touched and dirty
    setFormValidation((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        touched: true,
        dirty: true,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched = {}
    Object.keys(formValidation).forEach((key) => {
      allTouched[key] = {
        ...formValidation[key],
        touched: true,
        dirty: true,
      }
    })
    setFormValidation(allTouched)
    setFormSubmitted(true)

    // Validate form before submission
    validateForm()

    // Don't submit if form is invalid
    if (!isFormValid()) {
      toast.error("Please fix all errors before submitting")
      return
    }

    setIsSubmitting(true)

    try {
      // Create form data for file upload
      const submitData = new FormData()
      submitData.append("fullName", formData.fullName)
      submitData.append("email", formData.email)
      submitData.append("position", formData.position)
      submitData.append("location", formData.location)
      submitData.append("experience", formData.experience)
      submitData.append("message", formData.message)
      submitData.append("resume", fileInputRef.current.files[0])

      const response = await fetch("http://localhost:5000/api/career", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        toast.success("Application submitted successfully!")
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          position: "",
          location: "",
          experience: "",
          message: "",
        })
        setFileName("No file chosen")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        // Reset validation state
        const resetValidation = {}
        Object.keys(formValidation).forEach((key) => {
          resetValidation[key] = {
            touched: false,
            dirty: false,
            valid: false,
            error: "",
          }
        })
        setFormValidation(resetValidation)
        setFormSubmitted(false)
      } else {
        const error = await response.json()
        throw new Error(error.message || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit application")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper function to determine if field should show error
  const shouldShowError = (fieldName) => {
    return (formValidation[fieldName].touched || formSubmitted) && !formValidation[fieldName].valid
  }

  // Helper function to get field class based on validation state
  const getFieldClass = (fieldName) => {
    if (!formValidation[fieldName].touched && !formSubmitted) return "form-control"
    if (formValidation[fieldName].valid) return "form-control is-valid"
    return "form-control is-invalid"
  }

  // Helper function to get select field class based on validation state
  const getSelectClass = (fieldName) => {
    if (!formValidation[fieldName].touched && !formSubmitted) return "form-select"
    if (formValidation[fieldName].valid) return "form-select is-valid"
    return "form-select is-invalid"
  }

  return (
    <div className="career-form-container py-5" id="apply-now">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4 fw-bold">Apply Now</h2>
                <p className="text-center text-muted mb-4">
                  Fill out the form below to apply for a position at Lissomsoft
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fullName" className="form-label">
                        Full name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={getFieldClass("fullName")}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                      />
                      {shouldShowError("fullName") && (
                        <div className="invalid-feedback">{formValidation.fullName.error}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={getFieldClass("email")}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                      />
                      {shouldShowError("email") && <div className="invalid-feedback">{formValidation.email.error}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="position" className="form-label">
                        Position <span className="text-danger">*</span>
                      </label>
                      <select
                        className={getSelectClass("position")}
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                      >
                        <option value="">Select the position</option>
                        {positions.map((pos) => (
                          <option key={pos} value={pos}>
                            {pos}
                          </option>
                        ))}
                      </select>
                      {shouldShowError("position") && (
                        <div className="invalid-feedback">{formValidation.position.error}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="location" className="form-label">
                        Location <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={getFieldClass("location")}
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                      />
                      {shouldShowError("location") && (
                        <div className="invalid-feedback">{formValidation.location.error}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="experience" className="form-label">
                      Year of Experience <span className="text-danger">*</span>
                    </label>
                    <select
                      className={getSelectClass("experience")}
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      required
                    >
                      <option value="">Select Year of Experience</option>
                      {experienceYears.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>
                    {shouldShowError("experience") && (
                      <div className="invalid-feedback">{formValidation.experience.error}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="resume" className="form-label">
                      Resume <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        id="resume"
                        name="resume"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        style={{ display: "none" }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </button>
                      <span
                        className={`input-group-text flex-grow-1 ${shouldShowError("resume") ? "border-danger" : ""}`}
                      >
                        {fileName}
                      </span>
                    </div>
                    {shouldShowError("resume") && (
                      <div className="text-danger mt-1 small">{formValidation.resume.error}</div>
                    )}
                    <small className="text-muted">Accepted formats: PDF, DOC, DOCX (Max 10MB)</small>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Your message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself and why you're interested in this position"
                    ></textarea>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
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
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerForm

