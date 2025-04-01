import { useEffect } from "react";
import ServicePage from "./ServicePage";
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const RiskManagementPage = () => {
  // Page-specific data

  const pageData = {
    hero: {
      title: "Navigate Business Risks with Confidence.",
      subtitle: "Reduce risks, enhance performance, and ensure compliance.",
      buttonText: "Read More",
      buttonLink: "/mysmartgrc",
      target: "_blank",
      imageSrc: "https://www.lissomsoft.com/assets/tab/risk-advisory.jpg",
    },
    overview: {
      title: "Reduce risks, enhance performance, and ensure compliance.",
      subtitle: "Partner with Lissomsoft for a resilient business future.",
      content: (
        <>
          <p className="mb-4">
            In today's fast-paced business environment, mitigating risks and
            ensuring regulatory compliance is crucial. Introducing MySmartGRC,
            an end-to-end Risk Management software by Lissomsoft.
          </p>
          <p className="mb-4">
            From proactively identifying and mitigating risks to serving diverse
            industries, it provides an intuitive dashboard and versatile report
            templates. Elevate your risk management with our Third-Party Risk
            Management (TPRM) Solution, a dependable partner automating
            governance and compliance protocols with your third-party
            associates, ensuring business continuity, and safeguarding your
            reputation.
          </p>
        </>
      ),
      image: "https://www.lissomsoft.com/assets/risk/risk%20banner.webp",
    },
    approach: {
      content: (
        <p className="lead mb-4">
          Proactively identify, manage, and mitigate internal and third-party
          risks. A versatile, end-to-end Risk Management software, meeting
          regulatory standards and serving diverse industries for sustained
          business continuity.
        </p>
      ),
      image:
        "https://www.lissomsoft.com/assets/Approaches-New/risk-advisory-approaches.png",
      steps: [
        "Identify potential risks across your organization",
        "Assess and prioritize risks based on impact and likelihood",
        "Develop mitigation strategies for high-priority risks",
        "Implement controls and monitor effectiveness",
        "Continuously improve your risk management framework",
      ],
    },
    servicesTabId: "consulting-services",
    servicesTabName: "Consulting Services",
    services: [
      {
        title: "Establish Governance framework",
        content:
          "Establish a governance framework for operational risk management, defining structure, responsibilities, terms, and reporting for a streamlined approach.",
      },
      {
        title: "Operational Risk Management Policy",
        content:
          "Craft a policy outlining key components of the operational risk management framework, delineating its definition, approach, and management processes.",
      },
      {
        title: "Design Operational Risk Framework",
        content: (
          <>
            <p>
              Identify and assess operational risks across products, functions,
              and business units. This includes the following:
            </p>
            <ul className="mt-3">
              <li className="mb-2">
                Create risk registers to identify and record operational risk
                events.
              </li>
              <li className="mb-2">Finalise comprehensive risk library.</li>
              <li className="mb-2">
                Map causes of risk, establish trigger points for each risk/line
                item.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "Quantify the tolerance level with precision",
        content: (
          <ul className="mb-0">
            <li className="mb-2">
              Identify variables influencing tolerance levels, mapping them to
              quantify risk.
            </li>
            <li className="mb-2">
              Quantify each variable, categorizing risks into High, Medium, Low,
              or Zero Tolerance based on measurements.
            </li>
          </ul>
        ),
      },
      {
        title: "Risk Rating and Mitigation",
        content: (
          <ul className="mb-0">
            <li className="mb-2">
              Evaluate risks categorically into High, Medium, or Low through
              rigorous impact analysis.
            </li>
            <li className="mb-2">
              Craft a meticulous Risk Mitigation Plan and meticulously assess
              its effectiveness.
            </li>
            <li className="mb-2">
              Examine residual risk, culminating in the creation of
              comprehensive risk heat maps.
            </li>
          </ul>
        ),
      },
      {
        title: "Reporting Framework",
        content: (
          <ul className="mb-0">
            <li className="mb-2">
              Develop intuitive Risk Dashboards tailored for diverse
              stakeholders.
            </li>
            <li className="mb-2">
              Deliver a comprehensive Risk Framework for effective risk
              management.
            </li>
          </ul>
        ),
      },
      {
        title: "Automation",
        content:
          "Automate operational risk registers, control testing plans, and reporting mechanisms.",
      },
    ],

    cta: {
      title: "Assess Risks, Improve Performance and Stay Compliant!",
      subtitle:
        "Take your risk management to the next level with our comprehensive solutions",
      buttonText: "Go to MySmartGRC",
      buttonLink: "/mysmartgrc",
      target: "_blank",
      onClick: scrollToTop,
    },
    stats: [
      { icon: "fa-shield-alt", value: "98%", label: "Risk Reduction" },
      { icon: "fa-chart-line", value: "30%", label: "Performance Boost" },
      { icon: "fa-check-circle", value: "100%", label: "Compliance Rate" },
      { icon: "fa-users", value: "500+", label: "Satisfied Clients" },
    ],
  };

  // Initialize any page-specific effects
  useEffect(() => {
    // Set page title
    document.title = "Risk Management | Lissomsoft";

    // Any other page-specific initialization
  }, []);

  return <ServicePage pageData={pageData} />;
};

export default RiskManagementPage;
