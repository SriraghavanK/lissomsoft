"use client"

import { useEffect } from "react"
import ServicePage from "./ServicePage"

const CloudServicesPage = () => {
  // Service category data
  const serviceCategories = [
    { id: "strategic", name: "Strategic Cloud Migration" },
    { id: "cost", name: "Cloud Cost Optimization" },
    { id: "data", name: "Data Centre Migration" },
    { id: "security", name: "Enhanced Security Assessment" },
  ]

  // Accordion data for each service category
  const accordionData = {
    strategic: [
      {
        id: "current-state",
        title: "Current State Assessment",
        content:
          "Evaluate existing infrastructure for enhancement opportunities.",
      },
      {
        id: "portfolio",
        title: "Portfolio Analysis",
        content:
          "Analyze applications for optimal migration strategies.",
      },
      {
        id: "feasibility",
        title: "Feasibility Assessment",
        content: "Determine the viability of specific application migrations.",
      },
      {
        id: "6rs",
        title: "6Rs Evaluation",
        content: "Assess applications for rehosting, rearchitecting, refactoring, re-platforming, retention, or retirement.",
      },
      {
        id: "business-case",
        title: "Business Case Building",
        content: "Develop a concise business case outlining migration benefits and ROI.",
      },
      {
        id: "tco",
        title: "Total Cost of Ownership (TCO)",
        content: "Calculate TCO for cost-effective migration. ",
      },
      {
        id: "roadmap",
        title: "Application Migration Roadmap",
        content: "Plan and prioritize application migration with clear accountability, governance, and success metrics.",
      },
    ],
    cost: [
      {
        id: "monitoring",
        title: "Cloud Infrastructure Monitoring",
        content: "Proactively monitor your cloud infrastructure to identify potential issues and enhance performance.",
      },
      {
        id: "metering",
        title: "Cloud Usage Metering & Billing",
        content: "Implement precise metering and billing systems to accurately measure and account for your cloud usage.",
      },
      {
        id: "spends",
        title: "Cloud Spends Optimization",
        content: "Streamline and optimize your cloud expenditures for cost-effectiveness without compromising performance.",
      },
      {
        id: "intelligence",
        title: "Real-Time & Monthly Intelligence",
        content: "Stay informed with real-time insights and monthly intelligence reports to make data-driven decisions for ongoing optimization.",
      },
    ],
    data: [
      {
        id: "tech-landscape",
        title: "Technology Landscape Mapping",
        content: "Evaluate and map the current technology landscape to guide the migration process.",
      },
      {
        id: "risk",
        title: "Business Risk Assessment",
        content: "Identify and assess potential business risks associated with the migration journey.",
      },
      {
        id: "data-access",
        title: "Data Access, Dependency & Security Assessment",
        content: "Conduct a thorough analysis of data access, dependencies, and security measures to ensure a secure and efficient transition.",
      },
      {
        id: "migration-planning",
        title: "Migration Planning",
        content: "Develop a comprehensive migration plan, considering all critical factors for a smooth transition.",
      },
      {
        id: "performance",
        title: "Pre and Post Performance Measurement",
        content: "Implement rigorous pre and post- migration performance measurements to track and enhance overall efficiency.",
      },
    ],
    security: [
      {
        id: "infra-security",
        title: "Cloud Infra Security Tests",
        content:
          "Rigorous testing to fortify the security of your cloud infrastructure.",
      },
      {
        id: "monitoring",
        title: "Continuous Security Monitoring",
        content: "Proactive and continuous monitoring to detect and address security threats in real-time.",
      },
      {
        id: "architecture",
        title: "Architecture Review",
        content:
          "Thorough review of your cloud architecture to identify potential vulnerabilities and weaknesses.",
      },
      {
        id: "os-firewall",
        title: "OS & Firewall Vulnerability Tests",
        content:
          "In-depth assessments to pinpoint vulnerabilities in operating systems and firewalls.",
      },
      {
        id: "load-performance",
        title: "Load and Performance Tests",
        content:
          "Evaluating the robustness of your system under various loads and performance scenarios.",
      },
      {
        id: "dos",
        title: "DOS/DDOS Tests",
        content:
          "Comprehensive tests to assess the resilience of your infrastructure against Denial of Service (DOS) and Distributed Denial of Service (DDOS) attacks.",
      },
    ],
  }

  // Page-specific data
  const pageData = {
    hero: {
      title: "Adopt Tailored Cloud Services for Seamless Scalability and 24/7 Accessibility.",
      subtitle:
        "At Lissomsoft, we guide your cloud transition, architect the framework, and ensure seamless data migration.",
      buttonText: "Want to Learn More? Contact Us!",
      buttonLink: "/contact",
      imageSrc: "https://www.lissomsoft.com/assets/tab/cloud%20services.jpg",
    },
    overview: {
      title: "Transformative Cloud Solutions for Modern Businesses",
      content: (
        <p className="lead mb-4">
          Step into a realm of transformative cloud services at Lissomsoft! Our holistic approach covers a thorough tech
          setup review, migration roadmap crafting, and AWS cloud architecture consulting. With ongoing operational
          support, we guarantee a reliable foundation for your business success in the cloud.
        </p>
      ),
      image: "https://www.lissomsoft.com/assets/Intro%20Images/cloud%20%20services.jpg",
   
    },
    approach: {
      content: (
        <p className="lead mb-4">
          Embrace agility and innovation for competitiveness. Our digital transformation leverages IoT, Data Analytics,
          and AI to automate processes, optimize data collection, and meet evolving customer needs.
        </p>
      ),
      image: "https://www.lissomsoft.com/assets/Approaches-New/cloud-services-approaches.png",
      steps: [
        "Assess your current infrastructure and requirements",
        "Design a tailored cloud migration strategy",
        "Implement secure and efficient cloud solutions",
        "Provide ongoing optimization and support",
      ],
    },
    servicesTabName: "Services",
    cta: {
      title: "Revolutionize Your Cloud Transition with LissomSoft!",
      subtitle: "Experience the power of modern cloud solutions tailored to your business needs",
      buttonText: "Contact us",
      buttonLink: "/contact",
    },
    stats: [
      { icon: "fa-cloud", value: "99.9%", label: "Uptime" },
      { icon: "fa-shield-alt", value: "100%", label: "Data Security" },
      { icon: "fa-tachometer-alt", value: "60%", label: "Cost Reduction" },
      { icon: "fa-server", value: "1000+", label: "Servers Managed" },
    ],
  }

  // Initialize any page-specific effects
  useEffect(() => {
    // Set page title
    document.title = "Cloud Services | Lissomsoft"

    // Any other page-specific initialization
  }, [])

  return <ServicePage pageData={pageData} serviceCategories={serviceCategories} accordionData={accordionData} />
}

export default CloudServicesPage

