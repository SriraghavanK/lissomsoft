"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import HeroSection from "../components/Herosection"
import "../styles/HomePage.css"
import "../styles/animations.css"

const HomePage = () => {
  const [activeService, setActiveService] = useState("risk")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const servicesRef = useRef(null)
  const [isVisible, setIsVisible] = useState({})
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  const heroContent = {
    risk: {
      title: "Conquer Business Risks Like a Seasoned Climber",
      subtitle:
        "Business and adventure share surprises. Effective risk management propels you to new heights, minimizing set backs. Lissomsoft shows you the way.",
      buttonText: "Explore Risk Management",
      buttonLink: "/risk-management",
      imageSrc:
        "https://imgs.search.brave.com/flK6N4fQJm_IWiySKlfCdJPfQP3aXlj21zgfoWyMpMA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNzcx/ODk1MjIvcGhvdG8v/YS1tb3VudGFpbi1j/bGltYmVyLXJlYWNo/aW5nLXRoZS10b3At/b2YtYS1tb3VudGFp/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Y2Q1bVY2cHZr/c2FFc0FtUVpNUExW/a3dOdkQ0VVFRZTl0/WXdHVkt1QWQ5Zz0",
    },
    digital: {
      title: "Transform with Next Gen Apps Like a Butterfly",
      subtitle:
        "Lissomsoft's fullstack application development Services, allow your business to flourish, just like a butterfly undergoes its beautiful transformation.",
      buttonText: "Discover Digital Solutions",
      buttonLink: "/digital-transformation",
      imageSrc:
        "https://imgs.search.brave.com/RhZL-aUo4xBy6U18imXNjYRYn6SaxBE0zl5Pt-H3XGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDMyMDQ5/NjkuanBn",
    },
    cloud: {
      title: "Serve 24X7 Cloud Services Like an Endless Ocean",
      subtitle:
        "Rely on Lissomsoft's Top-Tier Cloud Services-Consulting, Design, Architecture, Build, Migration, and Management-to navigate an endless ocean of possibilities and scale your business for growth.",
      buttonText: "Explore Cloud Services",
      buttonLink: "/cloud-services",
      imageSrc:
        "https://imgs.search.brave.com/TojJ3Hl6nj63DQCMI7tSocrjwtElvc0GrSbZVTu0F2Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY2xvdWQtYWJr/eTRobXAzankybnd3/ci5qcGc",
    },
    marketing: {
      title: "Steer Growth Like a Lighthouse Guiding Ships",
      subtitle:
        "Energize Your Business with Lissomsoft's Growth Marketing Services, Lighting up Your Channels - Web, Social Media, and Sales - to Propel Growth, mirroring the Precision of a Lighthouse Guiding Ships to Shore.",
      buttonText: "Discover Growth Marketing",
      buttonLink: "/growth-marketing",
      imageSrc:
        "https://imgs.search.brave.com/1oKtfPhGi-HP34cFBnQlYAfnemG4PD_q3aatY9ReGFE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC9kLzEv/Ny82OTk1MDItMjU2/MHgxNjAwLWRlc2t0/b3AtaGQtbGlnaHRo/b3VzZS1iYWNrZ3Jv/dW5kLXBob3RvLmpw/Zw",
    },
  }

  // Service-specific content for the sections below the hero
  const serviceContent = {
    risk: {
      title: "Discover the thrill of risk management evolution with Lissomsoft's flagship MySmartGRC!",
      description:
        "Discover the thrill of risk management evolution with Lissomsoft's flagship,MySmartGRC! Pioneering comprehensive risk solutions, it tackles Operational, Third-Party, and IT Risks. Empowering through GRC automation, it ignites productivity and offers transformative visibility. MySmartGRC excels in hotspot identification, supercharges mitigation, fosters seamless collaboration, and expertly navigates regulatory landscapes. Elevate your risk game with the magic of digital transformation!",
      image: "https://imgs.search.brave.com/7LV9xEHsyuFOV_HSU8B9XdFrW1LIIt7tH89LJ4FePpk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTUy/Njk4MzUwOC9waG90/by9yaXNrLW1hbmFn/ZW1lbnQtY29uY2Vw/dC1hc3Nlc3NtZW50/LWZvci1idXNpbmVz/cy1pbnZlc3RtZW50/LWFuZC1mb3JlY2Fz/dGluZy1ldmFsdWF0/aW9uLmpwZz9iPTEm/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aVJt/ZXV0S3FVYW95Y2pl/NTFXVlQ2enNSZDJS/OGMwVVl3am1TTWI0/dHBIWT0",
      ctaText: "Assess Risks, Improve Performance and Stay Compliant!",
      ctaLink: "/risk-management",
      features: [
        "Comprehensive risk assessments",
        "Customized risk management frameworks",
        "Advanced risk monitoring tools",
        "Regulatory compliance solutions",
      ],
      riskCards: [
        {
          title: "Operational Risk",
          description:
            "Foster enterprise-wide risk resilience with a comprehensive operational risk management solution.",
          image: "https://www.lissomsoft.com/assets/tab/operational-risk.jpg",
        },
        {
          title: "Third Party/Vendor Risk",
          description:
            "Safeguard your business reputation by automating governance and compliance protocols with third-party associates, shielding you from threats.",
          image: "https://www.lissomsoft.com/assets/tab/vendor-risk.jpg",
        },
        {
          title: "IT/Cyber Risk",
          description:
            "Ensure robust cybersecurity by mitigating data loss or exposure from cyber threats like phishing, malware, and identity theft.",
          image: "https://www.lissomsoft.com/assets/tab/it-risk.jpg",
        },
      ],
      productLogo: "https://www.lissomsoft.com/assets/brand/My%20Smart%20GRC-Logo%20(250x127%20px).jpg",
      productCTA: "Learn More on MySmartGRC",
      productDemoCTA: "Check out a demo",
    },
    digital: {
      title: "In a rapidly evolving digital landscape, businesses must be agile and transparent to stay competitive",
      description:
        "In a rapidly evolving digital landscape, companies must be agile and transparent to stay competitive. We, as a leading digital transformation service provider, offer holistic solutions, leveraging innovative technologies like IoT, Data Analytics, and AI to automate processes, collect real-time data, and adapt to ever-changing customer needs.",
      image: "https://imgs.search.brave.com/dab97Jw6HTxwHq--35r6gd-FGtkKE6kRtfD3C02l_yE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIx/MjMwMTgxOC9waG90/by9kaWdpdGFsLXRy/YW5zZm9ybWF0aW9u/LWNvbmNlcHQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVBI/ZV8tbm5OTHJVZjhZ/LUxldjJOYzJJVV9j/V2pVTV9IYUxhVkFU/UTNBQ1U9",
      ctaText: "Transform with Full Stack, Automate Business Processes!",
      ctaLink: "/digital-transformation",
      features: [
        "Business process automation",
        "Custom web application development",
        "Legacy system modernization",
        "Digital strategy consulting",
      ],
    },
    cloud: {
      title: "Elevate Your Business with Seamless Cloud Solutions",
      description:
        "Lissomsoft offers a suite of applications to aid businesses to identify risk-hotspots/concentration risks. The solution helps evolve mitigation processes, seamless collaboration between stackholders and delivers a single source of truth for navigating regulatory complexities.",
      image: "https://imgs.search.brave.com/kaWmyb8Kjfd3840BThBeYlEkJioMjriL4gZ4s7aIpMc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/OTUzNTEyMC9waG90/by9kYXRhLWNsb3Vk/LXNlcnZlci5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9am4x/SGJPaFZTOEhrSGtl/VGRlSnNxUXc1NkJW/ckNSQkluWWhrV0tm/T0puND0",
      ctaText: "Explore Our Cloud Solutions",
      ctaLink: "/cloud-services",
      features: [
        "Cloud migration strategies",
        "Infrastructure as a Service (IaaS)",
        "Platform as a Service (PaaS)",
        "Cloud security solutions",
      ],
    },
    marketing: {
      title: "Energize Your Business with Growth Marketing",
      description:
        "Energize your business with Lissomsoft's Growth Marketing. Integrate Website development, Content Creation, B2B Social Media Engagement and Sales Intelligence Tools, to propel your brand visibility, engage decision-makers, and empower sales. Set your business on a course for unparalleled digital growth.",
      image: "https://imgs.search.brave.com/CFVb3dOYVzgPjui3WGgO0kUzD_rezSynBHfN6D875ZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/MjcxMTA5My9waG90/by9sYXJnZS1ncm91/cC1vZi1wZW9wbGUt/Zm9ybWluZy1hLWdy/b3dpbmctYXJyb3cu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVgyU25GLU1DSC1a/eDMtQS1JYjdPQzRL/ZVNETXNMcjNRU1l4/T1YxRXVqUEE9",
      ctaText: "Learn More On Growth Marketing",
      ctaLink: "/growth-marketing",
      features: [
        "SEO and content marketing",
        "Social media marketing",
        "Email marketing campaigns",
        "Analytics and performance tracking",
      ],
    },
  }

  // Why Lissomsoft cards data
  const whyLissomsoft = [
    {
      title: "Diverse Industry Clients",
      description: "Across BFSI, Manufacturing, BPO, Startups, Retail, Information/Technology, Healthcare, and NGOs.",
      image: "https://www.lissomsoft.com/assets/Why%20Us%20Icons/industry-clients1.png",
    },
    {
      title: "Solutions Across the Globe",
      description:
        "Delivered worldwide via strategic partnerships in India, GCC, Africa, Oceania, Europe, UK, and North America.",
      image: "https://www.lissomsoft.com/assets/Why%20Us%20Icons/solutions1.png",
    },
    {
      title: "Expert Teams",
      description:
        "Proficient in cutting-edge technologies: AI, ML, JS, React, PHP, Adobe, Microsoft, No-Code Platforms, and Analytics.",
      image: "https://www.lissomsoft.com/assets/Why%20Us%20Icons/expert-teams1.png",
    },
    {
      title: "100+ Years of Experience",
      description:
        "Dynamic management team and expert panel, armed with a wealth of industry, marketing, and tech expertise.",
      image: "https://www.lissomsoft.com/assets/Why%20Us%20Icons/experience1.png",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CTO, TechVision Inc.",
      content:
        "Lissomsoft's risk management solutions transformed how we handle compliance. Their expertise and dedication to our success made all the difference.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Michael Chen",
      position: "Director of Operations, GlobalTrade",
      content:
        "The cloud migration services provided by Lissomsoft were seamless and efficient. Our team now operates with greater agility and reduced costs.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Priya Sharma",
      position: "Marketing Head, InnovateNow",
      content:
        "Working with Lissomsoft on our digital transformation journey has been incredible. Their team understood our vision and delivered beyond expectations.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]

  // Stats data
  const stats = [
    { value: "500+", label: "Clients Worldwide" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Years Experience" },
    { value: "24/7", label: "Support Available" },
  ]

  const handleServiceChange = (service) => {
    if (service === activeService || isTransitioning) return

    setIsTransitioning(true)

    // Fade out current content
    const heroSection = document.querySelector(".hero-section")
    if (heroSection) {
      heroSection.classList.add("fade-out")
    }

    // Change service after animation completes
    setTimeout(() => {
      setActiveService(service)

      // Fade in new content
      setTimeout(() => {
        if (heroSection) {
          heroSection.classList.remove("fade-out")
          heroSection.classList.add("fade-in")

          // Remove animation class after completion
          setTimeout(() => {
            heroSection.classList.remove("fade-in")
            setIsTransitioning(false)
          }, 500)
        }
      }, 50)
    }, 500)
  }

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isElementVisible = rect.top < window.innerHeight - 100

        if (isElementVisible) {
          element.classList.add("animate-slide-up")
          setIsVisible((prev) => ({ ...prev, [element.dataset.id]: true }))
        }
      })
    }

    // Initial check
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Add animation effect when service changes
  useEffect(() => {
    // Animate service content when activeService changes
    const animateContent = () => {
      const contentElements = document.querySelectorAll(".service-content-section")

      contentElements.forEach((element) => {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"

        setTimeout(() => {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
          element.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out"
        }, 100)
      })
    }

    animateContent()
  }, [activeService])

  // Initialize Bootstrap tooltips and carousels
  useEffect(() => {
    // Check if Bootstrap is available
    if (typeof window !== "undefined" && window.bootstrap) {
      // Initialize tooltips
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl))

      // Initialize carousels
      const carouselList = [].slice.call(document.querySelectorAll(".carousel"))
      carouselList.map(
        (carouselEl) =>
          new window.bootstrap.Carousel(carouselEl, {
            interval: 5000,
          }),
      )
    }
  }, [])

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="homepage">
      {/* Hero Section with Advanced Animation */}
      <HeroSection
        key={activeService}
        title={heroContent[activeService].title}
        subtitle={heroContent[activeService].subtitle}
        buttonText={heroContent[activeService].buttonText}
        buttonLink={heroContent[activeService].buttonLink}
        imageSrc={heroContent[activeService].imageSrc}
      />

      {/* Modern Service Navigation */}
      <div className="service-navigation shadow-lg" ref={servicesRef}>
        <div className="container">
          <div className="service-nav-wrapper">
            {Object.keys(heroContent).map((service) => (
              <button
                key={service}
                className={`service-nav-item ${activeService === service ? "active" : ""}`}
                onClick={() => handleServiceChange(service)}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={`View ${service.charAt(0).toUpperCase() + service.slice(1)} Services`}
              >
                <div className="service-icon">
                  {service === "risk" && <i className="fas fa-shield-alt"></i>}
                  {service === "digital" && <i className="fas fa-laptop-code"></i>}
                  {service === "cloud" && <i className="fas fa-cloud"></i>}
                  {service === "marketing" && <i className="fas fa-chart-line"></i>}
                </div>
                <div className="service-label">
                  <span className="service-name">
                    {service === "risk" && "Risk Management"}
                    {service === "digital" && "Digital Transformation"}
                    {service === "cloud" && "Cloud Services"}
                    {service === "marketing" && "Growth Marketing"}
                  </span>
                </div>
                <div className="nav-indicator"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Content Section - Enhanced with animations */}
      <section className="service-content-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 animate-on-scroll" data-id="service-content-text">
              <h2 className="section-title mb-4">
                <span className="highlight">
                  {activeService === "risk" && "Risk Management"}
                  {activeService === "digital" && "Digital Transformation"}
                  {activeService === "cloud" && "Cloud Services"}
                  {activeService === "marketing" && "Growth Marketing"}
                </span>
              </h2>
              <p className="section-description">{serviceContent[activeService].description}</p>
           
              <Link to={serviceContent[activeService].ctaLink} className="btn btn-primary-modern mb-5"  onClick={scrollToTop}>
                {serviceContent[activeService].ctaText}
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div
              className="col-lg-6 animate-on-scroll"
              data-id="service-content-image"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="service-image-wrapper perspective-container">
                <img
                  src={serviceContent[activeService].image || "/placeholder.svg"}
                  alt={`${activeService} service`}
                  className="service-image rotate-3d"
                  onError={(e) => {
                    e.target.src = "https://www.lissomsoft.com/assets/description/img1.png"
                  }}
                />
                <div className="image-decoration"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-5 bg-gradient-primary text-white">
        <div className="container py-4">
          <div className="row text-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3 mb-4 mb-md-0">
                <div className="stat-item animate-on-scroll" data-id={`stat-${index}`}>
                  <h2 className="display-4 fw-bold mb-0 counter-value">{stat.value}</h2>
                  <p className="mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Management Cards - Only shown when risk service is active */}
      {activeService === "risk" && (
        <section className="py-5 bg-white service-content-section">
          <div className="container py-4">
            <div className="row mb-4 text-center">
              <div className="col-lg-8 mx-auto">
                <h2 className="fw-bold mb-3 animate-on-scroll" data-id="risk-title">
                  Our Risk Management Solutions
                </h2>
                <p className="lead animate-on-scroll" data-id="risk-subtitle">
                  Comprehensive tools to identify, assess, and mitigate risks across your organization
                </p>
              </div>
            </div>
            <div className="row">
              {serviceContent.risk.riskCards.map((card, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <div
                    className="card h-100 shadow-sm hover-shadow transition-all animate-on-scroll"
                    data-id={`risk-card-${index}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="card-header bg-white border-0 p-0">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={card.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=200&width=400"
                        }}
                      />
                    </div>
                    <div className="card-body p-4">
                      <h5 className="card-title fw-bold mb-3">{card.title}</h5>
                      <p className="card-text">{card.description}</p>
                    </div>
                  
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5 animate-on-scroll" data-id="risk-product">
              <div className="product-showcase p-4 bg-light rounded-3 shadow-sm">
                <img
                  src={serviceContent.risk.productLogo || "/placeholder.svg"}
                  alt="MySmartGRC Logo"
                  className="mb-4"
                  style={{ maxHeight: "60px" }}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=60&width=200"
                  }}
                />
                <h4 className="mb-3">Elevate your risk management with our flagship product</h4>
                <p className="mb-4">
                  Comprehensive, intuitive, and powerful - MySmartGRC is the solution you've been looking for.
                </p>
                <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
                  <Link to="/mysmartgrc" className="btn btn-primary-modern mb-2 mb-md-0" target="blank">
                    {serviceContent.risk.productCTA}
                  </Link>
                  <Link to="#" className="btn btn-outline-primary d-flex justify-content-center align-items-center " style={{height:"48px"}}>
                    {serviceContent.risk.productDemoCTA}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - New */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row mb-4 text-center">
            <div className="col-lg-8 mx-auto">
              <h2 className="fw-bold mb-3 animate-on-scroll" data-id="testimonials-title">
                What Our Clients Say
              </h2>
              <p className="lead animate-on-scroll" data-id="testimonials-subtitle">
                Trusted by businesses worldwide
              </p>
            </div>
          </div>

          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">
                          <div className="d-flex flex-column flex-md-row align-items-center mb-4">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="rounded-circle me-md-4 mb-3 mb-md-0"
                              width="80"
                              height="80"
                            />
                            <div className="text-center text-md-start">
                              <h5 className="mb-1">{testimonial.name}</h5>
                              <p className="text-muted mb-0">{testimonial.position}</p>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <i className="fas fa-quote-left fa-2x text-primary-lissomsoft opacity-25 mb-3"></i>
                            <p className="lead mb-0 pt-4 ps-3">{testimonial.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
            <div className="carousel-indicators position-relative mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
              <div className="position-relative animate-on-scroll" data-id="about-image">
                <img
                  src="https://www.lissomsoft.com/assets/description/img1.png"
                  alt="Business professional"
                  className="img-fluid rounded shadow-lg about-image"
                  style={{ maxWidth: "90%" , width:"75%" }}
                />
                <div className="position-absolute top-0 start-0 translate-middle bg-primary rounded-circle p-3 shadow-lg d-none d-lg-block">
                  <i className="fas fa-lightbulb text-white fa-2x"></i>
                </div>
                <div className="position-absolute bottom-0 end-0 translate-middle bg-success rounded-circle p-3 shadow-lg d-none d-lg-block">
                  <i className="fas fa-check text-white fa-2x"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="animate-on-scroll" data-id="about-content">
                <h2 className="fw-bolder mb-4 gradient-text">
                  GRC Solutions, Web Applications, Cloud Services, Sales Enablement and Digital Marketing; all from one
                  point
                </h2>
                <p className="mb-4 lead">
                  Bottlenecked about your concept or solution, it is quite understandable. Don't fret over the
                  impossible. As businesses evolve and grow, at some point they need solutions which will accelerate
                  their sales, reduce costs or improve customer services.
                </p>
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <div className="feature-badge">
                    <i className="fas fa-check-circle me-2"></i>
                    <span>End-to-end solutions</span>
                  </div>
                  <div className="feature-badge">
                    <i className="fas fa-check-circle me-2"></i>
                    <span>Expert consultation</span>
                  </div>
                  <div className="feature-badge">
                    <i className="fas fa-check-circle me-2"></i>
                    <span>Tailored strategies</span>
                  </div>
                </div>
                <Link to="/about" className="btn btn-primary-modern btn-lg"  onClick={scrollToTop}>
                  Learn more about Lissomsoft
                  <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lissomsoft Section - Enhanced */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3 animate-on-scroll" data-id="why-title">
                Why Choose Lissomsoft
              </h2>
              <p className="lead animate-on-scroll" data-id="why-subtitle">
                We bring expertise, innovation, and reliability to every project
              </p>
            </div>
          </div>

          <div className="row">
            {whyLissomsoft.map((item, index) => (
              <div key={index} className="col-6 col-md-6 col-lg-3 mb-4">
                <div
                  className="card h-100 border-0 shadow-sm hover-lift transition-all animate-on-scroll"
                  data-id={`why-card-${index}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="card-body text-center p-4">
                    <div className="mb-4 why-icon-wrapper">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="img-fluid"
                        style={{ height: "80px", maxHeight: "120px" }}
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=120&width=120"
                        }}
                      />
                    </div>
                    <h5 className="card-title fw-bold fs-6 fs-md-5 mb-3">{item.title}</h5>
                    <p className="card-text small">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - New */}
      <section className="py-5 bg-gradient-secondary text-white">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <div className="animate-on-scroll" data-id="cta-content">
                <h2 className="display-5 fw-bolder mb-4">Ready to Transform Your Business?</h2>
                <p className="lead mb-4">Partner with Lissomsoft and unlock your organization's full potential</p>
                <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                  <Link to="/contact" className="btn btn-light btn-lg px-4 py-3"  onClick={scrollToTop}>
                    <i className="fas fa-envelope me-2"></i>
                    Contact Us
                  </Link>
                  <Link to="#" className="btn btn-outline-light btn-lg px-4 py-3">
                    <i className="fas fa-th-list me-2"></i>
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section - Enhanced */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3 animate-on-scroll" data-id="location-title">
                Our Location
              </h2>
              <p className="lead animate-on-scroll" data-id="location-subtitle">
                Visit us at our headquarters
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="card border-0 shadow-lg overflow-hidden animate-on-scroll" data-id="map-card">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.506366230087!2d80.20867307524588!3d13.003393787314899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525e88875e0359%3A0x55634d593f082105!2sLissomsoft%20Technologies!5e0!3m2!1sen!2sin!4v1742192313588!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Lissomsoft Location"
                  ></iframe>
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <h5 className="fw-bold mb-3">
                        <i className="fas fa-map-marker-alt text-primary-lissomsoft me-2"></i>
                        Address
                      </h5>
                      <p className="mb-0">
                        Lissomsoft Technologies
                        <br />
                        5, Chakrapani Rd, Ramapuram, Narasinga Colony, Maduvinkarai, Guindy
                        <br />
                        Chennai, Tamil Nadu 600032
                        <br />
                        India
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h5 className="fw-bold mb-3">
                        <i className="fas fa-phone text-primary-lissomsoft me-2"></i>
                        Contact
                      </h5>
                      <p className="mb-1">
                        <strong>Phone:</strong>+91 9361829552
                      </p>
                      <p className="mb-0">
                        <strong>Email:</strong> info@lissomsoft.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-8 mx-auto">
              <div
                className="card border-0 shadow hover-shadow transition-all animate-on-scroll"
                data-id="contact-card"
              >
                <div className="card-body p-4 p-md-5 text-center">
                  <h3 className="mb-4 fs-4 fs-md-3">Ready to embark on this journey with Lissomsoft today!</h3>
                  <Link to="/contact" className="btn btn-primary-modern btn-lg px-5 py-3"  onClick={scrollToTop}>
                    <i className="fas fa-paper-plane me-2" ></i>
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Enhanced */}
      <section className="py-5 bg-light">
        <div className="container py-3">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-8 text-center">
              <h4 className="fw-bold mb-3 animate-on-scroll" data-id="certifications-title">
                Our Certifications
              </h4>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-4 col-md-3 mb-3 mb-md-0 text-center">
              <div className="certification-badge animate-on-scroll" data-id="cert-1">
                <img
                  src="https://www.lissomsoft.com/assets/certification/nasscom1.jpeg"
                  alt="NASSCOM Certified Member"
                  className="img-fluid"
                  style={{ maxHeight: "60px", maxWidth: "100%" }}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=80&width=150"
                  }}
                />
              </div>
            </div>
            <div className="col-4 col-md-3 mb-3 mb-md-0 text-center">
              <div
                className="certification-badge animate-on-scroll"
                data-id="cert-2"
                style={{ animationDelay: "0.2s" }}
              >
                <img
                  src="https://www.lissomsoft.com/assets/certification/make%20in%20india%201.jpeg"
                  alt="Make in India"
                  className="img-fluid"
                  style={{ maxHeight: "60px", maxWidth: "100%" }}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=80&width=150"
                  }}
                />
              </div>
            </div>
            <div className="col-4 col-md-3 mb-3 mb-md-0 text-center">
              <div
                className="certification-badge animate-on-scroll"
                data-id="cert-3"
                style={{ animationDelay: "0.4s" }}
              >
                <img
                  src="https://www.lissomsoft.com/assets/certification/msme.jpeg"
                  alt="Startup India"
                  className="img-fluid"
                  style={{ maxHeight: "60px", maxWidth: "100%" }}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=80&width=150"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* CSS for enhanced styling */}
      <style jsx>{`
        /* Enhanced Hero Section Styles */
        .hero-section {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }
        
        /* Enhanced Service Navigation Styles */
        .service-navigation {
          background: linear-gradient(to right, #0f172a, #1e293b);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .service-nav-wrapper {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }
        
        .service-nav-item {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 1rem;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .service-nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
        }
        
        .service-nav-item.active {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .service-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #3b82f6;
          transition: all 0.3s ease;
        }
        
        .service-nav-item.active .service-icon {
          color: #60a5fa;
          transform: scale(1.1);
        }
        
        .service-label {
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .service-nav-item.active .service-label {
          font-weight: 600;
        }
        
        .nav-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          transition: all 0.3s ease;
          border-radius: 3px;
        }
        
        .service-nav-item.active .nav-indicator {
          width: 80%;
        }
        
        /* Enhanced Service Content Section */
        .service-content-section {
          padding: 5rem 0;
          background: #f8fafc;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .highlight {
          position: relative;
          z-index: 1;
        }
        
        .highlight::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
          z-index: -1;
          border-radius: 4px;
        }
        
        .section-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #64748b;
          margin-bottom: 2rem;
        }
        
        .feature-list {
          margin-bottom: 2rem;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          opacity: 0;
          transform: translateX(-20px);
        }
        
        .feature-icon {
          color: #3b82f6;
          font-size: 1.25rem;
          margin-right: 1rem;
        }
        
        .feature-text {
          font-weight: 500;
        }
        
        /* Enhanced Button Styles */
        .btn-primary-modern {
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary-modern::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.5s ease;
        }
        
        .btn-primary-modern:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
          color: white;
        }
        
        .btn-primary-modern:hover::before {
          left: 100%;
        }
        
        /* Enhanced Image Styles */
        .service-image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .service-image {
          width: 100%;
          height: auto;
          display: block;
          transition: all 0.5s ease;
        }
        
        .service-image-wrapper:hover .service-image {
          transform: scale(1.05);
        }
        
        .image-decoration {
          position: absolute;
          top: -10%;
          right: -10%;
          width: 50%;
          height: 50%;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.3;
          z-index: -1;
        }
        
        /* New Feature Badge */
        .feature-badge {
          display: inline-flex;
          align-items: center;
          background-color: #f0f9ff;
          color: #0369a1;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .feature-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Enhanced Card Styles */
        .card {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .hover-shadow {
          transition: all 0.3s ease;
        }
        
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        
        /* Why Lissomsoft Icon Wrapper */
        .why-icon-wrapper {
          background-color: #f0f9ff;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          transition: all 0.3s ease;
        }
        
        .card:hover .why-icon-wrapper {
          transform: scale(1.1);
          background-color: #e0f2fe;
        }
        
        /* Certification Badge */
        .certification-badge {
          background-color: white;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .certification-badge:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        /* Background Gradients */
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0f172a, #1e293b);
        }
        
        .bg-gradient-secondary {
          background: linear-gradient(135deg, #0891b2, #0284c7);
        }
        
        /* Product Showcase */
        .product-showcase {
          transition: all 0.3s ease;
        }
        
        .product-showcase:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Animation classes */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-delay {
          opacity: 0;
          transition: opacity 0.8s ease-out;
          transition-delay: 0.3s;
        }
        
        .fade-in-delay.animate-in {
          opacity: 1;
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .scale-in.animate-in {
          opacity: 1;
          transform: scale(1);
        }
        
        .slide-in-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .slide-in-left.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .slide-in-right {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .slide-in-right.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        /* Transition animations */
        .fade-out {
          animation: fadeOut 0.5s forwards;
        }
        
        .fade-in {
          animation: fadeIn 0.5s forwards;
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Counter Animation */
        .counter-value {
          display: inline-block;
          position: relative;
        }
        
        /* Animate on scroll */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-slide-up {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Responsive styles */
        @media (max-width: 991.98px) {
          .service-nav-wrapper {
            flex-wrap: wrap;
          }
          
          .service-nav-item {
            flex: 1 0 45%;
            margin-bottom: 0.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .service-content-section {
            padding: 4rem 0;
          }
        }
        
        @media (max-width: 767.98px) {
          .service-nav-item {
            flex: 1 0 100%;
            margin-bottom: 0.5rem;
          }
          
          .service-content-section {
            padding: 3rem 0;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .section-description {
            font-size: 1rem;
          }
          
          .feature-badge {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage

