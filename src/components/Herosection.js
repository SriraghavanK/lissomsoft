"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "./Herosection.css"

const HeroSection = ({ title, subtitle, buttonText, buttonLink, buttonOnClick, imageSrc, target, className }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const titleWords = typeof title === "string" ? title.split(" ") : []

  // Initialize the 3D effect and particles
  useEffect(() => {
    // Set loaded state after a short delay for entrance animation
    setTimeout(() => setIsLoaded(true), 100)

    // Mouse move handler for 3D effect
    const handleMouseMove = (e) => {
      if (!heroRef.current) return

      // Check if we're on mobile/tablet - disable 3D effect if window width is less than 992px
      if (window.innerWidth < 19922) {
        // Reset any transform to ensure stability on mobile
        if (heroRef.current) {
          heroRef.current.style.transform = "none"
        }
        return
      }

      const { clientX, clientY } = e
      const rect = heroRef.current.getBoundingClientRect()

      // Calculate mouse position relative to the center of the element
      const x = (clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (clientY - rect.top - rect.height / 2) / (rect.height / 2)

      mousePosition.current = { x, y }

      // Apply 3D rotation effect
      if (heroRef.current) {
        heroRef.current.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`
      }
    }

    // Add a resize handler to ensure 3D effects are disabled on mobile
    const handleResize = () => {
      if (window.innerWidth < 992 && heroRef.current) {
        heroRef.current.style.transform = "none"
      }
    }

    // Initialize particle animation
    const initParticles = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      // Set canvas size to match window
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      // Create particles
      const particles = []
      const particleCount = 100

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }

      // Draw and animate particles
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw particles
        particles.forEach((particle) => {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()

          // Move particles
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          // Connect particles that are close to each other
          particles.forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`
              ctx.lineWidth = 0.5
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          })
        })

        requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener("resize", resizeCanvas)
      }
    }

    // Word animation timing
    const animateWords = () => {
      const wordElements = document.querySelectorAll(".hero-word")
      wordElements.forEach((word, index) => {
        setTimeout(() => {
          word.classList.add("word-visible")
        }, 200 * index)
      })
    }

    // Initialize everything
    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    handleResize() // Call once on initial load
    initParticles()
    setTimeout(animateWords, 500)

    // Auto-rotate through content sections
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4)
    }, 5000)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      clearInterval(interval)
    }
  }, [title])

  // Handle scroll reveal animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll(".scroll-reveal")

      scrollElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight - 100

        if (isVisible) {
          el.classList.add("revealed")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e) => {
    e.preventDefault()
    const targetId = buttonLink.substring(1) // Remove the # from the link
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Determine whether to use Link, anchor, or button based on the link type and onClick handler
  const renderButton = () => {
    if (buttonOnClick) {
      return (
        <button onClick={buttonOnClick} className="btn btn-hero p-3">
          <span className="btn-text ps-2">{buttonText}</span>
          <span className="btn-icon">
            <i className="fas fa-arrow-right"></i>
          </span>
          <span className="btn-background"></span>
        </button>
      )
    } else if (buttonLink && buttonLink.startsWith("#")) {
      // Handle anchor links for same-page scrolling
      return (
        <a href={buttonLink} className="btn btn-hero p-3" onClick={handleAnchorClick}>
          <span className="btn-text ps-2">{buttonText}</span>
          <span className="btn-icon">
            <i className="fas fa-arrow-right"></i>
          </span>
          <span className="btn-background"></span>
        </a>
      )
    } else {
      return (
        <Link to={buttonLink} className="btn btn-hero p-3" target={target}>
          <span className="btn-text ps-2">{buttonText}</span>
          <span className="btn-icon">
            <i className="fas fa-arrow-right"></i>
          </span>
          <span className="btn-background"></span>
        </Link>
      )
    }
  }

  return (
    <section className={`hero-section ${className || ""}`} ref={heroRef}>
      {/* Particle background */}
      <canvas ref={canvasRef} className="particle-canvas"></canvas>

      {/* Animated background shapes */}
      <div className="shape-container">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Main content */}
      <div className={`hero-content-wrapper ${isLoaded ? "loaded" : ""}`}>
        <div className="container">
          <div className="row align-items-center">
            {/* Left side: Text content */}
            <div className="col-lg-6 hero-text-column">
              <div className="hero-text-content">
                {/* Animated title with word-by-word reveal */}
                <h1 className="hero-title">
                  {titleWords.length > 0 ? (
                    titleWords.map((word, index) => (
                      <span key={index} className="hero-word">
                        {word}{" "}
                      </span>
                    ))
                  ) : (
                    <div className="hero-title-jsx">{title}</div>
                  )}
                </h1>

                {/* Subtitle with gradient text */}
                <p className="hero-subtitle gradient-text">{subtitle}</p>

                {/* Animated CTA button */}
                <div className="hero-cta">{renderButton()}</div>
              </div>
            </div>

            {/* Right side: Image with 3D effect */}
            <div className="col-lg-6 hero-image-column">
              <div className="hero-image-container">
                <div className="image-frame">
                  <img src={imageSrc || "/placeholder.svg"} alt="Hero visual" className="hero-image" />
                  <div className="image-overlay"></div>
                  <div className="image-glow"></div>
                </div>

                {/* Floating elements */}
                <div className="floating-element element-1 me-5 ">
                  <i className="fas fa-shield-alt"></i>
                  <span>Security</span>
                </div>
                <div className="floating-element element-2">
                  <i className="fas fa-cloud"></i>
                  <span>Cloud</span>
                </div>
                <div className="floating-element element-3">
                  <i className="fas fa-chart-line"></i>
                  <span>Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   
    </section>
  )
}

export default HeroSection

