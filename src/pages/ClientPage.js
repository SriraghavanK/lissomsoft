"use client"

import { useState, useEffect, useRef } from "react"
import HeroSection from "../components/Herosection"
import "../styles/ClientPage.css"
import cloud from "../Client Logo/clients-logo/1cloudhub.png"
import gac from "../Client Logo/clients-logo/gac.png"
import indinfravit from "../Client Logo/clients-logo/indinfravit.png"
import interglobe from "../Client Logo/clients-logo/interglobe.png"
import lonestar from "../Client Logo/clients-logo/lonestar.png"
import premier from "../Client Logo/clients-logo/premier.png"
import radiance from "../Client Logo/clients-logo/radiance-renewables-logo.png"
import sicagen from "../Client Logo/clients-logo/sicagen.png"
import stanleyblack from "../Client Logo/clients-logo/stanleyblack.png"
import tatamotors from "../Client Logo/clients-logo/tata-motors.png"
import thesecureinn from "../Client Logo/clients-logo/the-secure-inn.png"
import { Link } from "react-router-dom"

const ClientPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const industriesRef = useRef(null)
  const clientsRef = useRef(null)
  const [activeIndustry, setActiveIndustry] = useState(null)
  const [clientsVisible, setClientsVisible] = useState(false)
  const [hoveredClient, setHoveredClient] = useState(null)

  // Add scroll restoration function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const industries = [
    {
      id: 1,
      name: "Banking",
      icon: "fas fa-university",
      color: "#0088cc",
      description: "Innovative financial solutions for modern banking",
    },
    {
      id: 2,
      name: "Healthcare",
      icon: "fas fa-heartbeat",
      color: "#00cc88",
      description: "Digital transformation in healthcare delivery",
    },
    {
      id: 3,
      name: "Energy",
      icon: "fas fa-bolt",
      color: "#ffaa00",
      description: "Sustainable energy management solutions",
    },
    {
      id: 4,
      name: "Manufacturing",
      icon: "fas fa-industry",
      color: "#ff6b6b",
      description: "Smart manufacturing and Industry 4.0",
    },
    {
      id: 5,
      name: "Emerging Tech",
      icon: "fas fa-microchip",
      color: "#6c63ff",
      description: "Cutting-edge technological solutions",
    },
    {
      id: 6,
      name: "Hospitality",
      icon: "fas fa-concierge-bell",
      color: "#ffd93d",
      description: "Enhanced guest experience solutions",
    },
    {
      id: 7,
      name: "Infrastructure",
      icon: "fas fa-road",
      color: "#4ecdc4",
      description: "Smart infrastructure management",
    },
    {
      id: 8,
      name: "IT",
      icon: "fas fa-laptop-code",
      color: "#845ef7",
      description: "Advanced IT solutions and services",
    },
  ]

  // Enhanced client logos data with more details and images from lissomsoft.com
  const clients = [
    {
      id: 1,
      name: "Bhacker Haji",
      logo: "https://www.lissomsoft.com/assets/clients-logo/bhacker-haji.png",
      industry: "Banking",
      description: "Leading financial institution in Nepal",
    },
    {
      id: 2,
      name: "Axis Finance",
      logo: "https://www.lissomsoft.com/assets/clients-logo/axisfinance.png",
      industry: "Banking",
      description: "Innovative financial solutions provider",
    },
    {
      id: 3,
      name: "Utkarsh Small Finance Bank",
      logo: "https://www.lissomsoft.com/assets/clients-logo/utkarsh.png",
      industry: "Banking",
      description: "Empowering communities through financial inclusion",
    },
    {
      id: 4,
      name: "Exide Life Insurance",
      logo: "https://www.lissomsoft.com/assets/clients-logo/exidelife-insurance.png",
      industry: "Insurance",
      description: "Trusted insurance solutions for generations",
    },
    {
      id: 5,
      name: "Chaitanya",
      logo: "https://www.lissomsoft.com/assets/clients-logo/chaitanya.png",
      industry: "Finance",
      description: "Microfinance services for rural development",
    },
    {
      id: 6,
      name: "Nepal Life",
      logo: "https://www.lissomsoft.com/assets/clients-logo/nepal-life.png",
      industry: "Insurance",
      description: "Premier life insurance provider in Nepal",
    },
    {
      id: 7,
      name: "NSDL Payments Bank",
      logo: "https://www.lissomsoft.com/assets/clients-logo/nsdl-payment-bank.png",
      industry: "Banking",
      description: "Digital banking solutions for modern India",
    },
    {
      id: 8,
      name: "DI",
      logo: "https://www.lissomsoft.com/assets/clients-logo/disa.png",
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 9,
      name: "Cloud Hub",
      logo: cloud,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 10,
      name: "GAC",
      logo: gac,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 11,
      name: "indinfravit",
      logo: indinfravit,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 12,
      name: "interglobe",
      logo: interglobe,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 13,
      name: "lonestar",
      logo: lonestar,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 14,
      name: "premier",
      logo: premier,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 15,
      name: "radiance",
      logo: radiance,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 16,
      name: "sicagen",
      logo: sicagen,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 17,
      name: "stanleyblack",
      logo: stanleyblack,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 18,
      name: "tata-motors",
      logo: tatamotors,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
    {
      id: 19,
      name: "the-secure-inn",
      logo: thesecureinn,
      industry: "Technology",
      description: "Digital innovation for enterprise solutions",
    },
  ]

  // Initialize animations and scroll effects
  useEffect(() => {
    setIsLoaded(true)

    // Initialize industry cards animation
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("industry-visible")

          // If the clients section becomes visible, trigger the clients animation
          if (entry.target.id === "clients-section") {
            setClientsVisible(true)
          }
        }
      })
    }, observerOptions)

    // Observe all industry cards
    document.querySelectorAll(".industry-card").forEach((card) => {
      observer.observe(card)
    })

    // Observe the clients section
    if (clientsRef.current) {
      observer.observe(clientsRef.current)
    }

    // Create particles for the prestigious clientele section
    createParticles()

    // Add scroll animations for client logos
    animateOnScroll()

    return () => observer.disconnect()
  }, [])

  // Create floating particles effect
  const createParticles = () => {
    const clientsSection = clientsRef.current
    if (!clientsSection) return

    const particlesContainer = document.createElement("div")
    particlesContainer.className = "clients-particles-container"

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "client-particle"

      // Random positions and sizes
      const size = Math.random() * 10 + 5
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random animation duration and delay
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`
      particle.style.animationDelay = `${Math.random() * 5}s`

      // Random opacity
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`

      // Random color based on client colors
      const colors = ["#0088cc", "#00cc88", "#ffaa00", "#ff6b6b", "#6c63ff", "#ffd93d"]
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

      particlesContainer.appendChild(particle)
    }

    clientsSection.appendChild(particlesContainer)
    clientsSection.style.position = "relative" // Ensure the section has relative positioning
  }

  // Add scroll animations for client logos
  const animateOnScroll = () => {
    const clientCards = document.querySelectorAll(".client-logo-card")

    clientCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.setProperty("--delay", `${index * 0.15}s`)

      // Add random initial transform for more dynamic entrance
      const randomX = Math.random() * 40 - 20
      const randomY = Math.random() * 40 + 20
      card.style.setProperty("--initialX", `${randomX}px`)
      card.style.setProperty("--initialY", `${randomY}px`)
    })
  }

  // Handle industry card hover effects
  const handleIndustryHover = (industry) => {
    setActiveIndustry(industry)
  }

  // Handle client card hover effects
  const handleClientHover = (client) => {
    setHoveredClient(client)
  }

  // Handle client card click - could add modal or redirect
  const handleClientClick = (client) => {
    console.log(`Clicked on ${client.name}`)
    // Could add modal or redirect functionality here
  }

  return (
    <div className={`client-page ${isLoaded ? "loaded" : ""}`}>
      {/* Hero Section */}
      <HeroSection
        title="Join Our Growing Client Network"
        subtitle="Partnering for Your Success: Our Commitment to Thrive in Digital"
        buttonText="Explore our Clients"
        buttonLink="#clients-section"
        imageSrc="https://imgs.search.brave.com/6Er4btQX-rdbYpRSJTeK7cU9NBhY9CYxpQWHwGG5jjo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM3/MjUyMjc0L3Bob3Rv/L2hhbmRzaGFraW5n/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1vYVFPNk1FNlJ3/VDNKUEZMWGx3NG94/U1VoVFlYdk5yWEY3/aHh5bmV6M0dBPQ"
      />

      {/* Industries Section */}
      <section className="industries-section" ref={industriesRef}>
        <div className="container">
          <h2 className="section-title text-center mb-5">Industries We Serve</h2>
          <div className="row g-4">
            {industries.map((industry, index) => (
              <div key={industry.id} className="col-md-6 col-lg-3">
                <div
                  className="industry-card"
                  onMouseEnter={() => handleIndustryHover(industry)}
                  onMouseLeave={() => handleIndustryHover(null)}
                  style={{
                    "--delay": `${index * 0.1}s`,
                    "--accent-color": industry.color,
                  }}
                >
                  <div className="card-content">
                    <div className="icon-wrapper">
                      <i className={industry.icon}></i>
                    </div>
                    <h3>{industry.name}</h3>
                    <p className="description">{industry.description}</p>

                    {/* Animated background elements */}
                    <div className="card-background">
                      <div className="bg-shape shape-1"></div>
                      <div className="bg-shape shape-2"></div>
                      <div className="bg-shape shape-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated background particles */}
        <div className="background-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                "--x": `${Math.random() * 100}%`,
                "--y": `${Math.random() * 100}%`,
                "--delay": `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Enhanced Prestigious Clientele Section */}
      <section className="prestigious-clientele-section" ref={clientsRef} id="clients-section">
        <div className="container">
          <h2 className="section-title text-center mb-5">
            <span className="text-gradient">Prestigious Clientele</span>
          </h2>

          {/* Client logos grid with enhanced animations */}
          <div className="clients-container">
            <div className="row g-2 g-md-4 justify-content-center">
              {clients.map((client, index) => (
                <div key={client.id} className="col-6 col-md-4 col-lg-3">
                  <div
                    className={`client-logo-card ${clientsVisible ? "animate-in" : ""}`}
                    style={{
                      "--delay": `${index * 0.15}s`,
                      "--accent-color": "#0088cc",
                    }}
                    onMouseEnter={() => handleClientHover(client)}
                    onMouseLeave={() => handleClientHover(null)}
                    onClick={() => handleClientClick(client)}
                  >
                    <div className="client-card-inner">
                      <div className="client-card-front">
                        <img
                          src={client.logo || "/placeholder.svg"}
                          alt={client.name}
                          className="client-logo img-fluid"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            filter: "contrast(1.2) brightness(0.9)",
                            padding: "5px",
                            margin: "0 auto",
                            display: "block",
                          }}
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                      <div className="client-card-back">
                        <h4>{client.name}</h4>
                        <p>{client.description}</p>
                        <span className="industry-tag">{client.industry}</span>
                      </div>
                    </div>

                    {/* Animated background elements */}
                    <div className="card-background">
                      <div className="bg-shape shape-1"></div>
                      <div className="bg-shape shape-2"></div>
                      <div className="bg-shape shape-3"></div>
                    </div>

                    {/* Glowing effect on hover */}
                    <div className="glow-effect"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client counter section */}
          <div className="client-counter-section">
            <div className="row mt-5 pt-4 text-center">
              <div className="col-md-4">
                <div className="counter-item">
                  <div className="counter-number">50+</div>
                  <div className="counter-label">Satisfied Clients</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="counter-item">
                  <div className="counter-number">8+</div>
                  <div className="counter-label">Industries Served</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="counter-item">
                  <div className="counter-number">15+</div>
                  <div className="counter-label">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="client-cta">
            <h3>Ready to join our prestigious client list?</h3>
            <p>Let's discuss how we can help transform your business</p>
            <Link to="/contact" className="btn btn-light btn-lg px-4 py-3" onClick={scrollToTop}>
              <i className="fas fa-envelope me-2"></i>Contact Us Today
            </Link>
          </div>
        </div>

        {/* Enhanced animated background with more particles and effects */}
        <div className="clients-background">
          <div className="clients-particles"></div>
          <div className="clients-gradient-overlay"></div>
          <div className="clients-moving-shapes">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="moving-shape"
                style={{
                  "--scale": 0.5 + Math.random() * 1.5,
                  "--rotate": Math.random() * 360,
                  "--duration": 20 + Math.random() * 40,
                  "--delay": Math.random() * -20,
                  "--x": Math.random() * 100,
                  "--y": Math.random() * 100,
                }}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClientPage

