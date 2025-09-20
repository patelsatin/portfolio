// Email template configurations
export const EMAIL_TEMPLATES = {
  WELCOME: {
    subject: (userName) => `Welcome to Portfolio Platform - ${userName}`,
    template: (userData, portfolioUrl, contactDetails) => `
Hello ${userData.displayName || userData.name},

Welcome aboard! 🎉

Your account has been successfully created. Here are your account details:

👤 User ID: ${userData.userId}
🔗 Portfolio Link: ${portfolioUrl}

You can now:
• Edit your portfolio by logging in
• Share your portfolio using the link above
• Upload your profile image and resume
• Customize all sections of your portfolio

Contact Information:
📧 Email: ${contactDetails.email}
📱 Phone: ${contactDetails.phone}
📍 Location: ${contactDetails.location}

Connect with us:
🔗 LinkedIn: ${contactDetails.linkedin}
🐙 GitHub: ${contactDetails.github}
🐦 Twitter: ${contactDetails.twitter}

If you have any questions or need assistance, feel free to reach out to us.

Best regards,
Portfolio Team

---
This is an automated message. Please do not reply to this email.`
  },

  PORTFOLIO_SHARE: {
    subject: (senderName) => `${senderName} shared their portfolio with you`,
    template: (senderName, recipientName, portfolioUrl) => `
Hello ${recipientName || 'Friend'},

${senderName} has shared their portfolio with you!

🔗 Portfolio Link: ${portfolioUrl}

Take a look at their work and connect with them if you're interested in collaborating.

Best regards,
Portfolio Team`
  },

  CONTACT_FORM: {
    subject: (subject) => `Portfolio Contact: ${subject}`,
    template: (formData) => `
New message from portfolio contact form:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Reply directly to this email to respond to ${formData.name}.`
  }
};

// Contact details configuration
export const CONTACT_DETAILS = {
  email: 'satin15patel1996@gmail.com',
  phone: '+91 9617307122',
  location: 'Pune Maharashtra, India',
  linkedin: 'https://www.linkedin.com/in/satin-patel-07967a150/',
  github: 'https://github.com/satinpatel',
  twitter: 'https://twitter.com/satinpatel'
};

// EmailJS configuration
export const EMAILJS_CONFIG = {
  serviceId: 'service_xpvd55h',
  templateId: 'template_4di2yup',
  publicKey: '52JGeZlcidBkECvWK',
  toEmail: 'satin15patel1996@gmail.com'
};
