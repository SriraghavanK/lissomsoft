const express = require("express")
const cors = require("cors")
const { google } = require("googleapis")
const nodemailer = require("nodemailer")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Get the base URL from environment or construct it
const getBaseUrl = () => {
  // Use the environment variable if available
  if (process.env.BASE_URL) {
    console.log(`Using BASE_URL from environment: ${process.env.BASE_URL}`)
    return process.env.BASE_URL
  }

  // Fallback to constructing from request (will be used in route handlers)
  console.log("No BASE_URL in environment, will construct from request")
  return null
}

// Request logging middleware with more details
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  console.log(`Request origin: ${req.headers.origin || "Unknown"}`)
  console.log(`Host: ${req.headers.host}`)

  // Construct and log the full URL
  const protocol = req.headers["x-forwarded-proto"] || req.protocol
  const host = req.headers["x-forwarded-host"] || req.headers.host
  const fullUrl = `${protocol}://${host}${req.originalUrl}`
  console.log(`Full URL: ${fullUrl}`)

  next()
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create public directory for file access with better error handling
const publicDir = path.join(__dirname, "public", "uploads")
try {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
    console.log(`Created public uploads directory at: ${publicDir}`)
  } else {
    console.log(`Public uploads directory exists at: ${publicDir}`)
    // Check if directory is writable
    fs.accessSync(publicDir, fs.constants.W_OK)
    console.log("Public uploads directory is writable")
  }
} catch (error) {
  console.error(`ERROR setting up public directory: ${error.message}`)
  console.error(error.stack)
}

// Test the upload directory on server start with more detailed logging
const testUploadDir = () => {
  const uploadDir = path.join(__dirname, "public", "uploads")
  console.log("Testing upload directory:", uploadDir)

  if (!fs.existsSync(uploadDir)) {
    try {
      fs.mkdirSync(uploadDir, { recursive: true })
      console.log(`Created upload directory successfully at: ${uploadDir}`)
    } catch (error) {
      console.error(`ERROR creating upload directory: ${error.message}`)
      console.error(`Directory path: ${uploadDir}`)
      console.error(error.stack)
    }
  } else {
    console.log(`Upload directory exists at: ${uploadDir}`)

    // Test write permissions with more detailed error handling
    try {
      const testFile = path.join(uploadDir, "test.txt")
      fs.writeFileSync(testFile, "Test file")
      console.log(`Successfully wrote test file at: ${testFile}`)
      fs.unlinkSync(testFile)
      console.log(`Successfully deleted test file at: ${testFile}`)
    } catch (error) {
      console.error(`ERROR testing write permissions: ${error.message}`)
      console.error(`Current directory: ${__dirname}`)
      console.error(`User running process: ${process.getuid ? process.getuid() : "Unknown"}`)
      console.error(error.stack)
    }
  }
}

// Call this function when the server starts
testUploadDir()

// Set up multer for file uploads with better error handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use a consistent path method - __dirname is more reliable
    const uploadDir = path.join(__dirname, "public", "uploads")
    console.log(`Saving file to: ${uploadDir}`)

    // Create directory if it doesn't exist
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
        console.log(`Created uploads directory at: ${uploadDir}`)
      }
      cb(null, uploadDir)
    } catch (error) {
      console.error(`ERROR in multer destination: ${error.message}`)
      console.error(error.stack)
      cb(error)
    }
  },
  filename: (req, file, cb) => {
    try {
      // Create a more reliable filename that preserves the original extension
      const originalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_")
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
      const filename = uniqueSuffix + "-" + originalName
      console.log(`Generated filename: ${filename}`)
      cb(null, filename)
    } catch (error) {
      console.error(`ERROR in multer filename: ${error.message}`)
      console.error(error.stack)
      cb(error)
    }
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    try {
      const filetypes = /pdf|doc|docx/
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
      const mimetype = filetypes.test(file.mimetype)

      console.log(`File upload attempt: ${file.originalname}`)
      console.log(`Mimetype: ${file.mimetype}, Extension valid: ${extname}, Mimetype valid: ${mimetype}`)

      if (extname && mimetype) {
        return cb(null, true)
      } else {
        cb(new Error(`Only PDF, DOC, and DOCX files are allowed! Got: ${file.mimetype}`))
      }
    } catch (error) {
      console.error(`ERROR in multer fileFilter: ${error.message}`)
      console.error(error.stack)
      cb(error)
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
})

