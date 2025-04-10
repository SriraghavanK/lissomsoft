import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import PartnersPage from "./pages/PartnersPage"
import ResourcesPage from "./pages/ResourcesPage"
import ContactPage from "./pages/ContactPage"
import RiskManagementPage from "./pages/RiskManagementPage"
import DigitalTransformationPage from "./pages/DigitalTransformationPage"
import CloudServicesPage from "./pages/CloudServicesPage"
import GrowthMarketingPage from "./pages/GrowthMarketingPage"
import ClientPage from "./pages/ClientPage"
import CareerPage from "./pages/CareerPage"
import MySmartGrcPage from "./pages/MySmartGrc"
import TermsOfUse from "./pages/termsofuse"
import PrivacyPolicy from "./pages/privacypolicy"
import TeamPage from "./pages/TeamPage"
import CareerForm from "./pages/CareerForm"
import { SpeedInsights } from "@vercel/speed-insights/react"


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/risk-management" element={<RiskManagementPage />} />
            <Route path="/digital-transformation" element={<DigitalTransformationPage />} />
            <Route path="/cloud-services" element={<CloudServicesPage />} />
            <Route path="/growth-marketing" element={<GrowthMarketingPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/mysmartgrc" element={<MySmartGrcPage />} />
            <Route path="/termsofuse" element={<TermsOfUse />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/careerform" element={<CareerForm />} />
         
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

