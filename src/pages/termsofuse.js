"use client"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const TermsOfUse = () => {
  const location = useLocation()
  useEffect(() => {
    // If we're directly on terms page, check localStorage to see where we came from
    // Don't reset the navbarType here to maintain the previous state

    // For direct navigation to terms page, we can check the referrer
    if (document.referrer.includes("smart-grc") || document.referrer.includes("mysmartgrc")) {
      localStorage.setItem("navbarType", "smartgrc")
    }
  }, [])

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
  // Function to scroll to a specific section
  // const scrollToSection = (id) => {
  //   const element = document.getElementById(id)
  //   if (element) {
  //     window.scrollTo({
  //       top: element.offsetTop - 100,
  //       behavior: "smooth",
  //     })
  //   }
  // }

  return (
    <div className="terms-of-use-page py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-5 fw-bold mb-4">Terms of Use</h1>
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
              <p className="lead mb-0 pb-2">Please read these terms carefully before using our services.</p>
            </div>
          </div>
        </div>

        {/* Introduction Card */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                    }}
                  >
                    <i className="fas fa-gavel text-white fs-4"></i>
                  </div>
                  <h2 className="mb-0">Introduction</h2>
                </div>

                <p>
                  Welcome to Lissomsoft. These Terms of Use govern your use of our website, products, and services. By
                  accessing or using our services, you agree to be bound by these Terms of Use and our Privacy Policy.
                </p>

                <p>
                  If you disagree with any part of these terms, you may not access our services. We reserve the right to
                  modify these terms at any time, and such modifications shall be effective immediately upon posting on
                  this website. Your continued use of our services will constitute your acceptance of the revised terms.
                </p>

                <div className="alert alert-warning d-flex mt-4" role="alert">
                  <i className="fas fa-exclamation-triangle me-3 fs-4"></i>
                  <div>
                    <strong>Important Notice:</strong> By using our services, you represent that you are at least 18
                    years of age or that you are using these services with the consent of a parent or guardian.
                  </div>
                </div>
              </div>
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
                          href="#services"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("services")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Services and Products
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#account"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("account")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Account Registration
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#intellectual-property"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("intellectual-property")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Intellectual Property
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#user-content"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("user-content")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          User Content
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <a
                          href="#prohibited-uses"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("prohibited-uses")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Prohibited Uses
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#limitation-liability"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("limitation-liability")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Limitation of Liability
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#termination"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("termination")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Termination
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#governing-law"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("governing-law")
                          }}
                        >
                          <i className="fas fa-chevron-right me-2 text-primary small"></i>
                          Governing Law
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
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="services">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-server text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Services and Products</h2>
              </div>

              <p>
                Lissomsoft provides various software solutions, including but not limited to risk management, digital
                transformation, cloud services, and growth marketing. Our services are subject to change without notice.
              </p>

              <div className="card border-0 bg-light p-4 mt-4">
                <h5 className="mb-3">Service Availability</h5>
                <p className="mb-0">
                  We make every effort to ensure our services are available 24/7. However, we do not guarantee that our
                  services will be available at all times. We may experience hardware, software, or other problems, or
                  need to perform maintenance related to the services, resulting in interruptions, delays, or errors.
                </p>
              </div>

              <div className="card border-0 bg-light p-4 mt-4">
                <h5 className="mb-3">Service Updates</h5>
                <p className="mb-0">
                  We reserve the right to update, change, or replace any part of these terms of service by posting
                  updates and changes to our website. It is your responsibility to check our website periodically for
                  changes.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="account">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-user-circle text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Account Registration</h2>
              </div>

              <p>
                To access certain features of our services, you may be required to register for an account. You agree to
                provide accurate, current, and complete information during the registration process and to update such
                information to keep it accurate, current, and complete.
              </p>

              <div className="row mt-4">
                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-key text-primary me-2"></i>
                        Account Security
                      </h5>
                      <p className="card-text">
                        You are responsible for maintaining the confidentiality of your account and password and for
                        restricting access to your computer. You agree to accept responsibility for all activities that
                        occur under your account or password.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center">
                        <i className="fas fa-user-shield text-primary me-2"></i>
                        Account Termination
                      </h5>
                      <p className="card-text">
                        We reserve the right to terminate or suspend your account and access to our services
                        immediately, without prior notice or liability, for any reason whatsoever, including without
                        limitation if you breach these Terms of Use.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="intellectual-property">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-copyright text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Intellectual Property</h2>
              </div>

              <p>
                The service and all contents, including but not limited to text, images, graphics, logos, icons, and
                software, are the property of Lissomsoft or its content suppliers and protected by international
                copyright, trademark, and other intellectual property laws.
              </p>

              <div className="alert alert-info d-flex mt-4" role="alert">
                <i className="fas fa-info-circle me-3 fs-4"></i>
                <div>
                  <strong>License to Use:</strong> We grant you a limited, non-exclusive, non-transferable, and
                  revocable license to use our services for your personal or business purposes, subject to these Terms
                  of Use.
                </div>
              </div>

              <p className="mt-4">You may not:</p>

              <ul className="list-group list-group-flush mt-3 mb-4">
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-times-circle text-danger me-2"></i>
                  Modify or copy the materials
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-times-circle text-danger me-2"></i>
                  Use the materials for any commercial purpose or for any public display
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-times-circle text-danger me-2"></i>
                  Attempt to decompile or reverse engineer any software contained in our services
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-times-circle text-danger me-2"></i>
                  Remove any copyright or other proprietary notations from the materials
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-times-circle text-danger me-2"></i>
                  Transfer the materials to another person or "mirror" the materials on any other server
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="user-content">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-file-upload text-white fs-4"></i>
                </div>
                <h2 className="mb-0">User Content</h2>
              </div>

              <p>
                Our services may allow you to post, link, store, share, and otherwise make available certain
                information, text, graphics, videos, or other material. You are responsible for the content you post to
                our services.
              </p>

              <div className="card border-0 bg-light p-4 mt-4">
                <h5 className="mb-3">Content License</h5>
                <p className="mb-0">
                  By posting content to our services, you grant us a non-exclusive, worldwide, royalty-free,
                  sublicensable, and transferable license to use, reproduce, modify, adapt, publish, translate, create
                  derivative works from, distribute, and display such content in connection with providing our services.
                </p>
              </div>

              <div className="card border-0 bg-light p-4 mt-4">
                <h5 className="mb-3">Content Restrictions</h5>
                <p className="mb-0">
                  You agree not to post content that is illegal, harmful, threatening, abusive, harassing, tortious,
                  defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially,
                  ethnically, or otherwise objectionable.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="prohibited-uses">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-ban text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Prohibited Uses</h2>
              </div>

              <p>
                You may use our services only for lawful purposes and in accordance with these Terms of Use. You agree
                not to use our services:
              </p>

              <div className="table-responsive mt-4">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Prohibited Activity</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Illegal Activities</strong>
                      </td>
                      <td>
                        In any way that violates any applicable federal, state, local, or international law or
                        regulation.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Harmful Use</strong>
                      </td>
                      <td>
                        To transmit or procure the sending of any advertising or promotional material, including any
                        "junk mail," "chain letter," "spam," or any other similar solicitation.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Impersonation</strong>
                      </td>
                      <td>
                        To impersonate or attempt to impersonate Lissomsoft, a Lissomsoft employee, another user, or any
                        other person or entity.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Data Collection</strong>
                      </td>
                      <td>
                        To engage in any data mining, data harvesting, data extracting, or any other similar activity in
                        relation to our services.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Interference</strong>
                      </td>
                      <td>To interfere with or disrupt the service or servers or networks connected to the service.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="limitation-liability">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-exclamation-triangle text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Limitation of Liability</h2>
              </div>

              <p>
                In no event shall Lissomsoft, its officers, directors, employees, or agents, be liable to you for any
                direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from:
              </p>

              <ul className="list-group list-group-flush mt-3 mb-4">
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  Your access to or use of or inability to access or use the services
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  Any unauthorized access to or use of our secure servers and/or any personal information stored therein
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  Any interruption or cessation of transmission to or from the services
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  Any bugs, viruses, trojan horses, or the like, which may be transmitted to or through the services by
                  any third party
                </li>
                <li className="list-group-item bg-transparent ps-0">
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  Any errors or omissions in any content or for any loss or damage of any kind incurred as a result of
                  your use of any content
                </li>
              </ul>

              <div className="alert alert-warning mt-4" role="alert">
                <div className="d-flex">
                  <i className="fas fa-exclamation-circle me-3 fs-4"></i>
                  <div>
                    <strong>Disclaimer:</strong> The services are provided on an "as is" and "as available" basis.
                    Lissomsoft makes no warranties, expressed or implied, and hereby disclaims and negates all other
                    warranties, including without limitation, implied warranties or conditions of merchantability,
                    fitness for a particular purpose, or non-infringement of intellectual property.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm mb-5" id="termination">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-power-off text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Termination</h2>
              </div>

              <p>
                We may terminate or suspend your account and bar access to the service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
                not limited to a breach of the Terms.
              </p>

              <p>
                If you wish to terminate your account, you may simply discontinue using the service. All provisions of
                the Terms which by their nature should survive termination shall survive termination, including, without
                limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>

            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm" id="governing-law">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #0077b6, #00a8e8)",
                  }}
                >
                  <i className="fas fa-balance-scale text-white fs-4"></i>
                </div>
                <h2 className="mb-0">Governing Law</h2>
              </div>

              <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its
                conflict of law provisions.
              </p>

              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                provisions of these Terms will remain in effect.
              </p>

              <div className="card border-0 bg-light p-4 mt-4">
                <h5 className="mb-3">Contact Information</h5>
                <p className="mb-0">If you have any questions about these Terms, please contact us at:</p>
                <ul className="list-unstyled mt-3">
                  <li>
                    <strong>Email:</strong> legal@lissomsoft.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +91 9361829552
                  </li>
                  <li>
                    <strong>Address:</strong> 5, Chakrapani Rd, Ramapuram, Narasinga Colony, Maduvinkarai, Guindy,
                    Chennai, Tamil Nadu 600032
                  </li>
                </ul>
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

export default TermsOfUse