// Google Sheets API setup
const setupGoogleSheets = () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    return google.sheets({ version: "v4", auth })
  } catch (error) {
    console.error(`ERROR setting up Google Sheets: ${error.message}`)
    console.error(error.stack)
    throw error
  }
}

// Email transporter setup
const setupEmailTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  } catch (error) {
    console.error(`ERROR setting up email transporter: ${error.message}`)
    console.error(error.stack)
    throw error
  }
}

// IMPORTANT: Serve static files BEFORE defining routes
// Serve static files from public directory
app.use("/public", express.static(path.join(__dirname, "public")))

// Health check endpoint with environment info
app.get("/health", (req, res) => {
  // Get base URL from request if not in environment
  const protocol = req.headers["x-forwarded-proto"] || req.protocol
  const host = req.headers["x-forwarded-host"] || req.headers.host
  const requestBaseUrl = `${protocol}://${host}`

  const baseUrl = process.env.BASE_URL || requestBaseUrl

  res.status(200).json({
    status: "ok",
    message: "Server is running",
    version: "1.0.2",
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV || "development",
      PORT: PORT,
      BASE_URL: baseUrl,
      BASE_URL_SOURCE: process.env.BASE_URL ? "environment" : "request",
    },
    paths: {
      current_directory: __dirname,
      uploads_directory: publicDir,
      uploads_exists: fs.existsSync(publicDir),
      uploads_writable: (() => {
        try {
          fs.accessSync(publicDir, fs.constants.W_OK)
          return true
        } catch (e) {
          return false
        }
      })(),
    },
  })
})

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled out",
      })
    }

    const now = new Date()
    // Format date and time in Indian Standard Time (IST)
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
    const istDateTime = now.toLocaleString("en-IN", options)
    const [date, time] = istDateTime.split(", ")

    const sheets = setupGoogleSheets()

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[firstName, lastName, email, phone, message || "No message", date, time]],
      },
    })

    const transporter = setupEmailTransporter()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message || "No message"}</p>
      `,
    })

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    })
  } catch (error) {
    console.error("Error submitting form:", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the form",
      error: error.message,
    })
  }
})

// Career form submission endpoint with improved URL handling
app.post("/api/career", upload.single("resume"), async (req, res) => {
  try {
    const { fullName, email, position, location, experience, message } = req.body
    const resumeFile = req.file

    console.log("Received career form submission")
    console.log("Form data:", { fullName, email, position, location, experience })
    console.log(
      "Resume file:",
      resumeFile
        ? {
            originalname: resumeFile.originalname,
            mimetype: resumeFile.mimetype,
            size: resumeFile.size,
            path: resumeFile.path,
          }
        : "No file uploaded",
    )

    if (!fullName || !email || !position || !location || !experience) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled out",
      })
    }

    const now = new Date()
    // Format date and time in Indian Standard Time (IST)
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
    const istDateTime = now.toLocaleString("en-IN", options)
    const [date, time] = istDateTime.split(", ")

    const sheets = setupGoogleSheets()

    let resumeFileName = "No resume uploaded"
    let resumeFileType = ""
    let resumeFileSize = ""
    let resumeLink = ""

    if (resumeFile) {
      // Get base URL from environment or request
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`

      console.log("Using base URL for resume link:", baseUrl)
      resumeLink = `${baseUrl}/public/uploads/${path.basename(resumeFile.path)}`
      console.log("Generated resume link:", resumeLink)

      // Verify the file was actually saved
      if (fs.existsSync(resumeFile.path)) {
        console.log(`Resume file exists at: ${resumeFile.path}`)
        const stats = fs.statSync(resumeFile.path)
        console.log(`File size on disk: ${stats.size} bytes`)
      } else {
        console.error(`ERROR: Resume file does not exist at: ${resumeFile.path}`)
      }

      resumeFileName = resumeFile.originalname
      resumeFileType = resumeFile.mimetype
      resumeFileSize = `${(resumeFile.size / 1024 / 1024).toFixed(2)}MB`
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet2!A:K",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            fullName,
            email,
            position,
            location,
            experience,
            message || "No message",
            resumeFileName,
            resumeFileType,
            resumeFileSize,
            resumeLink,
            `${date} ${time}`,
          ],
        ],
      },
    })

    const transporter = setupEmailTransporter()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Career Application Submission",
      html: `
        <h2>New Career Application Submission</h2>
        <p><strong>Date:</strong> ${date} ${time}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Message:</strong> ${message || "No message"}</p>
        <p><strong>Resume:</strong> ${resumeFileName} (${resumeFileSize})</p>
        ${resumeLink ? `<p><strong>Download Link:</strong> <a href="${resumeLink}">Download Resume</a></p>` : ""}
      `,
      ...(resumeFile && {
        attachments: [
          {
            filename: resumeFile.originalname,
            path: resumeFile.path,
          },
        ],
      }),
    })

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
      resumeLink: resumeLink || null,
      baseUrl: process.env.BASE_URL || `${req.protocol}://${req.get("host")}`,
    })
  } catch (error) {
    console.error("Error processing career application:", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your application",
      error: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    })
  }
})

