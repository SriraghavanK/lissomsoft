const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create public directory for file access
const publicDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only certain file types
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed!"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
});

// Google Sheets API setup
const setupGoogleSheets = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

// Email transporter setup
const setupEmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validate form data
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled out",
      });
    }

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Connect to Google Sheets
    const sheets = setupGoogleSheets();

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet1!A:G", // Adjust based on your sheet's structure
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            firstName,
            lastName,
            email,
            phone,
            message || "No message",
            date,
            time,
          ],
        ],
      },
    });

    // Send email notification
    const transporter = setupEmailTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "testing143web@gmail.com", // Change to your email
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
    });

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the form",
    });
  }
});

// Career form submission endpoint
app.post("/api/career", upload.single("resume"), async (req, res) => {
  try {
    const { fullName, email, position, location, experience, message } =
      req.body;
    const resumeFile = req.file;

    // Validate form data
    if (!fullName || !email || !position || !location || !experience) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled out",
      });
    }

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Connect to Google Sheets
    const sheets = setupGoogleSheets();

    // Handle resume file
    let resumeFileName = "No resume uploaded";
    let resumeFileType = "";
    let resumeFileSize = "";
    let resumeLink = "";

    if (resumeFile) {
      // Copy file to public directory for access
      const publicFilePath = path.join(publicDir, resumeFile.filename);
      fs.copyFileSync(resumeFile.path, publicFilePath);

      // Create a URL to access the file
      const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
      resumeLink = `${baseUrl}/public/uploads/${resumeFile.filename}`;

      resumeFileName = resumeFile.originalname;
      resumeFileType = resumeFile.mimetype;
      resumeFileSize = `${(resumeFile.size / 1024 / 1024).toFixed(2)}MB`;
    }

    // Append data to Google Sheet (Sheet2) with improved file metadata
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet2!A:K", // Extended columns for more metadata
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
            resumeLink, // Add direct link to file
            `${date} ${time}`,
          ],
        ],
      },
    });

    // Send email notification
    const transporter = setupEmailTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to the same email
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
        ${
          resumeLink
            ? `<p><strong>Download Link:</strong> <a href="${resumeLink}">Download Resume</a></p>`
            : ""
        }
      `,
      ...(resumeFile && {
        attachments: [
          {
            filename: resumeFile.originalname,
            path: resumeFile.path,
          },
        ],
      }),
    });

    // Clean up uploaded file after sending email
    if (resumeFile) {
      fs.unlink(resumeFile.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
    });
  } catch (error) {
    console.error("Error processing career application:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your application",
      error: error.message,
    });
  }
});

// New endpoint for form submissions to Sheet3
app.post("/api/submit-form", async (req, res) => {
  try {
    const formData = req.body;
    const sheetName = formData.sheet || "Sheet3"; // Default to Sheet3 if not specified
    delete formData.sheet; // Remove sheet from data to be saved

    // Validate form data
    if (sheetName === "Sheet3") {
      // Main contact form validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.company
      ) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be filled out",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }

      // Validate phone number
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid phone number",
        });
      }
    } else if (sheetName === "Sheet4") {
      // Demo form validation
      if (!formData.firstName || !formData.email || !formData.phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be filled out",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }

      // Validate phone number
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid phone number",
        });
      }
    }

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Connect to Google Sheets
    const sheets = setupGoogleSheets();

    // Prepare data for Google Sheets
    let values = [];

    if (sheetName === "Sheet3") {
      // Main contact form data
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
      ];
    } else if (sheetName === "Sheet4") {
      // Demo form data
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
      ];
    }

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: `${sheetName}!A:H`, // Adjust based on your sheet's structure
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: values,
      },
    });

    // Send email notification
    const transporter = setupEmailTransporter();

    let emailSubject = "";
    let emailContent = "";

    if (sheetName === "Sheet3") {
      emailSubject = "New Smartgrc Contact Form Submission";
      emailContent = `
        <h2>New Smartgrc Contact Form Submission</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong> ${formData.message || "No message"}</p>
        <p><strong>Agreed to Terms:</strong> ${
          formData.agreeTerms ? "Yes" : "No"
        }</p>
      `;
    } else if (sheetName === "Sheet4") {
      emailSubject = "New Demo Request";
      emailContent = `
        <h2>New Demo Request</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${formData.firstName}</p>
        <p><strong>Title/Designation:</strong> ${
          formData.titleDesignation || "N/A"
        }</p>
        <p><strong>Organization:</strong> ${formData.organization || "N/A"}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
        <p><strong>Message:</strong> ${
          formData.message || "No message provided"
        }</p>
      `;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to the same email
      subject: emailSubject,
      html: emailContent,
    });

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the form",
      error: error.message,
    });
  }
});

// Serve static files from the public directory
app.use("/public", express.static(path.join(__dirname, "public")));

// Find the build directory
const buildPaths = [
  path.join(__dirname, "build"),
  path.join(__dirname, "..", "build"),
  path.join(__dirname, "..", "..", "build"),
  path.join(process.cwd(), "build"),
  path.resolve("build"),
];

console.log("Current directory:", process.cwd());
console.log("Server directory:", __dirname);

let actualBuildPath = null;
for (const buildPath of buildPaths) {
  if (fs.existsSync(buildPath)) {
    actualBuildPath = buildPath;
    break;
  }
}

if (actualBuildPath) {
  console.log("Serving static files from:", actualBuildPath);

  // Serve static files from the React app build directory
  app.use(express.static(actualBuildPath));

  // IMPORTANT: This catch-all route must come after all API routes
  // For any request that doesn't match an API route or static file,
  // send the React app's index.html to support client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(actualBuildPath, "index.html"));
  });
} else {
  console.log("Build directory not found. Checked:");
  buildPaths.forEach((path) => console.log("- " + path));
  console.log("This server is running in API-only mode");
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
