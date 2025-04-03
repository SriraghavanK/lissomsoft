"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

const TeamPage = () => {
  // Animation controls
  const [teamRef, teamInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  } 
  // Theme toggle
  const [darkMode, setDarkMode] = useState(false)

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0)

  // Team member modal
  const [selectedMember, setSelectedMember] = useState(null)

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

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }

    return () => {
      document.body.classList.remove("dark-theme")
    }
  }, [darkMode])

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Ganesh Gopalan",
      position: "CEO & Founder",
      image: "https://www.lissomsoft.com/assets/leardership/ceo.webp",
      bio: "Visionary leader with over 20 years of experience in technology and business management. Ganesh has led multiple successful digital transformation initiatives for Fortune 500 companies and brings a wealth of expertise in strategic planning and execution.",
      linkedin: "https://www.linkedin.com/in/ganesh-gopalan-56aa1416/",
      twitter: "#",
      email: "ganesh@lissomsoft.com",
      target: "_blank",
      skills: ["Strategic Planning", "Digital Transformation", "Enterprise Architecture", "Risk Management"],
      achievements: [
        "Led 30+ successful enterprise projects",
        "Recognized industry thought leader",
        "Published author on risk management",
      ],
    },
    {
      id: 2,
      name: "Amit Bansal",
      position: "Director - BFSI - Risk Management",
      image: "https://www.lissomsoft.com/assets/leardership/amit%20Bansal.png",
      bio: "Expert in financial risk management with over 15 years of experience in the banking sector. Amit specializes in developing comprehensive risk frameworks that help financial institutions navigate complex regulatory environments while optimizing business performance.",
      linkedin: "#",
      twitter: "#",
      email: "amit@lissomsoft.com",
      skills: ["Financial Risk Management", "Regulatory Compliance", "Banking Operations", "Strategic Planning"],
      achievements: [
        "Implemented Basel III compliance for major banks",
        "Reduced operational risk by 40% for clients",
        "Developed proprietary risk assessment methodology",
      ],
    },
    {
      id: 3,
      name: "Satish R",
      position: "Director - Product Development",
      image: "https://www.lissomsoft.com/assets/leardership/satish.jpg",
      bio: "Leads our product development team with a focus on creating innovative, user-friendly solutions. Satish brings deep technical expertise and a passion for elegant software design that solves real business problems.",
      linkedin: "#",
      twitter: "#",
      email: "satish@lissomsoft.com",
      skills: ["Product Strategy", "Software Architecture", "Agile Development", "UX Design"],
      achievements: [
        "Led development of SmartGRC platform",
        "Pioneered microservices architecture adoption",
        "Mentored 20+ junior developers",
      ],
    },
    {
      id: 4,
      name: "Murali T",
      position: "Director - Technology Services",
      image: "https://www.lissomsoft.com/assets/leardership/murali.jpg",
      bio: "Technology expert with deep knowledge in cloud computing and digital transformation. Murali has helped numerous organizations modernize their IT infrastructure and adopt cloud-native solutions that drive business agility and innovation.",
      linkedin: "https://www.linkedin.com/in/murali-t-39642315/",
      twitter: "#",
      email: "murali@lissomsoft.com",
      skills: ["Cloud Architecture", "DevOps", "IT Strategy", "Digital Transformation"],
      achievements: [
        "Reduced infrastructure costs by 60% for enterprise clients",
        "Implemented CI/CD pipelines for 50+ projects",
        "Cloud migration specialist",
      ],
    },
    {
      id: 5,
      name: "Venkatesh S",
      position: "Director - Business Development",
      image: "https://www.lissomsoft.com/assets/leardership/venkat.jpg",
      bio: "Drives our business growth strategy with a focus on building strong client relationships. Venkatesh has a proven track record of identifying market opportunities and developing strategic partnerships that create value for all stakeholders.",
      linkedin: "https://www.linkedin.com/in/venkatesh-s-a97385238/",
      twitter: "#",
      email: "venkatesh@lissomsoft.com",
      skills: ["Business Strategy", "Partnership Development", "Market Analysis", "Client Relations"],
      achievements: [
        "Expanded client base by 200% in 3 years",
        "Established key strategic partnerships",
        "Developed new market entry strategies",
      ],
    },
    {
      id: 6,
      name: "Pradeep T",
      position: "Team Leader",
      image: require("../assets/Pradeep.jpeg"),
      bio: "Experienced Full Stack Developer with over 4 years of expertise in Angular, Java Spring Boot, MySQL, Adobe XD, HTML5, and CSS3. Docker, Apache Kafka, and Tomcat, with hands-on experience in both Windows and Linux Ubuntu environments. Skilled in building dynamic web applications, designing intuitive user interfaces, and delivering clean, maintainable code.",
      linkedin: "https://www.linkedin.com/in/pradeepraj55",
      twitter: "#",
      email: "pradeep@lissomsoft.com",
      skills: ["Angular", "Java Spring Boot", "MySQL", "Docker", "UI/UX Design"],
      achievements: [
        "Led development of 5 major client projects",
        "Implemented microservices architecture",
        "Mentored junior developers",
      ],
    },
    {
      id: 7,
      name: "Jeshwar D",
      position: "Full-Stack Developer",
      image: require("../assets/jeshwar.jpeg"),
      bio: "Knowledge in Front-end Technologies Like HTML, CSS, JavaScript, Frameworks : Bootstrap, Angular Back-end : JAVA, Core Java, Web API Database: MySQL. Excellent communication skills and ability to understand client requirements. Continuous learner of new technologies, strategies, and tools.",
      linkedin: "https://www.linkedin.com/in/jeshward/",
      twitter: "#",
      email: "jeshwar@lissomsoft.com",
      skills: ["Angular", "Java", "MySQL", "Bootstrap", "Web API"],
      achievements: [
        "Developed key features for SmartGRC platform",
        "Optimized database performance by 40%",
        "Created reusable component library",
      ],
    },
    {
      id: 8,
      name: "Manimaran P",
      position: "Full-Stack Developer",
      image: require("../assets/Manimaran.jpeg"),
      bio: "I am a passionate software developer with hands-on experience in building scalable applications using Angular, Spring Boot, and React. I have worked on projects related to Risk Management and Incident Management, developing robust solutions that enhance efficiency and security.",
      linkedin: "https://www.linkedin.com/in/manimaran-p-27101b205/",
      twitter: "#",
      email: "manimaran@lissomsoft.com",
      skills: ["Angular", "React", "Spring Boot", "Risk Management", "Incident Management"],
      achievements: [
        "Implemented real-time incident tracking system",
        "Reduced application load time by 60%",
        "Developed custom reporting dashboard",
      ],
    },
    {
      id: 9,
      name: "Karthik G",
      position: "Full-Stack Developer",
      image: require("../assets/karthick.jpeg"),
      bio: "I am a passionate software developer with hands-on experience in building scalable applications using Angular, Spring Boot, and React. I have worked on projects related to Risk Management and Incident Management, developing robust solutions that enhance efficiency and security.",
      linkedin: "https://www.linkedin.com/in/karthik-g-705306303/",
      twitter: "#",
      email: "karthik@lissomsoft.com",
      skills: ["Angular", "React", "Spring Boot", "UI/UX Design", "API Development"],
      achievements: [
        "Developed mobile-responsive interfaces",
        "Created custom data visualization components",
        "Improved API response time by 50%",
      ],
    },
    {
      id: 10,
      name: "Gowtham R",
      position: "Full-Stack Developer",
      image: require("../assets/gowtham.jpg"),
      bio: "Passionate Full Stack Developer seeking a dynamic role in an organization that values both my professional and personal growth, allowing me to contribute significantly to the company's expansion and align with its objectives.",
      linkedin: "https://www.linkedin.com/in/gowtham-rajendran-41182323a/",
      twitter: "#",
      email: "gowtham@lissomsoft.com",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
      achievements: [
        "Built RESTful APIs for multiple projects",
        "Implemented authentication systems",
        "Developed real-time notification system",
      ],
    },
    {
      id: 11,
      name: "Kabila Kannan",
      position: "Full-Stack Developer",
      image: require("../assets/kabilan.jpeg"),
      bio: "I am a passionate software developer with hands-on experience in building scalable applications using Angular, Spring Boot, and React. I have worked on projects related to Risk Management and Incident Management, developing robust solutions that enhance efficiency and security.",
      linkedin: "https://www.linkedin.com/in/kabila-kannan-0463b6184/",
      twitter: "#",
      email: "kabila@lissomsoft.com",
      skills: ["Angular", "React", "Spring Boot", "MySQL", "AWS"],
      achievements: [
        "Implemented CI/CD pipeline",
        "Developed automated testing framework",
        "Optimized cloud infrastructure",
      ],
    },
    {
      id: 12,
      name: "Harini SK",
      position: "Full-Stack Developer",
      image: require("../assets/harini.jpeg"),
      bio: "I am a passionate software developer with hands-on experience in building scalable applications using Angular, Spring Boot, and React. I have worked on projects related to Risk Management and Incident Management, developing robust solutions that enhance efficiency and security.",
      linkedin: "https://www.linkedin.com/in/harini-sk-2b0825236/",
      twitter: "#",
      email: "harini@lissomsoft.com",
      skills: ["Angular", "React", "Spring Boot", "UI Design", "Testing"],
      achievements: [
        "Developed responsive UI components",
        "Implemented accessibility features",
        "Created comprehensive test suites",
      ],
    },
    {
      id: 13,
      name: "Keerthivasan R",
      position: "Full-Stack Developer",
      image: require("../assets/keerthi.jpeg"),
      bio: "I am a passionate software developer with hands-on experience in building scalable applications using Angular, Spring Boot, and React. I have worked on projects related to Risk Management and Incident Management, developing robust solutions that enhance efficiency and security.",
      linkedin: "https://www.linkedin.com/in/keerthivasan-r-2a7a011b7/",
      twitter: "#",
      email: "keerthivasan@lissomsoft.com",
      skills: ["Angular", "React", "Spring Boot", "UI Design", "Testing"],
      achievements: [
        "Developed responsive UI components",
        "Implemented accessibility features",
        "Created comprehensive test suites",
      ],
    },
    {
      id: 14,
      name: "Rishi Kesh",
      position: "Full-Stack Developer",
      image: require("../assets/rishi.jpeg"),
      bio: "I am a passionate software developer with hands-on experience in building scalable applications using Angular, Spring Boot, and React. I have worked on projects related to Risk Management and Incident Management, developing robust solutions that enhance efficiency and security.",
      linkedin: "https://www.linkedin.com/in/rishi-kesh-470575294/",
      twitter: "#",
      email: "rishi@lissomsoft.com",
      skills: ["Angular", "React", "Spring Boot", "UI Design", "Testing"],
      achievements: [
        "Developed responsive UI components",
        "Implemented accessibility features",
        "Created comprehensive test suites",
      ],
    },
    {
      id: 15,
      name: "Sivaranjani Baskar",
      position: "Full-Stack Developer",
      image: require("../assets/sivaranjani.jpeg"),
      bio: "I am a passionate software developer with hands-on experience in building scalable applications using Angular, Spring Boot, and React. I have worked on projects related to Risk Management and Incident Management, developing robust solutions that enhance efficiency and security.",
      linkedin: "https://www.linkedin.com/in/rishi-kesh-470575294/",
      twitter: "#",
      email: "rishi@lissomsoft.com",
      skills: ["Angular", "React", "Spring Boot", "UI Design", "Testing"],
      achievements: [
        "Developed responsive UI components",
        "Implemented accessibility features",
        "Created comprehensive test suites",
      ],
    },
  ]

  /// Filter for team categories
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", name: "All Team" },
    { id: "leadership", name: "Leadership" },
    { id: "development", name: "Development" },
    { id: "design", name: "Design" },
  ]

  // Filter team members based on active filter
  const filteredTeamMembers = teamMembers.filter((member) => {
    if (activeFilter === "all") return true
    if (activeFilter === "leadership" && member.id <= 5) return true
    if (activeFilter === "development" && member.id >= 6) return true
    if (activeFilter === "design" && member.id === 8) return true
    return false
  })

  // Open member profile modal
  const openMemberProfile = (member) => {
    setSelectedMember(member)
    document.body.style.overflow = "hidden"
  }

  // Close member profile modal
  const closeMemberProfile = () => {
    setSelectedMember(null)
    document.body.style.overflow = ""
  }

  return (
    <div className={`team-page ${darkMode ? "dark-theme" : ""}`}>
      {/* Progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container py-5">
          <div className="row py-5">
            <div className="col-lg-8 mx-auto text-center">
              <motion.h1
                className="fw-bold display-4 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Meet Our Team
              </motion.h1>
              <motion.p
                className="lead mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The talented individuals behind Lissomsoft's success. Our diverse team brings together expertise from
                various fields to deliver exceptional solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-light section-leadership" ref={teamRef}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <motion.h2
              className="fw-bold display-5 mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              Our Talented Team
            </motion.h2>
            <motion.div
              className="position-relative d-inline-block mb-4"
              initial={{ opacity: 0, width: 0 }}
              animate={teamInView ? { opacity: 1, width: "100px" } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="section-line-center"></div>
            </motion.div>
            <motion.p
              className="lead text-muted mx-auto"
              style={{ maxWidth: "700px" }}
              initial={{ opacity: 0 }}
              animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Meet the people who make the magic happen at Lissomsoft
            </motion.p>
          </div>

          {/* Filter buttons */}
          <motion.div
            className="d-flex justify-content-center flex-wrap gap-2 mb-5 filter-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                className={`btn ${activeFilter === filter.id ? "btn-primary" : "btn-outline-primary"} rounded-pill px-4 py-2 mb-2`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                {filter.name}
              </motion.button>
            ))}
          </motion.div>

          <div className="row g-4 team-cards-container">
            {filteredTeamMembers.map((member, index) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={member.id}>
                <motion.div
                  className="card border-0 shadow-sm h-100 team-card text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="position-relative mx-auto mt-4 team-image-container">
                    <div className="team-image-border"></div>
                    <img
                      src={member.image || "https://www.lissomsoft.com/assets/placeholder.jpg"}
                      alt={member.name}
                      className="team-image"
                      onError={(e) => {
                        e.target.src = "https://www.lissomsoft.com/assets/placeholder.jpg"
                      }}
                    />
                  </div>

                  <div className="card-body p-4">
                    <h3 className="h5 mb-1">{member.name}</h3>
                    <p className="text-primary fw-bold small mb-3">{member.position}</p>
                    <p className="small text-muted mb-3 team-bio-preview">
                      {member.bio.length > 100 ? `${member.bio.substring(0, 100)}...` : member.bio}
                    </p>
                    <div className="team-social">
                      <a href={member.linkedin} className="social-icon" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href={`mailto:${member.email}`} className="social-icon">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-0 pb-4">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3"
                      onClick={() => openMemberProfile(member)}
                    >
                      View Profile
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="fw-bold display-5 mb-4">Join Our Team</h2>
                <div className="position-relative mb-4">
                  <div className="section-line"></div>
                  <p className="lead">We're always looking for talented individuals to join our team.</p>
                </div>
                <p className="mb-4">
                  At Lissomsoft, we believe that our success is driven by our people. We're looking for passionate,
                  dedicated individuals who are excited about technology and innovation. If you're interested in joining
                  a dynamic team that's making a difference, we'd love to hear from you.
                </p>
                <div className="mt-4">
                  <Link to="/career" className="btn btn-primary px-4 py-2 btn-with-icon" onClick={scrollToTop}>
                    <span>View Open Positions</span>
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="position-relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Team collaboration"
                  className="img-fluid rounded-lg shadow-lg"
                />
                <div className="team-image-overlay"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section - NEW */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <motion.h2
              className="fw-bold display-5 mb-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>
            <motion.div
              className="position-relative d-inline-block mb-4"
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="section-line-center"></div>
            </motion.div>
            <motion.p
              className="lead text-muted mx-auto"
              style={{ maxWidth: "700px" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              The principles that guide everything we do at Lissomsoft
            </motion.p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <motion.div
                className="card border-0 shadow-sm h-100 value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="card-body p-4 text-center">
                  <div className="value-icon mb-3">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3 className="h4 mb-3">Innovation</h3>
                  <p className="text-muted">
                    We constantly push boundaries and explore new ideas to deliver cutting-edge solutions that address
                    complex challenges.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4">
              <motion.div
                className="card border-0 shadow-sm h-100 value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="card-body p-4 text-center">
                  <div className="value-icon mb-3">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="h4 mb-3">Collaboration</h3>
                  <p className="text-muted">
                    We believe in the power of teamwork and foster an environment where diverse perspectives come
                    together to create exceptional results.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4">
              <motion.div
                className="card border-0 shadow-sm h-100 value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="card-body p-4 text-center">
                  <div className="value-icon mb-3">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h3 className="h4 mb-3">Integrity</h3>
                  <p className="text-muted">
                    We uphold the highest ethical standards in all our interactions, building trust through transparency
                    and accountability.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Member Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="team-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMemberProfile}
          >
            <motion.div
              className="team-modal-content"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="team-modal-close" onClick={closeMemberProfile}>
                <i className="fas fa-times"></i>
              </button>

              <div className="team-modal-container">
                <div className="team-modal-image-section">
                  <div className="team-modal-image-container">
                    <div className="team-modal-image-wrapper">
                      <img
                        src={selectedMember.image || "https://www.lissomsoft.com/assets/placeholder.jpg"}
                        alt={selectedMember.name}
                        className="team-modal-image"
                        onError={(e) => {
                          e.target.src = "https://www.lissomsoft.com/assets/placeholder.jpg"
                        }}
                      />
                    </div>
                    <div className="team-modal-social">
                      <a
                        href={selectedMember.linkedin}
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href={`mailto:${selectedMember.email}`} className="social-icon">
                        <i className="fas fa-envelope"></i>
                      </a>
                      {selectedMember.twitter !== "#" && (
                        <a
                          href={selectedMember.twitter}
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="team-modal-content-section">
                  <div className="team-modal-body">
                    <h2 className="team-modal-name">{selectedMember.name}</h2>
                    <p className="team-modal-position">{selectedMember.position}</p>

                    <div className="team-modal-bio">
                      <h4>About</h4>
                      <p>{selectedMember.bio}</p>
                    </div>

                    <div className="team-modal-skills">
                      <h4>Skills</h4>
                      <div className="skill-tags">
                        {selectedMember.skills &&
                          selectedMember.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                      </div>
                    </div>

                    {selectedMember.achievements && (
                      <div className="team-modal-achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                          {selectedMember.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS */}
      <style jsx>{`
        /* Progress Bar */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #0077b6, #00a8e8);
          z-index: 9999;
          transition: width 0.2s ease;
        }

        /* Hero Section */
        .hero-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          line-height: 0;
          overflow: hidden;
        }

        /* Team Cards */
        .team-card {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .team-image-container {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .team-image-border {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 2px solid #0077b6;
          border-radius: 50%;
          opacity: 0.5;
          animation: pulse 2s infinite;
        }

        .team-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .team-social {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 119, 182, 0.1);
          color: #0077b6;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: #0077b6;
          color: white;
          transform: translateY(-3px);
        }

        /* Section Lines */
        .section-line {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #0077b6, #00a8e8);
          margin-bottom: 20px;
          border-radius: 2px;
        }

        .section-line-center {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #0077b6, #00a8e8);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Theme Toggle */
        .theme-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #0077b6;
          color: white;
          border: none;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          z-index: 999;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }

        /* Dark Theme */
        .dark-theme {
          background-color: #121212;
          color: #f5f5f5;
        }

        .dark-theme .bg-light {
          background-color: #1e1e1e !important;
        }

        .dark-theme .bg-white {
          background-color: #252525 !important;
        }

        .dark-theme .text-muted {
          color: #aaa !important;
        }

        .dark-theme .card {
          background-color: #2d2d2d;
          border-color: #333;
        }

        .dark-theme .theme-toggle {
          background: #f5f5f5;
          color: #121212;
        }

        /* Value Cards */
        .value-card {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .value-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(0, 119, 182, 0.1);
          color: #0077b6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto;
        }

        /* Team Modal - Improved Responsive Design */
        .team-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 15px;
          overflow-y: auto;
        }

        .team-modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .team-modal-container {
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .team-modal-container {
            flex-direction: row;
          }
        }

        .team-modal-image-section {
          background: linear-gradient(135deg, #0077b6, #00a8e8);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        @media (min-width: 768px) {
          .team-modal-image-section {
            width: 40%;
          }
          
          .team-modal-content-section {
            width: 60%;
          }
        }

        .dark-theme .team-modal-content {
          background: #2d2d2d;
          color: #f5f5f5;
        }

        .team-modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.1);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          font-size: 1rem;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .dark-theme .team-modal-close {
          background: rgba(255, 255, 255, 0.1);
          color: #f5f5f5;
        }

        .team-modal-close:hover {
          background: #0077b6;
          color: white;
        }

        .team-modal-image-container {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .team-modal-image-wrapper {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .team-modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .team-modal-social {
          margin-top: 20px;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .team-modal-social .social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .team-modal-social .social-icon:hover {
          background: white;
          color: #0077b6;
          transform: translateY(-5px);
        }

        .team-modal-body {
          padding: 25px;
          overflow-y: auto;
        }

        .team-modal-name {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 5px;
          color: #0077b6;
        }

        .dark-theme .team-modal-name {
          color: #00a8e8;
        }

        .team-modal-position {
          font-size: 1rem;
          color: #666;
          margin-bottom: 20px;
        }

        .dark-theme .team-modal-position {
          color: #aaa;
        }

        .team-modal-bio,
        .team-modal-skills,
        .team-modal-achievements {
          margin-bottom: 20px;
        }

        .team-modal-bio h4,
        .team-modal-skills h4,
        .team-modal-achievements h4 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
        }

        .dark-theme .team-modal-bio h4,
        .dark-theme .team-modal-skills h4,
        .dark-theme .team-modal-achievements h4 {
          color: #f5f5f5;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          background: rgba(0, 119, 182, 0.1);
          color: #0077b6;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: rgba(0, 119, 182, 0.2);
          transform: translateY(-2px);
        }

        .dark-theme .skill-tag {
          background: rgba(0, 168, 232, 0.2);
          color: #00a8e8;
        }

        .team-modal-achievements ul {
          padding-left: 20px;
        }

        .team-modal-achievements li {
          margin-bottom: 8px;
        }

        /* Additional Responsive Styles */
        .team-cards-container {
          margin: 0 -10px;
        }

        .team-bio-preview {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 60px;
        }

        /* Responsive Adjustments - Improved */
        @media (max-width: 991px) {
          .team-modal-image-wrapper {
            width: 150px;
            height: 150px;
          }
          
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          .team-image-container {
            width: 100px;
            height: 100px;
          }
        }

        @media (max-width: 767px) {
          .team-modal-container {
            flex-direction: column;
          }
          
          .team-modal-image-section,
          .team-modal-content-section {
            width: 100%;
          }
          
          .team-modal-image-container {
            padding: 15px;
          }
          
          .team-modal-body {
            padding: 20px;
          }
          
          .team-modal-name {
            font-size: 1.5rem;
          }
          
          .display-4 {
            font-size: 2.2rem;
          }
          
          .display-5 {
            font-size: 1.8rem;
          }
          
          .lead {
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .team-modal-image-wrapper {
            width: 120px;
            height: 120px;
          }
          
          .team-modal-overlay {
            padding: 10px;
          }
          
          .team-modal-content {
            max-height: 95vh;
          }
          
          .team-modal-body {
            padding: 15px;
          }
          
          .team-modal-name {
            font-size: 1.3rem;
          }
          
          .team-modal-position {
            font-size: 0.9rem;
          }
          
          .skill-tag {
            padding: 4px 10px;
            font-size: 0.75rem;
          }
          
          .display-4 {
            font-size: 1.8rem;
          }
          
          .display-5 {
            font-size: 1.5rem;
          }
          
          .btn {
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  )
}

export default TeamPage

