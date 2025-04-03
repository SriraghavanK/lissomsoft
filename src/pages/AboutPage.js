"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Parallax } from "react-parallax"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "../styles/AboutPage.css"

const AboutPage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  } 
  // Animation controls
  const controls = useAnimation()
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [missionRef, missionInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // Stats counter
  const [counts, setCounts] = useState({ years: 0, clients: 0, industries: 0, countries: 0 })
  const targetCounts = { years: 15, clients: 100, industries: 10, countries: 12 }

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      position: "CEO, TechStart Inc.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Lissomsoft transformed our business operations with their innovative digital solutions. Their team's expertise and dedication to excellence made all the difference.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "CTO, Global Finance",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Working with Lissomsoft has been a game-changer for our risk management processes. Their solutions are intuitive, powerful, and exactly what we needed.",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Founder, NextGen Startups",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      text: "As a startup founder, finding the right technology partner was crucial. Lissomsoft delivered beyond our expectations with affordable, high-quality solutions.",
    },
  ]

  // Theme toggle
  const [darkMode, setDarkMode] = useState(false)

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0)

  // Handle scroll for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const currentScroll = document.documentElement.scrollTop
      const progress = (currentScroll / totalScroll) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Stats counter animation
  useEffect(() => {
    if (statsInView) {
      const duration = 2000 // 2 seconds
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)
      let frame = 0

      const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames

        setCounts({
          years: Math.floor(progress * targetCounts.years),
          clients: Math.floor(progress * targetCounts.clients),
          industries: Math.floor(progress * targetCounts.industries),
          countries: Math.floor(progress * targetCounts.countries),
        })

        if (frame === totalFrames) {
          clearInterval(counter)
        }
      }, frameDuration)

      return () => clearInterval(counter)
    }
  }, [statsInView])

  // Animate sections when they come into view
  useEffect(() => {
    if (missionInView) {
      controls.start("visible")
    }
  }, [controls, missionInView])

  return (
    <div className={`about-page ${darkMode ? "dark-theme" : ""}`}>
      {/* Progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Hero Section with Parallax */}
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        bgImageAlt="Team working together"
        strength={200}
      >
        <section className="hero-section">
          <div className="container py-5">
            <div className="row align-items-center py-5">
              <motion.div
                className="col-lg-6 mb-5 mb-lg-0"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="badge bg-primary text-white mb-3 px-3 py-2">ABOUT LISSOMSOFT</span>
                <h1 className="fw-bold text-white display-4 mb-4">Execute Well and Focus on Results</h1>
                <p className="lead mb-4 opacity-75 text-white">
                  We aim to turn risks into opportunity and digitally transform startups, small business operations, to
                  scale and grow in today's rapidly evolving technological landscape.
                </p>
             
              </motion.div>
              <motion.div
                className="col-lg-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="position-relative hero-image-container">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Team collaboration"
                    className="img-fluid rounded shadow-lg position-relative hero-image"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Parallax>

      {/* CEO Message Section - With Improved Bubble Animation */}
      <section className="py-5 bg-white section-ceo">
        <div className="container py-5">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 mb-5 mb-lg-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="fw-bold display-5 mb-4">Message from the CEO</h2>
              <div className="position-relative">
                <div className="section-line"></div>
                <blockquote className="blockquote fs-5 lh-lg">
                  <p className="mb-4">
                    In the intricate weave of business and life, we understand – Uncertainty, Attitude, Information, all
                    shaped by Digitalization. Knowing how they impact you, at Lissomsoft, it's about{" "}
                    <strong className="text-primary">Customer First</strong>. With a focus on Risk Tech and Digital
                    Transformation, we help startups navigate uncertainties, making tech easy and affordable. Our
                    commitment delivering software solutions that empower you for streamlined success. At Lissomsoft,
                    we're genuinely your partner, keeping tech simple and within reach.
                  </p>
                  <footer className="blockquote-footer">
                    <cite title="Source Title">Ganesh Gopalan, CEO</cite>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="d-flex justify-content-center">
                <div className="position-relative ceo-image-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {/* Single large bubble animation */}
                  <motion.div
                    className="large-bubble"
                    initial={{ scale: 0.5, opacity: 0.2 }}
                    animate={{
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      // top: "50%",
                      // left: "50%",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(74, 144, 226, 0.4), rgba(80, 227, 194, 0.4))",
                      boxShadow: "0 0 20px rgba(74, 144, 226, 0.3)",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                      pointerEvents: "none"
                    }}
                  />

                  {/* Background circle with gradient */}
                  <div className="ceo-image-bg"></div>
                  {/* CEO Image */}
                  <img
                    src="https://www.lissomsoft.com/assets/leardership/ceo.webp"
                    alt="CEO Ganesh Gopalan"
                    className="ceo-image"
                    style={{ margin: 0 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with custom counter */}
      <section className="py-5 bg-light section-stats" id="stats-section" ref={statsRef}>
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <motion.div
                className="card border-0 bg-white shadow-sm h-100 text-center p-4 stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card-body">
                  <div className="display-4 text-primary fw-bold mb-2 counter-number">{counts.years}+</div>
                  <p className="text-muted mb-0">Years of Experience</p>
                </div>
              </motion.div>
            </div>
            <div className="col-md-3 col-6">
              <motion.div
                className="card border-0 bg-white shadow-sm h-100 text-center p-4 stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="card-body">
                  <div className="display-4 text-primary fw-bold mb-2 counter-number">{counts.clients}+</div>
                  <p className="text-muted mb-0">Satisfied Clients</p>
                </div>
              </motion.div>
            </div>
            <div className="col-md-3 col-6">
              <motion.div
                className="card border-0 bg-white shadow-sm h-100 text-center p-4 stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="card-body">
                  <div className="display-4 text-primary fw-bold mb-2 counter-number">{counts.industries}</div>
                  <p className="text-muted mb-0">Industries Served</p>
                </div>
              </motion.div>
            </div>
            <div className="col-md-3 col-6">
              <motion.div
                className="card border-0 bg-white shadow-sm h-100 text-center p-4 stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="card-body">
                  <div className="display-4 text-primary fw-bold mb-2 counter-number">{counts.countries}</div>
                  <p className="text-muted mb-0">Countries Reached</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-5 bg-white section-who-we-are">
        <div className="container py-5">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 order-lg-2 mb-5 mb-lg-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="fw-bold display-5 mb-4">Who We Are</h2>
              <div className="position-relative mb-4">
                <div className="section-line"></div>
                <p className="lead">Welcome to Lissomsoft, where execution meets excellence.</p>
              </div>
              <p className="mb-4">
                Our mission is clear: to transform risks into opportunities and digitally revolutionize startups and
                small businesses. As a dedicated software product and services company, we specialize in crafting
                user-friendly applications that drive business growth.
              </p>
              <p>
                Our team of seasoned professionals bring expertise in the latest technology, ensuring you get quality
                solutions that elevate your efficiency and success. Focused on emerging markets across Middle East,
                Africa, South Asia, South East Asia and Oceania, we understand the unique challenges faced by businesses
                in these regions and are committed to providing affordable, high-quality software solutions that drive
                your growth.
              </p>
              <div className="mt-4">
                <Link to="/team" className="btn btn-outline-primary px-4 py-2 btn-with-icon" onClick={scrollToTop}>
                  <span>Meet Our Team</span>
                  <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6 order-lg-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="position-relative who-we-are-image-container">
                <div className="bg-primary position-absolute who-we-are-image-bg"></div>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Our team"
                  className="img-fluid rounded shadow-lg position-relative who-we-are-image"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      {/* Our Credo Section */}
      <section className="py-5 bg-light section-credo" ref={missionRef}>
        {/* Content remains the same */}
        <div className="container py-5">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="fw-bold display-5 mb-3">Our Credo</h2>
            <div className="position-relative d-inline-block mb-4">
              <div className="section-line-center"></div>
            </div>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              The principles that guide our work and define our approach to business
            </p>
          </motion.div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card border-0 shadow-sm h-100 hover-card credo-card"
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="card-body p-4 text-center">
                  <div className="credo-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h3 className="h4 mb-3">Mission</h3>
                  <p className="text-muted">
                    Elevate startups with cutting-edge Research, Digital Transformation, and Cloud solutions, committed
                    to delivering top-tier, cost-effective technology that propels businesses forward.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card border-0 shadow-sm h-100 hover-card credo-card"
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="card-body p-4 text-center">
                  <div className="credo-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3 className="h4 mb-3">Vision</h3>
                  <p className="text-muted">
                    Empower enterprises through seamless execution, transforming challenges into growth opportunities
                    with innovative digital solutions in emerging markets worldwide.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card border-0 shadow-sm h-100 hover-card credo-card"
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="card-body p-4 text-center">
                  <div className="credo-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h3 className="h4 mb-3">Values</h3>
                  <p className="text-muted">
                    We are driven by an unwavering commitment to innovation, integrity, and client satisfaction, forming
                    the foundation of our approach in delivering cutting-edge solutions and services.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card border-0 shadow-sm h-100 hover-card credo-card"
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="card-body p-4 text-center">
                  <div className="credo-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3 className="h4 mb-3">Focus</h3>
                  <p className="text-muted">
                    Elevate startups with cutting-edge Research, Digital Transformation, and Cloud solutions, committed
                    to delivering technology that propels businesses forward.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-5 bg-dark text-white section-values" ref={valuesRef}>
        {/* Content remains the same */}
        <div className="container py-5">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-5 mb-5 mb-lg-0"
              initial={{ opacity: 0, x: -30 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="fw-bold display-5 mb-4">Our Core Values</h2>
              <div className="position-relative mb-4">
                <div className="section-line"></div>
                <p className="lead opacity-75">The principles that guide everything we do at Lissomsoft</p>
              </div>
              <p className="opacity-75 mb-4">
                At Lissomsoft, our values aren't just words on a page—they're the foundation of our culture and the
                driving force behind every decision we make. We believe in putting our customers first, embracing
                innovation, maintaining integrity in all our dealings, and striving for excellence in everything we do.
              </p>
              <div className="mt-4">
                <Link to="/about/values" className="btn btn-primary px-4 py-2 btn-with-icon">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </motion.div>
            <div className="col-lg-7">
              <div className="row g-4">
                <div className="col-md-6">
                  <motion.div
                    className="d-flex p-3 bg-dark bg-opacity-50 rounded shadow-sm mb-4 border-start border-primary border-4 value-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="me-3">
                      <i className="fas fa-check text-primary"></i>
                    </div>
                    <div>
                      <h4 className="h5 mb-2">Customer First</h4>
                      <p className="mb-0 opacity-75 small">We prioritize our customers' needs in everything we do</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="d-flex p-3 bg-dark bg-opacity-50 rounded shadow-sm border-start border-primary border-4 value-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="me-3">
                      <i className="fas fa-check text-primary"></i>
                    </div>
                    <div>
                      <h4 className="h5 mb-2">Innovation</h4>
                      <p className="mb-0 opacity-75 small">We embrace new ideas and technologies</p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-md-6">
                  <motion.div
                    className="d-flex p-3 bg-dark bg-opacity-50 rounded shadow-sm mb-4 border-start border-primary border-4 value-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="me-3">
                      <i className="fas fa-check text-primary"></i>
                    </div>
                    <div>
                      <h4 className="h5 mb-2">Integrity</h4>
                      <p className="mb-0 opacity-75 small">We conduct business with honesty and transparency</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="d-flex p-3 bg-dark bg-opacity-50 rounded shadow-sm border-start border-primary border-4 value-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="me-3">
                      <i className="fas fa-check text-primary"></i>
                    </div>
                    <div>
                      <h4 className="h5 mb-2">Excellence</h4>
                      <p className="mb-0 opacity-75 small">We strive for excellence in all our endeavors</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-white section-testimonials">
        {/* Content remains the same */}
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 mb-3">What Our Clients Say</h2>
            <div className="position-relative d-inline-block mb-4">
              <div className="section-line-center"></div>
            </div>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Hear from businesses we've helped transform with our digital solutions
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonial-slider"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="card border-0 shadow-sm h-100 p-4 testimonial-card">
                  <div className="d-flex align-items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="rounded-circle testimonial-image"
                    />
                    <div className="ms-3">
                      <h4 className="h5 mb-1">{testimonial.name}</h4>
                      <p className="text-muted small mb-0">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <i className="fas fa-quote-left text-primary opacity-50 fa-2x"></i>
                  </div>
                  <p className="mb-0">{testimonial.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-5 bg-light section-leadership" id="leadership" ref={teamRef}>
        <div className="container py-5">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge bg-primary text-white mb-3 px-3 py-2">OUR TEAM</span>
            <h2 className="fw-bold display-5 mb-3">Leadership Excellence</h2>
            <div className="position-relative d-inline-block mb-4">
              <div className="section-line-center"></div>
            </div>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Meet the visionaries driving innovation and excellence at Lissomsoft
            </p>
          </motion.div>

          <div className="row g-4">
            {/* Leadership cards with enhanced design */}
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card border-0 shadow-sm h-100 team-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="position-relative mx-auto mt-4 team-image-container">
                  <div className="team-image-border"></div>
                  <img
                    src="https://www.lissomsoft.com/assets/leardership/amit%20Bansal.png"
                    alt="Amit Bansal"
                    className="team-image"
                  />
                </div>

                <div className="card-body p-4">
                  <h3 className="h5 mb-1">Amit Bansal</h3>
                  <p className="text-primary fw-bold small mb-3">Director - BFSI - Risk Management</p>
                  <p className="small text-muted mb-3">
                    Expert in financial risk management with over 15 years of experience in the banking sector.
                  </p>
                  <div className="team-social" style={{ opacity: 1, transform: "translateY(0)" }}>
                    <a
                      href="https://www.linkedin.com/"
                      className="social-icon"
                      style={{ background: "rgba(0, 119, 182, 0.2)", border: "1px solid #0077b6" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 pb-4">
                  <button className="btn btn-sm btn-outline-primary rounded-pill px-3">View Profile</button>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card border-0 shadow-sm h-100 team-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="position-relative mx-auto mt-4 team-image-container">
                  <div className="team-image-border"></div>
                  <img
                    src="https://www.lissomsoft.com/assets/leardership/satish.jpg"
                    alt="Satish R"
                    className="team-image"
                  />
                </div>

                <div className="card-body p-4">
                  <h3 className="h5 mb-1">Satish R</h3>
                  <p className="text-primary fw-bold small mb-3">Director - Product Development</p>
                  <p className="small text-muted mb-3">
                    Leads our product development team with a focus on creating innovative, user-friendly solutions.
                  </p>
                  <div className="team-social" style={{ opacity: 1, transform: "translateY(0)" }}>
                    <a
                      href="https://www.linkedin.com/"
                      className="social-icon"
                      style={{ background: "rgba(0, 119, 182, 0.2)", border: "1px solid #0077b6" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 pb-4">
                  <button className="btn btn-sm btn-outline-primary rounded-pill px-3">View Profile</button>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card border-0 shadow-sm h-100 team-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="position-relative mx-auto mt-4 team-image-container">
                  <div className="team-image-border"></div>
                  <img
                    src="https://www.lissomsoft.com/assets/leardership/murali.jpg"
                    alt="Murali T"
                    className="team-image"
                  />
                </div>

                <div className="card-body p-4">
                  <h3 className="h5 mb-1">Murali T</h3>
                  <p className="text-primary fw-bold small mb-3">Director - Technology Services</p>
                  <p className="small text-muted mb-3">
                    Technology expert with deep knowledge in cloud computing and digital transformation.
                  </p>
                  <div className="team-social" style={{ opacity: 1, transform: "translateY(0)" }}>
                    <a
                      href="https://www.linkedin.com/in/murali-t-39642315/"
                      className="social-icon"
                      style={{ background: "rgba(0, 119, 182, 0.2)", border: "1px solid #0077b6" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 pb-4">
                  <button className="btn btn-sm btn-outline-primary rounded-pill px-3">View Profile</button>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card border-0 shadow-sm h-100 team-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="position-relative mx-auto mt-4 team-image-container">
                  <div className="team-image-border"></div>
                  <img
                    src="https://www.lissomsoft.com/assets/leardership/venkat.jpg"
                    alt="Venkatesh S"
                    className="team-image"
                  />
                </div>

                <div className="card-body p-4">
                  <h3 className="h5 mb-1">Venkatesh S</h3>
                  <p className="text-primary fw-bold small mb-3">Director - Business Development</p>
                  <p className="small text-muted mb-3">
                    Drives our business growth strategy with a focus on building strong client relationships.
                  </p>
                  <div className="team-social" style={{ opacity: 1, transform: "translateY(0)" }}>
                    <a
                      href="https://www.linkedin.com/in/venkatesh-s-a97385238/"
                      className="social-icon"
                      style={{ background: "rgba(0, 119, 182, 0.2)", border: "1px solid #0077b6" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 pb-4">
                  <button className="btn btn-sm btn-outline-primary rounded-pill px-3">View Profile</button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Add a "Meet the entire team" button */}
          <div className="text-center mt-5">
            <Link to="/team" className="btn btn-primary btn-lg px-5 py-3 btn-with-icon" onClick={scrollToTop}>
              <span>Meet the Entire Team</span>
              <i className="fas fa-users ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 section-cta">
        <div className="container py-5 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="fw-bold display-5 mb-4 text-white">Ready to Transform Your Business?</h2>
            <p className="lead mb-5 text-white mx-auto" style={{ maxWidth: "700px" }}>
              Contact us today to learn how Lissomsoft can help your business navigate risks, embrace digital
              transformation, and achieve sustainable growth.
            </p>
            <Link to="/contact" className="btn btn-light btn-lg px-5 py-3 btn-with-icon" onClick={scrollToTop}>
              <span>Get in Touch</span>
              <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </motion.div>
        </div>
      </section>

    
    </div>
  )
}

export default AboutPage

{
  /* Responsive fixes */
}
;<style jsx>{`
  @media (max-width: 768px) {
    .hero-section .row {
      flex-direction: column-reverse;
    }
    
    .hero-image-container {
      margin-bottom: 2rem;
    }
    
    .section-leadership .team-card {
      margin-bottom: 2rem;
    }
    
    .ceo-image-container {
      margin: 0 auto 2rem;
    }
  }
`}</style>
