"use client"

import { useState, useEffect, useRef } from "react"
import HeroSection from "../components/Herosection"
import "../styles/ResourcesPage.css"

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [isVisible, setIsVisible] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const resourcesRef = useRef(null)

  // Hero content for the resources page
  const heroContent = {
    title: "Explore our Info Repository: Lissomsoft's Resource Hub",
    subtitle:
      "Discover customer success stories, solution overviews, and industry insights to help your business thrive.",
    buttonText: "Browse Resources",
    buttonLink: "#",
    imageSrc:
      "https://imgs.search.brave.com/wDg25Wj1l9ArGdpP2BCO13icKWLezgQVJioRkpDPDmE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/bG9zZS11cC1tYW4t/dXNpbmctZGlnaXRh/bC1kZXZpY2UtaG9t/ZV8yMy0yMTQ5MTA1/OTc1LmpwZz9zZW10/PWFpc19oeWJyaWQ",
  }

  // Resource categories
  const resourceCategories = [
    { id: "all", name: "All Resources", icon: "th-large" },
    { id: "case-studies", name: "Case Studies", icon: "file-alt" },
    { id: "brochures", name: "Brochures", icon: "book-open" },
    { id: "whitepapers", name: "Whitepapers", icon: "file-pdf" },
    { id: "webinars", name: "Webinars", icon: "video" },
  ]

  // Resources data with expanded content
  const resourcesData = [
    {
      id: 1,
      title: "GRC Implementation for Financial Services",
      type: "case-studies",
      category: "Case Study",
      description:
        "Learn how our GRC implementation helped a leading financial institution streamline their compliance processes and reduce risk exposure by 45% within six months.",
      content:
        "A major financial services company with operations across 12 countries was struggling with fragmented compliance processes and increasing regulatory pressure. Their existing systems couldn't scale to meet growing demands, resulting in compliance gaps and potential regulatory penalties. Lissomsoft implemented our SmartGRC solution, integrating their disparate systems and automating key compliance workflows. The result was a 45% reduction in risk exposure, 60% faster compliance reporting, and estimated annual savings of $1.2M in operational costs. The centralized dashboard now provides real-time visibility into compliance status across all jurisdictions.",
      image:
        "https://imgs.search.brave.com/hVOIT_WcJrfHXt6bc-ydZ4a-ZMNJZx8yArD6jrffz5k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ncmMt/c29sdXRpb25zLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8wOS9tYW53aXRo/Z2xhc3Nlcy5wbmc",
      fileType: "PDF",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      title: "Lissomsoft SmartGRC Platform Overview",
      type: "brochures",
      category: "Brochure",
      description:
        "Explore our SmartGRC solution that helps organizations improve performance and accountability with industry-leading risk management tools.",
      content:
        "The Lissomsoft SmartGRC platform is a comprehensive governance, risk, and compliance solution designed for modern enterprises. Our platform integrates risk management, compliance, audit management, and policy administration in a single, unified interface. Key features include real-time risk monitoring, automated compliance workflows, customizable risk assessment frameworks, and advanced analytics with AI-powered insights. The platform supports integration with over 50 enterprise systems and comes with pre-built templates for major regulatory frameworks including GDPR, HIPAA, SOX, and ISO 27001. Our cloud-native architecture ensures scalability, while role-based access controls maintain data security and integrity across your organization.",
      image: "https://lissomsoft.com/smart-grc/assets/logo/My%20Smart%20GRC-Logo%20(250x127%20px)1.png ",
      fileType: "PDF",
      fileSize: "3.1 MB",
    },
    {
      id: 3,
      title: "Third-Party Risk Management Solution",
      type: "brochures",
      category: "Brochure",
      description:
        "Discover our Third-Party Risk Management solution that helps you effectively manage vendor relationships and mitigate third-party risks.",
      content:
        "In today's interconnected business environment, third-party relationships present significant risks that must be managed effectively. Lissomsoft's TPRM solution provides comprehensive vendor risk assessment, continuous monitoring, and streamlined vendor onboarding. Our platform includes customizable questionnaires, automated risk scoring, contract management, and performance tracking. The solution features a vendor portal for seamless collaboration, due diligence documentation, and compliance certification. With our TPRM solution, organizations can reduce the administrative burden of vendor management by up to 70% while gaining deeper insights into their vendor ecosystem. The platform includes specialized modules for financial, cybersecurity, operational, and regulatory risk assessment, ensuring complete coverage of your third-party risk landscape.",
      image:
        "https://imgs.search.brave.com/9sC6yrtyen2YOLyjt89HSovQ0D7Ky8HTQIXq6IqCt5k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmF0/YS5jb20vX25leHQv/aW1hZ2U_dXJsPWh0/dHBzOi8vaW1hZ2Vz/LmRyYXRhLmNvbS94/M2hvcXlqbTNjMjcv/NmxPR2hwcDlBZDJk/b1V5amZQdm0zTC81/ZjAzNWJhMTgzMDdk/Njc3ODMwMjE4YjY5/NmY3NDcyNC93aGF0/LWlzLXRoaXJkLXBh/cnR5LXJpc2stbWFu/YWdlbWVudC5wbmcm/dz0zODQwJnE9NzU",
      fileType: "PDF",
      fileSize: "2.8 MB",
    },
    {
      id: 4,
      title: "Digital Transformation Roadmap for Risk Management",
      type: "whitepapers",
      category: "Whitepaper",
      description:
        "A comprehensive guide to navigating your organization's digital transformation journey with practical steps and best practices.",
      content:
        "This whitepaper provides a strategic framework for organizations looking to digitally transform their risk management functions. We outline a phased approach that balances innovation with risk control, starting with an assessment of your current risk management maturity. The paper explores how to build a business case for digital risk management, select appropriate technologies, and implement change management strategies that ensure adoption. We examine case studies from multiple industries, highlighting common pitfalls and critical success factors. The roadmap includes guidance on integrating emerging technologies like AI, machine learning, and robotic process automation into risk workflows, with practical examples of how these technologies can enhance risk identification, assessment, and monitoring. The final section provides a detailed implementation timeline and resource planning guide to help organizations budget and staff their digital transformation initiatives effectively.",
      image:
        "https://imgs.search.brave.com/t-nVoANSuUDJors54_6RS5p-uqRnWAvcGD9FJGEMPbI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/MTQ4NTg0My9waG90/by9kaWdpdGFsLXRy/YW5zZm9ybWF0aW9u/LWNvbmNlcHQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUxo/MmFQZlZGMXp4bFky/c3dhMzJpa1Ntd29z/akZZTzJUNkQzSlM2/UDJpNnc9",
      fileType: "PDF",
      fileSize: "4.2 MB",
    },
    {
      id: 5,
      title: "Cloud Migration Strategy for Regulated Industries",
      type: "whitepapers",
      category: "Whitepaper",
      description:
        "Learn the key considerations and strategies for a successful cloud migration that minimizes disruption and maximizes value.",
      content:
        "This comprehensive whitepaper addresses the unique challenges faced by regulated industries when migrating to cloud environments. We provide a detailed framework for assessing cloud readiness, selecting appropriate cloud models (public, private, hybrid), and ensuring regulatory compliance throughout the migration process. The paper includes a risk-based approach to data classification and protection, with specific guidance for financial services, healthcare, and public sector organizations. We outline architectural patterns that maintain compliance while leveraging cloud benefits, and provide a detailed discussion of shared responsibility models across different cloud providers. The strategy includes approaches for legacy system migration, testing methodologies, and business continuity planning during transition phases. The final section covers ongoing governance and compliance monitoring in cloud environments, with practical advice for maintaining regulatory alignment as cloud services evolve.",
      image: "https://t3.ftcdn.net/jpg/05/67/78/16/240_F_567781689_dw3m1kgVbUAC7EobtXAY9cBCZBwqNANv.jpg",
      fileType: "PDF",
      fileSize: "3.5 MB",
    },
    {
      id: 6,
      title: "Risk Management in the Digital Age: Emerging Threats and Opportunities",
      type: "webinars",
      category: "Webinar",
      description:
        "Join our experts as they discuss modern risk management approaches and how to protect your business in an increasingly digital world.",
      content:
        "This on-demand webinar features a panel discussion with Lissomsoft's Chief Risk Officer and guest speakers from leading financial and technology organizations. The session explores how digital transformation is reshaping the risk landscape, introducing new threats while creating opportunities for more effective risk management. Topics covered include the impact of remote work on operational risk, emerging cyber threats and defense strategies, regulatory trends in digital risk oversight, and the role of advanced analytics in predictive risk management. The panel shares practical insights on building organizational resilience, balancing innovation with risk control, and developing risk-aware cultures. The webinar includes interactive case studies and a comprehensive Q&A session addressing common challenges faced by risk management professionals. Viewers will gain actionable strategies they can implement immediately to strengthen their organization's risk posture in the digital age.",
      image:
        "https://imgs.search.brave.com/LsOeW92yPck72gRj1w4RDaHjnZX5yELCnu2LYtkHSKo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXBleGdsb2JhbGxl/YXJuaW5nLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/MS9yaXNrLW1hbmFn/ZW1lbnQtZGlnaXRh/bC1hZ2UtNzY4eDM4/NC5qcGc",
      duration: "60 minutes",
      date: "Available On-Demand",
    },
  ]

  // Featured resources with expanded content
  const featuredResources = [
    {
      title: "Enterprise Risk Management Framework",
      description:
        "A comprehensive guide to implementing an effective enterprise risk management framework in your organization.",
      content:
        "Our Enterprise Risk Management Framework provides a structured approach to identifying, assessing, and managing risks across your organization. This comprehensive guide outlines the key components of a robust ERM program, including risk governance structures, risk appetite statements, risk assessment methodologies, and monitoring mechanisms. The framework is aligned with leading standards such as COSO ERM and ISO 31000, while offering practical implementation guidance tailored to different organizational sizes and maturity levels. It includes tools for risk prioritization, key risk indicator development, and board reporting templates. The guide also addresses how to integrate ERM with strategic planning processes to ensure risk considerations inform business decisions at all levels.",
      icon: "shield-alt",
      link: "#",
    },
    {
      title: "Digital Transformation Success Stories",
      description: "Real-world examples of successful digital transformation initiatives across various industries.",
      content:
        "This collection of case studies showcases how organizations across different sectors have successfully navigated their digital transformation journeys. Each case study provides detailed insights into the challenges faced, strategies employed, and outcomes achieved. Featured stories include a regional bank that transformed its customer onboarding process, reducing time-to-onboard from weeks to minutes while strengthening KYC compliance; a healthcare provider that implemented predictive analytics to improve patient outcomes and resource allocation; and a manufacturing company that deployed IoT sensors and real-time monitoring to optimize production and maintenance schedules. The collection highlights critical success factors such as executive sponsorship, cross-functional collaboration, and iterative implementation approaches that can be applied to your own transformation initiatives.",
      icon: "rocket",
      link: "#",
    },
    {
      title: "Cloud Security Best Practices",
      description: "Essential security practices to protect your data and applications in the cloud environment.",
      content:
        "This comprehensive guide outlines essential security practices for organizations operating in cloud environments. It covers the fundamental security principles that apply across all major cloud platforms, as well as platform-specific security features and configurations. Topics include identity and access management, data encryption, network security, threat detection, incident response, and compliance monitoring in cloud environments. The guide provides practical implementation advice for security controls at each layer of the cloud stack, from infrastructure to applications. It includes security architecture patterns for different use cases, security testing methodologies for cloud deployments, and guidance on security automation. The final section addresses governance considerations, including security policy development, risk assessment frameworks, and third-party risk management for cloud service providers.",
      icon: "cloud",
      link: "#",
    },
  ]

  // Animation on scroll effect
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

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (tab) => {
    setIsLoading(true)
    setActiveTab(tab)

    // Simulate loading data when changing tabs
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const scrollToResources = () => {
    if (resourcesRef.current) {
      resourcesRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Filter resources based on active tab
  const filteredResources =
    activeTab === "all" ? resourcesData : resourcesData.filter((resource) => resource.type === activeTab)

  return (
    <div className="resources-page-wrapper d-flex flex-column min-vh-100">
      <div className="resources-page flex-grow-1">
        {/* Hero Section */}
        <HeroSection
          title={heroContent.title}
          subtitle={heroContent.subtitle}
          buttonText={heroContent.buttonText}
          buttonLink="#"
          imageSrc={heroContent.imageSrc}
          className="responsive-hero"
          onClick={scrollToResources}
        />

        {/* Featured Resources Section */}
        <section className="py-5 bg-white">
          <div className="container py-4">
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8 text-center">
                <h2 className="fw-bold mb-3 animate-on-scroll" data-id="featured-title">
                  Featured Resources
                </h2>
                <p className="lead text-muted animate-on-scroll" data-id="featured-subtitle">
                  Explore our most popular resources to help you navigate the complex world of business technology and
                  risk management
                </p>
              </div>
            </div>

            <div className="row">
              {featuredResources.map((resource, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div
                    className="card h-100 border-0 shadow-sm hover-lift transition-all animate-on-scroll"
                    data-id={`featured-${index}`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="card-body p-4 text-center">
                      <div className="featured-icon-wrapper mb-4 mx-auto">
                        <i className={`fas fa-${resource.icon} fa-2x text-white`}></i>
                      </div>
                      <h3 className="h5 card-title fw-bold mb-3">{resource.title}</h3>
                      <p className="card-text text-muted">{resource.description}</p>
                    </div>
                    <div className="card-footer bg-white border-0 p-4">
                      <div className="content-preview">
                        <h4 className="h6 mb-3">Content Preview:</h4>
                        <p className="small text-muted content-excerpt">{resource.content.substring(0, 150)}...</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-5 bg-light" id="resources-section" ref={resourcesRef}>
          <div className="container py-4">
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8 text-center">
                <h2 className="fw-bold mb-3 animate-on-scroll" data-id="resources-title">
                  Resource Library
                </h2>
                <p className="lead text-muted animate-on-scroll" data-id="resources-subtitle">
                  Browse our collection of case studies, brochures, whitepapers, and webinars
                </p>
              </div>
            </div>

            {/* Resource Categories Navigation */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="resource-categories">
                  {resourceCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`resource-category-item ${activeTab === category.id ? "active" : ""}`}
                      onClick={() => handleTabChange(category.id)}
                    >
                      <i className={`fas fa-${category.icon} me-2`}></i>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources Content */}
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row">
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource, index) => (
                    <div key={resource.id} className="col-lg-4 col-md-6 mb-4">
                      <div
                        className="card h-100 border-0 shadow-sm resource-card animate-on-scroll"
                        data-id={`resource-${resource.id}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="resource-img-container">
                          <img
                            src={resource.image || "/placeholder.svg?height=300&width=500"}
                            alt={resource.title}
                            className="card-img-top resource-img"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=300&width=500"
                            }}
                          />
                          <div className="resource-category-badge">{resource.category}</div>
                        </div>
                        <div className="card-body p-4">
                          <h3 className="h5 card-title fw-bold mb-3">{resource.title}</h3>
                          <p className="card-text text-muted mb-4">{resource.description}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            {resource.fileType && (
                              <span className="resource-meta">
                                <i className="fas fa-file me-2"></i>
                                {resource.fileType} • {resource.fileSize}
                              </span>
                            )}
                            {resource.duration && (
                              <span className="resource-meta">
                                <i className="fas fa-clock me-2"></i>
                                {resource.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="card-footer bg-white border-0 p-4">
                          <div className="content-preview">
                            <h4 className="h6 mb-3">Content Summary:</h4>
                            <p className="small text-muted content-excerpt">{resource.content.substring(0, 200)}...</p>
                            <div className="resource-details mt-3">
                              <div className="resource-detail">
                                <i className="fas fa-calendar-alt text-primary me-2"></i>
                                <span>
                                  Published:{" "}
                                  {new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="resource-detail">
                                <i className="fas fa-user text-primary me-2"></i>
                                <span>Author: Lissomsoft Research Team</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <div className="empty-state">
                      <i className="fas fa-search fa-3x text-muted mb-3"></i>
                      <h3 className="h5 mb-3">No resources found</h3>
                      <p className="text-muted">
                        We couldn't find any resources in this category. Please try another category.
                      </p>
                      <button className="btn btn-outline-primary mt-3" onClick={() => handleTabChange("all")}>
                        View All Resources
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Industry Insights Section */}
        <section className="py-5 bg-white">
          <div className="container py-4">
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8 text-center">
                <h2 className="fw-bold mb-3 animate-on-scroll" data-id="insights-title">
                  Industry Insights
                </h2>
                <p className="lead text-muted animate-on-scroll" data-id="insights-subtitle">
                  Stay informed with the latest trends and developments in risk management and digital transformation
                </p>
              </div>
            </div>

            <div className="row">
              {[
                {
                  title: "The Future of Regulatory Compliance",
                  excerpt:
                    "Regulatory requirements continue to evolve at an unprecedented pace. Organizations must adopt agile compliance frameworks that can adapt to changing regulations while maintaining operational efficiency. This article explores emerging regulatory trends and how technology can enable more responsive compliance programs.",
                  date: "June 15, 2023",
                  readTime: "8 min read",
                  category: "Compliance",
                },
                {
                  title: "AI-Powered Risk Management",
                  excerpt:
                    "Artificial intelligence is transforming how organizations identify, assess, and mitigate risks. From predictive analytics to natural language processing, AI technologies offer new capabilities for risk professionals. This article examines practical applications of AI in risk management and implementation considerations.",
                  date: "August 22, 2023",
                  readTime: "10 min read",
                  category: "Technology",
                },
                {
                  title: "Building Operational Resilience",
                  excerpt:
                    "Recent global disruptions have highlighted the importance of operational resilience. Organizations must develop the ability to adapt, respond, and recover from unexpected events. This article outlines a framework for building resilience across people, processes, and technology domains.",
                  date: "October 5, 2023",
                  readTime: "7 min read",
                  category: "Strategy",
                },
              ].map((insight, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card h-100 border-0 shadow-sm hover-lift animate-on-scroll"
                    data-id={`insight-${index}`}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between mb-3">
                        <span className="badge bg-primary-soft text-primary">{insight.category}</span>
                        <small className="text-muted">{insight.date}</small>
                      </div>
                      <h3 className="h5 card-title fw-bold mb-3">{insight.title}</h3>
                      <p className="card-text text-muted">{insight.excerpt}</p>
                    </div>
                    <div className="card-footer bg-white border-0 p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted">
                          <i className="fas fa-clock me-1"></i> {insight.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-5 bg-light">
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card border-0 shadow-lg p-3 p-md-5 animate-on-scroll" data-id="cta-card">
                  <div className="card-body text-center">
                    <h2 className="fw-bold mb-4">Need Custom Resources for Your Business?</h2>
                    <p className="lead mb-4">
                      Our team of experts can develop tailored resources to address your specific business challenges
                      and objectives.
                    </p>
                    <div className="row mt-5">
                      <div className="col-md-4 mb-4 mb-md-0">
                        <div className="cta-feature">
                          <div className="cta-icon mb-3">
                            <i className="fas fa-file-alt fa-2x text-primary"></i>
                          </div>
                          <h4 className="h5 mb-3">Custom Research</h4>
                          <p className="text-muted">
                            Industry-specific research and analysis tailored to your business needs
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 mb-md-0">
                        <div className="cta-feature">
                          <div className="cta-icon mb-3">
                            <i className="fas fa-chalkboard-teacher fa-2x text-primary"></i>
                          </div>
                          <h4 className="h5 mb-3">Training Materials</h4>
                          <p className="text-muted">
                            Customized training content for your team's specific requirements
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="cta-feature">
                          <div className="cta-icon mb-3">
                            <i className="fas fa-chart-line fa-2x text-primary"></i>
                          </div>
                          <h4 className="h5 mb-3">Benchmarking Reports</h4>
                          <p className="text-muted">
                            Compare your performance against industry standards and best practices
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-muted mb-0">Contact our team to discuss your specific needs</p>
                      <p className="fw-bold">
                        <i className="fas fa-envelope me-2 text-primary"></i> resources@lissomsoft.com
                        <span className="mx-3">|</span>
                        <i className="fas fa-phone me-2 text-primary"></i> +91 9361829552
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResourcesPage

