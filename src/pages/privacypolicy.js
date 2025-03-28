"use client"

const PrivacyPolicy = () => {
  // Function to scroll to a specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="privacy-policy-page py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-5 fw-bold mb-4">Privacy Policy</h1>
            <div className="d-inline-block position-relative">
              <div
                className="position-absolute"
                style={{
                  height: "8px",
                  width: "100%",
                  bottom: "0",
                  left: "0",
                  background: "linear-gradient(90deg, #0077b6, #00a8e8)",
                  borderRadius: "4px",
                  opacity: "0.3",
                }}
              ></div>
              <p className="lead mb-0 pb-2">
                Your privacy is important to us. This policy explains how we collect, use, and protect your data.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">Table of Contents</h5>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <a
                          href="#overview"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("overview")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Overview
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#information-collection"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("information-collection")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Information Collection
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#use-of-information"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("use-of-information")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Use of Information
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#data-storage"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("data-storage")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Data Storage and Security
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <a
                          href="#sharing-information"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("sharing-information")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Sharing Your Information
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#your-rights"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("your-rights")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Your Rights
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#cookies"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("cookies")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Cookies and Tracking
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#contact-us"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("contact-us")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="overview">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-shield-alt text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Overview</h2>
              </div>

              <p>
                At Lissomsoft, we value your privacy and are committed to protecting your personal information. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                website or use our services.
              </p>

              <p>
                We understand that privacy is a fundamental right and that your data belongs to you. We strive to be
                transparent about our data practices and give you control over your information. This policy applies to
                all information collected through our website, mobile applications, and any related services, sales,
                marketing, or events.
              </p>

              <div className="alert alert-info d-flex align-items-center mt-4" role="alert">
                <i className="fas fa-info-circle me-3 fs-4"></i>
                <div>
                  <strong>Please read this policy carefully</strong> to understand our policies and practices regarding
                  your information and how we will treat it. If you do not agree with our policies and practices, please
                  do not use our services.
                </div>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="information-collection">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-database text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Information Collection</h2>
              </div>

              <p>
                We collect several types of information from and about users of our website and services, including:
              </p>

              <div className="row mt-4">
                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-user-circle text-primary me-2"></i>
                        Personal Information
                      </h5>
                      <p className="card-text">
                        This may include your name, email address, telephone number, company name, job title, and other
                        identifiers by which you may be contacted online or offline.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-laptop text-primary me-2"></i>
                        Usage Information
                      </h5>
                      <p className="card-text">
                        Details of your visits to our website, including traffic data, location data, logs, and other
                        communication data and the resources that you access and use on the website.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-mobile-alt text-primary me-2"></i>
                        Device Information
                      </h5>
                      <p className="card-text">
                        Information about your computer, mobile device, and internet connection, including your IP
                        address, operating system, browser type, and device identifiers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-cookie text-primary me-2"></i>
                        Cookies and Tracking
                      </h5>
                      <p className="card-text">
                        Information collected through cookies, web beacons, and other tracking technologies to analyze
                        website trends, administer the site, and track user movements around the site.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="use-of-information">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-cogs text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Use of Information</h2>
              </div>

              <p>We use the information we collect about you for various purposes, including:</p>

              <ul className="list-group list-group-flush mt-3 mb-4">
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  To provide, maintain, and improve our services
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  To process and fulfill your requests, orders, and transactions
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  To send you technical notices, updates, security alerts, and support messages
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  To respond to your comments, questions, and customer service requests
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  To communicate with you about products, services, offers, and events
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  To monitor and analyze trends, usage, and activities in connection with our services
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  To detect, investigate, and prevent fraudulent transactions and other illegal activities
                </li>
              </ul>

              <div className="alert alert-warning d-flex" role="alert">
                <i className="fas fa-exclamation-triangle me-3 fs-4"></i>
                <div>
                  <strong>Legal Basis for Processing:</strong> We process your personal information based on legitimate
                  business interests, the fulfillment of our contract with you, compliance with our legal obligations,
                  and/or your consent.
                </div>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="data-storage">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-lock text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Data Storage and Security</h2>
              </div>

              <p>
                We implement appropriate technical and organizational security measures designed to protect the security
                of any personal information we process. However, please also remember that we cannot guarantee that the
                internet itself is 100% secure.
              </p>

              <div className="row mt-4">
                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-shield-alt text-primary me-2"></i>
                        Security Measures
                      </h5>
                      <p className="card-text">
                        We use industry-standard encryption technologies, firewalls, and secure server facilities to
                        protect your data. We regularly review and update our security practices to enhance protection.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-clock text-primary me-2"></i>
                        Data Retention
                      </h5>
                      <p className="card-text">
                        We will only keep your personal information for as long as it is necessary for the purposes set
                        out in this privacy policy, unless a longer retention period is required by law.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="sharing-information">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-share-alt text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Sharing Your Information</h2>
              </div>

              <p>We may share your personal information in the following situations:</p>

              <div className="table-responsive mt-3">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Business Partners</strong>
                      </td>
                      <td>
                        We may share your information with our business partners to offer you certain products,
                        services, or promotions.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Service Providers</strong>
                      </td>
                      <td>
                        We may share your information with service providers who perform services for us or on our
                        behalf, such as data analysis, payment processing, and customer service.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Legal Requirements</strong>
                      </td>
                      <td>
                        We may disclose your information where required to do so by law or in response to valid requests
                        by public authorities.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Business Transfers</strong>
                      </td>
                      <td>
                        We may share or transfer your information in connection with, or during negotiations of, any
                        merger, sale of company assets, financing, or acquisition of all or a portion of our business.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert alert-info mt-4" role="alert">
                <div className="d-flex">
                  <i className="fas fa-info-circle me-3 fs-4"></i>
                  <div>
                    <strong>Third-Party Privacy Policies:</strong> This Privacy Policy does not apply to the practices
                    of third parties that we do not own or control, including any third-party services or applications
                    that you elect to access through our service.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="your-rights">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-user-shield text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Your Rights</h2>
              </div>

              <p>
                Depending on your location, you may have certain rights regarding your personal information. These may
                include:
              </p>

              <div className="row mt-4">
                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-eye text-primary me-2"></i>
                        Right to Access
                      </h5>
                      <p className="card-text">
                        You have the right to request copies of your personal information. We may charge a small fee for
                        this service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-edit text-primary me-2"></i>
                        Right to Rectification
                      </h5>
                      <p className="card-text">
                        You have the right to request that we correct any information you believe is inaccurate or
                        complete information you believe is incomplete.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-trash-alt text-primary me-2"></i>
                        Right to Erasure
                      </h5>
                      <p className="card-text">
                        You have the right to request that we erase your personal data, under certain conditions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-ban text-primary me-2"></i>
                        Right to Restrict Processing
                      </h5>
                      <p className="card-text">
                        You have the right to request that we restrict the processing of your personal data, under
                        certain conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3">
                To exercise any of these rights, please contact us using the information provided in the "Contact Us"
                section below.
              </p>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="cookies">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-cookie-bite text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Cookies and Tracking</h2>
              </div>

              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. Cookies are files with a small amount of data which may include an anonymous unique
                identifier.
              </p>

              <div className="table-responsive mt-4">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Cookie Type</th>
                      <th scope="col">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Essential Cookies</strong>
                      </td>
                      <td>
                        These cookies are necessary for the website to function and cannot be switched off in our
                        systems.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Performance Cookies</strong>
                      </td>
                      <td>
                        These cookies allow us to count visits and traffic sources so we can measure and improve the
                        performance of our site.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Functional Cookies</strong>
                      </td>
                      <td>These cookies enable the website to provide enhanced functionality and personalization.</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Targeting Cookies</strong>
                      </td>
                      <td>
                        These cookies may be set through our site by our advertising partners to build a profile of your
                        interests.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm" id="contact-us">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-envelope text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Contact Us</h2>
              </div>

              <p>If you have any questions about this Privacy Policy, please contact us:</p>

              <div className="card border-0 shadow-sm mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <h5 className="d-flex align-items-center">
                        <i className="fas fa-map-marker-alt text-primary me-2"></i>
                        Address
                      </h5>
                      <p className="mb-0">
                        5, Chakrapani Rd, Ramapuram, Narasinga Colony, Maduvinkarai, Guindy, Chennai, Tamil Nadu 600032
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h5 className="d-flex align-items-center">
                        <i className="fas fa-envelope text-primary me-2"></i>
                        Email
                      </h5>
                      <p className="mb-0">privacy@lissomsoft.com</p>

                      <h5 className="d-flex align-items-center mt-3">
                        <i className="fas fa-phone text-primary me-2"></i>
                        Phone
                      </h5>
                      <p className="mb-0">+91 9361829552</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="alert alert-secondary mt-4" role="alert">
                <div className="d-flex">
                  <i className="fas fa-file-alt me-3 fs-4"></i>
                  <div>
                    <strong>Policy Updates:</strong> We may update this privacy policy from time to time. We will notify
                    you of any changes by posting the new privacy policy on this page and updating the "Last Updated"
                    date.
                  </div>
                </div>
              </div>

              <p className="text-center mt-5">
                <strong>Last Updated:</strong> March 21, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

