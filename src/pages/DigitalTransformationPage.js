import { useEffect } from "react";
import ServicePage from "./ServicePage";
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
const DigitalTransformationPage = () => {
  // Page-specific data
  const pageData = {
    hero: {
      title: "Digital Reinvention: Navigating Tomorrow's Business Landscape.",
      subtitle: "From Agility to Automation, We Drive Your Digital Transformation.",
      buttonText: "Want to Learn More? Contact Us!",
      buttonLink: "/contact",
      imageSrc: "https://www.lissomsoft.com/assets/tab/dital-transformation.jpg",
    },
    overview: {
      title: "Transform Your Business with Innovative Digital Solutions",
      content: (
        <p className="mb-4">
          In the fast-paced business landscape, traditional approaches can
          be costly and time-consuming. To overcome this, businesses must
          adopt innovative frameworks. Our full-stack development services
          leverage cutting-edge frameworks, empowering clients to
          streamline their application development lifecycle. Committed to
          efficiency and agility, we help businesses adapt swiftly to
          market changes and stay ahead of the competition.
        </p>
      ),
      image: "https://www.lissomsoft.com/assets/Intro%20Images/digital-transformation-intro1.jpg",
  
    },
    approach: {
      content: (
        <h4 className="mb-4">
          Embrace agility and innovation for competitiveness. Our digital transformation leverages IoT, Data Analytics, and AI to automate processes, optimize data collection, and meet evolving customer needs.
        </h4>
      ),
      image: "https://www.lissomsoft.com/assets/Approaches-New/digital-transformation-approaches.png",
      steps: [
        "Assess current digital capabilities and identify opportunities",
        "Develop a tailored digital transformation roadmap",
        "Implement innovative solutions with agile methodology",
        "Measure results and continuously optimize performance"
      ]
    },
    servicesTabName: "Services",
    services: [
      {
        title: "Intuitive UX Design to Code",
        content: "Craft seamless user experiences with a design-to-code approach, ensuring intuitive and user-friendly interfaces."
      },
      {
        title: "Ready to Deploy and Automating Business Functions",
        content: "Streamline your deployment process and automate business functions for a swift and efficient operational setup."
      },
      {
        title: "Integration, API Toolkit, and Workflows",
        content: "Integrate seamlessly with our robust API toolkit and implement customized workflows to enhance overall system efficiency."
      },
      {
        title: "Pre-defined Security Profile, Test Scripts, and Test Reports",
        content: "Prioritize security with pre-defined profiles, comprehensive test scripts, and detailed test reports for a secure and reliable system."
      },
      {
        title: "Responsive UX",
        content: "Ensure a responsive and adaptive user experience across devices, fostering accessibility and engagement."
      }
    ],
    cta: {
      title: "Initiate Your Digital Transformation with Lissomsoft!",
      subtitle: "Take the first step towards a more efficient, innovative business model",
      buttonText: "Contact us",
      buttonLink: "/contact",
      onClick:scrollToTop
    },
    stats: [
      { icon: "fa-code", value: "200+", label: "Projects Delivered" },
      { icon: "fa-rocket", value: "40%", label: "Efficiency Increase" },
      { icon: "fa-laptop-code", value: "15+", label: "Technologies" },
      { icon: "fa-handshake", value: "24/7", label: "Support" }
    ]
  };

  // Initialize any page-specific effects
  useEffect(() => {
    // Set page title
    document.title = "Digital Transformation | Lissomsoft";
    
    // Any other page-specific initialization
  }, []);

  return <ServicePage pageData={pageData} />;
};

export default DigitalTransformationPage;