// Form submissions to Sheet3 endpoint
app.post("/api/submit-form", async (req, res) => {
  try {
    const formData = req.body
    const sheetName = formData.sheet || "Sheet3"
    delete formData.sheet

    if (sheetName === "Sheet3") {
      if (!formData.name || !formData.email || !formData.phone || !formData.company) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be filled out",
        })
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        })
      }

      const phoneRegex = /^[0-9+\-\s()]{10,15}$/
      if (!phoneRegex.test(formData.phone)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid phone number",
        })
      }
    } else if (sheetName === "Sheet4") {
      if (!formData.firstName || !formData.email || !formData.phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be filled out",
        })
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        })
      }

      const phoneRegex = /^[0-9+\-\s()]{10,15}$/
      if (!phoneRegex.test(formData.phoneNumber)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid phone number",
        })
      }
    } else if (sheetName === "Sheet5") {
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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.businessEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        })
      }

      const phoneRegex = /^[0-9+\-\s()]{10,15}$/
      if (!phoneRegex.test(formData.phoneNumber)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid phone number",
        })
      }
    }

    const now = new Date()
    // Format date and time in Indian Standard Time (IST)
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
    const istDateTime = now.toLocaleString("en-IN", options)
    const [date, time] = istDateTime.split(", ")

    const sheets = setupGoogleSheets()

    let values = []

    if (sheetName === "Sheet3") {
      values = [
        [
          formData.name || "",
          formData.phone || "",
          formData.company || "",
          formData.email || "",
          formData.message || "",
          formData.agreeTerms ? "Yes" : "No",
          date,
          time,
        ],
      ]
    } else if (sheetName === "Sheet4") {
      values = [
        [
          formData.firstName || "",
          formData.titleDesignation || "",
          formData.organization || "",
          formData.email || "",
          formData.phoneNumber || "",
          date,
          time,
        ],
      ]
    } else if (sheetName === "Sheet5") {
      values = [
        [
          formData.firstName || "",
          formData.lastName || "",
          formData.businessEmail || "",
          formData.phoneNumber || "",
          formData.organization || "",
          formData.country || "",
          formData.domain || "",
          formData.offer || "",
          formData.agreeComms ? "Yes" : "No",
          date,
          time,
        ],
      ]
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: `${sheetName}!A:K`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: values,
      },
    })

    const transporter = setupEmailTransporter()

    let emailSubject = ""
    let emailContent = ""

    if (sheetName === "Sheet3") {
      emailSubject = "New Smartgrc Contact Form Submission"
      emailContent = `
        <h2>New Smartgrc Contact Form Submission</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong> ${formData.message || "No message"}</p>
        <p><strong>Agreed to Terms:</strong> ${formData.agreeTerms ? "Yes" : "No"}</p>
      `
    } else if (sheetName === "Sheet4") {
      emailSubject = "New Demo Request"
      emailContent = `
        <h2>New Demo Request</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${formData.firstName}</p>
        <p><strong>Title/Designation:</strong> ${formData.titleDesignation || "N/A"}</p>
        <p><strong>Organization:</strong> ${formData.organization || "N/A"}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
      `
    } else if (sheetName === "Sheet5") {
      emailSubject = "New Partner Application"
      emailContent = `
        <h2>New Partner Application</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Business Email:</strong> ${formData.businessEmail}</p>
        <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
        <p><strong>Organization:</strong> ${formData.organization}</p>
        <p><strong>Country:</strong> ${formData.country}</p>
        <p><strong>Domain:</strong> ${formData.domain}</p>
        <p><strong>Offer:</strong> ${formData.offer || "No details provided"}</p>
        <p><strong>Agreed to Communications:</strong> ${formData.agreeComms ? "Yes" : "No"}</p>
      `
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: emailSubject,
      html: emailContent,
    })

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    })
  } catch (error) {
    console.error("Error submitting form:", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the form",
      error: error.message,
    })
  }
})

