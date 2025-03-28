"use client"

import { Link, useLocation } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState, useRef } from "react"

const Footer = () => {
  const controls = useAnimation()
  const location = useLocation()
  const isSmartGrcPage = location.pathname.includes("smart-grc") || location.pathname.includes("mysmartgrc")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const footerRef = useRef(null)
  const [footerRect, setFooterRect] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const updateFooterRect = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect()
        setFooterRect({
          top: rect.top + window.scrollY,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        })
      }
    }

    updateFooterRect()
    window.addEventListener("resize", updateFooterRect)
    window.addEventListener("scroll", updateFooterRect)

    return () => {
      window.removeEventListener("resize", updateFooterRect)
      window.removeEventListener("scroll", updateFooterRect)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect()
        if (e.clientY >= rect.top && e.clientY <= rect.bottom && e.clientX >= rect.left && e.clientX <= rect.right) {
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          })
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Add this CSS before the export
  const styles = `
    .footer {
      background-color: #051923;
      color: #fff;
      position: relative;
      overflow: hidden;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
    }
    
    .footer-content {
      padding: 80px 20px 40px;
      position: relative;
      z-index: 2;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .footer-top-wave {
      position: absolute;
      top: -2px;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
      transform: rotate(180deg);
      filter: drop-shadow(0 -5px 5px rgba(0, 119, 182, 0.2));
    }
    
    .footer-bottom-wave {
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
      filter: drop-shadow(0 5px 5px rgba(0, 119, 182, 0.2));
    }
    
    .footer-glow {
      position: absolute;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(0, 119, 182, 0.4) 0%, rgba(0, 119, 182, 0) 70%);
      border-radius: 50%;
      filter: blur(50px);
      opacity: 0.5;
      pointer-events: none;
      z-index: 1;
      transition: all 0.3s ease;
    }
    
    .logo-box {
      background: linear-gradient(135deg, #0077b6, #00a8e8);
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 119, 182, 0.4);
      position: relative;
      overflow: hidden;
      transition: all 0.5s ease;
    }
    
    .logo-box:before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transform: rotate(45deg);
      animation: shine 3s infinite;
    }
    
    @keyframes shine {
      0% {
        transform: translateX(-100%) rotate(45deg);
      }
      100% {
        transform: translateX(100%) rotate(45deg);
      }
    }
    
    .logo-box span {
      color: #ffc107;
      font-weight: bold;
      font-size: 24px;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    
    .footer-heading {
      position: relative;
      padding-bottom: 15px;
      font-weight: 600;
      letter-spacing: 1px;
      background: linear-gradient(90deg, #ffffff, #e0e0e0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
    
    .footer-heading:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: 50px;
      background: linear-gradient(90deg, #0077b6, #00a8e8);
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 119, 182, 0.5);
    }
    
    .footer-links li {
      margin-bottom: 12px;
      list-style-type: none;
    }
    
    .footer-links li a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
      position: relative;
      padding-left: 0;
      font-weight: 500;
      font-size: 0.95rem;
    }
    
    .footer-links li a:hover {
      color: #fff;
      transform: translateX(8px);
      text-shadow: 0 0 10px rgba(0, 119, 182, 0.5);
    }
    
    .footer-links li a:before {
      content: '→';
      position: absolute;
      left: -20px;
      opacity: 0;
      transition: all 0.3s ease;
      color: #00a8e8;
    }
    
    .footer-links li a:hover:before {
      opacity: 1;
      left: -15px;
    }
    
    .footer-links li a:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: linear-gradient(90deg, #0077b6, #00a8e8);
      transition: width 0.3s ease;
    }
    
    .footer-links li a:hover:after {
      width: 100%;
    }
    
    .social-icons {
      display: flex;
      gap: 15px;
    
    }
    
    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      color: white;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      text-decoration: none;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .social-icon:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #0077b6, #00a8e8);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: -1;
    }
    
    .social-icon:hover {
      transform: translateY(-8px) rotate(360deg);
      color: white;
      box-shadow: 0 10px 20px rgba(0, 119, 182, 0.4);
    }
    
    .social-icon:hover:before {
      opacity: 1;
    }
    
    .social-icon i {
      position: relative;
      z-index: 1;
      font-size: 18px;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      color: rgba(255, 255, 255, 0.7);
      transition: all 0.3s ease;
      position: relative;
      padding-left: 30px;
      font-size: 0.95rem;
      word-break: break-word;
    }
    
    .contact-item:hover {
      color: white;
      transform: translateX(5px);
    }
    
    .contact-item i {
      position: absolute;
      left: 0;
      top: 5px;
      color: #0077b6;
      transition: all 0.3s ease;
    }
    
    .contact-item:hover i {
      color: #00a8e8;
      transform: scale(1.2);
    }
    
    .contact-button {
      position: relative;
      display: inline-block;
      padding: 12px 30px;
      background: linear-gradient(45deg, #0077b6, #00a8e8);
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 8px 20px rgba(0, 119, 182, 0.3);
      overflow: hidden;
      z-index: 1;
      text-align: center;
      white-space: nowrap;
    }
    
    .contact-button:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #00a8e8, #0077b6);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: -1;
    }
    
    .contact-button:after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transform: rotate(45deg);
      transition: all 0.5s ease;
      opacity: 0;
    }
    
    .contact-button:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 15px 30px rgba(0, 119, 182, 0.5);
      color: white;
    }
    
    .contact-button:hover:before {
      opacity: 1;
    }
    
    .contact-button:hover:after {
      animation: shine 1.5s infinite;
      opacity: 1;
    }
    
    .footer-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      margin: 30px 0;
      position: relative;
    }
    
    .footer-divider:before {
      content: '';
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      background: #0077b6;
      border-radius: 50%;
      box-shadow: 0 0 10px #0077b6, 0 0 20px #0077b6;
    }
    
    .footer-bottom-links {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    
    .footer-bottom-link {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .footer-bottom-link:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: #00a8e8;
      transition: width 0.3s ease;
    }
    
    .footer-bottom-link:hover {
      color: white;
      text-shadow: 0 0 10px rgba(0, 168, 232, 0.5);
    }
    
    .footer-bottom-link:hover:after {
      width: 100%;
    }
    
    .copyright-text {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
    }
    
    .particles-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
    }
    
    .particle {
      position: absolute;
      width: 3px;
      height: 3px;
      background: rgba(0, 119, 182, 0.5);
      border-radius: 50%;
      pointer-events: none;
    }
    
    @keyframes float-up {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    /* Responsive styles */
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
    }
    
    .col-lg-4, .col-lg-2, .col-md-6 {
      position: relative;
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
    }
    
    /* Medium devices (tablets) */
    @media (min-width: 768px) {
      .col-md-6 {
        flex: 0 0 50%;
        max-width: 50%;
      }
      
      .text-md-start {
        text-align: left !important;
      }
      
      .text-md-end {
        text-align: right !important;
      }
      
      .mt-md-0 {
        margin-top: 0 !important;
      }
    }
    
    /* Large devices (desktops) */
    @media (min-width: 992px) {
      .col-lg-4 {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
      }
      
      .col-lg-2 {
        flex: 0 0 16.666667%;
        max-width: 16.666667%;
      }
      
      .mb-lg-0 {
        margin-bottom: 0 !important;
      }
    }
    
    /* Small devices (landscape phones and down) */
    @media (max-width: 767.98px) {
      .footer-content {
        padding: 60px 15px 30px;
      }
      
      .footer-heading {
        text-align: center;
        margin-top: 1.5rem;
      }
      
      .footer-heading:after {
        left: 50%;
        transform: translateX(-50%);
      }
      
      .footer-links {
        text-align: center;
        padding-left: 0;
      }
      
      .footer-links li a:hover {
        transform: none;
      }
      
      .footer-links li a:before {
        display: none;
      }
      
      .contact-item {
        padding-left: 0;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
      
      .contact-item i {
        position: static;
        margin-right: 10px;
      }
      
      .social-icons {
        justify-content: center;
      }
      
      .text-center {
        text-align: center !important;
      }
      
      .mt-3 {
        margin-top: 1rem !important;
      }
      
      .mb-4 {
        margin-bottom: 1.5rem !important;
      }
      
      .footer-bottom-links {
        justify-content: center;
        margin-top: 1rem;
      }
      
      .logo-box {
        margin: 0 auto;
      }
      
      .d-flex.align-items-center.mb-4 {
        justify-content: center;
        flex-direction: column;
        text-align: center;
      }
      
      .d-flex.align-items-center.mb-4 span {
        margin-top: 0.5rem;
        margin-left: 0 !important;
      }
      
      .contact-button {
        display: block;
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
      }
    }
    
    /* Extra small devices */
    @media (max-width: 575.98px) {
      .footer-content {
        padding: 40px 10px 20px;
      }
      
      .social-icon {
        width: 40px;
        height: 40px;
      }
      
      .logo-box {
        width: 50px;
        height: 50px;
      }
      
      .footer-heading {
        font-size: 1.1rem;
      }
      
      .contact-item {
        font-size: 0.9rem;
      }
      
      .footer-links li a {
        font-size: 0.9rem;
      }
      
      .copyright-text {
        font-size: 12px;
      }
      
      .footer-bottom-link {
        font-size: 12px;
      }
    }
    
    /* Utility classes */
    .list-unstyled {
      padding-left: 0;
      list-style: none;
    }
    
    .text-center {
      text-align: center;
    }
    
    .text-light {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .mb-0 {
      margin-bottom: 0 !important;
    }
    
    .mb-2 {
      margin-bottom: 0.5rem !important;
    }
    
    .mb-3 {
      margin-bottom: 1rem !important;
    }
    
    .mb-4 {
      margin-bottom: 1.5rem !important;
    }
    
    .mt-3 {
      margin-top: 1rem !important;
    }
    
    .mt-4 {
      margin-top: 1.5rem !important;
    }
    
    .ms-2 {
      margin-left: 0.5rem !important;
    }
    
    .d-flex {
      display: flex;
    }
    
    .align-items-center {
      align-items: center;
    }
    
    .align-items-start {
      align-items: flex-start;
    }
    
    .justify-content-center {
      justify-content: center;
    }
    
    .fw-bold {
      font-weight: bold;
    }
    
    .container {
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    
    @media (min-width: 576px) {
      .container {
        max-width: 540px;
      }
    }
    
    @media (min-width: 768px) {
      .container {
        max-width: 720px;
      }
    }
    
    @media (min-width: 992px) {
      .container {
        max-width: 960px;
      }
    }
    
    @media (min-width: 1200px) {
      .container {
        max-width: 1140px;
      }
    }
  `

  // Add this before the return statement
  useEffect(() => {
    // Add the styles to the document
    const styleElement = document.createElement("style")
    styleElement.innerHTML = styles
    document.head.appendChild(styleElement)

    // Create particles
    createParticles()

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const createParticles = () => {
    const container = document.createElement("div")
    container.className = "particles-container"

    if (footerRef.current) {
      footerRef.current.appendChild(container)

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"

        // Random position
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        particle.style.left = `${posX}%`
        particle.style.bottom = `${posY}%`

        // Random size
        const size = Math.random() * 4 + 1
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1

        // Animation
        const duration = Math.random() * 20 + 10
        particle.style.animation = `float-up ${duration}s linear infinite`
        particle.style.animationDelay = `${Math.random() * 10}s`

        container.appendChild(particle)
      }
    }
  }

  // Reduce text length for mobile displays
  const getResponsiveText = (text, maxLength = 100) => {
    if (window.innerWidth <= 767.98 && text.length > maxLength) {
      return text.substring(0, maxLength) + "..."
    }
    return text
  }

  function handleHashLinkClick(e, hashId) {
    e.preventDefault()
    const element = document.getElementById(hashId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return isSmartGrcPage ? (
    // SmartGRC Footer - Styled like the main footer
    <footer className="footer" ref={footerRef}>
      <div
        className="footer-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      <div className="footer-top-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0077b6"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container footer-content">
        <div className="row">
          <motion.div
            className="col-lg-4 mb-4 mb-lg-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="d-flex align-items-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="logo-box">
                <img
                  src="https://lissomsoft.com/smart-grc/assets/logo/My%20Smart%20GRC-Logo%20(250x127%20px)1.png"
                  alt="MySmartGRC Logo"
                  style={{ width: "60px", height: "auto" }}
                />
              </div>
              <span className="ms-2 fw-bold text-white">My Smart GRC</span>
            </motion.div>
            <p className="text-light">
              MySmartGRC is a comprehensive risk management solution that helps organizations identify, assess, and
              mitigate risks effectively.
            </p>
            <div className="social-icons mt-4">
              {[
                {
                  platform: "linkedin",
                  url: "https://www.linkedin.com/company/lissomsoft-technologies/",
                },
                {
                  platform: "facebook",
                  url: "https://www.facebook.com/lissomsoft",
                },
                {
                  platform: "whatsapp",
                  url: "https://api.whatsapp.com/send?phone=9361829552",
                },
                {
                  platform: "youtube",
                  url: "https://www.youtube.com/@lissomsoft-therisktechcomp2928/featured",
                },
              ].map((item, index) => (
                <motion.a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.platform}
                  className="social-icon"
                  whileHover={{ y: -8, rotate: 360 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <i className={`fab fa-${item.platform}`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="col-lg-2 col-md-6 mb-4 mb-md-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h5 className="text-white mb-4 footer-heading">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              {[
                { name: "Overview", path: "#mysmartgrc-overview" },
                { name: "Features", path: "#mysmartgrc-features" },
                { name: "Benefits", path: "#benefits" },
                { name: "Contact", path: "#contact" },
              ].map((link, linkIndex) => (
                <motion.li
                  key={link.name}
                  className="mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3 + 0.05 * linkIndex,
                    duration: 0.5,
                  }}
                  viewport={{ once: true }}
                >
                  <a href={link.path} onClick={(e) => handleHashLinkClick(e, link.path)}>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="col-lg-2 col-md-6 mb-4 mb-md-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h5 className="text-white mb-4 footer-heading">Legal</h5>
            <ul className="list-unstyled footer-links">
              {[
                { name: "Privacy Policy", path: "/privacypolicy" },
                { name: "Terms of Use", path: "/termsofuse" },
              ].map((link, linkIndex) => (
                <motion.li
                  key={link.name}
                  className="mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3 + 0.05 * linkIndex,
                    duration: 0.5,
                  }}
                  viewport={{ once: true }}
                >
                  <Link to={link.path}>{link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="col-lg-4 col-md-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h5 className="text-white mb-4 footer-heading">Contact Us</h5>
            <ul className="list-unstyled">
              {[
                {
                  icon: "map-marker-alt",
                  text: "5, Chakrapani Rd, Ramapuram, Chennai, Tamil Nadu 600032",
                },
                { icon: "phone", text: "+91 9361829552" },
                { icon: "envelope", text: "sales@lissomsoft.com" },
              ].map((item, index) => (
                <motion.li
                  key={item.icon}
                  className="mb-3 contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <i className={`fas fa-${item.icon}`}></i> {item.text}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/contact" className="contact-button">
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="footer-divider"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        />

        <div className="row align-items-center">
          <motion.div
            className="col-md-6 text-center text-md-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mb-0 copyright-text">© {new Date().getFullYear()} Lissomsoft. All rights reserved.</p>
          </motion.div>
          <motion.div
            className="col-md-6 text-center text-md-end mt-3 mt-md-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mb-0 copyright-text">Powered By Lissomsoft</p>
          </motion.div>
        </div>
      </div>

      <div className="footer-bottom-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0077b6"
            fillOpacity="0.2"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
    </footer>
  ) : (
    // Original Lissomsoft Footer with animations
    <footer className="footer" ref={footerRef}>
      <div
        className="footer-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      <div className="footer-top-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0077b6"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container footer-content">
        <div className="row">
          <motion.div
            className="col-lg-4 mb-4 mb-lg-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="d-flex align-items-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="logo-box">
                <img
                  src={require("../assets/LISSOMSOFT.png") || "/placeholder.svg"}
                  style={{ width: "70px", height: "45px" }}
                  alt="LISSOMSOFT Logo"
                />
              </div>
              <span className="ms-2 fw-bold text-white">LISSOMSOFT</span>
            </motion.div>
            <p className="text-light">
              Lissomsoft provides innovative solutions for business risk management, digital transformation, cloud
              services, and growth marketing.
            </p>
            <div className="social-icons mt-4">
              {[
                {
                  platform: "linkedin",
                  url: "https://www.linkedin.com/company/lissomsoft-technologies/ ",
                },
                {
                  platform: "facebook",
                  url: "https://www.facebook.com/lissomsoft",
                },
                {
                  platform: "whatsapp",
                  url: "https://api.whatsapp.com/send?phone=9361829552",
                },
                {
                  platform: "youtube",
                  url: "https://www.youtube.com/@lissomsoft-therisktechcomp2928/featured",
                },
              ].map((item, index) => (
                <motion.a
                  key={item.platform}
                  href={item.url}
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer"
                  aria-label={item.platform}
                  className="social-icon"
                  whileHover={{ y: -8, rotate: 360 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <i className={`fab fa-${item.platform}`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {[
            {
              title: "Solutions",
              links: [
                { name: "Risk Management", path: "/risk-management" },
                {
                  name: "Digital Transformation",
                  path: "/digital-transformation",
                },
                { name: "Cloud Services", path: "/cloud-services" },
                { name: "Growth Marketing", path: "/growth-marketing" },
              ],
            },
            {
              title: "Company",
              links: [
                { name: "About Us", path: "/about" },
                { name: "Our Team", path: "/about#team" },
                { name: "Careers", path: "/about#careers" },
                { name: "Partners", path: "/partners" },
              ],
            },
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="col-lg-2 col-md-6 mb-4 mb-md-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + 0.1 * sectionIndex, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h5 className="text-white mb-4 footer-heading">{section.title}</h5>
              <ul className="list-unstyled footer-links">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    className="mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + 0.05 * linkIndex,
                      duration: 0.5,
                    }}
                    viewport={{ once: true }}
                  >
                    <Link to={link.path}>{link.name}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            className="col-lg-4 col-md-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h5 className="text-white mb-4 footer-heading">Contact Us</h5>
            <ul className="list-unstyled ">
              {[
                {
                  icon: "map-marker-alt",
                  text: "5, Chakrapani Rd, Ramapuram, Narasinga Colony, Maduvinkarai, Guindy, Chennai, Tamil Nadu 600032",
                },
                { icon: "phone", text: "+91 9361829552" },
                { icon: "envelope", text: " sales@lissomsoft.com" },
              ].map((item, index) => (
                <motion.li
                  key={item.icon}
                  className="mb-3 contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <i className={`fas fa-${item.icon}`}></i> {item.text}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/contact" className="contact-button ">
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="footer-divider"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        />

        <div className="row align-items-center">
          <motion.div
            className="col-md-6 text-center text-md-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mb-0 copyright-text">© {new Date().getFullYear()} Lissomsoft. All rights reserved.</p>
          </motion.div>
          <motion.div
            className="col-md-6 text-center text-md-end mt-3 mt-md-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="footer-bottom-links">
              <Link to="/privacypolicy" className="footer-bottom-link">
                Privacy Policy
              </Link>
              <Link to="/termsofuse" className="footer-bottom-link">
                Terms of Use
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="footer-bottom-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0077b6"
            fillOpacity="0.2"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
    </footer>
  )
}

export default Footer

