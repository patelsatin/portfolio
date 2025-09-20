// Database Schema for User Portfolio Data
// This file defines the structure of user data stored in Firebase Firestore

export const userSchema = {
  // Document ID: userId (Firebase Auth UID)
  userId: "string", // Firebase Auth UID
  email: "string", // User's email address
  phoneNumber: "string", // User's phone number
  displayName: "string", // User's display name
  createdAt: "timestamp", // When the user was created
  updatedAt: "timestamp", // Last update timestamp
  
  // Portfolio data organized by sections
  portfolioData: {
    // About section data
    about: {
      sectionInfo: {
        title: "string",
        subtitle: "string"
      },
      personalInfo: {
        greeting: "string",
        description: ["string"] // Array of description paragraphs
      },
      skillsOverview: {
        title: "string",
        skills: [
          {
            icon: "string",
            title: "string",
            description: "string"
          }
        ]
      },
      stats: [
        {
          number: "string",
          label: "string"
        }
      ],
      achievements: [
        {
          title: "string",
          company: "string",
          year: "string"
        }
      ],
      education: {
        title: "string",
        degree: "string",
        institution: "string",
        period: "string"
      },
      image: {
        src: "string",
        alt: "string"
      }
    },
    
    // Contact section data
    contact: {
      sectionInfo: {
        title: "string",
        subtitle: "string"
      },
      contactInfo: {
        header: {
          title: "string",
          description: "string"
        },
        contactCards: [
          {
            icon: "string",
            title: "string",
            value: "string",
            link: "string",
            description: "string"
          }
        ]
      },
      formInfo: {
        header: {
          title: "string",
          description: "string"
        },
        fields: {
          name: {
            label: "string",
            placeholder: "string"
          },
          email: {
            label: "string",
            placeholder: "string"
          },
          subject: {
            label: "string",
            placeholder: "string",
            options: [
              {
                value: "string",
                text: "string"
              }
            ]
          },
          message: {
            label: "string",
            placeholder: "string"
          }
        },
        submitButton: {
          text: "string",
          sendingText: "string",
          successMessage: "string",
          errorMessage: "string"
        }
      },
      emailConfig: {
        serviceId: "string",
        templateId: "string",
        publicKey: "string",
        toEmail: "string"
      },
      socialLinks: [
        {
          icon: "string",
          name: "string",
          url: "string",
          color: "string"
        }
      ]
    },
    
    // Experience section data
    experience: {
      sectionInfo: {
        title: "string",
        subtitle: "string"
      },
      totalExperience: {
        years: "number",
        months: "number",
        companies: "number",
        projects: "number"
      },
      experiences: [
        {
          id: "number",
          company: "string",
          logo: "string",
          position: "string",
          duration: "string",
          location: "string",
          type: "string",
          description: "string",
          responsibilities: ["string"],
          technologies: ["string"],
          achievements: ["string"],
          companyInfo: {
            industry: "string",
            size: "string",
            website: "string"
          }
        }
      ],
      summary: {
        title: "string",
        description: "string",
        highlights: [
          {
            icon: "string",
            text: "string"
          }
        ]
      }
    },
    
    // Header section data
    header: {
      logo: {
        text: "string"
      },
      navItems: [
        {
          href: "string",
          label: "string"
        }
      ]
    },
    
    // Hero section data
    hero: {
      personalInfo: {
        greeting: "string",
        name: "string",
        title: "string",
        description: "string",
        expertiseLabel: "string",
        profileImage: "string",
        profileImageAlt: "string"
      },
      skills: ["string"],
      actions: [
        {
          text: "string",
          href: "string",
          className: "string",
          download: "boolean"
        }
      ],
      socialLinks: [
        {
          platform: "string",
          href: "string",
          icon: "string",
          className: "string",
          ariaLabel: "string"
        }
      ],
      animationSettings: {
        typeSpeed: "number",
        deleteSpeed: "number",
        pauseTime: "number"
      }
    },
    
    // Projects section data
    projects: {
      sectionInfo: {
        title: "string",
        subtitle: "string"
      },
      projects: [
        {
          id: "number",
          title: "string",
          category: "string",
          company: "string",
          duration: "string",
          description: "string",
          technologies: ["string"],
          features: ["string"],
          image: "string",
          status: "string"
        }
      ],
      categories: [
        {
          id: "string",
          name: "string"
        }
      ],
      stats: [
        {
          icon: "string",
          number: "string",
          label: "string"
        }
      ],
      note: {
        title: "string",
        description: "string"
      }
    },
    
    // Skills section data
    skills: {
      sectionInfo: {
        title: "string",
        subtitle: "string"
      },
      skillCategories: [
        {
          title: "string",
          icon: "string",
          skills: [
            {
              name: "string",
              level: "number",
              icon: "string"
            }
          ]
        }
      ],
      certifications: [
        {
          name: "string",
          issuer: "string",
          year: "string",
          icon: "string"
        }
      ],
      tools: [
        {
          name: "string",
          icon: "string"
        }
      ],
      expertiseHighlights: [
        {
          icon: "string",
          title: "string",
          description: "string"
        }
      ],
      stats: [
        {
          number: "string",
          label: "string"
        }
      ]
    }
  }
};

// Helper function to create a new user document with default portfolio data
export const createDefaultUserData = (userId, email, userData) => {
  return {
    userId: userId,
    email: email,
    phoneNumber: userData.phoneNumber || '',
    displayName: userData.displayName || userData.name || '',
    createdAt: new Date(),
    updatedAt: new Date(),
    portfolioData: {
      about: userData.portfolioData?.about || {},
      contact: userData.portfolioData?.contact || {},
      experience: userData.portfolioData?.experience || {},
      header: userData.portfolioData?.header || {},
      hero: userData.portfolioData?.hero || {},
      projects: userData.portfolioData?.projects || {},
      skills: userData.portfolioData?.skills || {}
    }
  };
};

// Helper function to validate portfolio section data
export const validatePortfolioSection = (sectionName, sectionData) => {
  const validSections = ['about', 'contact', 'experience', 'header', 'hero', 'projects', 'skills'];
  
  if (!validSections.includes(sectionName)) {
    return { valid: false, error: `Invalid section name: ${sectionName}` };
  }
  
  if (!sectionData || typeof sectionData !== 'object') {
    return { valid: false, error: 'Section data must be an object' };
  }
  
  return { valid: true };
};