// Add the partner form endpoint to handle Sheet5 data
app.post("/api/partner", async (req, res) => {
  try {
    const { firstName, lastName, businessEmail, phoneNumber, organization, country, domain, offer, agreeComms } =
      req.body

    if (!firstName || !lastName || !businessEmail || !phoneNumber || !organization || !country || !domain) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled out",
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(businessEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      })
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      })
    }

    const now = new Date()
    // Format date and time in Indian Standard Time (IST)
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
    const istDateTime = now.toLocaleString("en-IN", options)
    const [date, time] = istDateTime.split(", ")

    const sheets = setupGoogleSheets()

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet5!A:K",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            firstName,
            lastName,
            businessEmail,
            phoneNumber,
            organization,
            country,
            domain,
            offer || "",
            agreeComms ? "Yes" : "No",
            date,
            time,
          ],
        ],
      },
    })

    const transporter = setupEmailTransporter()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Partner Application",
      html: `
        <h2>New Partner Application</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Business Email:</strong> ${businessEmail}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Domain:</strong> ${domain}</p>
        <p><strong>Offer:</strong> ${offer || "No details provided"}</p>
        <p><strong>Agreed to Communications:</strong> ${agreeComms ? "Yes" : "No"}</p>
      `,
    })

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    })
  } catch (error) {
    console.error("Error submitting partner form:", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the form",
      error: error.message,
    })
  }
})

// Serve resume files with proper headers and improved error handling
app.get("/resume/:filename", (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(publicDir, filename)

  console.log("Requested resume file:", filename)
  console.log("Looking for file at path:", filePath)

  // Check if file exists with better error handling
  try {
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath)
      return res.status(404).send("File not found")
    }

    // Get file stats
    const stats = fs.statSync(filePath)
    console.log(`File size: ${stats.size} bytes`)

    if (stats.size === 0) {
      console.error("File exists but is empty:", filePath)
      return res.status(404).send("File is empty")
    }

    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase()
    let contentType = "application/octet-stream" // Default

    if (ext === ".pdf") {
      contentType = "application/pdf"
    } else if (ext === ".doc") {
      contentType = "application/msword"
    } else if (ext === ".docx") {
      contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    }

    // Set headers for proper file download
    res.setHeader("Content-Type", contentType)
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`)
    res.setHeader("Content-Length", stats.size)

    // Stream the file with error handling
    const fileStream = fs.createReadStream(filePath)

    fileStream.on("error", (error) => {
      console.error("Error streaming file:", error)
      if (!res.headersSent) {
        res.status(500).send("Error streaming file")
      }
    })

    fileStream.pipe(res)
  } catch (error) {
    console.error(`ERROR serving resume file: ${error.message}`)
    console.error(error.stack)
    if (!res.headersSent) {
      res.status(500).send(`Server error: ${error.message}`)
    }
  }
})

// Add a simple resume viewer page
app.get("/view-resume/:filename", (req, res) => {
  const filename = req.params.filename
  const resumeUrl = `/resume/${filename}`
  const fileExt = path.extname(filename).toLowerCase()

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume Viewer - Lissomsoft</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
      <style>
        body { 
          padding: 0; 
          margin: 0;
          font-family: Arial, sans-serif;
        }
        .header {
          background-color: #f8f9fa;
          padding: 15px 20px;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-weight: bold;
          font-size: 1.2rem;
          color: #333;
        }
        .resume-container { 
          height: calc(100vh - 70px);
          width: 100%;
          overflow: hidden;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .doc-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          padding: 20px;
        }
        .doc-icon {
          font-size: 4rem;
          color: #0d6efd;
          margin-bottom: 20px;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 10px 20px;
          text-align: center;
          font-size: 0.8rem;
          color: #6c757d;
          border-top: 1px solid #dee2e6;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Lissomsoft</div>
        <div>
          <a href="/resume/${filename}" class="btn btn-primary btn-sm" download>
            <i class="bi bi-download"></i> Download
          </a>
          <a href="javascript:history.back()" class="btn btn-secondary btn-sm">
            <i class="bi bi-arrow-left"></i> Back
          </a>
        </div>
      </div>
      
      <div class="resume-container">
        ${
          fileExt === ".pdf"
            ? `<iframe src="${resumeUrl}" title="Resume"></iframe>`
            : `<div class="doc-message">
            <i class="bi bi-file-earmark-word doc-icon"></i>
            <h3>Microsoft Word Document</h3>
            <p class="mb-4">This file type cannot be previewed directly in the browser.</p>
            <a href="/resume/${filename}" class="btn btn-lg btn-primary" download>
              <i class="bi bi-download me-2"></i> Download Document
            </a>
          </div>`
        }
      </div>
      
      <div class="footer">
        &copy; ${new Date().getFullYear()} Lissomsoft. All rights reserved.
      </div>
      
      <script>
        // Simple script to handle window resize for iframe
        window.addEventListener('resize', function() {
          const header = document.querySelector('.header');
          const footer = document.querySelector('.footer');
          const container = document.querySelector('.resume-container');
          
          if (container && header && footer) {
            container.style.height = (window.innerHeight - header.offsetHeight - footer.offsetHeight) + 'px';
          }
        });
      </script>
    </body>
    </html>
  `)
})

