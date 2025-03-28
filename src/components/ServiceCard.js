import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, description, icon, link }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card service-card h-100 shadow-sm animate-on-scroll">
        <div className="card-body text-center p-4">
          <div className="service-icon-container mb-3">
            <i className={`${icon} service-icon`}></i>
          </div>
          <h3 className="card-title h5 fw-bold">{title}</h3>
          <p className="card-text text-muted">{description}</p>
        </div>
        <div className="card-footer bg-transparent border-0 text-center pb-4">
          <Link to={link} className="btn btn-outline-primary-lissomsoft">
            Learn More <i className="fas fa-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
