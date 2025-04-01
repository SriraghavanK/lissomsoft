"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/Herosection";
import "../styles/PartnersPage.css";

const PartnersPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activePartnerType, setActivePartnerType] = useState("referral");
  const servicesRef = useRef(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Hero content for the partners page
  const heroContent = {
    title: "Global Growth Awaits: Partner with Lissomsoft",
    subtitle:
      "Unlock New Horizons with Strategic Collaboration in Risktech, Cloud Services, and Digital Transformation.",
    buttonText: "Become a Partner",
    buttonLink: "/contact",
    imageSrc:
      "https://imgs.search.brave.com/Ua0_eztVp19ZXS03l8eZy6J7Srrwe1YsC-PqxH9vtWw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8x/Mi8wNi8xNi8wMy9i/dXNpbmVzcy00Njc3/NjM5XzY0MC5wbmc",
  };

  // Partnership models data
  const partnershipModels = {
    referral: {
      title: "Referral Partners",
      icon: "handshake",
      description:
        "Refer clients to Lissomsoft and earn competitive commissions on successful deals. Ideal for consultants and advisors.",
      benefits: [
        "Competitive commission structure",
        "Marketing and sales support",
        "No technical expertise required",
        "Dedicated partner manager",
      ],
      image:
        "https://imgs.search.brave.com/5axY5zs81-XnoZ6y2f6T8BLV2ZdPVX7BlGbS_XVOwq4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMjAzNjM0/NDQvMzE2NzAvaS80/NTAvZGVwb3NpdHBo/b3Rvc18zMTY3MDMw/NzAtc3RvY2stcGhv/dG8tYmVhdXRpZnVs/LWNoZWVyZnVsLWNv/dXBsZS1idW1waW5n/LWZpc3RzLmpwZw",
    },
    technology: {
      title: "Technology Partners",
      icon: "code-branch",
      description:
        "Integrate your technology with Lissomsoft's solutions to create comprehensive offerings for clients.",
      benefits: [
        "API integration support",
        "Joint product development",
        "Technical documentation",
        "Co-marketing opportunities",
      ],
      image:
        "https://imgs.search.brave.com/jioVJx-AShI6Fsl3b1ne3Dy0c7oRTd84chWSGZLh_80/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9idXNpbmVzc21l/bi1lbmdpbmVlcnMt/am9pbi1oYW5kcy1i/dWlsZC1zdWNjZXNz/ZnVsLXByb2plY3Rz/LXRlYW13b3JrLWNv/bmNlcHRfNDQxODct/MjIwLmpwZz9zZW10/PWFpc19oeWJyaWQ",
    },
    strategic: {
      title: "Strategic Alliances",
      icon: "building",
      description:
        "Form deep strategic partnerships to jointly address market opportunities and develop solutions.",
      benefits: [
        "Joint go-to-market strategy",
        "Shared resources and expertise",
        "Executive-level engagement",
        "Long-term business growth",
      ],
      image:
        "https://imgs.search.brave.com/_b5-iLRxDvoJDokorBk5dqqsnyc4A6rLAE3YbYlkbGI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zdHJh/dGVnaWMtYWxsaWFu/Y2UtbWFuLXdvcmtp/bmctaG9sb2dyYXBo/aWMtaW50ZXJmYWNl/LXZpc3VhbC1zY3Jl/ZW4tc3RyYXRlZ2lj/LWFsbGlhbmNlLW1h/bi13b3JraW5nLWhv/bG9ncmFwaGljLWlu/dGVyZmFjZS05OTU1/MzAyMC5qcGc",
    },
    reseller: {
      title: "Value Reseller",
      icon: "store",
      description:
        "Join forces with Lissomsoft as a Technology cum Business Consulting partner, offering tailored solutions.",
      benefits: [
        "Comprehensive product training",
        "Dedicated support team",
        "Competitive pricing models",
        "Marketing resources",
      ],
      image:
        "https://imgs.search.brave.com/QjrrAtdtdhwUSFn2uiCY4Rc5OWTfyQ38AZD1R_DfRY4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9qb2It/dHJhaW5pbmctc3Ry/YXRlZ3ktMTgzMjc1/NzIuanBn",
    },
  };

  // Partnership benefits data
  const partnershipBenefits = [
    {
      title: "Strategic Collaboration",
      description:
        "Combine our expertise in risk management and digital transformation with your domain knowledge to create powerful solutions.",
      icon: "handshake",
      color: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    },
    {
      title: "Business Growth",
      description:
        "Expand your market reach and access new customer segments through our established presence in various industries.",
      icon: "chart-line",
      color: "linear-gradient(135deg, #10b981, #059669)",
    },
    {
      title: "Technology Integration",
      description:
        "Leverage our cutting-edge technology stack to enhance your offerings and deliver more value to your clients.",
      icon: "cogs",
      color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    },
    {
      title: "Global Reach",
      description:
        "Access international markets through our global network of partners and clients across multiple continents.",
      icon: "globe",
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
    },
  ];

  // Global partners data
  const globalPartners = [
    {
      country: "India",
      flag: "https://www.lissomsoft.com/assets/Country%20Flags/india.jpg",
    },
    {
      country: "Singapore",
      flag: "https://www.lissomsoft.com/assets/Country%20Flags/singapore.jpg",
    },
    {
      country: "Oman",
      flag: "https://www.lissomsoft.com/assets/Country%20Flags/oman.jpg",
    },
    {
      country: "Nigeria",
      flag: "https://www.lissomsoft.com/assets/Country%20Flags/nigeria.jpg",
    },
    {
      country: "Bahrain",
      flag: "https://www.lissomsoft.com/assets/Country%20Flags/bahrain.jpg",
    },
    {
      country: "UAE",
      flag: "https://www.lissomsoft.com/assets/Country%20Flags/uae.jpg",
    },
    {
      country: "South Africa",
      flag: "https://www.lissomsoft.com/assets/partners/southafrica.jpg",
    },
    {
      country: "Morocco",
      flag: "https://www.lissomsoft.com/assets/Country%20Flags/morocco.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechVision Partners",
      content:
        "Partnering with Lissomsoft has been transformative for our business. Their expertise in risk management solutions has allowed us to offer comprehensive services to our clients.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Michael Chen",
      position: "Director, GlobalTech Solutions",
      content:
        "As a technology partner, we've found Lissomsoft's integration capabilities exceptional. Their team works collaboratively to ensure seamless product integration.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Priya Sharma",
      position: "Managing Partner, Innovate Consulting",
      content:
        "The strategic alliance with Lissomsoft has opened new markets for our firm. Their cloud services expertise complements our consulting practice perfectly.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isElementVisible = rect.top < window.innerHeight - 100;

        if (isElementVisible) {
          element.classList.add("animate-slide-up");
          setIsVisible((prev) => ({ ...prev, [element.dataset.id]: true }));
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Initialize Bootstrap tooltips and carousels
  useEffect(() => {
    // Check if Bootstrap is available
    if (typeof window !== "undefined" && window.bootstrap) {
      // Initialize tooltips
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(
        (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
      );

      // Initialize carousels
      const carouselList = [].slice.call(
        document.querySelectorAll(".carousel")
      );
      carouselList.map(
        (carouselEl) =>
          new window.bootstrap.Carousel(carouselEl, {
            interval: 5000,
          })
      );
    }
  }, []);

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="partners-page">
      {/* Hero Section */}
      <HeroSection
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        buttonText={heroContent.buttonText}
        buttonLink={heroContent.buttonLink}
        imageSrc={heroContent.imageSrc}
        className="responsive-hero"
      />

      {/* Introduction Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center">
            <div
              className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll"
              data-id="intro-image"
            >
              <div className="position-relative">
                <img
                  src="https://imgs.search.brave.com/nZ2szHT1d3PIbp2dqOxF4OWsAvH2L6c6BkRnhnWq4Y8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMzU5MTQy/OS8xMTY3Ny9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzExNjc3MDk0/NC1zdG9jay1waG90/by1maXN0LWJ1bXAt/Y29sbGVhZ3Vlcy5q/cGc"
                  alt="Partnership"
                  className="img-fluid rounded-lg shadow-lg intro-image"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=400&width=600";
                  }}
                />
                <div className="position-absolute top-0 start-0 translate-middle bg-primary rounded-circle p-3 shadow-lg d-none d-lg-block">
                  <i className="fas fa-handshake text-white fa-2x"></i>
                </div>
                <div className="position-absolute bottom-0 end-0 translate-middle bg-success rounded-circle p-3 shadow-lg d-none d-lg-block">
                  <i className="fas fa-check text-white fa-2x"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-6 animate-on-scroll" data-id="intro-content">
              <h2 className="fw-bold mb-4 gradient-text">
                Partner with Lissomsoft
              </h2>
              <p className="mb-4 lead">
                Embark on a journey of global expansion by joining forces with
                Lissomsoft. We invite you to combine our strengths in business,
                domain expertise, and cutting-edge technology to co-create
                robust solutions for the businesses you serve.
              </p>
              <p className="mb-4">
                Lissomsoft is eager to forge partnerships in Risktech, Cloud
                Services, Digital Transformation, and related domains,
                leveraging our established presence in specific industries.
                Let's synergize your domain, consulting, or technology with our
                capabilities in focused areas, fostering business growth and
                transformation for your clients.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <div className="feature-badge">
                  <i className="fas fa-check-circle me-2"></i>
                  <span>Global reach</span>
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
              <Link to="/contact" className="btn btn-primary-modern" onClick={scrollToTop}>
                Let's Talk Partnership
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-5 bg-light" ref={servicesRef}>
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2
                className="fw-bold mb-3 animate-on-scroll"
                data-id="benefits-title"
              >
                Partnership Benefits
              </h2>
              <p
                className="lead text-muted animate-on-scroll"
                data-id="benefits-subtitle"
              >
                Join our partner program to collaborate and grow together
              </p>
            </div>
          </div>

          <div className="row">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div
                  className="card h-100 border-0 shadow-sm hover-lift transition-all animate-on-scroll"
                  data-id={`benefit-${index}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="card-body p-4 text-center">
                    <div
                      className="benefit-icon-wrapper mb-4 mx-auto"
                      style={{ background: benefit.color }}
                    >
                      <i
                        className={`fas fa-${benefit.icon} fa-2x text-white`}
                      ></i>
                    </div>
                    <h3 className="h5 card-title fw-bold mb-3">
                      {benefit.title}
                    </h3>
                    <p className="card-text text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2
                className="fw-bold mb-3 animate-on-scroll"
                data-id="models-title"
              >
                Partnership Models
              </h2>
              <p
                className="lead text-muted animate-on-scroll"
                data-id="models-subtitle"
              >
                Choose the partnership model that best suits your business needs
              </p>
            </div>
          </div>

          {/* Partnership Model Navigation */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="partnership-nav">
                {Object.keys(partnershipModels).map((type) => (
                  <button
                    key={type}
                    className={`partnership-nav-item ${
                      activePartnerType === type ? "active" : ""
                    }`}
                    onClick={() => setActivePartnerType(type)}
                  >
                    <i
                      className={`fas fa-${partnershipModels[type].icon} me-2`}
                    ></i>
                    <span>{partnershipModels[type].title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Partnership Model Content */}
          <div className="row align-items-center">
            <div
              className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll"
              data-id="model-content"
            >
              <h3 className="fw-bold mb-3">
                {partnershipModels[activePartnerType].title}
              </h3>
              <p className="lead mb-4">
                {partnershipModels[activePartnerType].description}
              </p>

              <h4 className="h5 mb-3">Key Benefits:</h4>
              <ul className="partnership-benefits-list mb-4">
                {partnershipModels[activePartnerType].benefits.map(
                  (benefit, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      <span>{benefit}</span>
                    </li>
                  )
                )}
              </ul>

              <Link to="/contact" className="btn btn-primary-modern" onClick={scrollToTop}>
                Apply for {partnershipModels[activePartnerType].title} Program
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-lg-6 animate-on-scroll" data-id="model-image">
              <div className="model-image-wrapper">
                <img
                  src={
                    partnershipModels[activePartnerType].image ||
                    "/placeholder.svg"
                  }
                  alt={partnershipModels[activePartnerType].title}
                  className="img-fluid rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=400&width=600";
                  }}
                />
                <div className="image-decoration"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Partners Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2
                className="fw-bold mb-3 animate-on-scroll"
                data-id="global-title"
              >
                Our Partners Around The Globe
              </h2>
              <p
                className="lead text-muted animate-on-scroll"
                data-id="global-subtitle"
              >
                Join our growing network of international partners
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="global-partners-grid">
                {globalPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="global-partner-item animate-on-scroll"
                    data-id={`partner-${index}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flag-wrapper">
                      <img
                        src={partner.flag || "/placeholder.svg"}
                        alt={`${partner.country} flag`}
                        className="country-flag"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=60&width=100";
                        }}
                      />
                    </div>
                    <p className="country-name">{partner.country}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row mb-4 text-center">
            <div className="col-lg-8 mx-auto">
              <h2
                className="fw-bold mb-3 animate-on-scroll"
                data-id="testimonials-title"
              >
                Partner Success Stories
              </h2>
              <p
                className="lead text-muted animate-on-scroll"
                data-id="testimonials-subtitle"
              >
                Hear from our valued partners
              </p>
            </div>
          </div>

          <div
            id="testimonialCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">
                          <div className="d-flex flex-column flex-md-row align-items-center mb-4">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="rounded-circle me-md-4 mb-3 mb-md-0 img-fluid"
                              width="80"
                              height="80"
                              onError={(e) => {
                                e.target.src =
                                  "/placeholder.svg?height=80&width=80";
                              }}
                            />
                            <div className="text-center text-md-start">
                              <h5 className="mb-1">{testimonial.name}</h5>
                              <p className="text-muted mb-0">
                                {testimonial.position}
                              </p>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <i className="fas fa-quote-left fa-2x text-primary opacity-25 mb-3"></i>
                            <p className="lead mb-0">{testimonial.content}</p>
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
              <span
                className="carousel-control-prev-icon bg-dark rounded-circle p-3"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon bg-dark rounded-circle p-3"
                aria-hidden="true"
              ></span>
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

      {/* Partner Video Section */}
      <section className="py-5 bg-gradient-primary text-white">
        <div className="container py-4">
          <div className="row align-items-center">
            <div
              className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll"
              data-id="video-content"
            >
              <h2 className="fw-bold mb-4">Get to Know Our Partners</h2>
              <p className="lead mb-4">
                Discover the firsthand experiences of our global partners as
                they share insights on the synergy they've found with
                Lissomsoft.
              </p>
              <p className="mb-4">
                Learn how they are not only recommending configurable solutions
                for rapid value delivery but also extending the power of their
                technology expertise to expand their businesses.
              </p>
              <Link to="/contact" className="btn btn-light" onClick={scrollToTop}>
                Join Our Partner Network
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-lg-6 animate-on-scroll" data-id="video-player">
              <div className="video-wrapper rounded-lg overflow-hidden shadow-lg">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Partner Testimonial"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="card border-0 shadow-lg p-3 p-md-5 animate-on-scroll"
                data-id="cta-card"
              >
                <div className="card-body text-center">
                  <h2 className="fw-bold mb-4">
                    Interested in Partnering with Us?
                  </h2>
                  <p className="lead mb-4">
                    Take the first step towards a mutually beneficial
                    partnership. Contact us today to explore the possibilities.
                  </p>
                  <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                    <Link
                      to="/contact"
                      className="btn btn-primary-modern btn-lg"
                      onClick={scrollToTop}
                    >
                      <i className="fas fa-handshake me-2"></i>
                      Become a Partner
                    </Link>
                    <Link to="#" className="btn btn-outline-primary btn-lg">
                      <i className="fas fa-info-circle me-2"></i>
                      Learn More About Our Services
                    </Link>
                  </div>
                </div>
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
          min-height: 80vh;
          overflow: hidden;
        }
        
        /* Introduction Section Styles */
        .intro-image {
          transition: all 0.5s ease;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        
        .intro-image:hover {
          transform: scale(1.03);
        }
        
        /* Partnership Benefits Styles */
        .benefit-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .card:hover .benefit-icon-wrapper {
          transform: scale(1.1);
        }
        
        /* Partnership Models Navigation */
        .partnership-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
        
        .partnership-nav-item {
          background: white;
          border: 1px solid #e2e8f0;
          color: #64748b;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .partnership-nav-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
        }
        
        .partnership-nav-item.active {
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          color: white;
          border-color: transparent;
          box-shadow: 0 10px 15px rgba(59, 130, 246, 0.2);
        }
        
        /* Partnership Benefits List */
        .partnership-benefits-list {
          list-style: none;
          padding-left: 0;
        }
        
        .partnership-benefits-list li {
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
        }
        
        /* Model Image Styles */
        .model-image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 100%;
        }
        
        .model-image-wrapper img {
          transition: all 0.5s ease;
          width: 100%;
          height: auto;
          object-fit: cover;
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
        
  .global-partners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          justify-content: center;
        }

     

        @media (max-width: 550.98px) {
          .global-partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .global-partner-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .flag-wrapper {
          width: 100px;
          height: 60px;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }
        
        .flag-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .country-flag {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .country-name {
          font-weight: 500;
          margin-bottom: 0;
        }
        
        /* Video Wrapper */
        .video-wrapper {
          transition: all 0.3s ease;
        }
        
        .video-wrapper:hover {
          transform: translateY(-5px);
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
        
        /* Feature Badge */
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
        
        /* Background Gradients */
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0f172a, #1e293b);
        }
        
        /* Hover Effects */
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
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
        
        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        
        /* Responsive styles */
        @media (max-width: 991.98px) {
          .partnership-nav {
            flex-wrap: wrap;
          }
          
          .partnership-nav-item {
            flex: 1 0 45%;
            margin-bottom: 0.5rem;
            text-align: center;
          }
          
       
        
        @media (max-width: 767.98px) {
          .partnership-nav-item {
            flex: 1 0 100%;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            padding: 0.6rem 1rem;
          }
       
          
          .flag-wrapper {
            width: 80px;
            height: 50px;
          }
          
          .feature-badge {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }

        /* Additional responsive styles */
        @media (max-width: 575.98px) {
          .benefit-icon-wrapper {
            width: 60px;
            height: 60px;
          }
          
          .feature-badge {
            font-size: 0.75rem;
            padding: 0.3rem 0.6rem;
            margin-right: 0.3rem;
          }
          
        
          
          .flag-wrapper {
            width: 70px;
            height: 40px;
          }
          
          .country-name {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnersPage;