// Add a resume management page
app.get("/admin/resumes", async (req, res) => {
  try {
    const sheets = setupGoogleSheets()

    // Get resume data from Sheet2
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet2!A:K",
    })

    const rows = response.data.values || []
    const headers = rows[0] || []
    const data = rows.slice(1)

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume Management - Lissomsoft</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
        <style>
          body { padding: 20px; }
          .table-responsive { overflow-x: auto; }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .search-box {
            max-width: 300px;
          }
        </style>
      </head>
      <body>
        <div class="container-fluid">
          <div class="header">
            <h1>Resume Management</h1>
            <div class="search-box">
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input type="text" id="searchInput" class="form-control" placeholder="Search...">
              </div>
            </div>
          </div>
          
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Resume</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (row, index) => `
                  <tr>
                    <td>${row[0] || ""}</td>
                    <td>${row[1] || ""}</td>
                    <td>${row[2] || ""}</td>
                    <td>${row[3] || ""}</td>
                    <td>${row[4] || ""}</td>
                    <td>${row[6] || "No resume"}</td>
                    <td>${row[10] || ""}</td>
                    <td>
                      ${
                        row[9] && row[9].includes("/")
                          ? `<div class="btn-group">
                          <a href="${row[9].includes("view-resume") ? row[9] : "/view-resume/" + row[9].split("/").pop()}" 
                             class="btn btn-sm btn-primary" target="_blank">
                            <i class="bi bi-eye"></i> View
                          </a>
                          <a href="/resume/${row[9].split("/").pop()}" class="btn btn-sm btn-success" download>
                            <i class="bi bi-download"></i> Download
                          </a>
                        </div>`
                          : '<span class="badge bg-secondary">No resume</span>'
                      }
                    </td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <script>
          // Simple search functionality
          document.getElementById('searchInput').addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('tbody tr');
            
            tableRows.forEach(row => {
              const text = row.textContent.toLowerCase();
              if (text.includes(searchTerm)) {
                row.style.display = '';
              } else {
                row.style.display = 'none';
              }
            });
          });
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    console.error("Error fetching resumes:", error)
    res.status(500).send("Error fetching resumes")
  }
})

// Add a test endpoint to verify file access
app.get("/test-file-access", (req, res) => {
  const uploadDir = path.join(__dirname, "public", "uploads")

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err)
      return res.status(500).json({
        success: false,
        message: "Error reading uploads directory",
        error: err.message,
        path: uploadDir,
      })
    }

    return res.status(200).json({
      success: true,
      message: "Successfully read uploads directory",
      files: files,
      path: uploadDir,
      exists: fs.existsSync(uploadDir),
    })
  })
})

// Add a test upload endpoint to help diagnose the issue
app.get("/test-upload-form", (req, res) => {
  // Get base URL from request if not in environment
  const protocol = req.headers["x-forwarded-proto"] || req.protocol
  const host = req.headers["x-forwarded-host"] || req.headers.host
  const baseUrl = process.env.BASE_URL || `${protocol}://${host}`

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Resume Upload</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input, textarea { width: 100%; padding: 8px; }
        button { padding: 10px 15px; background: #0066cc; color: white; border: none; cursor: pointer; }
        .result { margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
        pre { background: #f5f5f5; padding: 10px; overflow: auto; }
        .server-info { margin-bottom: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Test Resume Upload</h1>
      
      <div class="server-info">
        <h3>Server Information</h3>
        <p><strong>Base URL:</strong> ${baseUrl}</p>
        <p><strong>Environment BASE_URL:</strong> ${process.env.BASE_URL || "Not set"}</p>
        <p><strong>Request Host:</strong> ${host}</p>
        <p><strong>Request Protocol:</strong> ${protocol}</p>
      </div>
      
      <form id="uploadForm" enctype="multipart/form-data">
        <div class="form-group">
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="position">Position:</label>
          <input type="text" id="position" name="position" required>
        </div>
        <div class="form-group">
          <label for="location">Location:</label>
          <input type="text" id="location" name="location" required>
        </div>
        <div class="form-group">
          <label for="experience">Experience:</label>
          <input type="text" id="experience" name="experience" required>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" name="message" rows="4"></textarea>
        </div>
        <div class="form-group">
          <label for="resume">Resume (PDF, DOC, DOCX):</label>
          <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required>
        </div>
        <button type="submit">Submit</button>
      </form>
      
      <div class="result" id="result" style="display: none;">
        <h2>Result:</h2>
        <pre id="resultContent"></pre>
      </div>
      
      <script>
        document.getElementById('uploadForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const formData = new FormData(this);
          const resultDiv = document.getElementById('result');
          const resultContent = document.getElementById('resultContent');
          
          try {
            resultDiv.style.display = 'block';
            resultContent.textContent = 'Uploading...';
            
            const response = await fetch('/api/career', {
              method: 'POST',
              body: formData
            });
            
            const data = await response.json();
            resultContent.textContent = JSON.stringify(data, null, 2);
            
            if (data.success) {
              alert('Upload successful! Check the result for details.');
            }
          } catch (error) {
            resultContent.textContent = 'Error: ' + error.message;
          }
        });
      </script>
    </body>
    </html>
  `)
})

// Add a new endpoint to check environment variables
app.get("/env-check", (req, res) => {
  // Only show this in development or with a special token
  const authToken = req.query.token
  if (process.env.NODE_ENV !== "production" || authToken === "lissomsoft-debug-token") {
    // Get base URL from request if not in environment
    const protocol = req.headers["x-forwarded-proto"] || req.protocol
    const host = req.headers["x-forwarded-host"] || req.headers.host
    const requestBaseUrl = `${protocol}://${host}`

    res.json({
      environment: {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: PORT,
        BASE_URL: process.env.BASE_URL || "Not set",
        requestBaseUrl: requestBaseUrl,
      },
      request: {
        protocol: protocol,
        host: host,
        originalUrl: req.originalUrl,
        headers: {
          host: req.headers.host,
          "x-forwarded-host": req.headers["x-forwarded-host"] || "Not set",
          "x-forwarded-proto": req.headers["x-forwarded-proto"] || "Not set",
          "user-agent": req.headers["user-agent"],
          origin: req.headers.origin || "Not set",
          referer: req.headers.referer || "Not set",
        },
      },
      paths: {
        current_directory: __dirname,
        uploads_directory: publicDir,
        uploads_exists: fs.existsSync(publicDir),
        uploads_writable: (() => {
          try {
            fs.accessSync(publicDir, fs.constants.W_OK)
            return true
          } catch (e) {
            return false
          }
        })(),
      },
    })
  } else {
    res.status(403).json({ error: "Access denied" })
  }
})

// Error handling for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err)
    return res.status(400).json({
      success: false,
      message: "File upload error",
      error: err.message,
      code: err.code,
    })
  }
  next(err)
})

// General error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err)
  // Ensure we haven't already sent a response
  if (!res.headersSent) {
    // Force JSON response type
    res.setHeader("Content-Type", "application/json")
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "An unexpected error occurred",
      error: process.env.NODE_ENV === "production" ? null : err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
  }
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Base URL: ${process.env.BASE_URL || "Not set in environment"}`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
})

module.exports = app
