// This file should be placed in your React project's API directory
// For example: src/api/partner.js or pages/api/partner.js depending on your setup

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed" })
    }
  
    try {
      const formData = req.body
  
      // Validate required fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.businessEmail ||
        !formData.phoneNumber ||
        !formData.organization ||
        !formData.country ||
        !formData.domain
      ) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be filled out",
        })
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.businessEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        })
      }
  
      // Validate phone number format
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/
      if (!phoneRegex.test(formData.phoneNumber)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid phone number",
        })
      }
  
      // Here you would typically save the data to a database
      // For now, we'll just return a success response
  
      return res.status(200).json({
        success: true,
        message: "Partnership request submitted successfully!",
        data: formData,
      })
    } catch (error) {
      console.error("Error submitting partner form:", error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while submitting your partnership request",
        error: error.message,
      })
    }
  }
  
  