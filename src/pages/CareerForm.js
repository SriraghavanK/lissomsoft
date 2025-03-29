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

  // Advanced validation state - Angular-like approach
  const [formValidation, setFormValidation] = useState({
    fullName: {
      touched: false,
      dirty: false,
      valid: false,
      errors: {
        required: true,
        minLength: true,
      },
    },
    email: {
      touched: false,
      dirty: false,
      valid: false,
      errors: {
        required: true,
        pattern: true,
      },
    },
    position: {
      touched: false,
      dirty: false,
      valid: false,
      errors: {
        required: true,
      },
    },
    location: {
      touched: false,
      dirty: false,
      valid: false,
      errors: {
        required: true,
      },
    },
    experience: {
      touched: false,
      dirty: false,
      valid: false,
      errors: {
        required: true,
      },
    },
    resume: {
      touched: false,
      dirty: false,
      valid: false,
      errors: {
        required: true,
        fileType: false,
        fileSize: false,
      },
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null) // null, 'success', or 'error'
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState("No file chosen")
  const [fileError, setFileError] = useState("")

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

  // Validate the entire form with detailed error checking
  const validateForm = () => {
    const newValidation = { ...formValidation }

    // Validate fullName with multiple rules
    const nameValue = formData.fullName.trim()
    newValidation.fullName.errors.required = nameValue === ""
    newValidation.fullName.errors.minLength = nameValue.length < 3
    newValidation.fullName.valid = !Object.values(newValidation.fullName.errors).some((error) => error)

    // Validate email with pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailValue = formData.email.trim()
    newValidation.email.errors.required = emailValue === ""
    newValidation.email.errors.pattern = !emailRegex.test(emailValue) && emailValue !== ""
    newValidation.email.valid = !Object.values(newValidation.email.errors).some((error) => error)

    // Validate position
    newValidation.position.errors.required = !formData.position
    newValidation.position.valid = !Object.values(newValidation.position.errors).some((error) => error)

    // Validate location
    const locationValue = formData.location.trim()
    newValidation.location.errors.required = locationValue === ""
    newValidation.location.valid = !Object.values(newValidation.location.errors).some((error) => error)

    // Validate experience
    newValidation.experience.errors.required = !formData.experience
    newValidation.experience.valid = !Object.values(newValidation.experience.errors).some((error) => error)

    // Validate resume
    newValidation.resume.errors.required = fileName === "No file chosen"
    newValidation.resume.valid = !Object.values(newValidation.resume.errors).some((error) => error)

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
    setFileError("")

    if (file) {
      // Validate file type
      const validTypes = [".pdf", ".doc", ".docx"]
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()
      const newValidation = { ...formValidation }

      if (!validTypes.includes(fileExtension)) {
        setFileName("Invalid file type")
        setFileError("Only PDF, DOC, and DOCX files are allowed")
        newValidation.resume.errors.fileType = true
        newValidation.resume.valid = false
        if (fileInputRef.current) fileInputRef.current.value = ""
      } else if (file.size > 10 * 1024 * 1024) {
        // Validate file size (10MB max)
        setFileName("File too large")
        setFileError("File size must be less than 10MB")
        newValidation.resume.errors.fileSize = true
        newValidation.resume.valid = false
        if (fileInputRef.current) fileInputRef.current.value = ""
      } else {
        setFileName(file.name)
        newValidation.resume.errors.required = false
        newValidation.resume.errors.fileType = false
        newValidation.resume.errors.fileSize = false
        newValidation.resume.valid = true
      }

      setFormValidation({
        ...newValidation,
        resume: {
          ...newValidation.resume,
          touched: true,
          dirty: true,
        },
      })
    } else {
      setFileName("No file chosen")
      setFormValidation((prev) => ({
        ...prev,
        resume: {
          ...prev.resume,
          touched: true,
          dirty: true,
          errors: {
            ...prev.resume.errors,
            required: true,
            fileType: false,
            fileSize: false,
          },
          valid: false,
        },
      }))
    }
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

      const response = await fetch("https://lissomsoft.onrender.com/api/career", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        toast.success("Application submitted successfully!")
        setSubmissionStatus("success")
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
            errors: { ...formValidation[key].errors },
          }
        })
        setFormValidation(resetValidation)
        setFormSubmitted(false)
      } else {
        const error = await response.json()
        setSubmissionStatus("error")
        throw new Error(error.message || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmissionStatus("error")
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

                {/* Validation Summary */}
                {formSubmitted && !isFormValid() && (
                  <div className="alert alert-danger mb-4">
                    <h5 className="alert-heading mb-2">Please fix the following errors:</h5>
                    <ul className="mb-0 ps-3">
                      {formValidation.fullName.errors.required && <li>Full name is required</li>}
                      {formValidation.fullName.errors.minLength && <li>Full name must be at least 3 characters</li>}
                      {formValidation.email.errors.required && <li>Email is required</li>}
                      {formValidation.email.errors.pattern && <li>Email format is invalid</li>}
                      {formValidation.position.errors.required && <li>Position selection is required</li>}
                      {formValidation.location.errors.required && <li>Location is required</li>}
                      {formValidation.experience.errors.required && <li>Experience selection is required</li>}
                      {formValidation.resume.errors.required && <li>Resume upload is required</li>}
                      {formValidation.resume.errors.fileType && <li>Invalid resume file type</li>}
                      {formValidation.resume.errors.fileSize && <li>Resume file is too large</li>}
                    </ul>
                  </div>
                )}

                {/* Submission Status Alert */}
                {submissionStatus === "success" && (
                  <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                    <strong>Success!</strong> Your application has been submitted successfully.
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSubmissionStatus(null)}
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                {submissionStatus === "error" && (
                  <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                    <strong>Error!</strong> There was a problem submitting your application. Please try again.
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSubmissionStatus(null)}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="needs-validation">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fullName" className="form-label fw-semibold">
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
                        <div className="invalid-feedback d-block">
                          {formValidation.fullName.errors.required && <div>Full name is required</div>}
                          {!formValidation.fullName.errors.required && formValidation.fullName.errors.minLength && (
                            <div>Full name must be at least 3 characters</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
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
                      {shouldShowError("email") && (
                        <div className="invalid-feedback d-block">
                          {formValidation.email.errors.required && <div>Email is required</div>}
                          {!formValidation.email.errors.required && formValidation.email.errors.pattern && (
                            <div>Please enter a valid email address</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="position" className="form-label fw-semibold">
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
                        <div className="invalid-feedback d-block">Please select a position</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="location" className="form-label fw-semibold">
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
                        <div className="invalid-feedback d-block">Location is required</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="experience" className="form-label fw-semibold">
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
                      <div className="invalid-feedback d-block">Please select your experience level</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="resume" className="form-label fw-semibold">
                      Resume <span className="text-danger">*</span>
                    </label>
                    <div className={`input-group ${shouldShowError("resume") ? "has-validation" : ""}`}>
                      <input
                        type="file"
                        className="form-control d-none"
                        id="resume"
                        name="resume"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <button
                        type="button"
                        className={`btn ${shouldShowError("resume") ? "btn-outline-danger" : "btn-outline-primary"}`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </button>
                      <span
                        className={`input-group-text flex-grow-1 ${shouldShowError("resume") ? "border-danger text-danger" : ""}`}
                      >
                        {fileName}
                      </span>
                    </div>
                    {shouldShowError("resume") && (
                      <div className="text-danger mt-1 small">
                        {formValidation.resume.errors.required && "Please upload your resume"}
                        {fileError && fileError}
                      </div>
                    )}
                    <small className="text-muted d-block mt-1">Accepted formats: PDF, DOC, DOCX (Max 10MB)</small>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Your message <span className="text-muted">(optional)</span>
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

