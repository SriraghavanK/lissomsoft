// Updated client-side implementation to call the backend API

export async function submitContactForm(formData) {
    try {
      // Extract form data
      const firstName = formData.get("firstName")
      const lastName = formData.get("lastName")
      const email = formData.get("email")
      const phone = formData.get("phone")
      const message = formData.get("message")
  
      // Validate form data
      const errors = {}
  
      // Name validations
      if (!firstName || firstName.trim() === "") {
        errors.firstName = "First name is required"
      }
  
      if (!lastName || lastName.trim() === "") {
        errors.lastName = "Last name is required"
      }
  
      // Email validation
      if (!email || email.trim() === "") {
        errors.email = "Email is required"
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          errors.email = "Please enter a valid email address (example@domain.com)"
        }
      }
  
      // Phone validation - specifically for 10 digits
      if (!phone || phone.trim() === "") {
        errors.phone = "Phone number is required"
      } else {
        // Remove any non-digit characters for validation
        const digitsOnly = phone.replace(/\D/g, "")
        if (digitsOnly.length !== 10) {
          errors.phone = "Phone number must be exactly 10 digits"
        }
      }
  
      // If there are validation errors, return them
      if (Object.keys(errors).length > 0) {
        return {
          success: false,
          message: "Please correct the errors in the form",
          errors,
        }
      }
  
      // Send data to backend API
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          message,
        }),
      })
  
      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error submitting form:", error)
      return { success: false, message: "An error occurred while submitting the form" }
    }
  }
  
  