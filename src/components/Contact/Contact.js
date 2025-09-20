import React, { useEffect, useRef, useState } from 'react';
import './Contact.scss';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { sendContactEmail } from '../../services/emailService';

const Contact = ({ portfolioData, isPublic = false, userId }) => {
  const contactRef = useRef(null);
  const { data: hookData, loading, error } = usePortfolioData('contact');
  const contactData = isPublic ? portfolioData : hookData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using the email service
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="contact section" ref={contactRef}>
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading contact section...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !contactData) {
    return (
      <section id="contact" className="contact section" ref={contactRef}>
        <div className="container">
          <div className="error-container">
            <p>Error loading contact section</p>
          </div>
        </div>
      </section>
    );
  }

  const { sectionInfo, contactInfo, formInfo, emailConfig, socialLinks } = contactData;

  return (
    <section id="contact" className="contact section" ref={contactRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{sectionInfo.title}</h2>
          <p className="section-subtitle">
            {sectionInfo.subtitle}
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="info-header">
              <h3>{contactInfo.header.title}</h3>
              <p>
                {contactInfo.header.description}
              </p>
            </div>

            <div className="contact-cards">
              {contactInfo.contactCards.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="contact-card"
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="contact-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="contact-details">
                    <h4>{info.title}</h4>
                    <p className="contact-value">{info.value}</p>
                    <span className="contact-description">{info.description}</span>
                  </div>
                  <div className="contact-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="contact__form">
            <div className="form-header">
              <h3>{formInfo.header.title}</h3>
              <p>{formInfo.header.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{formInfo.fields.name.label}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={formInfo.fields.name.placeholder}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{formInfo.fields.email.label}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={formInfo.fields.email.placeholder}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">{formInfo.fields.subject.label}</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  {formInfo.fields.subject.options.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{formInfo.fields.message.label}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder={formInfo.fields.message.placeholder}
                  rows="6"
                  className="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {formInfo.submitButton.sendingText}
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    {formInfo.submitButton.text}
                  </>
                )}
              </button>

              {submitStatus && (
                <div className={`submit-status ${submitStatus}`}>
                  {submitStatus === 'success' ? (
                    <>
                      <i className="fas fa-check-circle"></i>
                      {formInfo.submitButton.successMessage}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-exclamation-circle"></i>
                      {formInfo.submitButton.errorMessage}
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="contact__cta">
          <div className="form-footer">
            <div className="social-links" style={{display: 'flex', justifyContent: 'center'}}>
              <div className="hero__social">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    className="social-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;