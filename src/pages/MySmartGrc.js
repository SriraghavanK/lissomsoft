"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MySmartGrcPage = () => {
  useEffect(() => {
    // Expose the function to set active tabs from hash to the window object
    // so the Header component can use it
    window.setActiveTabFromHash = (hash) => {
      console.log(`Setting active tab from hash: ${hash}`)

      // Set active tabs based on the hash
      if (hash.includes("benefits")) {
        // No need to do anything special for benefits as it's just a section
        console.log("Setting active section: benefits")
      } else if (hash.includes("features") || hash.includes("feature")) {
        setCurrentFeature(0) // Reset to first feature
        console.log("Setting active section: features")
      } else if (hash.includes("methodology")) {
        setActiveApproachTab("methodology")
        console.log("Setting active approach tab: methodology")
      } else if (hash.includes("implementation")) {
        setActiveApproachTab("implementation")
        console.log("Setting active approach tab: implementation")
      } else if (hash.includes("vendor")) {
        setActiveTab("vendor-risk")
        console.log("Setting active tab: vendor-risk")
      } else if (hash.includes("it") || hash.includes("cyber")) {
        setActiveTab("it-cyber-risk")
        console.log("Setting active tab: it-cyber-risk")
      }
    }

    return () => {
      // Clean up
      delete window.setActiveTabFromHash
    }
  }, [])
  const [activeTab, setActiveTab] = useState("operational-risk")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    message: "",
    agreeTerms: false,
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    agreeTerms: "",
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitStatus, setFormSubmitStatus] = useState(null)
  const [expandedItems, setExpandedItems] = useState({
    "operational-risk": true,
    "risk-register": false,
    "incident-management": false,
    "loss-database": false,
    kri: false,
  })

  // Refs for scrolling to sections
  const overviewRef = useRef(null)
  const featuresRef = useRef(null)
  const benefitsRef = useRef(null)
  const approachRef = useRef(null)
  const methodologyRef = useRef(null)
  const implementationRef = useRef(null)
  const servicesRef = useRef(null)
  const expertsRef = useRef(null)
  const vendorRiskRef = useRef(null)
  const itRiskRef = useRef(null)

  // For rotating hero images
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const heroImages = [
    {
      src: "https://imgs.search.brave.com/-CuUCGKeEcPO6vJ_fYhk-z2kV6hnj6eNDaJ4LE3i_uk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jMS53/YWxscGFwZXJmbGFy/ZS5jb20vcHJldmll/dy85NTkvODcvNjkz/L2FkdWx0LWFkdmVu/dHVyZS1iYWNrcGFj/ay1jbGltYi5qcGc",
      alt: "Risk Management Dashboard",
    },
    {
      src: "https://imgs.search.brave.com/bSrAHQDUNeYEivUr9xL3RGa4RjxzBYAKn3oheWHU-jo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzMyLzc5LzA4/LzM2MF9GXzQzMjc5/MDgwMF9nQ21CdWRz/Z0N2YXk0cmRvckxh/ZXhsR1ZrT093bFho/SC5qcGc",
      alt: "Compliance Management",
    },
  ]

  // For rotating features
  const [currentFeature, setCurrentFeature] = useState(0)
  const features = [
    {
      title: "Risk Heat Maps",
      description:
        "Unlock a visual journey into your organizational risks with our Risk Heat Maps. Instantly grasp and prioritize potential threats and flag them for scrutiny. All at a glance!",
      image: "https://lissomsoft.com/smart-grc/assets/sgrc%20reports/heat_map.jpg",
    },
    {
      title: "Dashboard & Custom reports",
      description:
        "Level Up your Risk Management game! Gain a comprehensive view of your organization's Risk Health, Track Risks daily and present impactful data. Get ready to revolutionize your risk insights.",
      image: "https://lissomsoft.com/smart-grc/assets/sgrc%20reports/risk_impact_report.jpg",
    },
    {
      title: "Tracking and Monitoring",
      description:
        "Track and monitor risks seamlessly with our advanced Risk Tracking and Monitoring charts. Stay one step ahead by gaining real-time insights into potential threats. Enhance your risk management strategy for a resilient future.",
      image: "https://lissomsoft.com/smart-grc/assets/sgrc%20reports/kri_1.jpg",
    },

    {
      title: "Alerts and Notifications",

      description:
        "Stay in the loop with automated risk control alerts sent directly to your mobile or smart devices. Keep your team informed instantly on potential risks and centralize messages for quick reference. Simplify communication and expedite actions effortlessly.",
      image: "https://lissomsoft.com/smart-grc/assets/sgrc%20reports/kri_2.jpg",
    },
    {
      title: "Third Party Integration",

      description:
        "Integrate MySmartGRC with third-party systems for a cohesive user management experience. Keep all users, both active and inactive, synchronized effortlessly across systems for seamless collaboration.",
      image: "https://lissomsoft.com/smart-grc/assets/sgrc%20reports/movement_report.jpg",
    },
  ]

  // For flipping expert cards
  const [flippedCard, setFlippedCard] = useState(null)
  const experts = [
    {
      name: "Amit Bansal",
      title: "BFSI",
      image: "https://lissomsoft.com/smart-grc/assets/experties/amit-bansal.png",
      bio: "Over 15 years of experience in banking and financial risk management. Specializes in Basel compliance and operational risk frameworks.",
      expertise: ["Banking Regulations", "Financial Risk", "Basel Compliance"],
    },
    {
      name: "Lalit Dua",
      title: "Manufacturing",
      image: "https://lissomsoft.com/smart-grc/assets/experties/lalit%20dua.png",
      bio: "20+ years in manufacturing risk management. Expert in supply chain risk, quality control systems, and ISO compliance.",
      expertise: ["Supply Chain Risk", "Quality Management", "ISO Standards"],
    },
  ]

  // Deployment options
  const deploymentOptions = [
    {
      title: "On-Premise Deployment",
      icon: "server",
      description: "Deploy MySmartGRC on your own servers within your Data Center.",
      benefits: "Full control and customization over your deployment environment.",
    },
    {
      title: "Your Own Private Cloud",
      icon: "cloud",
      description: "Utilize your existing Cloud environment within your Data Center for MySmartGRC deployment.",
      benefits: "Leverage your dedicated cloud resources with enhanced scalability.",
    },
    {
      title: "Any Third-Party Cloud",
      icon: "cloud-upload",
      description:
        "Deploy MySmartGRC on popular Cloud services like Microsoft Azure, Amazon AWS, or Google Cloud Platform.",
      benefits: "Seamless integration with your existing cloud infrastructure.",
    },
    {
      title: "Our Cloud Environment & Maintenance Support",
      icon: "cogs",
      description: "Opt for Lissomsoft's Cloud environment and Maintenance Support for deploying MySmartGRC.",
      benefits: "Hassle-free deployment with expert support, ensuring optimal performance.",
    },
  ]

  // Helper icons for "Helps in many ways" section
  const helpIcons = [
    {
      title: "Streamlined Risk Monitoring",
      icon: "chart-line",
      color: "#0077b6",
    },
    {
      title: "Better control of incidents",
      icon: "shield-alt",
      color: "#0077b6",
    },
    {
      title: "Accurate risk data",
      icon: "clipboard-check",
      color: "#0077b6",
    },
    {
      title: "More visibility and transparency",
      icon: "eye",
      color: "#0077b6",
    },
    {
      title: "Align goals and risk culture",
      icon: "bullseye",
      color: "#0077b6",
    },
  ]

  // Form validation functions
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      
      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^[0-9+\-\s()]{10,15}$/.test(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      
      case "company":
        if (!value.trim()) {
          error = "Company name is required";
        }
        break;
      
      case "agreeTerms":
        if (!value) {
          error = "You must agree to the terms";
        }
        break;
      
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      company: validateField("company", formData.company),
      agreeTerms: validateField("agreeTerms", formData.agreeTerms)
    };
    
    setFormErrors(errors);
    
    // Return true if no errors (all values are empty strings)
    return Object.values(errors).every(error => error === "");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });
    
    // Clear the error for this field when user starts typing
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    
    // Set loading state
    setFormSubmitting(true);
    setFormSubmitStatus(null);
    
    try {
      // Submit to backend
      const response = await fetch("https://lissomsoft.onrender.com/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sheet: "Sheet3", // Specify Sheet 3
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setFormSubmitStatus({ 
          success: true, 
          message: "Thank you for your interest! We'll contact you soon." 
        });
        
        // Reset form
        setFormData({
          name: "",
          phone: "",
          company: "",
          email: "",
          message: "",
          agreeTerms: false,
        });
      } else {
        setFormSubmitStatus({
          success: false,
          message: data.message || "There was an error submitting the form. Please try again."
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormSubmitStatus({
        success: false,
        message: "There was an error connecting to the server. Please try again later."
      });
    } finally {
      setFormSubmitting(false);
    }
  }

  const toggleItem = (id) => {
    setExpandedItems({
      ...expandedItems,
      [id]: !expandedItems[id],
    })
  }

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      const headerHeight = 150
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Highlight the section
      ref.current.classList.add("highlight-section")
      setTimeout(() => {
        ref.current.classList.remove("highlight-section")
      }, 2000)
    }
  }

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  // Handle hash navigation on load
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Set a timeout to ensure the DOM is fully loaded
      setTimeout(() => {
        console.log("Processing hash:", hash)

        // Set the active tab based on the hash
        if (hash.includes("vendor")) {
          setActiveTab("vendor-risk")
        } else if (hash.includes("it")) {
          setActiveTab("it-cyber-risk")
        } else if (hash.includes("implementation")) {
          setActiveApproachTab("implementation")
        } else if (hash.includes("methodology")) {
          setActiveApproachTab("methodology")
        }

        // Find the element by ID
        const id = hash.replace("#", "")
        const element = document.getElementById(id)

        if (element) {
          console.log(`Found element with id: ${id}`)
          // Adjust for header height
          const headerHeight = 150
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - headerHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })

          // Highlight the section
          element.classList.add("highlight-section")
          setTimeout(() => {
            element.classList.remove("highlight-section")
          }, 2000)
        } else {
          console.error(`Section with ID "${id}" not found`)
          // Log all available IDs for debugging
          const allIds = Array.from(document.querySelectorAll("[id]")).map((el) => el.id)
          console.log("Available IDs:", allIds)
        }
      }, 500)
    }
  }, [])

  // Add this CSS for the risk management tabs
  const riskTabStyles = `
    .risk-management-tabs {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      width: 100%;
      margin-bottom: 20px;
    }
    
    .risk-tab-button {
      padding: 10px 20px;
      border: 2px solid #0077b6;
      background-color: white;
      color: #0077b6;
      border-radius: 30px;
      font-weight: 600;
      transition: all 0.3s ease;
      cursor: pointer;
      flex: 1;
      max-width: 250px;
      text-align: center;
    }
    
    .risk-tab-button:hover {
      background-color: rgba(0, 119, 182, 0.1);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 119, 182, 0.2);
    }
    
    .risk-tab-button.active {
      background: linear-gradient(90deg, #0077b6, #00a8e8);
      color: white;
      box-shadow: 0 5px 15px rgba(0, 119, 182, 0.3);
    }
    
    @media (max-width: 768px) {
      .risk-tab-button {
        flex: 1 0 100%;
        max-width: 100%;
      }
    }
    
    /* Add highlight effect for sections when scrolled to */
    .highlight-section {
      animation: highlight-pulse 1s ease-in-out;
    }
    
    @keyframes highlight-pulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 119, 182, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(0, 119, 182, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 119, 182, 0); }
    }

    /* Tab transition animations */
    .tab-transition-enter {
      opacity: 0;
      transform: translateY(20px);
    }
    .tab-transition-enter-active {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 300ms, transform 300ms;
    }
    .tab-transition-exit {
      opacity: 1;
    }
    .tab-transition-exit-active {
      opacity: 0;
      transform: translateY(-20px);
      transition: opacity 300ms, transform 300ms;
    }
    
    /* Form validation styles */
    .form-error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .input-error {
      border-color: #dc3545 !important;
    }
    
    .input-error:focus {
      box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .form-status {
      padding: 0.75rem 1.25rem;
      margin-bottom: 1rem;
      border-radius: 0.25rem;
    }
    
    .form-status-success {
      background-color: #d4edda;
      border-color: #c3e6cb;
      color: #155724;
    }
    
    .form-status-error {
      background-color: #f8d7da;
      border-color: #f5c6cb;
      color: #721c24;
    }
`

  // Add this to the useEffect that adds styles
  useEffect(() => {
    // Add the styles to the document
    const styleElement = document.createElement("style")
    const styles = "" // Define styles variable
    const isSmartGrcPage = false // Define isSmartGrcPage variable
    const initParticles = () => {} // Define initParticles variable
    styleElement.innerHTML = styles + riskTabStyles // Add the risk tab styles
    document.head.appendChild(styleElement)

    // Initialize particles if not on SmartGRC page
    if (!isSmartGrcPage) {
      initParticles()
    }

    return () => {
      document.head.removeChild(styleElement)
      const canvas = document.getElementById("navbar-particles")
      if (canvas) {
        canvas.remove()
      }
    }
  }, [])

  const [activeApproachTab, setActiveApproachTab] = useState("methodology")

  // CTA Buttons and Demo Form State
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [demoFormData, setDemoFormData] = useState({
    firstName: "",
    titleDesignation: "",
    organization: "",
    email: "",
    phoneNumber: "",
  })
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
    setSubmitStatus(null)

    try {
      // Submit to your Express backend
      const response = await fetch("https://lissomsoft.onrender.com/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...demoFormData,
          sheet: "Sheet4", // Specify Sheet 4
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

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
        setSubmitStatus({
          success: false,
          message: data.message || "There was an error submitting the form. Please try again.",
        })
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
      {/* Hero Section with rotating images */}
      <section
        id="mysmartgrc-overview"
        ref={overviewRef}
        className="hero-section bg-dark text-white position-relative"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
        data-section="mysmartgrc-overview"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="fw-bolder mb-3">Instil Resilience, and Stay Compliant with MySmartGRC</h1>
                <p className="lead mb-4">Reduce risks, enhance performance, and ensure compliance.</p>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative" style={{ height: "400px" }}>
                {heroImages.map((image, index) => (
                  <AnimatePresence key={index} mode="wait">
                    {currentHeroImage === index && (
                      <motion.div
                        className="position-absolute w-100 h-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="img-fluid rounded shadow"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}

                {/* Image indicators */}
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex">
                  {heroImages.map((_, index) => (
                    <motion.button
                      key={index}
                      className="btn btn-sm rounded-circle mx-1"
                      style={{
                        width: "12px",
                        height: "12px",
                        padding: 0,
                        background: currentHeroImage === index ? "#0077b6" : "rgba(255,255,255,0.5)",
                        border: "none",
                      }}
                      onClick={() => setCurrentHeroImage(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="position-absolute bottom-0 end-0"
          style={{
            width: "50%",
            height: "5px",
            background: "linear-gradient(90deg, #0077b6, #00a8e8)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "50%" }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container py-3">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="fw-bold mb-4">Navigate Business Risks with Confidence.</h2>
                <h3 className="h4 mb-4">MySmartGRC - Your Shield in a Dynamic Business Arena</h3>
                <p className="mb-4">
                  MySmartGRC transforms risk assessment, streamlines collaboration, and provides a consolidated source
                  of truth for navigating regulatory challenges. Propelled by an intuitive dashboard and versatile
                  report templates, it adapts to an organization's high-level/low-level risk drivers.
                </p>
                <p className="mb-4">
                  Aligned with regulatory standards such as Basel, COSO, and ISO, MySmartGRC caters to the enterprise
                  landscape spanning Banking, Manufacturing, Green Energy, Infrastructure, Construction, Healthcare, IT,
                  and more. Recent inclusions, like third-party risk analysis and predictive analytics within risk
                  tolerance limits for seamless business continuity.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-6">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-center mb-4">
                      Fill out the form to get started on optimizing your risk strategy today!
                    </h4>
                    
                    {/* Form status message */}
                    {formSubmitStatus && (
                      <div className={`form-status ${formSubmitStatus.success ? 'form-status-success' : 'form-status-error'}`}>
                        {formSubmitStatus.message}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className={`form-control ${formErrors.name ? 'input-error' : ''}`}
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                        {formErrors.name && <div className="form-error">{formErrors.name}</div>}
                      </div>
                      <div className="mb-3">
                        <input
                          type="tel"
                          className={`form-control ${formErrors.phone ? 'input-error' : ''}`}
                          placeholder="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                        {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className={`form-control ${formErrors.company ? 'input-error' : ''}`}
                          placeholder="Company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                        {formErrors.company && <div className="form-error">{formErrors.company}</div>}
                      </div>
                      <div className="mb-3">
                        <input
                          type="email"
                          className={`form-control ${formErrors.email ? 'input-error' : ''}`}
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                      </div>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Message"
                          rows="3"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className={`form-check-input ${formErrors.agreeTerms ? 'input-error' : ''}`}
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="agreeTerms">
                          I agree with Lissomsoft's{" "}
                          <a href="/terms" className="text-primary">
                            Terms of Use
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-primary">
                            Privacy Policy
                          </a>
                        </label>
                        {formErrors.agreeTerms && <div className="form-error">{formErrors.agreeTerms}</div>}
                      </div>
                      <motion.div className="text-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button 
                          type="submit" 
                          className="btn btn-primary px-4 py-2"
                          disabled={formSubmitting}
                        >
                          {formSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Tabs */}
      <section
        ref={servicesRef}
        className="py-5 bg-light"
        id="services-risk-assessment"
        data-section="services-risk-assessment"
      >
        <div className="container py-3">
          <motion.div
            className="row mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-12 text-center mb-4">
              <h2 className="fw-bold">Risk Management Solutions</h2>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <div className="risk-management-tabs">
                <button
                  className={`risk-tab-button ${activeTab === "operational-risk" ? "active" : ""}`}
                  onClick={() => setActiveTab("operational-risk")}
                >
                  <span>Operational Risk</span>
                </button>
                <button
                  className={`risk-tab-button ${activeTab === "vendor-risk" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("vendor-risk")
                    scrollToSection(vendorRiskRef)
                  }}
                  id="services-vendor"
                  data-section="services-vendor"
                >
                  <span>Vendor Risk/Third Party Risk</span>
                </button>
                <button
                  className={`risk-tab-button ${activeTab === "it-cyber-risk" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("it-cyber-risk")
                    scrollToSection(itRiskRef)
                  }}
                  id="services-it"
                  data-section="services-it"
                >
                  <span>IT/Cyber Risk</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <AnimatePresence mode="wait">
                {activeTab === "operational-risk" && (
                  <motion.div
                    key="operational-risk"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="tab-content"
                  >
                    <img
                      src="https://lissomsoft.com/smart-grc/assets/tab/operational-risk.jpg"
                      alt="Operational Risk"
                      className="img-fluid rounded shadow mb-3"
                    />
                  </motion.div>
                )}
                {activeTab === "vendor-risk" && (
                  <motion.div
                    key="vendor-risk"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="tab-content"
                    ref={vendorRiskRef}
                  >
                    <img
                      src="https://lissomsoft.com/smart-grc/assets/tab/vendor-risk.jpg"
                      alt="Vendor Risk"
                      className="img-fluid rounded shadow mb-3"
                    />
                  </motion.div>
                )}
                {activeTab === "it-cyber-risk" && (
                  <motion.div
                    key="it-cyber-risk"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="tab-content"
                    ref={itRiskRef}
                  >
                    <img
                      src="https://lissomsoft.com/smart-grc/assets/tab/cyber-risk.jpg"
                      alt="IT/Cyber Risk"
                      className="img-fluid rounded shadow mb-3"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="col-md-6">
              <AnimatePresence mode="wait">
                {activeTab === "operational-risk" && (
                  <motion.div
                    key="operational-risk-text"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="tab-content"
                  >
                    <h3 className="mb-3">Operational Risk Management</h3>
                    <p>
                      Lissomsoft offers a suite of applications to aid businesses in identifying risk, streamlining
                      compliance tasks. The solution provides intuitive dashboards, seamless collaboration between
                      stakeholders and delivers a single source of truth for navigating regulatory complexities.
                    </p>
                  </motion.div>
                )}
                {activeTab === "vendor-risk" && (
                  <motion.div
                    key="vendor-risk-text"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="tab-content"
                  >
                    <h3 className="mb-3">Vendor Risk Management</h3>
                    <p>
                      In today's dynamic business environment, partnering with third parties is crucial. Prioritizing
                      risk mitigation is essential. Meet Lissomsoft's Third-Party Risk Management Solution – your
                      reliable partner. Safeguard your business reputation with automated governance and compliance,
                      shielding against potential threats.
                    </p>
                  </motion.div>
                )}
                {activeTab === "it-cyber-risk" && (
                  <motion.div
                    key="it-cyber-risk-text"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="tab-content"
                  >
                    <h3 className="mb-3">IT/Cyber Risk Management</h3>
                    <p>
                      Cyber risk encompasses the potential for data loss or exposure resulting from cyberattacks such as
                      phishing, malware, and identity theft. These breaches exploit vulnerabilities in IT systems,
                      leading to data, operational, and financial losses for organizations. Our Cybersecurity Solution
                      is tailored to safeguard the internet-connected systems of enterprises, including hardware,
                      software, and data, from these evolving cyber threats.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Accordion */}
      <section className="py-5 bg-light">
        <div className="container py-3">
          <motion.div
            className="row mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-12">
              <h2 className="fw-bold text-center">Adherence to our Risk Framework</h2>
            </div>
          </motion.div>

          <div className="row">
            <div className="col-12">
              <div className="accordion">
                {/* Operational Risk */}
                <motion.div
                  className="accordion-item mb-3 border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div
                    className={`accordion-header p-3 d-flex justify-content-between align-items-center ${
                      expandedItems["operational-risk"] ? "bg-primary text-white" : "bg-light"
                    }`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      background: expandedItems["operational-risk"]
                        ? "linear-gradient(90deg, #0077b6, #00a8e8)"
                        : "#f8f9fa",
                    }}
                    onClick={() => toggleItem("operational-risk")}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <h5 className="mb-0">Control Library</h5>
                    <motion.i
                      className={`fas fa-chevron-${expandedItems["operational-risk"] ? "up" : "down"}`}
                      animate={{
                        rotate: expandedItems["operational-risk"] ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.i>
                  </motion.div>
                  <AnimatePresence>
                    {expandedItems["operational-risk"] && (
                      <motion.div
                        className="accordion-body p-3 border border-top-0"
                        style={{ borderRadius: "0 0 8px 8px" }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>
                          Simplify compliance and bolster cybersecurity with our robust library, meticulously designed
                          to meet the stringent requirements of ISO 27001 and NIST frameworks
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Risk Register */}
                <motion.div
                  className="accordion-item mb-3 border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className={`accordion-header p-3 d-flex justify-content-between align-items-center ${
                      expandedItems["risk-register"] ? "bg-primary text-white" : "bg-light"
                    }`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      background: expandedItems["risk-register"]
                        ? "linear-gradient(90deg, #0077b6, #00a8e8)"
                        : "#f8f9fa",
                    }}
                    onClick={() => toggleItem("risk-register")}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <h5 className="mb-0">Asset Master</h5>
                    <motion.i
                      className={`fas fa-chevron-${expandedItems["risk-register"] ? "up" : "down"}`}
                      animate={{
                        rotate: expandedItems["risk-register"] ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.i>
                  </motion.div>
                  <AnimatePresence>
                    {expandedItems["risk-register"] && (
                      <motion.div
                        className="accordion-body p-3 border border-top-0"
                        style={{ borderRadius: "0 0 8px 8px" }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>
                          Effectively manage and safeguard your digital assets. Seamlessly organize, track, and secure
                          assets with precision. Elevate your cybersecurity posture and ensure comprehensive asset
                          management with our cutting-edge solution.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Incident Management */}
                <motion.div
                  className="accordion-item mb-3 border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div
                    className={`accordion-header p-3 d-flex justify-content-between align-items-center ${
                      expandedItems["incident-management"] ? "bg-primary text-white" : "bg-light"
                    }`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      background: expandedItems["incident-management"]
                        ? "linear-gradient(90deg, #0077b6, #00a8e8)"
                        : "#f8f9fa",
                    }}
                    onClick={() => toggleItem("incident-management")}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <h5 className="mb-0">Risk Assessment</h5>
                    <motion.i
                      className={`fas fa-chevron-${expandedItems["incident-management"] ? "up" : "down"}`}
                      animate={{
                        rotate: expandedItems["incident-management"] ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.i>
                  </motion.div>
                  <AnimatePresence>
                    {expandedItems["incident-management"] && (
                      <motion.div
                        className="accordion-body p-3 border border-top-0"
                        style={{ borderRadius: "0 0 8px 8px" }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>
                          Conduct thorough evaluations of potential threats, vulnerabilities, and their impact on your
                          digital infrastructure. Identify and prioritize risks, enabling informed decision-making and
                          strategic mitigation.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Loss Database */}
                <motion.div
                  className="accordion-item mb-3 border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.div
                    className={`accordion-header p-3 d-flex justify-content-between align-items-center ${
                      expandedItems["loss-database"] ? "bg-primary text-white" : "bg-light"
                    }`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      background: expandedItems["loss-database"]
                        ? "linear-gradient(90deg, #0077b6, #00a8e8)"
                        : "#f8f9fa",
                    }}
                    onClick={() => toggleItem("loss-database")}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <h5 className="mb-0">Control Testing</h5>
                    <motion.i
                      className={`fas fa-chevron-${expandedItems["loss-database"] ? "up" : "down"}`}
                      animate={{
                        rotate: expandedItems["loss-database"] ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.i>
                  </motion.div>
                  <AnimatePresence>
                    {expandedItems["loss-database"] && (
                      <motion.div
                        className="accordion-body p-3 border border-top-0"
                        style={{ borderRadius: "0 0 8px 8px" }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>
                          Rigorously assess the effectiveness of security controls through comprehensive testing.
                          Identify vulnerabilities, ensure regulatory compliance, and fortify your digital
                          infrastructure.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* KRI */}
                <motion.div
                  className="accordion-item mb-3 border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div
                    className={`accordion-header p-3 d-flex justify-content-between align-items-center ${
                      expandedItems["kri"] ? "bg-primary text-white" : "bg-light"
                    }`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      background: expandedItems["kri"] ? "linear-gradient(90deg, #0077b6, #00a8e8)" : "#f8f9fa",
                    }}
                    onClick={() => toggleItem("kri")}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <h5 className="mb-0">Mitigation Plan</h5>
                    <motion.i
                      className={`fas fa-chevron-${expandedItems["kri"] ? "up" : "down"}`}
                      animate={{ rotate: expandedItems["kri"] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    ></motion.i>
                  </motion.div>
                  <AnimatePresence>
                    {expandedItems["kri"] && (
                      <motion.div
                        className="accordion-body p-3 border border-top-0"
                        style={{ borderRadius: "0 0 8px 8px" }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>
                          Proactively address and manage identified risks, vulnerabilities, and potential threats.
                          Tailor mitigation strategies to your specific cybersecurity needs, ensuring a resilient
                          defense.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach with two sections */}
      <section id="our-approach" ref={approachRef} className="py-5" data-section="our-approach">
        <div className="container py-3">
          <motion.div
            className="row mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-12 text-center">
              <h2 className="fw-bold">Our Approach & Select Engagements</h2>
            </div>
          </motion.div>

          <div className="row mb-5">
            <div className="col-12 mb-4">
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <motion.button
                  className={`btn ${activeApproachTab === "methodology" ? "btn-primary" : "btn-outline-primary"} me-3`}
                  onClick={() => {
                    setActiveApproachTab("methodology")
                    scrollToSection(methodologyRef)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    backgroundColor: activeApproachTab === "methodology" ? "#0077b6" : "transparent",
                    color: activeApproachTab === "methodology" ? "white" : "#0077b6",
                    boxShadow: activeApproachTab === "methodology" ? "0 4px 15px rgba(0, 119, 182, 0.3)" : "none",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Our Approach
                </motion.button>
                <motion.button
                  className={`btn ${activeApproachTab === "implementation" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => {
                    setActiveApproachTab("implementation")
                    // Make sure we're scrolling to the correct element
                    const implementationSection = document.getElementById("approach-implementation")
                    if (implementationSection) {
                      const headerHeight = 150
                      const elementPosition = implementationSection.getBoundingClientRect().top + window.scrollY
                      const offsetPosition = elementPosition - headerHeight

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      })

                      // Highlight the section
                      implementationSection.classList.add("highlight-section")
                      setTimeout(() => {
                        implementationSection.classList.remove("highlight-section")
                      }, 2000)
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    backgroundColor: activeApproachTab === "implementation" ? "#0077b6" : "transparent",
                    color: activeApproachTab === "implementation" ? "white" : "#0077b6",
                    boxShadow: activeApproachTab === "implementation" ? "0 4px 15px rgba(0, 119, 182, 0.3)" : "none",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Implementation/Deployment
                </motion.button>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          <AnimatePresence mode="wait">
            {activeApproachTab === "methodology" && (
              <motion.div
                className="row mb-5"
                id="approach-methodology"
                ref={methodologyRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6 }}
                data-section="approach-methodology"
                key="methodology-tab"
              >
                <div className="col-md-6 mb-4 mb-md-0">
                  <div className="h-100 d-flex flex-column justify-content-center">
                    <h3 className="mb-3">Methodology</h3>
                    <p>Our comprehensive risk management methodology follows a structured approach that includes:</p>
                    <ul className="list-group list-group-flush">
                      <motion.li
                        className="list-group-item bg-transparent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        Risk identification and assessment
                      </motion.li>
                      <motion.li
                        className="list-group-item bg-transparent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        Risk analysis and prioritization
                      </motion.li>
                      <motion.li
                        className="list-group-item bg-transparent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        Risk treatment and mitigation
                      </motion.li>
                      <motion.li
                        className="list-group-item bg-transparent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        Risk Continuous monitoring and review
                      </motion.li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="https://lissomsoft.com/smart-grc/assets/approch/sgrc-approach.jpg"
                      alt="MySmartGRC Approach"
                      className="img-fluid rounded shadow"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeApproachTab === "implementation" && (
              <motion.div
                className="row"
                id="approach-implementation"
                ref={implementationRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6 }}
                data-section="approach-implementation"
                key="implementation-tab"
              >
                <div className="col-12 mb-5">
                  <h3 className="text-center mb-4">MySmartGRC Deployment Options</h3>
                  <div className="row">
                    {deploymentOptions.map((option, index) => (
                      <motion.div
                        className="col-md-6 mb-4"
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <motion.div
                          className="card h-100 border-0 shadow-sm"
                          whileHover={{
                            y: -10,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div className="bg-primary rounded-circle p-3 me-3 text-white">
                                <i className={`fas fa-${option.icon} fa-2x`}></i>
                              </div>
                              <h4 className="card-title mb-0">{option.title}</h4>
                            </div>
                            <p className="card-text">{option.description}</p>
                            <div className="mt-3">
                              <strong>Benefits:</strong> {option.benefits}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features with rotating content */}
      <section id="mysmartgrc-features" ref={featuresRef} className="py-5 bg-light" data-section="mysmartgrc-features">
        <div className="container py-3">
          <motion.div
            className="row mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-12 text-center">
              <h2 className="fw-bold">MySmartGRC - Features</h2>
            </div>
          </motion.div>

          <motion.div
            className="row mb-5 justify-content-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="col-md-8 text-center">
              <div className="position-relative" style={{ height: "300px", marginBottom: "20px" }}>
                {features.map((feature, index) => (
                  <AnimatePresence key={index} mode="wait">
                    {currentFeature === index && (
                      <motion.div
                        className="position-absolute w-100 h-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                      >
                        <img
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          className="img-fluid rounded shadow"
                          style={{
                            width: "100%",
                            height: "125%",
                            objectFit: "unset",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              <div className="position-relative" style={{ minHeight: "100px", margin: "100px 0px 0px 0px" }}>
                {features.map((feature, index) => (
                  <AnimatePresence key={index} mode="wait">
                    {currentFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                      >
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              {/* Feature indicators */}
              <div className="d-flex justify-content-center mt-3">
                {features.map((_, index) => (
                  <motion.button
                    key={index}
                    className="btn btn-sm rounded-circle mx-1"
                    style={{
                      width: "12px",
                      height: "12px",
                      padding: 0,
                      background: currentFeature === index ? "#0077b6" : "#e0e0e0",
                      border: "none",
                    }}
                    onClick={() => setCurrentFeature(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="row"
            id="benefits"
            ref={benefitsRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            data-section="benefits"
          >
            <div className="col-12 text-center mb-4">
              <h3>MySmartGRC - Helps in many ways</h3>
            </div>
          </motion.div>

          <div className="row justify-content-center">
            {helpIcons.map((item, index) => (
              <motion.div
                className="col-md-2 col-sm-4 mb-4 text-center"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <motion.div
                  className="feature-icon-container mb-3 mx-auto"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 15px ${item.color}33`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: `0 8px 25px ${item.color}55`,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <i className={`fas fa-${item.icon} fa-2x`} style={{ color: item.color }}></i>
                </motion.div>
                <h5 className="small">{item.title}</h5>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Experts with flipping cards */}
      <section
        id="mysmartgrc-experts"
        className="py-5"
        style={{
          background: "linear-gradient(90deg, #0077b6 0%, #00a8e8 100%)",
        }}
        ref={expertsRef}
        data-section="experts"
      >
        <div className="container py-3">
          <motion.div
            className="row mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-12 text-center">
              <h2 className="fw-bold text-white">MySmartGRC Industry Experts</h2>
            </div>
          </motion.div>

          <div className="row justify-content-center">
            {experts.map((expert, index) => (
              <motion.div
                className="col-md-3 col-sm-6 mb-4 text-center"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
              >
                <div className="position-relative" style={{ height: "320px", perspective: "1000px" }}>
                  <motion.div
                    className="card border-0 shadow-sm h-100 w-100"
                    style={{
                      position: "absolute",
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      rotateY: flippedCard === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="card-body d-flex flex-column justify-content-center">
                      <motion.div
                        className="mb-3"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                      >
                        <img
                          src={expert.image || "/placeholder.svg"}
                          alt={expert.name}
                          className="img-fluid rounded-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </motion.div>
                      <h5>{expert.title}</h5>
                      <p className="small">{expert.name}</p>
                      <motion.button
                        className="btn btn-sm btn-outline-primary mt-auto mx-auto"
                        onClick={() => setFlippedCard(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Back of card */}
                  <motion.div
                    className="card border-0 shadow-sm h-100 w-100"
                    style={{
                      position: "absolute",
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                    }}
                    animate={{
                      rotateY: flippedCard === index ? 0 : -180,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="card-body text-white d-flex flex-column">
                      <h5 className="mb-3">{expert.name}</h5>
                      <p className="small mb-3">{expert.bio}</p>
                      <h6 className="mb-2">Areas of Expertise:</h6>
                      <ul className="list-unstyled mb-4">
                        {expert.expertise.map((item, i) => (
                          <li key={i} className="mb-1">
                            <i className="fas fa-check-circle me-2"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        className="btn btn-sm btn-light mt-auto"
                        onClick={() => setFlippedCard(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Back
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-5 bg-dark text-white" data-section="contact">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
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
                onClick: () => window.open("/contact", "_blank"),
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

                  <h4 className="text-center mb-4" style={{color:"#333"}}>
                    Fill out the form below to get started on optimizing your risk strategy today!
                  </h4>

                  <form onSubmit={handleDemoSubmit} style={{color:"black"}}>
                    <div className="mb-3">
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
        </div>
      </section>
    </>
  )
}

export default MySmartGrcPage
