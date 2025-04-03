"use client";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const [activeTab, setActiveTab] = useState("risk-assessment");
  const [activeApproachTab, setActiveApproachTab] = useState("methodology");
  const dropdownTimeoutRef = useRef(null); // Add this for fixing dropdown hover issue

  // Fix 1: Update the isSmartGrcPage logic to be more strict and reliable
  const isSmartGrcPage =
    typeof window !== "undefined" &&
    (window.location.pathname.includes("/smart-grc") ||
      window.location.pathname.includes("/mysmartgrc") ||
      window.location.pathname === "/mysmartgrc" ||
      window.location.pathname === "/smart-grc");

  useEffect(() => {
    if (typeof window === "undefined") return;

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Close mobile menu on resize to desktop
      if (window.innerWidth > 992 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Add this before the return statement
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Add the styles to the document
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    // Initialize particles if not on SmartGRC page
    if (!isSmartGrcPage) {
      initParticles();
    }

    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
      const canvas = document.getElementById("navbar-particles");
      if (canvas) {
        canvas.remove();
      }
    };
  }, [isSmartGrcPage]);

  const initParticles = () => {
    if (typeof window === "undefined") return;

    // Create canvas element for particles
    const canvas = document.createElement("canvas");
    canvas.id = "navbar-particles";
    canvas.className = "navbar-particles";

    // Append to body
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 70;

    // Particle settings
    const particlesArray = [];
    const numberOfParticles = 50;

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation function
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        ctx.fillStyle = `rgba(0, 119, 182, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Handle resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = 70;
    });
  };

  // Fix for dropdown hover issue
  const handleMouseEnter = (id) => {
    if (dimensions.width > 991) {
      // Clear any existing timeout
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = null;
      }
      setActiveDropdown(id);
    }
  };

  const handleMouseLeave = () => {
    if (dimensions.width > 991) {
      // Set a timeout to close the dropdown
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 300); // 300ms delay before closing
    }
  };

  // Fix 2: Update the toggleDropdown function to properly handle desktop behavior
  const toggleDropdown = (id) => {
    console.log("Toggling dropdown:", id, "Current active:", activeDropdown);
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);

      // Add this condition to handle desktop behavior
      if (dimensions.width > 991) {
        closeDropdownOnOutsideClick();
      }
    }
  };

  const closeDropdownOnOutsideClick = () => {
    if (typeof window === "undefined") return;

    // Add a click event listener to the document
    const handleDocumentClick = (e) => {
      // Check if the click is outside the navbar
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
        // Remove the event listener once the dropdown is closed
        document.removeEventListener("click", handleDocumentClick);
      }
    };

    // Add the event listener with a slight delay to avoid immediate triggering
    setTimeout(() => {
      document.addEventListener("click", handleDocumentClick);
    }, 100);
  };

  // Fix 5: Enhance the scrollToSection function to better handle section targeting
  const scrollToSection = (id) => {
    if (typeof window === "undefined") return;

    console.log(`Attempting to scroll to section: ${id}`);

    // SPECIAL CASE: If this is an implementation link, directly find that section
    if (id === "approach-implementation" || id === "implementation") {
      const implementationSection = document.getElementById(
        "approach-implementation"
      );
      if (implementationSection) {
        scrollToTarget(implementationSection);

        // Also set the active tab to implementation
        if (window.setActiveTabFromHash) {
          window.setActiveTabFromHash("#implementation");
        } else {
          // If we can't directly access the state setter, try to find and click the implementation button
          const implementationButton = document.querySelector(
            'button:contains("Implementation")'
          );
          if (implementationButton) implementationButton.click();
        }
        return;
      }
    }

    // Special case for vendor risk
    if (id === "services-vendor" || id === "vendor") {
      const vendorSection = document.getElementById("services-vendor");
      if (vendorSection) {
        scrollToTarget(vendorSection);
        // Set the active tab to vendor-risk
        if (window.setActiveTabFromHash) {
          window.setActiveTabFromHash("#vendor");
        }
        return;
      }
    }

    // Special case for IT risk
    if (id === "services-it" || id === "it") {
      const itSection = document.getElementById("services-it");
      if (itSection) {
        scrollToTarget(itSection);
        // Set the active tab to it-cyber-risk
        if (window.setActiveTabFromHash) {
          window.setActiveTabFromHash("#it");
        }
        return;
      }
    }

    // Normal case - find the element
    const element = document.getElementById(id);

    if (element) {
      scrollToTarget(element);
    } else {
      console.log(
        `Element with ID "${id}" not found, trying alternative selectors`
      );

      // Alternative IDs mapping
      const alternativeIds = {
        experts: "mysmartgrc-experts",
        features: "mysmartgrc-features",
        overview: "mysmartgrc-overview",
        methodology: "approach-methodology",
        implementation: "approach-implementation",
        contact: "contact-form",
        benefits: "benefits",
        "risk-assessment": "services-risk-assessment",
        compliance: "services-compliance",
        training: "services-training",
      };

      // Try the alternative ID if available
      if (alternativeIds[id]) {
        const altElement = document.getElementById(alternativeIds[id]);
        if (altElement) {
          scrollToTarget(altElement);
          return;
        }
      }

      // Last resort - log all available IDs
      console.log("Available section IDs:");
      document.querySelectorAll("[id]").forEach((el) => {
        console.log(`- ${el.id}`);
      });
    }

    // Helper function to scroll to an element
    function scrollToTarget(target) {
      // Get accurate navbar height with fallback
      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;

      // Calculate position with extra buffer
      const buffer = 20; // Extra space for better visibility
      const elementPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - buffer;

      console.log(`Scrolling to ${target.id} at position: ${offsetPosition}px`);

      // FIRST ATTEMPT - try smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // FIX FOR MID-SCROLL ISSUE: Do a second scroll after a short delay
      setTimeout(() => {
        // Get updated position in case content shifted
        const updatedElementPosition =
          target.getBoundingClientRect().top + window.pageYOffset;
        const updatedOffsetPosition =
          updatedElementPosition - navbarHeight - buffer;

        console.log(
          `Second scroll to ${target.id} at position: ${updatedOffsetPosition}px`
        );

        // Second scroll to ensure we reach the correct position
        window.scrollTo({
          top: updatedOffsetPosition,
          behavior: "smooth",
        });

        // Add a highlight effect
        target.classList.add("highlight-section");
        setTimeout(() => {
          target.classList.remove("highlight-section");
        }, 1500);
      }, 500); // 500ms delay for second scroll

      // Close mobile menus if open
      setIsOpen(false);
      setActiveDropdown(null);

      // Update URL hash without page reload
      window.history.pushState(null, "", `#${target.id}`);
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.25,
        ease: "easeOut",
      },
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "tween",
        duration: 0.25,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: 10 },
    open: { opacity: 1, x: 0 },
  };

  // Regular Lissomsoft navigation items - Updated to include Team
  const home = {
    name: "Home",
    path: "/",
    icon: "home",
  };
  const navItems = [
    {
      title: "SOLUTIONS",
      id: "solutionsDropdown",
      items: [
        {
          name: "Risk Management",
          path: "/risk-management",
          icon: "shield-alt",
        },
        {
          name: "Digital Transformation",
          path: "/digital-transformation",
          icon: "digital-tachograph",
        },
        { name: "Cloud Services", path: "/cloud-services", icon: "cloud" },
        {
          name: "Growth Marketing",
          path: "/growth-marketing",
          icon: "chart-line",
        },
      ],
    },
    {
      title: "WHO WE ARE",
      id: "aboutDropdown",
      items: [
        { name: "About Us", path: "/about", icon: "info-circle" },
        { name: "Clients", path: "/client", icon: "users" },
        { name: "Careers", path: "/career", icon: "briefcase" },
      ],
    },
  ];

  const singleNavItems = ["PARTNERS", "MYSMARTGRC", "RESOURCES", "CONTACT"];

  // Fix 6: Update the SmartGRC navigation items to match the working version
  const smartGrcNavItems = [
    {
      title: "MYSMARTGRC",
      id: "mysmartgrcDropdown",
      items: [
        { name: "Overview", path: "#mysmartgrc-overview", icon: "eye" },
        { name: "Features", path: "#mysmartgrc-features", icon: "list-ul" },
        { name: "Experts", path: "#mysmartgrc-experts", icon: "check-circle" },
      ],
    },
    {
      title: "OUR APPROACH",
      id: "approachDropdown",
      items: [
        {
          name: "Methodology",
          path: "#approach-methodology",
          icon: "project-diagram",
        },
        {
          name: "Implementation",
          path: "#approach-implementation",
          icon: "cogs",
        },
      ],
    },
    {
      title: "SERVICES",
      id: "servicesDropdown",
      items: [
        {
          name: "Risk Assessment",
          path: "#services-risk-assessment",
          icon: "search",
        },
        {
          name: "Vendor Risk/Third Party Risk",
          path: "#services-vendor",
          icon: "users",
        },
        { name: "IT/Cyber Risk", path: "#services-it", icon: "shield-alt" },
      ],
    },
  ];

  const smartGrcSingleItems = ["BENEFITS", "CONTACT"];

  // Render the SmartGRC header
  if (isSmartGrcPage) {
    return (
      <motion.nav
        className={`navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm fixed-top ${
          scrolled ? "scrolled" : ""
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        ref={navbarRef}
      >
        <div className="container">
          {/* Fix 8: Update the SmartGRC header brand link to point to /mysmartgrc */}
          <a
            className="navbar-brand"
            href="https://mysmartgrc.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              window.open("/mysmartgrc", "_blank");
              e.preventDefault();
            }}
          >
            <motion.div
              className="d-flex align-items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="logo-container">
                <div className="logo-glow"></div>
                <img
                  className="logo"
                  src="https://lissomsoft.com/smart-grc/assets/logo/My%20Smart%20GRC-Logo%20(250x127%20px)1.png"
                  alt="My Smart Grc Logo"
                />
              </div>
              <motion.span
                className="ms-2 fw-bold brand-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                My Smart GRC
              </motion.span>
            </motion.div>
          </a>

          {/* Premium Hamburger Button */}
          <motion.button
            className={`premium-hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <div className="hamburger-glow"></div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <motion.ul
              className="navbar-nav ms-auto"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {smartGrcNavItems.map((dropdown, index) => (
                <motion.li
                  className={`nav-item dropdown ${
                    activeDropdown === dropdown.id ? "show" : ""
                  }`}
                  key={dropdown.id}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  onMouseEnter={() => handleMouseEnter(dropdown.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    className={`nav-link dropdown fw-semibold ${
                      activeDropdown === dropdown.id ? "active" : ""
                    }`}
                    href="#"
                    id={dropdown.id}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(dropdown.id);
                    }}
                    aria-expanded={activeDropdown === dropdown.id}
                  >
                    <span className="nav-text">{dropdown.title}</span>
                    <motion.span
                      className="dropdown-arrow"
                      animate={{
                        rotate: activeDropdown === dropdown.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <i className="fas fa-chevron-down"></i>
                    </motion.span>
                    <span className="nav-hover-effect"></span>
                  </a>
                  <AnimatePresence>
                    {activeDropdown === dropdown.id && (
                      <motion.div
                        className="dropdown-menu-container"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        onMouseEnter={() => handleMouseEnter(dropdown.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          className="dropdown-menu-backdrop"
                          onClick={() => setActiveDropdown(null)}
                        ></div>
                        <motion.ul className="dropdown-menu custom-dropdown">
                          <div className="dropdown-header">
                            <span>{dropdown.title}</span>
                          </div>
                          {dropdown.items.map((item, i) => (
                            <motion.li
                              key={i}
                              variants={itemVariants}
                              onHoverStart={() => setHoverIndex(i)}
                              onHoverEnd={() => setHoverIndex(null)}
                            >
                              <a
                                className={`dropdown-item ${
                                  hoverIndex === i ? "active" : ""
                                }`}
                                href={item.path}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const sectionId = item.path.replace("#", "");
                                  scrollToSection(sectionId);
                                  setActiveDropdown(null);
                                }}
                              >
                                <span className="dropdown-icon icon-circle">
                                  <i className={`fas fa-${item.icon}`}></i>
                                </span>
                                <span>{item.name}</span>
                                <motion.span
                                  className="dropdown-item-highlight"
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: hoverIndex === i ? "100%" : "0%",
                                  }}
                                  transition={{ duration: 0.3 }}
                                ></motion.span>
                              </a>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}

              {smartGrcSingleItems.map((item, index) => (
                <motion.li
                  className="nav-item"
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    className={`nav-link ${
                      item === "CONTACT" ? "contact-btn" : ""
                    }`}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.toLowerCase());
                    }}
                  >
                    <span className="nav-text">{item}</span>
                    {item !== "CONTACT" && (
                      <span className="nav-hover-effect"></span>
                    )}
                    {item === "CONTACT" && <span className="btn-glow"></span>}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="ms-3 powered-by"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span style={{}}>Powered by</span>
              <img
                src="https://www.lissomsoft.com/assets/brand/lissom_logo.png"
                alt="Powered by Lissomsoft"
                className="img-fluid"
                style={{ width: "55px", height: "40px" }}
              />
            </motion.div>
          </div>

          {/* Mobile Navigation - Fullscreen Overlay */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mobile-menu-overlay"
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                ref={mobileMenuRef}
              >
                {/* Remove the redundant close button in the header */}
                <div className="mobile-menu-header">
                  <div className="mobile-brand">
                    <img
                      src={
                        isSmartGrcPage
                          ? "https://lissomsoft.com/smart-grc/assets/logo/My%20Smart%20GRC-Logo%20(250x127%20px)1.png"
                          : "https://www.lissomsoft.com/assets/brand/lissom_logo.png"
                      }
                      alt={
                        isSmartGrcPage ? "My Smart GRC Logo" : "Lissomsoft Logo"
                      }
                      className="mobile-logo"
                    />
                    <span className="mobile-brand-text">
                      {isSmartGrcPage ? "My Smart GRC" : "LISSOMSOFT"}
                    </span>
                  </div>
                </div>

                <div className="mobile-menu-content">
                  {/* Main Navigation */}
                  <div className="mobile-nav-main">
                    <motion.a
                      href="/"
                      className="mobile-menu-item back-to-lissomsoft-btn"
                      variants={mobileItemVariants}
                      custom={1}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/";
                        setIsOpen(false);
                      }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="mobile-item-content">
                        <i className="fas fa-arrow-left mr-2"></i>
                        <span>Back to Lissomsoft</span>
                      </span>
                    </motion.a>
                    {(isSmartGrcPage ? smartGrcNavItems : navItems).map(
                      (category, index) => (
                        <motion.div
                          className="mobile-menu-category"
                          key={category.id}
                          variants={mobileItemVariants}
                          custom={index + 2}
                        >
                          <motion.div
                            className={`mobile-category-header ${
                              activeDropdown === category.id ? "active" : ""
                            }`}
                            onClick={() => toggleDropdown(category.id)}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{category.title}</span>
                            <motion.span
                              className="mobile-dropdown-icon"
                              animate={{
                                rotate:
                                  activeDropdown === category.id ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </motion.span>
                          </motion.div>

                          <AnimatePresence>
                            {activeDropdown === category.id && (
                              <motion.div
                                className="mobile-submenu"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {category.items.map((item, i) => (
                                  <motion.a
                                    key={i}
                                    href={item.path}
                                    className="mobile-submenu-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (item.path.includes("#")) {
                                        const sectionId = item.path.replace(
                                          "#",
                                          ""
                                        );
                                        scrollToSection(sectionId);
                                      } else {
                                        // Fix: Add navigation for regular Lissomsoft navbar dropdown items
                                        window.location.href = item.path;
                                      }
                                      setIsOpen(false);
                                    }}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <i className={`fas fa-${item.icon}`}></i>
                                    <span>{item.name}</span>
                                  </motion.a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    )}

                    {(isSmartGrcPage
                      ? smartGrcSingleItems
                      : singleNavItems
                    ).map((item, index) => (
                      <motion.a
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className={`mobile-menu-item ${
                          item === "CONTACT" ? "mobile-contact-btn" : ""
                        }`}
                        variants={mobileItemVariants}
                        custom={
                          index +
                          (isSmartGrcPage
                            ? smartGrcNavItems.length
                            : navItems.length) +
                          3
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.toLowerCase() === "contact") {
                            // Special handling for contact
                            window.location.href = `/${item.toLowerCase()}`;
                          } else if (isSmartGrcPage) {
                            scrollToSection(item.toLowerCase());
                          } else {
                            // Fix: Add navigation for regular Lissomsoft navbar items
                            window.location.href = `/${item.toLowerCase()}`;
                          }
                          setIsOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item}
                        {item === "CONTACT" && (
                          <>
                            <i className="fas fa-arrow-right p-2"></i>
                            <div className="btn-pulse"></div>
                          </>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Enhanced footer with more information */}
                <motion.div
                  className="mobile-menu-footer"
                  variants={mobileItemVariants}
                  custom={10}
                >
                  {isSmartGrcPage ? (
                    <>
                      <div className="social-icons">
                        <motion.a
                          href="https://www.linkedin.com/company/lissomsoft-technologies/"
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            y: -5,
                            backgroundColor: "#0077b6",
                            color: "#fff",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-linkedin"></i>
                        </motion.a>
                        <motion.a
                          href="https://www.youtube.com/@lissomsoft-therisktechcomp2928/featured"
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            y: -5,
                            backgroundColor: "#FF0000",
                            color: "#fff",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-youtube"></i>
                        </motion.a>
                        <motion.a
                          href="https://api.whatsapp.com/send?phone=9361829552"
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            y: -5,
                            backgroundColor: "#25D366",
                            color: "#fff",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-whatsapp"></i>
                        </motion.a>
                        <motion.a
                          href="https://www.facebook.com/lissomsoft"
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            y: -5,
                            backgroundColor: "#4267B2",
                            color: "#fff",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-facebook"></i>
                        </motion.a>
                      </div>
                      <div className="powered-by-footer mb-3">
                        <span>Powered by</span>
                        <img
                          src="https://www.lissomsoft.com/assets/brand/lissom_logo.png"
                          alt="Powered by Lissomsoft"
                        />
                      </div>

                      <p className="copyright mt-2">
                        © {new Date().getFullYear()} Lissomsoft. All rights
                        reserved.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="social-icons">
                        <motion.a
                          href="https://www.linkedin.com/company/lissomsoft-technologies/"
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            y: -5,
                            backgroundColor: "#0077b6",
                            color: "#fff",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-linkedin"></i>
                        </motion.a>
                        <motion.a
                          href="https://api.whatsapp.com/send?phone=9361829552"
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            y: -5,
                            backgroundColor: "#25D366",
                            color: "#fff",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-whatsapp"></i>
                        </motion.a>
                        <motion.a
                          href="https://www.facebook.com/lissomsoft"
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            y: -5,
                            backgroundColor: "#4267B2",
                            color: "#fff",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-facebook"></i>
                        </motion.a>
                        <motion.a
                          href="https://www.youtube.com/@lissomsoft-therisktechcomp2928/featured"
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            y: -5,
                            backgroundColor: "#FF0000",
                            color: "#fff",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-youtube"></i>
                        </motion.a>
                      </div>
                      <p className="copyright">
                        © {new Date().getFullYear()} Lissomsoft. All rights
                        reserved.
                      </p>
                    </>
                  )}
                </motion.div>

                {/* Close button - positioned at the top right corner */}
                <motion.button
                  className="mobile-menu-close"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <i className="fas fa-times"></i>
                  <div className="close-btn-ripple"></div>
                </motion.button>

                {/* Enhanced decorative elements */}
                <div className="mobile-menu-decoration top-left"></div>
                <div className="mobile-menu-decoration bottom-right"></div>
                <div className="mobile-menu-decoration middle-center"></div>

                {/* Animated background pattern */}
                <div className="menu-bg-pattern"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    );
  }

  // Render the regular Lissomsoft header - FIXED to match SmartGRC structure
  return (
    <motion.nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? "scrolled" : ""
      } ${isOpen ? "menu-open" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      ref={navbarRef}
    >
      {/* Enhanced background effects */}
      <div className="navbar-glow"></div>
      <div className="navbar-shimmer"></div>
      <div className="container">
        <a className="navbar-brand" href="/">
          <motion.div
            className="d-flex align-items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="logo-container">
              <div className="logo-glow"></div>
              <img
                className="logo"
                src="https://www.lissomsoft.com/assets/brand/lissom_logo.png"
                alt="Lissomsoft Logo"
              />
            </div>
            <motion.span
              className="ms-2 fw-bold brand-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              LISSOMSOFT
            </motion.span>
          </motion.div>
        </a>

        {/* Premium Hamburger Button */}
        <motion.button
          className={`premium-hamburger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <div className="hamburger-glow"></div>
        </motion.button>

        {/* FIX: Make the regular Lissomsoft navbar match the SmartGRC structure */}
        <div className="desktop-nav">
          <motion.ul
            className="navbar-nav ms-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Home Button */}
            <motion.li
              className="nav-item"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <NavLink
                className={({ isActive }) =>
                  `nav-link home-link ${isActive ? "active" : ""}`
                }
                to={home.path}
                onClick={() => setIsOpen(false)}
              >
                <span className="home-icon-container">
                  <i className={`fas fa-${home.icon}`}></i>
                  <div className="home-icon-glow"></div>
                </span>
              </NavLink>
            </motion.li>
            {navItems.map((dropdown, index) => (
              <motion.li
                className={`nav-item dropdown ${
                  activeDropdown === dropdown.id ? "show" : ""
                }`}
                key={dropdown.id}
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                onMouseEnter={() => handleMouseEnter(dropdown.id)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  className={`nav-link dropdown fw-semibold ${
                    activeDropdown === dropdown.id ? "active" : ""
                  }`}
                  href="#"
                  id={dropdown.id}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(dropdown.id);
                  }}
                  aria-expanded={activeDropdown === dropdown.id}
                >
                  <span className="nav-text">{dropdown.title}</span>
                  <motion.span
                    className="dropdown-arrow"
                    animate={{
                      rotate: activeDropdown === dropdown.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </motion.span>
                  <span className="nav-hover-effect"></span>
                </a>
                <AnimatePresence>
                  {activeDropdown === dropdown.id && (
                    <motion.div
                      className="dropdown-menu-container"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      onMouseEnter={() => handleMouseEnter(dropdown.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className="dropdown-menu-backdrop"
                        onClick={() => setActiveDropdown(null)}
                      ></div>
                      <motion.ul className="dropdown-menu custom-dropdown">
                        <div className="dropdown-header">
                          <span>{dropdown.title}</span>
                        </div>
                        {dropdown.items.map((item, i) => (
                          <motion.li
                            key={i}
                            variants={itemVariants}
                            onHoverStart={() => setHoverIndex(i)}
                            onHoverEnd={() => setHoverIndex(null)}
                          >
                            <Link
                              className={`dropdown-item ${
                                hoverIndex === i ? "active" : ""
                              }`}
                              to={item.path}
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsOpen(false);
                              }}
                            >
                              <span className="dropdown-icon icon-circle">
                                <i className={`fas fa-${item.icon}`}></i>
                              </span>
                              <span>{item.name}</span>
                              <motion.span
                                className="dropdown-item-highlight"
                                initial={{ width: 0 }}
                                animate={{
                                  width: hoverIndex === i ? "100%" : "0%",
                                }}
                                transition={{ duration: 0.3 }}
                              ></motion.span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}

            {singleNavItems.map((item, index) => (
              <motion.li
                className="nav-item"
                key={item}
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fw-semibold ${isActive ? "active" : ""} ${
                      item === "CONTACT" ? "contact-btn" : ""
                    }`
                  }
                  to={`/${item.toLowerCase()}`}
                  target={item === "MYSMARTGRC" ? "_blank" : undefined}
                  rel={
                    item === "MYSMARTGRC" ? "noopener noreferrer" : undefined
                  }
                  onClick={(e) => {
                    if (item === "MYSMARTGRC") {
                      e.preventDefault();
                      window.open("/mysmartgrc", "_blank");
                    }
                    setIsOpen(false);
                  }}
                >
                  <span className="nav-text">{item}</span>
                  {item !== "CONTACT" && (
                    <span className="nav-hover-effect"></span>
                  )}
                  {item === "CONTACT" && (
                    <>
                      <span className="btn-glow"></span>
                      <motion.span
                        className="btn-pulse-ring"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Mobile Navigation - Fullscreen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              ref={mobileMenuRef}
            >
              {/* Remove the redundant close button in the header */}
              <div className="mobile-menu-header">
                <div className="mobile-brand">
                  <img
                    src={
                      isSmartGrcPage
                        ? "https://lissomsoft.com/smart-grc/assets/logo/My%20Smart%20GRC-Logo%20(250x127%20px)1.png"
                        : "https://www.lissomsoft.com/assets/brand/lissom_logo.png"
                    }
                    alt={
                      isSmartGrcPage ? "My Smart GRC Logo" : "Lissomsoft Logo"
                    }
                    className="mobile-logo"
                  />
                  <span className="mobile-brand-text">
                    {isSmartGrcPage ? "My Smart GRC" : "LISSOMSOFT"}
                  </span>
                </div>
              </div>

              <div className="mobile-menu-content">
                {/* Add Home Link - New Addition */}

                {/* Main Navigation */}

                <div className="mobile-nav-main">
                  <motion.a
                    href="/"
                    className="mobile-menu-item home-item"
                    variants={mobileItemVariants}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/";
                      setIsOpen(false);
                    }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mobile-item-content">
                      <i className="fas fa-home"></i>
                      <span className="ms-2">Home</span>
                    </span>
                  </motion.a>
                  {(isSmartGrcPage ? smartGrcNavItems : navItems).map(
                    (category, index) => (
                      <motion.div
                        className="mobile-menu-category"
                        key={category.id}
                        variants={mobileItemVariants}
                        custom={index + 2}
                      >
                        <motion.div
                          className={`mobile-category-header ${
                            activeDropdown === category.id ? "active" : ""
                          }`}
                          onClick={() => toggleDropdown(category.id)}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{category.title}</span>
                          <motion.span
                            className="mobile-dropdown-icon"
                            animate={{
                              rotate: activeDropdown === category.id ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <i className="fas fa-chevron-down"></i>
                          </motion.span>
                        </motion.div>

                        <AnimatePresence>
                          {activeDropdown === category.id && (
                            <motion.div
                              className="mobile-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {category.items.map((item, i) => (
                                <motion.a
                                  key={i}
                                  href={item.path}
                                  className="mobile-submenu-item"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (item.path.includes("#")) {
                                      const sectionId = item.path.replace(
                                        "#",
                                        ""
                                      );
                                      scrollToSection(sectionId);
                                    } else {
                                      // Fix: Add navigation for regular Lissomsoft navbar dropdown items
                                      window.location.href = item.path;
                                    }
                                    setIsOpen(false);
                                  }}
                                  whileHover={{ x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <i className={`fas fa-${item.icon}`}></i>
                                  <span>{item.name}</span>
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  )}

                  {(isSmartGrcPage ? smartGrcSingleItems : singleNavItems).map(
                    (item, index) => (
                      <motion.a
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className={`mobile-menu-item ${
                          item === "CONTACT" ? "mobile-contact-btn" : ""
                        }`}
                        variants={mobileItemVariants}
                        custom={
                          index +
                          (isSmartGrcPage
                            ? smartGrcNavItems.length
                            : navItems.length) +
                          3
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.toLowerCase() === "contact") {
                            // Special handling for contact
                            window.location.href = `/${item.toLowerCase()}`;
                          } else if (isSmartGrcPage) {
                            scrollToSection(item.toLowerCase());
                          } else {
                            // Fix: Add navigation for regular Lissomsoft navbar items
                            window.location.href = `/${item.toLowerCase()}`;
                          }
                          setIsOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item}
                        {item === "CONTACT" && (
                          <>
                            <i className="fas fa-arrow-right"></i>
                            <div className="btn-pulse"></div>
                          </>
                        )}
                      </motion.a>
                    )
                  )}
                </div>
              </div>

              {/* Enhanced footer with more information */}
              <motion.div
                className="mobile-menu-footer"
                variants={mobileItemVariants}
                custom={10}
              >
                {isSmartGrcPage ? (
                  <>
                    <div className="powered-by-footer mb-3">
                      <span>Powered by</span>
                      <img
                        src="https://www.lissomsoft.com/assets/brand/lissom_logo.png"
                        alt="Powered by Lissomsoft"
                      />
                    </div>
                    <div className="social-icons">
                      <motion.a
                        href="https://www.linkedin.com/company/lissomsoft-technologies/"
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -5,
                          backgroundColor: "#0077b6",
                          color: "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fab fa-linkedin"></i>
                      </motion.a>
                      <motion.a
                        href="https://www.youtube.com/@lissomsoft-therisktechcomp2928/featured"
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -5,
                          backgroundColor: "#FF0000",
                          color: "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fab fa-youtube"></i>
                      </motion.a>
                      <motion.a
                        href="https://api.whatsapp.com/send?phone=9361829552"
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -5,
                          backgroundColor: "#25D366",
                          color: "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fab fa-whatsapp"></i>
                      </motion.a>
                      <motion.a
                        href="https://www.facebook.com/lissomsoft"
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -5,
                          backgroundColor: "#4267B2",
                          color: "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fab fa-facebook"></i>
                      </motion.a>
                    </div>
                    <p className="copyright mt-2">
                      © {new Date().getFullYear()} Lissomsoft. All rights
                      reserved.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="social-icons">
                      <motion.a
                        href="https://www.linkedin.com/company/lissomsoft-technologies/"
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -5,
                          backgroundColor: "#0077b6",
                          color: "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fab fa-linkedin"></i>
                      </motion.a>
                      <motion.a
                        href="https://api.whatsapp.com/send?phone=9361829552"
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -5,
                          backgroundColor: "#25D366",
                          color: "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fab fa-whatsapp"></i>
                      </motion.a>
                      <motion.a
                        href="https://www.facebook.com/lissomsoft"
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -5,
                          backgroundColor: "#4267B2",
                          color: "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fab fa-facebook"></i>
                      </motion.a>

                      <motion.a
                        href="https://www.youtube.com/@lissomsoft-therisktechcomp2928/featured"
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -5,
                          backgroundColor: "#FF0000",
                          color: "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fab fa-youtube"></i>
                      </motion.a>
                    </div>
                    <p className="copyright">
                      © {new Date().getFullYear()} Lissomsoft. All rights
                      reserved.
                    </p>
                  </>
                )}
              </motion.div>

              {/* Close button - positioned at the top right corner */}
              <motion.button
                className="mobile-menu-close"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                <i className="fas fa-times"></i>
                <div className="close-btn-ripple"></div>
              </motion.button>

              {/* Enhanced decorative elements */}
              <div className="mobile-menu-decoration top-left"></div>
              <div className="mobile-menu-decoration bottom-right"></div>
              <div className="mobile-menu-decoration middle-center"></div>

              {/* Animated background pattern */}
              <div className="menu-bg-pattern"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Add this CSS before the export
const styles = `
  /* Base Styling */
  .navbar {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    position: relative;
    z-index: 1000;
    border-bottom: 1px solid rgba(0, 119, 182, 0.1);
    height: 80px;
  }
  
  .navbar.scrolled {
    height: 70px;
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .navbar-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: -1;
    opacity: 0.5;
    pointer-events: none;
  }
  
  .navbar-glow {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 20px;
    background: radial-gradient(ellipse at center, rgba(0, 119, 182, 0.3) 0%, rgba(0, 119, 182, 0) 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: -1;
  }
      /* Home Icon Styling */
.home-link {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: visible;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-right: 15px;
  margin-left: 20px; /* Add space between logo and home icon */
}

.home-link:hover {
  background: rgba(0, 119, 182, 0.08);
}

.home-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0077b6, #00a8e8);
  color: white;
  box-shadow: 0 4px 10px rgba(0, 119, 182, 0.3);
  overflow: visible;
}

.home-icon-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: radial-gradient(circle, rgba(0, 168, 232, 0.8) 0%, rgba(0, 119, 182, 0) 70%);
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.home-icon-container:hover .home-icon-glow {
  opacity: 0.8;
}

.home-text {
  font-weight: 600;
  background: linear-gradient(45deg, #0077b6, #00a8e8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease;
}

.home-link:hover .home-text {
  transform: translateX(3px);
}

@media (max-width: 992px) {
  // .home-link {
  //   margin-right: 0;
  //   padding: 12px 15px;
  //   border-radius: 12px;
  //   background: rgba(255, 255, 255, 0.7);
  //   box-shadow: 0 2px 8px rgba(0, 119, 182, 0.05);
  //   border: 1px solid rgba(0, 119, 182, 0.1);
  //   width: 100%;
  //   margin-bottom: 10px;
  // }
  
  .home-icon-container {
    width: 36px;
    height: 36px;
  }
}

  
  .navbar-shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 8s infinite linear;
    pointer-events: none;
    z-index: -1;
    opacity: 0.5;
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .navbar.scrolled .navbar-glow {
    opacity: 1;
  }
  
  /* Logo Styling */
  .logo-container {
    position: relative;
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0, 119, 182, 0.4) 0%, rgba(0, 119, 182, 0) 70%);
    filter: blur(8px);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  .logo-container:hover .logo-glow {
    opacity: 1;
  }
  
  .logo {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 0 5px rgba(0, 119, 182, 0.2));
  }
  
  .navbar-brand:hover .logo {
    transform: rotate(5deg);
  }
  /* Add hardware acceleration for smoother animations */
.mobile-menu-overlay, 
.premium-hamburger, 
.hamburger-line {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  perspective: 1000px;
}

/* Optimize hamburger button transitions */
.hamburger-line {
  transition: all 0.2s ease-in-out; /* Faster transition */
  will-change: transform, opacity;
}

/* Optimize mobile menu transition */
.mobile-menu-overlay {
  transition: transform 0.25s ease-out;
  will-change: transform, opacity;
}
  .brand-text {
    color: #0077b6;
    letter-spacing: 1px;
    background: linear-gradient(45deg, #0077b6, #00a8e8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(0, 119, 182, 0.1);
  }
  
  /* Desktop Navigation */
  .desktop-nav {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin-left: auto;
    width: 70%; /* Add width to control the nav area */
  }
  
  .navbar-nav {
    display: flex;
    width: 100%;
    justify-content: space-around; /* Evenly distribute items */
    align-items: center;
  }

  .navbar-nav .nav-link {
    position: relative;
    padding: 8px 12px;
    color: #333;
    font-weight: 600;
    transition: color 0.3s ease;
    overflow: hidden;
    white-space: nowrap; /* Prevent text wrapping */
  }
  
  .nav-text {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease, color 0.3s ease;
  }
  
  .nav-hover-effect {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #0077b6, #00a8e8);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
    z-index: 1;
  }
  
  .navbar-nav .nav-link:hover .nav-text,
  .navbar-nav .nav-link.active .nav-text {
    color: #0077b6;
    transform: translateY(-2px);
  }
  
  .navbar-nav .nav-link:hover .nav-hover-effect,
  .navbar-nav .nav-link.active .nav-hover-effect {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  .navbar-nav .nav-link::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    height: 0;
    background: linear-gradient(to bottom, rgba(0, 119, 182, 0.1), transparent);
    transition: height 0.3s ease;
    z-index: 0;
  }
  
  .navbar-nav .nav-link:hover::before,
  .navbar-nav .nav-link.active::before {
    height: 100%;
  }
  
  /* Dropdown Arrow */
  .dropdown-arrow {
    display: inline-flex;
    margin-left: 5px;
    transition: transform 0.3s ease;
    font-size: 0.7rem;
    align-items: center;
    justify-content: center;
  }
  
  /* Dropdown Menu */
  .dropdown-menu-container {
    position: absolute;
    z-index: 1000;
    width: 280px;
  }
  
  .dropdown-menu-container.mega-menu {
    width: 320px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  .dropdown-menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
  
  .custom-dropdown {
    border: none;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 119, 182, 0.15);
    padding: 0;
    margin-top: 15px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 119, 182, 0.1);
    overflow: hidden;
    display: block;
    width: 100%;
  }
  
  .custom-dropdown::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 20px;
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.98);
    transform: rotate(45deg);
    border-top: 1px solid rgba(0, 119, 182, 0.1);
    border-left: 1px solid rgba(0, 119, 182, 0.1);
  }
  
  .dropdown-header {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0, 119, 182, 0.1);
    font-weight: 600;
    color: #0077b6;
    background: linear-gradient(to right, rgba(0, 119, 182, 0.05), transparent);
  }
  
  .dropdown-item {
    padding: 12px 20px;
    transition: all 0.3s ease;
    margin: 5px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  
  /* Fix for oval icons - create a new class for consistent circular icons */
  .icon-circle {
    margin-right: 12px;
    width: 30px !important;
    height: 30px !important;
    min-width: 30px !important;
    min-height: 30px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0077b6;
    transition: all 0.3s ease;
    border-radius: 50% !important;
    background: rgba(0, 119, 182, 0.1);
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .dropdown-icon {
    margin-right: 12px;
    width: 30px !important;
    height: 30px !important;
    min-width: 30px !important;
    min-height: 30px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0077b6;
    transition: all 0.3s ease;
    border-radius: 50% !important;
    background: rgba(0, 119, 182, 0.1);
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .dropdown-item-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 119, 182, 0.1), rgba(0, 168, 232, 0.05));
    z-index: -1;
    border-radius: 8px;
  }
  
  .dropdown-item:hover,
  .dropdown-item.active {
    color: #0077b6;
    transform: translateX(5px);
  }
  
  .dropdown-item:hover .dropdown-icon,
  .dropdown-item.active .dropdown-icon {
    transform: scale(1.2);
    color: #0077b6;
  }
  
  /* Contact Button */
  .contact-btn {
    position: relative;
    background: linear-gradient(45deg, #0077b6, #00a8e8);
    color: white !important;
    padding: 8px 20px !important;
    border-radius: 30px;
    margin-left: 15px; /* Increased from 10px to 15px for more spacing */
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 15px rgba(0, 119, 182, 0.2);
    overflow: hidden;
    z-index: 1;
  }
  
  .btn-content {
    position: relative;
    z-index: 2;
  }
  
  .btn-glow {
    position: absolute;
    top: -20%;
    left: -10%;
    width: 120%;
    height: 140%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
    transform: translateX(-100%) skewX(-15deg);
    transition: transform 0.5s ease;
  }
  
  .contact-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 119, 182, 0.3);
  }
  
  .contact-btn:hover .btn-glow {
    transform: translateX(100%) skewX(-15deg);
  }
  
  .btn-pulse-ring {
    position: absolute;
    top: 0%;
    left: 0%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 30px;
    border: 2px solid rgba(0, 0, 0, 0.16)
    z-index: -1;
  }
  
  /* Premium Hamburger Button */
  .premium-hamburger {
    display: none;
    background: transparent;
    border: none;
    width: 40px;
    height: 40px;
    position: relative;
    cursor: pointer;
    z-index: 1001;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .hamburger-line {
    display: block;
    position: absolute;
    height: 2px;
    width: 24px;
    background: #0077b6;
    border-radius: 2px;
    opacity: 1;
    left: 8px;
    transform: rotate(0deg);
    transition: all 0.25s ease-in-out;
  }
  
  .hamburger-line:nth-child(1) {
    top: 12px;
  }
  
  .hamburger-line:nth-child(2) {
    top: 19px;
  }
  
  .hamburger-line:nth-child(3) {
    top: 26px;
  }
  
  .premium-hamburger.active .hamburger-line:nth-child(1) {
    top: 19px;
    transform: rotate(45deg);
  }
  
  .premium-hamburger.active .hamburger-line:nth-child(2) {
    opacity: 0;
    transform: translateX(-20px);
  }
  
  .premium-hamburger.active .hamburger-line:nth-child(3) {
    top: 19px;
    transform: rotate(-45deg);
  }
   .back-to-lissomsoft-btn {
    position: relative;
    background: linear-gradient(45deg, #0077b6, #00a8e8);
    color: white !important;
    padding: 8px 15px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 4px 15px rgba(0, 119, 182, 0.2);
    overflow: hidden;
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
  .hamburger-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 119, 182, 0.2) 0%, rgba(0, 119, 182, 0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .premium-hamburger:hover .hamburger-glow {
    opacity: 1;
  }
  
  /* Mobile Menu Overlay */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1050;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    padding: 20px;
    box-sizing: border-box;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }
  
  .mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid rgba(0, 119, 182, 0.1);
  }
  
  .mobile-brand {
    display: flex;
    align-items: center;
  }
  
  .mobile-logo {
    height: 40px;
    width: auto;
  }
  
  .mobile-brand-text {
    margin-left: 10px;
    font-weight: bold;
    font-size: 1.2rem;
    background: linear-gradient(45deg, #0077b6, #00a8e8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .mobile-close-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 119, 182, 0.1);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0077b6;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .mobile-menu-content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .mobile-menu-category {
    margin-bottom: 15px;
  }
  
  .mobile-category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: rgba(0, 119, 182, 0.05);
    border-radius: 10px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .mobile-category-header:hover {
    background: rgba(0, 119, 182, 0.1);
    color: #333;
  }
  
  .mobile-submenu {
    padding: 5px 0;
    overflow: hidden;
  }
  
  .mobile-submenu-item {
    display: flex;
    align-items: center;
    padding: 12px 15px 12px 30px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    border-radius: 8px;
    margin: 5px 0;
  }
  
  .mobile-submenu-item i {
    margin-right: 10px;
    color: #0077b6;
    width: 20px;
    text-align: center;
  }
  
  .mobile-submenu-item:hover {
    background: rgba(0, 119, 182, 0.1);
    color: white; /* Change from #0077b6 to white */
    padding-left: 35px;
    background: linear-gradient(45deg, #0077b6, #00a8e8); /* Add gradient background */
  }
  
  .mobile-menu-item {
    padding: 15px;
    margin: 10px 0;
    background: rgba(0, 119, 182, 0.05);
    border-radius: 10px;
    color: #333;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .mobile-menu-item:hover {
    background: linear-gradient(45deg, #0077b6, #00a8e8); /* Change to gradient */
    color: white; /* Change from #0077b6 to white */
    transform: translateX(5px);
  }
  
  .mobile-contact-btn {
    background: linear-gradient(45deg, #0077b6, #00a8e8);
    color: white !important;
    box-shadow: 0 4px 15px rgba(0, 119, 182, 0.2);
  }
  
  .mobile-contact-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 119, 182, 0.3);
  }
  
  .mobile-menu-footer {
    padding: 20px;
    border-top: 1px solid rgba(0, 119, 182, 0.1);
    text-align: center;
  }
  
  .social-icons {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
  
  /* Find the social-icon class in the styles section and update the default color */
  .social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #0077b6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    transition: all 0.3s ease;
  }
  
  .social-icon:hover {
    background: #0077b6;
    color: white;
    transform: translateY(-3px);
  }
  
  .copyright {
    color: #777;
    font-size: 0.8rem;
    margin: 0;
  }
  
  /* Decorative elements */
  .mobile-menu-decoration {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    z-index: -1;
  }
  
  .mobile-menu-decoration.top-left {
    top: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #0077b6 0%, transparent 70%);
  }
  
  .mobile-menu-decoration.bottom-right {
    bottom: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #00a8e8 0%, transparent 70%);
  }
  
  /* Powered By Section */
  .powered-by {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #777;
  }
  
  .powered-by span {
    margin-right: 8px;
  }
  
  .powered-by img {
    height: 25px;
    width: auto;
    transition: transform 0.3s ease;
  }
  
  .powered-by:hover img {
    transform: scale(1.1);
  }
  
  /* Responsive Design */
  @media (max-width: 1100px) {
    .desktop-nav {
      display: none;
    }
    
    .premium-hamburger {
      display: block;
    }
    
    .mobile-menu-overlay {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    .navbar {
      height: 70px;
    }
    
    .navbar.scrolled {
      height: 60px;
    }
    
    .logo {
      height: 35px;
    }
    
    .brand-text {
      font-size: 1.2rem;
    }
    
    .mobile-menu-header {
      padding: 15px;
    }
    
    .mobile-logo {
      height: 35px;
    }
    
    .mobile-brand-text {
      font-size: 1rem;
    }
    
    .mobile-menu-content {
      padding: 15px;
    }
    
    .mobile-category-header,
    .mobile-menu-item {
      padding: 12px;
    }
    
    .mobile-submenu-item {
      padding: 10px 12px 10px 25px;
    }
    
    .mobile-submenu-item:hover {
      padding-left: 30px;
    }
  }

  /* Mobile Styles */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1050;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    padding: 20px;
    box-sizing: border-box;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }

  .mobile-menu-overlay.open {
    transform: translateX(0);
  }

  .mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .mobile-brand {
    display: flex;
    align-items: center;
  }

  .mobile-logo {
    height: 30px;
    margin-right: 10px;
  }

  .mobile-brand-text {
    font-size: 1.2em;
    font-weight: bold;
    color: #333;
  }

  .mobile-menu-close {
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #555;
    transition: color 0.3s;
  }

  .mobile-menu-close:hover {
    color: #0077b6;
  }

  .mobile-search-container {
    margin-bottom: 20px;
  }

  .mobile-search-bar {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 25px;
    padding: 5px 15px;
  }

  .search-icon {
    margin-right: 10px;
    color: #777;
  }

  .mobile-search-input {
    border: none;
    background: none;
    outline: none;
    flex: 1;
    font-size: 1em;
    color: #333;
  }

  .quick-links {
    margin-bottom: 20px;
  }

  .quick-links-title {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .quick-links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .quick-link-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 10px;
    text-decoration: none;
    color: #555;
    transition: background-color 0.3s, transform 0.2s;
    text-align: center;
  }

  .quick-link-item:hover {
    background-color: #e9e9e9;
    transform: scale(1.05);
  }

  .quick-link-icon {
    font-size: 1.5em;
    margin-bottom: 5px;
  }

  .quick-link-label {
    font-size: 0.9em;
  }

  .mobile-nav-main {
    flex: 1;
    padding: 0 20px;
    overflow-y: auto;
    margin-bottom: 20px;
    max-height: calc(100vh - 200px);
  }

  .mobile-menu-category {
    margin-bottom: 15px;
  }

  .mobile-category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background-color: #f0f0f0;
    border-radius: 8px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .mobile-category-header:hover {
    background-color: #e0e0e0;
  }

  .mobile-dropdown-icon {
    transition: transform 0.3s;
  }

  .mobile-submenu {
    padding-left: 15px;
    margin-top: 5px;
    overflow: hidden;
  }

  .mobile-submenu-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    text-decoration: none;
    color: #555;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.2s;
  }

  .mobile-submenu-item i {
    margin-right: 10px;
  }

  .mobile-submenu-item:hover {
    background-color: #e9e9e9;
    transform: translateX(5px);
  }

  .mobile-menu-item {
    padding: 12px 15px;
    margin-bottom: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
    color: #333;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.3s, transform 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mobile-menu-item:hover {
    background-color: #e0e0e0;
    transform: translateX(5px);
  }

  .mobile-contact-btn {
    background-color: #0077b6;
    color: #fff;
  }

  .mobile-contact-btn:hover {
    background-color: white;
  }

  .mobile-menu-footer {
    text-align: center;
    padding: 20px 0;
    border-top: 1px solid #eee;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  /* Also update the mobile-specific social-icon class */
  .mobile-menu-footer .social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    color: #0077b6;
    margin: 0 5px;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    border: 1px solid rgba(0, 119, 182, 0.2);
  }

  .social-icon:hover {
    background-color: #0077b6;
    color: #fff;
    transform: translateY(-3px);
  }

  .copyright {
    font-size: 0.8em;
    color: #777;
  }

  .mobile-menu-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    color: #555;
    cursor: pointer;
    transition: color 0.3s ease;
    z-index: 1051;
    padding: 5px;
  }

  .mobile-menu-close:hover {
    color: #0077b6;
  }

  .mobile-menu-decoration {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    z-index: -1;
  }

  .mobile-menu-decoration.top-left {
    top: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #0077b6 0%, transparent 70%);
  }

  .mobile-menu-decoration.bottom-right {
    bottom: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #00a8e8 0%, transparent 70%);
  }

  .mobile-menu-decoration.middle-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, #00a8e8 0%, transparent 70%);
  }

  .menu-bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='honeycomb' transform='translate(21 22)'%3E%3Cpath d='M0-22L18 11 0 22-18 11z' id='Hexagon' stroke='%230077b6' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.05;
    z-index: -2;
  }

  .btn-pulse {
    position: relative;
    display: inline-block;
  }

  .btn-pulse::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 119, 182, 0.3);
    z-index: -1;
    opacity: 0;
    transform: scale(0.8);
    animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1);
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }

  /* Enhanced Mobile Menu Styles */
  .mobile-menu-overlay {
    padding-top: 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 249, 255, 0.95));
  }
  
  /* Improved mobile header */
  .mobile-menu-header {
    padding: 0 20px 15px 20px;
    border-bottom: 1px solid rgba(0, 119, 182, 0.1);
  }
  
  /* Search bar - new feature */
  .mobile-search-container {
    padding: 15px 20px;
    margin-bottom: 10px;
  }
  
  .mobile-search-bar {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 119, 182, 0.2);
    border-radius: 30px;
    padding: 8px 15px;
    box-shadow: 0 2px 10px rgba(0, 119, 182, 0.05);
    transition: all 0.3s ease;
  }
  
  .mobile-search-bar:focus-within {
    box-shadow: 0 4px 15px rgba(0, 119, 182, 0.1);
    border-color: rgba(0, 119, 182, 0.4);
    background: white;
  }
  
  .search-icon {
    color: #0077b6;
    margin-right: 10px;
  }
  
  .mobile-search-input {
    border: none;
    background: transparent;
    flex: 1;
    outline: none;
    font-size: 0.9rem;
    color: #333;
  }
  
  /* Quick links grid - new feature */
  .quick-links {
    padding: 5px 20px 15px 20px;
    margin-bottom: 15px;
  }
  
  .quick-links-title {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #777;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
  
  .quick-links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  
  .quick-link-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    padding: 12px 5px;
    text-decoration: none;
    color: #333;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 119, 182, 0.05);
    border: 1px solid rgba(0, 119, 182, 0.1);
  }
  
  .quick-link-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 119, 182, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    color: #0077b6;
    transition: all 0.3s ease;
  }
  
  .quick-link-item:hover .quick-link-icon {
    background: #0077b6;
    color: white;
    transform: translateY(-3px);
  }
  
  .quick-link-label {
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  /* Main navigation section */
  .mobile-nav-main {
    padding: 0 20px;
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
    max-height: calc(100vh - 200px);
  }
  
  /* Improved category headers */
  .mobile-category-header {
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 2px 8px rgba(0, 119, 182, 0.05);
    border: 1px solid rgba(0, 119, 182, 0.1);
  }
  
  .mobile-category-header.active {
    background: rgba(0, 119, 182, 0.1);
    color: #0077b6;
    border-color: rgba(0, 119, 182, 0.2);
  }
  
  .mobile-dropdown-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(0, 119, 182, 0.1);
    color: #0077b6;
    font-size: 0.7rem;
  }
  
  /* Enhanced submenu items */
  .mobile-submenu {
    margin: 5px 0 15px 0;
    padding-left: 10px;
    border-left: 2px solid rgba(0, 119, 182, 0.2);
  }
  
  .mobile-submenu-item {
    background: rgba(255, 255, 255, 0.5);
    margin: 5px 0;
  }
  
  /* Improved menu items */
  .mobile-menu-item {
    box-shadow: 0 2px 8px rgba(0, 119, 182, 0.05);
    border: 1px solid rgba(0, 119, 182, 0.1);
    border-radius: 12px;
  }
  
  /* Enhanced contact button */
  .mobile-contact-btn {
    position: relative;
    overflow: hidden;
  }
  
  .btn-pulse {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    z-index: 0;
    animation: pulse-animation 2s infinite;
  }
  
  @keyframes pulse-animation {
    0% {
      transform: translateY(-50%) scale(0.8);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-50%) scale(1.2);
      opacity: 0.3;
    }
    100% {
      transform: translateY(-50%) scale(0.8);
      opacity: 0.7;
    }
  }
  
  /* Improved footer */
  .mobile-menu-footer {
    padding: 20px;
    border-top: 1px solid rgba(0, 119, 182, 0.1);
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
  }
  
  .powered-by-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #777;
  }
  
  .powered-by-footer span {
    margin-right: 10px;
  }
  
  .powered-by-footer img {
    height: 30px;
  }
  
  /* Improved social icons */
  .social-icons {
    margin-bottom: 15px;
  }
  
  .social-icon {
    margin: 0 8px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #0077b6;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, color 0.3s;
  }
  
  /* Close button - repositioned */
  .mobile-menu-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 119, 182, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0077b6;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .close-btn-ripple {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(0, 119, 182, 0.2) 0%, rgba(0, 119, 182, 0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .mobile-menu-close:hover .close-btn-ripple {
    opacity: 1;
  }
  
  /* Enhanced decorative elements */
  .mobile-menu-decoration.top-left {
    top: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 119, 182, 0.1) 0%, transparent 70%);
    animation: float 15s infinite alternate ease-in-out;
  }
  
  .mobile-menu-decoration.bottom-right {
    bottom: -150px;
    right: -150px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 168, 232, 0.1) 0%, transparent 70%);
    animation: float 20s infinite alternate-reverse ease-in-out;
  }
  
  .mobile-menu-decoration.middle-center {
    top: 40%;
    left: 30%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 119, 182, 0.05) 0%, transparent 70%);
    animation: float 12s infinite alternate ease-in-out;
  }
  
  @keyframes float {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(30px, 30px);
    }
  }
  
  /* Animated background pattern */
  .menu-bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(0, 119, 182, 0.03) 0%, transparent 8%),
      radial-gradient(circle at 30% 70%, rgba(0, 168, 232, 0.03) 0%, transparent 8%),
      radial-gradient(circle at 60% 30%, rgba(0, 119, 182, 0.03) 0%, transparent 8%),
      radial-gradient(circle at 90% 85%, rgba(0, 168, 232, 0.03) 0%, transparent 8%);
    background-size: 120% 120%;
    z-index: -1;
    animation: bg-animation 30s infinite alternate ease-in-out;
    opacity: 0.7;
  }
  
  @keyframes bg-animation {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }
  
  /* Responsive adjustments for the enhanced mobile menu */
  @media (max-width: 400px) {
    .quick-links-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .mobile-menu-close {
      top: 15px;
      right: 15px;
      width: 36px;
      height: 36px;
      font-size: 1rem;
    }
    
    .mobile-search-container,
    .quick-links,
    .mobile-nav-main {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  
  /* Enhanced Desktop Navigation */
  @media (min-width: 992px) {
    .navbar-nav .nav-link {
      position: relative;
      margin: 0 8px;
      padding: 10px 15px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .navbar-nav .nav-link:hover {
      background: rgba(0, 119, 182, 0.05);
    }
    
    .navbar-nav .nav-link.active {
      background: rgba(0, 119, 182, 0.1);
    }
    
    .dropdown-arrow {
      margin-left: 8px;
      font-size: 0.8rem;
      opacity: 0.7;
    }
    
    .mega-menu {
      width: 350px;
      border-radius: 16px;
      overflow: hidden;
    }
    
    .custom-dropdown {
      border-radius: 16px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 119, 182, 0.1);
      border: none;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(15px);
    }
    
    .dropdown-header {
      padding: 18px 25px;
      font-size: 1.1rem;
      letter-spacing: 0.5px;
      background: linear-gradient(to right, rgba(0, 119, 182, 0.08), rgba(0, 119, 182, 0.02));
    }
    
    .dropdown-item {
      padding: 15px 25px;
      margin: 8px;
      border-radius: 10px;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    .dropdown-icon {
      width: 30px;
      height: 30px;
      margin-right: 15px;
      background: rgba(0, 119, 182, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s ease;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .dropdown-item:hover .dropdown-icon {
      background: white;
      transform: scale(1.2) rotate(5deg);
    }
    
    .dropdown-item:hover {
      background: linear-gradient(45deg, #0077b6, #00a8e8);
      transform: translateX(8px);
      box-shadow: 0 5px 15px rgba(0, 119, 182, 0.2);
      color: white; /* Add this line to make text white on hover */
    }
    
    .contact-btn {
      padding: 10px 25px !important;
      font-weight: 600;
      letter-spacing: 0.5px;
      transform: translateY(0);
      box-shadow: 0 5px 20px rgba(0, 119, 182, 0.3);
    }
    
    .contact-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 119, 182, 0.4);
    }
    
    .btn-pulse-ring {
      z-index: 0;
    }
    
    /* Enhanced navbar animations */
    .navbar-brand {
      position: relative;
      overflow: visible;
    }
    
    .navbar-brand::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 5px;
      bottom: -10px;
      left: 0;
      background: linear-gradient(90deg, #0077b6, transparent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
      opacity: 0.5;
    }
    
    .navbar-brand:hover::after {
      transform: scaleX(1);
    }
  }

/* Fix 11: Add responsive styles for medium screens */
/* Media query for screen widths between 992px and 1199px */
@media (min-width: 992px) and (max-width: 1499px) {
  /* Adjust logo and brand text */
  .logo {
    height: 35px;
  }
  
  .brand-text {
    font-size: 0.9rem;
  }
  
  /* Adjust navigation links spacing */
  .navbar-nav .nav-link {
    padding: 8px 10px;
    margin: 0 3px;
    font-size: 0.9rem;
  }
  
  /* Adjust dropdown menu width */
  .dropdown-menu-container {
    width: 260px;
  }
  
  .dropdown-menu-container.mega-menu {
    width: 280px;
  }
  
  /* Adjust dropdown items */
  .dropdown-item {
    padding: 12px 20px;
  }
  
  /* Adjust contact button */
  .contact-btn {
    padding: 8px 15px !important;
  }
  
  /* Adjust powered by section */
  .powered-by {
    font-size: 0.8rem;
  }
  
  .powered-by img {
    height: 20px;
  }
  
  /* SmartGRC specific adjustments */
  .navbar-brand .logo-container .logo {
    height: 32px;
  }
}

.back-to-lissomsoft-btn {
  position: relative;
  background: linear-gradient(45deg, #0077b6, #00a8e8);
  color: white !important;
  padding: 8px 15px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 119, 182, 0.2);
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.back-to-lissomsoft-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(0, 119, 182, 0.3);
}

.back-to-lissomsoft-btn i {
  margin-right: 8px;
}
`;

export default Header;
