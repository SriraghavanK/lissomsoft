const TestimonialCard = ({ quote, name, position, company, imageSrc }) => {
  return (
    <div className="card testimonial-card h-100 shadow-sm animate-on-scroll">
      <div className="card-body p-4">
        <div className="testimonial-quote mb-4">
          <i className="fas fa-quote-left text-primary-lissomsoft me-2 opacity-50"></i>
          <p className="mb-0">{quote}</p>
          <i className="fas fa-quote-right text-primary-lissomsoft ms-2 opacity-50"></i>
        </div>
      </div>
      <div className="card-footer bg-transparent d-flex align-items-center p-4">
        <img src={imageSrc || "/placeholder.svg"} alt={name} className="testimonial-avatar rounded-circle me-3" />
        <div>
          <h5 className="testimonial-name mb-0">{name}</h5>
          <p className="testimonial-position text-muted mb-0">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard

