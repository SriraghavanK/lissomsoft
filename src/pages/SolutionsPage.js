import { Link } from "react-router-dom"
import ServiceCard from "../components/ServiceCard"

const SolutionsPage = () => {
  return (
    <>
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h1 className="fw-bold mb-3">Our Solutions</h1>
              <p className="text-muted">
                Comprehensive business solutions to help your organization thrive in today's competitive landscape.
              </p>
            </div>
          </div>

          <div className="row">
            <ServiceCard
              title="Risk Management / Technology"
              description="Identify, assess, and mitigate risks with our advanced risk management solutions."
              icon="fas fa-shield-alt"
              link="/risk-management"
            />

            <ServiceCard
              title="Digital Transformation"
              description="Transform your business with cutting-edge digital solutions and strategies."
              icon="fas fa-digital"
              link="/digital-transformation"
            />

            <ServiceCard
              title="Cloud Services"
              description="Leverage the power of cloud computing for scalability, security, and efficiency."
              icon="fas fa-cloud"
              link="/cloud-services"
            />

            <ServiceCard
              title="Growth Marketing"
              description="Accelerate your business growth with data-driven marketing strategies."
              icon="fas fa-chart-line"
              link="/growth-marketing"
            />
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Risk Management"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Risk Management / Technology</h2>
              <p className="mb-4">
                Our risk management solutions help businesses identify, assess, and mitigate risks effectively. We
                provide comprehensive risk assessments, customized risk management frameworks, advanced risk monitoring
                tools, and regulatory compliance solutions.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Comprehensive risk assessments
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Customized risk management
                  frameworks
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Advanced risk monitoring tools
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Regulatory compliance solutions
                </li>
              </ul>
              <Link to="/risk-management" className="btn btn-primary-lissomsoft">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Digital Transformation"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6 order-lg-1">
              <h2 className="fw-bold mb-4">Digital Transformation</h2>
              <p className="mb-4">
                Transform your business with our cutting-edge digital solutions. Our digital transformation services
                include business process automation, custom web application development, legacy system modernization,
                and digital strategy consulting.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Business process automation
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Custom web application
                  development
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Legacy system modernization
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Digital strategy consulting
                </li>
              </ul>
              <Link to="/digital-transformation" className="btn btn-primary-lissomsoft">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Cloud Services"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Cloud Services</h2>
              <p className="mb-4">
                Leverage the power of cloud computing for your business. Our cloud services include cloud migration
                strategies, Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and cloud security
                solutions.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Cloud migration strategies
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Infrastructure as a Service
                  (IaaS)
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Platform as a Service (PaaS)
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Cloud security solutions
                </li>
              </ul>
              <Link to="/cloud-services" className="btn btn-primary-lissomsoft">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Growth Marketing"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6 order-lg-1">
              <h2 className="fw-bold mb-4">Growth Marketing</h2>
              <p className="mb-4">
                Accelerate your business growth with our data-driven marketing strategies. Our growth marketing services
                include SEO and content marketing, social media marketing, email marketing campaigns, and analytics and
                performance tracking.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> SEO and content marketing
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Social media marketing
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Email marketing campaigns
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-primary-lissomsoft me-2"></i> Analytics and performance
                  tracking
                </li>
              </ul>
              <Link to="/growth-marketing" className="btn btn-primary-lissomsoft">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-primary-lissomsoft text-white">
        <div className="container py-5 text-center">
          <h2 className="fw-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="lead mb-5">Contact us today to learn how our solutions can help your business succeed.</p>
          <Link to="/contact" className="btn btn-light btn-lg px-4">
            Get Started
          </Link>
        </div>
      </section>
    </>
  )
}

export default SolutionsPage

