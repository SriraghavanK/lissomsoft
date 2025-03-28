"use client";

import { useEffect } from "react";
import ServicePage from "./ServicePage";

const GrowthMarketingPage = () => {
  // Service category data
  const serviceCategories = [
    { id: "strategic", name: "Digital Marketing Equipment" },
    { id: "cost", name: "Social Media Marketing" },
  ];

  // Accordion data for each service category
  const accordionData = {
    strategic: [
      {
        id: "seo-tools",
        title: "Logos and Brand Development",
        content:
          " Our comprehensive design services cover everything from Graphic Design, Logos, Ads, and Mnemonics to Character Illustrations, Comic Books, Marketing Collaterals, Flyers, Posters, Banners, Web & Mobile UI/UX, Figma Web Templates, Landing Pages, CTAs, social media, Infographics, Graphic Workflows, Event Backdrops, and so much more. ",
      },
      {
        id: "crm-integration",
        title: "Video Intros/Explainers/PowerPoint Presentations",
        content:
          " We create visually stunning slides using infographics, minimal text, and smooth transitions. Need to bring your ideas to life? Our Storytelling Videos, Corporate Walkthroughs, Explainer Videos, and Animated Videos have got you covered. ",
      },
      {
        id: "email-marketing",
        title: "Online Presence",
        content:
          " Design and development of unique websites for start-ups and corporates, using Responsive HTML 5 / Bootstrap, PHP, React, Webflow, WordPress & AWS/Zoho. Our work includes CTA forms, Email integration, and CRM integration. ",
      },
      {
        id: "content-management",
        title: "Content Marketing",
        content:
          " Elevate your brand with exceptional content services- trans-created or translated. We offer websites, SEO, blogs, infographics, emailers, landing pages, collaterals, ads, newsletters, and A/V scripts that are shareable, informative, and relevant. ",
      },
    ],
    cost: [
      {
        id: "platform-management",
        title: "Strategic Understanding",
        content:
          " Uncover business and market needs, leveraging in-depth market intelligence to evolve the way forward strategically. ",
      },
      {
        id: "content-creation",
        title: "Customer Profiling",
        content:
          " Craft detailed customer profiles, utilizing sales intelligence tools to identify target personas and customize your sales approach with precision. ",
      },
      {
        id: "community-engagement",
        title: "Content Optimization",
        content:
          " Map a content strategy that resonates with your audience, optimizing your message for maximum impact. ",
      },
      {
        id: "paid-campaigns",
        title: "Engaging Decision-Makers",
        content:
          " Seamlessly connect with decision-makers through social media databases, engage through warm calls, emphasize business objectives, integrate with sales intelligence platforms, and build valuable relationships. ",
      },
      {
        id: "paid-campaignss",
        title: "Campaign Synergy",
        content:
          "  Integrate marketing campaigns strategically, from awareness-building to lead generation and successful conversions, ensuring a cohesive and effective sales enablement journey.  ",
      },
    ],
  };

  // Page-specific data
  const pageData = {
    hero: {
      title: "Amplify your brand and propel sales Momentum.",
      subtitle:
        "Boost online presence, engage B2B social media, and empower sales force for topline growth.",
      buttonText: "Read More",
      buttonLink: "/contact",
      imageSrc: "https://www.lissomsoft.com/assets/tab/growth-marketing.jpg",
    },
    overview: {
      title: "Accelerate Your Business Growth with Data-Driven Marketing",
      content: (
        <p className="lead mb-4">
          Transform with Lissomsoft's Growth Marketing. Seamlessly integrate B2B
          social media, optimize web presence, and enhance sales strategies.
          From finely tuned digital campaigns and navigating B2B social
          platforms, we ensure a genuine synergy for unparalleled growth.
          Elevate brand visibility, engage decision-makers, and empower your
          salesforce — a strategic foundation for lasting success.
        </p>
      ),
      image:
        "https://www.lissomsoft.com/assets/Intro%20Images/growth-marketing-intro.jpg",
 
    },
    approach: {
      multipleApproaches: true,
      approaches: [
        {
          title: "Digital Marketing Engagement",
          description:
            "Step into the realm of digital success with our tailored Digital Marketing Services at Lissomsoft. From strategic brand positioning to data-driven insights, we amplify your online presence and optimize conversion pathways for impactful results.",
          image:
            "https://www.lissomsoft.com/assets/Approaches-New/digital-marketing-engagement-approaches.png",
        },
        {
          title: "Sales Enablement",
          description:
            "Embark on a transformative Sales Enablement journey at Lissomsoft, where strategic understanding, precise customer profiling, impactful content optimization, engaging decision-makers, and campaign synergy form the core pillars of a seamless and effective process.",
          image:
            "https://www.lissomsoft.com/assets/Approaches-New/sales-enablement-approaches.png",
        },
      ],
    },
    servicesTabName: "Services",
    cta: {
      title: "Boost Your Business Growth with Lissomsoft!",
      subtitle:
        "Partner with us to develop and implement a growth marketing strategy that delivers results",
      buttonText: "Contact us",
      buttonLink: "/contact",
    },
    stats: [
      { icon: "fa-chart-line", value: "150%", label: "Avg. ROI" },
      { icon: "fa-users", value: "300+", label: "Happy Clients" },
      { icon: "fa-search", value: "80%", label: "Traffic Increase" },
      { icon: "fa-shopping-cart", value: "65%", label: "Conversion Boost" },
    ],
  };

  // Initialize any page-specific effects
  useEffect(() => {
    // Set page title
    document.title = "Growth Marketing | Lissomsoft";

    // Any other page-specific initialization
  }, []);

  return (
    <ServicePage
      pageData={pageData}
      serviceCategories={serviceCategories}
      accordionData={accordionData}
    />
  );
};

export default GrowthMarketingPage;
