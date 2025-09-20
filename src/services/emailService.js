import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, CONTACT_DETAILS, EMAIL_TEMPLATES } from '../config/emailTemplates';
import { generatePortfolioUrl } from '../utils/urlUtils';

// Initialize EmailJS
export const initializeEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Send welcome email after successful signup
export const sendWelcomeEmail = async (userData) => {
  try {
    // Initialize EmailJS
    initializeEmailJS();

    // Get the current domain for portfolio link
    const portfolioUrl = generatePortfolioUrl(userData.userId);
    
    // Generate email content using template
    const emailContent = EMAIL_TEMPLATES.WELCOME.template(userData, portfolioUrl, CONTACT_DETAILS);
    const emailSubject = EMAIL_TEMPLATES.WELCOME.subject(userData.displayName || userData.name);
    
    // Prepare email template parameters
    const templateParams = {
      to_email: userData.email,
      to_name: userData.displayName || userData.name,
      user_id: userData.userId,
      portfolio_link: portfolioUrl,
      contact_email: CONTACT_DETAILS.email,
      contact_phone: CONTACT_DETAILS.phone,
      contact_location: CONTACT_DETAILS.location,
      linkedin_url: CONTACT_DETAILS.linkedin,
      github_url: CONTACT_DETAILS.github,
      twitter_url: CONTACT_DETAILS.twitter,
      message: emailContent,
      subject: emailSubject,
      from_name: 'Portfolio Team',
      reply_to: CONTACT_DETAILS.email
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Welcome email sent successfully:', response);
    return { 
      success: true, 
      messageId: response.text,
      message: 'Welcome email sent successfully!' 
    };

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send welcome email' 
    };
  }
};

// Send contact form email (existing functionality)
export const sendContactEmail = async (formData) => {
  try {
    // Initialize EmailJS
    initializeEmailJS();

    // Generate email content using template
    const emailContent = EMAIL_TEMPLATES.CONTACT_FORM.template(formData);
    const emailSubject = EMAIL_TEMPLATES.CONTACT_FORM.subject(formData.subject);

    const templateParams = {
      to_email: EMAILJS_CONFIG.toEmail,
      from_name: formData.name,
      from_email: formData.email,
      subject: emailSubject,
      message: emailContent,
      reply_to: formData.email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Contact email sent successfully:', response);
    return { 
      success: true, 
      messageId: response.text,
      message: 'Message sent successfully!' 
    };

  } catch (error) {
    console.error('Error sending contact email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send message' 
    };
  }
};

// Send portfolio share notification email
export const sendPortfolioShareEmail = async (shareData) => {
  try {
    // Initialize EmailJS
    initializeEmailJS();

    // Generate email content using template
    const emailContent = EMAIL_TEMPLATES.PORTFOLIO_SHARE.template(
      shareData.senderName, 
      shareData.recipientName, 
      shareData.portfolioUrl
    );
    const emailSubject = EMAIL_TEMPLATES.PORTFOLIO_SHARE.subject(shareData.senderName);

    const templateParams = {
      to_email: shareData.recipientEmail,
      to_name: shareData.recipientName || 'Friend',
      from_name: shareData.senderName,
      portfolio_link: shareData.portfolioUrl,
      message: emailContent,
      subject: emailSubject,
      from_name: 'Portfolio Team',
      reply_to: CONTACT_DETAILS.email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Portfolio share email sent successfully:', response);
    return { 
      success: true, 
      messageId: response.text,
      message: 'Portfolio shared successfully!' 
    };

  } catch (error) {
    console.error('Error sending portfolio share email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to share portfolio' 
    };
  }
};

export default {
  initializeEmailJS,
  sendWelcomeEmail,
  sendContactEmail,
  sendPortfolioShareEmail
};
