import React, { useEffect, useRef, useState } from 'react';
import './Contact.scss';

const Contact = () => {
  const contactRef = useRef(null);
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

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'satin15patel1996@gmail.com',
      link: 'mailto:satin15patel1996@gmail.com',
      description: 'Send me an email anytime'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+91 9617307122',
      link: 'tel:+919617307122',
      description: 'Call me for urgent matters'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Pune Maharashtra, India',
      link: 'https://maps.google.com/?q=Pune,Maharashtra,India',
      description: 'Available for remote work'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: 'linkedin.com/in/satin-patel',
      link: 'https://www.linkedin.com/in/satin-patel-07967a150/',
      description: 'Connect with me professionally'
    }
  ];

  const socialLinks = [
    {
      icon: 'fab fa-linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/satin-patel-07967a150/',
      color: '#0077b5'
    },
    {
      icon: 'fab fa-github',
      name: 'GitHub',
      url: 'https://github.com/satinpatel',
      color: '#333'
    },
    {
      icon: 'fab fa-twitter',
      name: 'Twitter',
      url: 'https://twitter.com/satinpatel',
      color: '#1da1f2'
    },
    {
      icon: 'fas fa-envelope',
      name: 'Email',
      url: 'mailto:satin15patel1996@gmail.com',
      color: '#ea4335'
    }
  ];

  return (
    <section id="contact" className="contact section" ref={contactRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to collaborate? Let's discuss your next project or opportunity
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="info-header">
              <h3>Let's Connect</h3>
              <p>
                I'm always interested in new opportunities, challenging projects,
                and meaningful collaborations. Whether you have a project in mind
                or just want to say hello, I'd love to hear from you.
              </p>
            </div>

            <div className="contact-cards">
              {contactInfo.map((info, index) => (
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
              <h3>Send Message</h3>
              <p>Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select a subject</option>
                  <option value="job-opportunity">Job Opportunity</option>
                  <option value="freelance-project">Freelance Project</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="consultation">Consultation</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell me about your project, opportunity, or just say hello..."
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
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>

              {submitStatus && (
                <div className={`submit-status ${submitStatus}`}>
                  {submitStatus === 'success' ? (
                    <>
                      <i className="fas fa-check-circle"></i>
                      Message sent successfully! I'll get back to you soon.
                    </>
                  ) : (
                    <>
                      <i className="fas fa-exclamation-circle"></i>
                      Something went wrong. Please try again or contact me directly.
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
                <a href="#" className="social-link github">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="social-link linkedin">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link dribbble">
                  <i className="fab fa-dribbble"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;