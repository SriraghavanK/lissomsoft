"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import HeroSection from "../components/Herosection"

const ServicePage = ({ pageData, serviceCategories = null, accordionData = null }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeService, setActiveService] = useState(serviceCategories ? serviceCategories[0].id : null)
  const [isVisible, setIsVisible] = useState({})
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const overviewRef = useRef(null)
  const approachRef = useRef(null)
  const servicesRef = useRef(null)
  const navRef = useRef(null)
  const [isNavFixed, setIsNavFixed] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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

      // Update active tab based on scroll position
      if (overviewRef.current && approachRef.current && servicesRef.current) {
        const overviewRect = overviewRef.current.getBoundingClientRect()
        const approachRect = approachRef.current.getBoundingClientRect()
        const servicesRect = servicesRef.current.getBoundingClientRect()

        // Get the viewport height
        const viewportHeight = window.innerHeight

        // Calculate which section occupies most of the viewport
        const overviewVisibleHeight = Math.min(viewportHeight, overviewRect.bottom) - Math.max(0, overviewRect.top)
        const approachVisibleHeight = Math.min(viewportHeight, approachRect.bottom) - Math.max(0, approachRect.top)
        const servicesVisibleHeight = Math.min(viewportHeight, servicesRect.bottom) - Math.max(0, servicesRect.top)

        // Set active tab based on which section has the most visible area
        if (servicesVisibleHeight > approachVisibleHeight && servicesVisibleHeight > overviewVisibleHeight) {
          setActiveTab(pageData.servicesTabId || "services")
        } else if (approachVisibleHeight > overviewVisibleHeight && approachVisibleHeight > servicesVisibleHeight) {
          setActiveTab("approach")
        } else {
          setActiveTab("overview")
        }
      }

      // Check if we've scrolled past the hero section to fix the navigation
      const heroSection = document.querySelector(".hero-section")
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsNavFixed(heroBottom <= 0)
      }
    }

    // Initialize Bootstrap components
    if (typeof window !== "undefined" && window.bootstrap) {
      // Initialize tooltips
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl))
    }

    // Initial check
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Add resize listener to close mobile menu on resize
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [pageData.servicesTabId, mobileMenuOpen])

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    let ref
    if (sectionId === "overview") ref = overviewRef
    else if (sectionId === "approach") ref = approachRef
    else if (sectionId === "services" || sectionId === "consulting-services") ref = servicesRef

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setActiveTab(sectionId)
      setMobileMenuOpen(false) // Close mobile menu after clicking
    }
  }

  // Function to handle service category selection
  const handleServiceSelect = (serviceId) => {
    setActiveService(serviceId)
  }

  return (
    <div className="service-page">
      {/* Hero Section */}
      <HeroSection
        title={pageData.hero.title}
        subtitle={pageData.hero.subtitle}
        buttonText={pageData.hero.buttonText}
        buttonLink={pageData.hero.buttonLink}
        imageSrc={pageData.hero.imageSrc}
        target={pageData.hero.target}
      />

      {/* Navigation Tabs - Conditionally Fixed */}
      <section
        className={`py-0 ${isNavFixed ? "service-nav-fixed" : ""}`}
        id="service-nav"
        style={{
          position: isNavFixed ? "fixed" : "relative",
          top: isNavFixed ? "0" : "auto",
          width: "100%",
          zIndex: 990, // Reduced z-index to be lower than the main navbar
        }}
      >
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="nav-tabs-container" ref={navRef}>
                {/* Mobile Toggle Button */}
                <button
                  className="mobile-nav-toggle d-md-none w-100"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle navigation"
                  type="button"
                >
                  <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} me-2`}></i>
                  <span>
                    {activeTab === "overview"
                      ? "Overview"
                      : activeTab === "approach"
                        ? "Approach"
                        : pageData.servicesTabName || "Services"}
                  </span>
                </button>

                <ul className={`nav nav-tabs nav-fill scrollable-tabs ${mobileMenuOpen ? "mobile-open" : ""}`}>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                      onClick={() => scrollToSection("overview")}
                    >
                      <i className="fas fa-info-circle me-2 d-none d-md-inline"></i>
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "approach" ? "active" : ""}`}
                      onClick={() => scrollToSection("approach")}
                    >
                      <i className="fas fa-route me-2 d-none d-md-inline"></i>
                      Approach
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "services" || activeTab === "consulting-services" ? "active" : ""
                      }`}
                      onClick={() => scrollToSection(pageData.servicesTabId || "services")}
                    >
                      <i className="fas fa-cogs me-2 d-none d-md-inline"></i>
                      {pageData.servicesTabName || "Services"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer div to prevent content jump when nav becomes fixed */}
      {isNavFixed && <div style={{ height: navRef.current ? navRef.current.offsetHeight : 0 }} />}

      {/* Overview Section */}
      <section id="overview" ref={overviewRef} className="py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll" data-id="overview-content">
              <div className="section-header mb-4">
                <h2 className="fw-bold mb-3 position-relative service-title">
                  {pageData.overview.title}
                  <span className="title-underline"></span>
                </h2>
                {pageData.overview.subtitle && <h3 className="h4 mb-4 text-secondary">{pageData.overview.subtitle}</h3>}
              </div>
              <div className="overview-content">
                {typeof pageData.overview.content === "string" ? (
                  <p className="lead mb-4">{pageData.overview.content}</p>
                ) : (
                  pageData.overview.content
                )}
              </div>

              {/* Features list if available */}
              {pageData.overview.features && (
                <div className="features-list mt-4">
                  <div className="row">
                    {pageData.overview.features.map((feature, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <div className="feature-item d-flex align-items-start">
                          <div className="feature-icon me-3">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <div className="feature-text">{feature}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-6 animate-on-scroll" data-id="overview-image" style={{ animationDelay: "0.3s" }}>
              <div className="image-container position-relative">
                <img
                  src={pageData.overview.image || "/placeholder.svg"}
                  alt={pageData.overview.title}
                  className="img-fluid rounded shadow-lg"
                />
                <div className="image-shape-1"></div>
                <div className="image-shape-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" ref={approachRef} className="py-5 bg-light">
        <div className="container py-4">
          <div className="row">
            <div className="col-12 text-center mb-5 animate-on-scroll" data-id="approach-title">
              <h2 className="fw-bold position-relative d-inline-block">
                Approach
                <span className="title-underline"></span>
              </h2>
            </div>
          </div>

          {/* Approach Content */}
          {pageData.approach.multipleApproaches ? (
            // Multiple approach diagrams
            <div className="row">
              {pageData.approach.approaches.map((approach, index) => (
                <div key={index} className="col-lg-6 mb-5 mb-lg-0">
                  <div className="approach-item text-center animate-on-scroll" data-id={`approach-item-${index}`}>
                    <div className="approach-image-container mb-4">
                      <img
                        src={approach.image || "/placeholder.svg"}
                        alt={approach.title}
                        className="img-fluid approach-image"
                      />
                    </div>
                    <h3 className="h4 mb-3">{approach.title}</h3>
                    <p className="mb-0">{approach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Single approach content
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll" data-id="approach-content">
                <div className="approach-content">
                  {typeof pageData.approach.content === "string" ? (
                    <p className="lead mb-4">{pageData.approach.content}</p>
                  ) : (
                    pageData.approach.content
                  )}
                </div>
                {pageData.approach.steps && (
                  <div className="approach-steps mt-4">
                    {pageData.approach.steps.map((step, index) => (
                      <div key={index} className="approach-step mb-3 d-flex align-items-start">
                        <div className="step-number me-3">
                          <span className="badge bg-primary rounded-circle">{index + 1}</span>
                        </div>
                        <div className="step-text">{step}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-lg-6 animate-on-scroll" data-id="approach-image" style={{ animationDelay: "0.3s" }}>
                <div className="approach-image-container text-center">
                  <img
                    src={pageData.approach.image || "/placeholder.svg"}
                    alt="Approach"
                    className="img-fluid approach-image"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id={pageData.servicesTabId || "services"} ref={servicesRef} className="py-5">
        <div className="container py-4">
          <div className="row">
            <div className="col-12 text-center mb-5 animate-on-scroll" data-id="services-title">
              <h2 className="fw-bold position-relative d-inline-block">
                {pageData.servicesTabName || "Services"}
                <span className="title-underline"></span>
              </h2>
            </div>
          </div>

          {/* Service Categories - Only shown if serviceCategories is provided */}
          {serviceCategories && (
            <div className="row mb-5 animate-on-scroll" data-id="service-categories">
              <div className="col-12">
                <div className="service-categories-wrapper">
                  <div className="scrollable-categories">
                    {serviceCategories.map((category, index) => (
                      <div className="category-item" key={category.id}>
                        <div
                          className={`card h-100 border-0 service-category-card ${
                            activeService === category.id ? "active" : ""
                          }`}
                          onClick={() => handleServiceSelect(category.id)}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="card-body d-flex align-items-center justify-content-center text-center p-4">
                            <h5 className="card-title mb-0">{category.name}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Accordion for Services */}
          <div className="row">
            <div className="col-12 animate-on-scroll" data-id="services-accordion">
              <div className="accordion custom-accordion" id="servicesAccordion">
                {/* If accordionData is provided, use it based on activeService */}
                {accordionData && activeService
                  ? accordionData[activeService].map((item, index) => (
                      <div className="accordion-item" key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${item.id}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                          >
                            {item.title}
                          </button>
                        </h2>
                        <div
                          id={item.id}
                          className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                          data-bs-parent="#servicesAccordion"
                        >
                          <div className="accordion-body">
                            {typeof item.content === "string" ? <p>{item.content}</p> : item.content}
                          </div>
                        </div>
                      </div>
                    ))
                  : // Otherwise use the services from pageData
                    pageData.services &&
                    pageData.services.map((service, index) => (
                      <div className="accordion-item" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                          >
                            {service.title}
                          </button>
                        </h2>
                        <div
                          id={`collapse${index}`}
                          className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                          data-bs-parent="#servicesAccordion"
                        >
                          <div className="accordion-body">
                            {typeof service.content === "string" ? <p>{service.content}</p> : service.content}
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary text-white">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center animate-on-scroll" data-id="cta-content">
              <div className="cta-content p-4 p-md-5">
                <h3 className="mb-4 fw-bold">{pageData.cta.title}</h3>
                <p className="lead mb-4">{pageData.cta.subtitle}</p>
                <Link
                  to={pageData.cta.buttonLink}
                  className="btn btn-light btn-lg px-4 py-2"
                  onClick={pageData.cta.onClick || scrollToTop}
                  target={pageData.cta.target}
                >
                  {pageData.cta.buttonText}
                  <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Optional */}
      {pageData.stats && (
        <section className="py-5 bg-light">
          <div className="container py-4">
            <div className="row">
              {pageData.stats.map((stat, index) => (
                <div key={index} className="col-6 col-md-3 mb-4 mb-md-0 text-center">
                  <div
                    className="stat-item animate-on-scroll"
                    data-id={`stat-${index}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="stat-icon mb-3">
                      <i className={`fas ${stat.icon} fa-2x text-primary`}></i>
                    </div>
                    <h2 className="display-5 fw-bold mb-0 counter-value">{stat.value}</h2>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CSS for enhanced styling */}
      <style jsx>{`
        /* Enhanced Navigation Tabs - Scrollable */
        .nav-tabs-container {
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 1010;
        }
        
        .scrollable-tabs {
          display: flex;
          flex-wrap: nowrap;
          border-bottom: none;
          transition: all 0.3s ease;
        }
        
        .nav-tabs .nav-link {
          border: none;
          color: #495057;
          font-weight: 500;
          padding: 1rem 1.5rem;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }
        
        .nav-tabs .nav-link:hover {
          color: #0d6efd;
          background-color: rgba(13, 110, 253, 0.05);
        }
        
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          background-color: transparent;
          font-weight: 600;
        }
        
        .nav-tabs .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #0d6efd, #0dcaf0);
          border-radius: 3px 3px 0 0;
        }
        
        /* Mobile Navigation Toggle */
        .mobile-nav-toggle {
          display: none;
          width: 100%;
          padding: 1rem;
          background: #fff;
          border: none;
          text-align: left;
          font-weight: 500;
          color: #495057;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        /* Service Categories Wrapper */
        .service-categories-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        /* Scrollable Categories */
        .scrollable-categories {
          display: flex;
          overflow-x: auto;
          padding-bottom: 10px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          gap: 15px;
          scroll-snap-type: x mandatory;
          flex-wrap: nowrap;
          width: 100%;
        }

        .scrollable-categories::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }

        .category-item {
          flex: 0 0 auto;
          min-width: 200px;
          scroll-snap-align: start;
        }
        
        /* Section Title Styling */
        .service-title {
          position: relative;
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        
        .title-underline {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #0d6efd, #0dcaf0);
          border-radius: 2px;
        }
        
        /* Image Container Styling */
        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .image-shape-1 {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(13, 110, 253, 0.2), rgba(13, 202, 240, 0.2));
          border-radius: 50%;
          z-index: -1;
        }
        
        .image-shape-2 {
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(13, 202, 240, 0.2), rgba(13, 110, 253, 0.2));
          border-radius: 50%;
          z-index: -1;
        }
        
        /* Approach Image */
        .approach-image {
          max-width: 100%;
          transition: all 0.5s ease;
        }
        
        .approach-image:hover {
          transform: scale(1.02);
        }
        
        /* Approach Item Styling */
        .approach-item {
          background-color: #fff;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .approach-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* Feature Item Styling */
        .feature-item {
          transition: all 0.3s ease;
        }
        
        .feature-item:hover {
          transform: translateX(5px);
        }
        
        .feature-icon {
          color: #0d6efd;
          font-size: 1.25rem;
        }
        
        /* Service Category Cards */
        .service-category-card {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .service-category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .service-category-card.active {
          background: linear-gradient(135deg, #0d6efd, #0dcaf0);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(13, 110, 253, 0.2);
        }
        
        /* Custom Accordion Styling */
        .custom-accordion .accordion-item {
          border: none;
          margin-bottom: 1rem;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .custom-accordion .accordion-item:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        .custom-accordion .accordion-button {
          padding: 1.25rem 1.5rem;
          font-weight: 600;
          background-color: #fff;
          color: #212529;
          box-shadow: none;
        }
        
        .custom-accordion .accordion-button:not(.collapsed) {
          color: #0d6efd;
          background-color: rgba(13, 110, 253, 0.05);
        }
        
        .custom-accordion .accordion-button:focus {
          box-shadow: none;
          border-color: rgba(13, 110, 253, 0.25);
        }
        
        .custom-accordion .accordion-button::after {
          background-size: 1.25rem;
          transition: all 0.3s ease;
        }
        
        .custom-accordion .accordion-body {
          padding: 1.5rem;
          background-color: #fff;
        }
                 .scrollable-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    overflow-x: auto;
    padding-bottom: 10px;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    width: 100%;
}

.scrollable-categories > div {
    width: calc(50% - 15px); /* 50% width for 2 items in a row */
    box-sizing: border-box;
}
        
        /* CTA Section */
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0d6efd, #0dcaf0);
        }
        
        .cta-content {
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .cta-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
          z-index: 1;
        }
        
        .cta-content > * {
          position: relative;
          z-index: 2;
        }
        
        /* Stats Section */
        .stat-item {
          padding: 2rem 1rem;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: rgba(13, 110, 253, 0.1);
          margin-bottom: 1rem;
        }
        
        .counter-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0d6efd;
          margin-bottom: 0.5rem;
        }
        
        /* Animation classes */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-slide-up {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Responsive Adjustments */
        @media (max-width: 991.98px) {
          .service-title {
            font-size: 1.75rem;
          }
          
          .counter-value {
            font-size: 2rem;
          }
          
          .stat-icon {
            width: 60px;
            height: 60px;
          }
          
          .category-item {
            min-width: 180px;
          }
        }
        
        @media (max-width: 767.98px) {
          /* Mobile Navigation */
          .mobile-nav-toggle {
            display: flex;
            align-items: center;
          }

          .scrollable-tabs {
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #fff;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            max-height: 0;
            overflow: hidden;
            z-index: 1000;
            transition: max-height 0.3s ease;
          }

          .scrollable-tabs.mobile-open {
            max-height: 300px;
            display: flex;
          }

          .nav-tabs .nav-link {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            width: 100%;
            text-align: left;
          }

          .nav-tabs .nav-link.active::after {
            width: 4px;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 0 3px 3px 0;
          }
          
          /* Service Categories for Mobile */



          .category-item {
            flex: 0 0 auto;
            min-width: 150px;
            max-width: none;
            width: auto;
            margin: 0 5px;
            scroll-snap-align: start;
          }

          .service-category-card {
            height: 100%;
          }
          
          .service-category-card .card-body {
            padding: 0.75rem;
          }
          
          .service-category-card .card-title {
            font-size: 0.9rem;
          }
          
          /* Service Categories */
          .category-item {
            min-width: 150px;
          }
          
          .scrollable-categories {
            gap: 10px;
            margin: 0 -10px;
            padding: 0 10px;
          }
          
          .service-category-card .card-body {
            padding: 0.75rem;
          }
          
          .service-category-card .card-title {
            font-size: 0.9rem;
          .service-category-card .card-body {
            padding: 0.5rem;
          }
          
          .service-category-card .card-title {
            font-size: 0.85rem;
          }
          
          .cta-content {
            padding: 1.5rem !important;
          }
          
          .cta-content h3 {
            font-size: 1.5rem;
          }
          
          .cta-content .lead {
            font-size: 1rem;
          }
          
          .cta-content .btn {
            width: 100%;
            margin-top: 1rem;
          }
        }
        
        @media (max-width: 575.98px) {
          .section-header h2 {
            font-size: 1.5rem;
          }
          
          .lead {
            font-size: 1rem;
          }
          
          .approach-step {
            flex-direction: column;
          }
          
          .step-number {
            margin-bottom: 0.5rem;
          }
          
          .category-item {
            min-width: 120px;
          }
          
          .service-category-card .card-body {
            padding: 0.5rem;
          }
          
          .service-category-card .card-title {
            font-size: 0.85rem;
          .service-category-card .card-body {
            padding: 0.5rem;
          }
          
          .service-category-card .card-title {
            font-size: 0.85rem;
          }
          
          .cta-content {
            padding: 1.5rem !important;
          }
          
          .cta-content h3 {
            font-size: 1.5rem;
          }
          
          .cta-content .lead {
            font-size: 1rem;
          }
          
          .cta-content .btn {
            width: 100%;
            margin-top: 1rem;
          }
        }

        /* Fixed Navigation Styles */
        .service-nav-fixed {
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
        }

        /* Remove the sticky positioning from service-nav-sticky */
        .service-nav-sticky {
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          position: relative;
          z-index: 1020;
        }

        .nav-tabs-container {
          background-color: #fff;
          position: relative;
          z-index: 1010;
        }

        /* Ensure the nav stays on top of other elements */
        #service-nav {
          position: sticky;
          top: 0;
          z-index: 990;
        }
      `}</style>
    </div>
  )
}

export default ServicePage
  