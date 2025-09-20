import React, { useState } from 'react';
import { sendWelcomeEmail, sendContactEmail, sendPortfolioShareEmail } from '../../services/emailService';
import { generatePortfolioUrl } from '../../utils/urlUtils';
import './EmailTest.scss';

const EmailTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const testWelcomeEmail = async () => {
    setIsLoading(true);
    try {
      const result = await sendWelcomeEmail({
        userId: 'test-user-123',
        email: 'test@example.com',
        displayName: 'Test User',
        name: 'Test User'
      });
      setTestResults(prev => ({ ...prev, welcome: result }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, welcome: { success: false, error: error.message } }));
    } finally {
      setIsLoading(false);
    }
  };

  const testContactEmail = async () => {
    setIsLoading(true);
    try {
      const result = await sendContactEmail({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message from the email test component.'
      });
      setTestResults(prev => ({ ...prev, contact: result }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, contact: { success: false, error: error.message } }));
    } finally {
      setIsLoading(false);
    }
  };

  const testPortfolioShareEmail = async () => {
    setIsLoading(true);
    try {
      const result = await sendPortfolioShareEmail({
        senderName: 'Test Sender',
        recipientName: 'Test Recipient',
        recipientEmail: 'recipient@example.com',
        portfolioUrl: generatePortfolioUrl('test-123')
      });
      setTestResults(prev => ({ ...prev, share: result }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, share: { success: false, error: error.message } }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="email-test">
      <h2>Email Service Test</h2>
      <p>Test the email functionality to ensure everything is working correctly.</p>
      
      <div className="test-buttons">
        <button 
          onClick={testWelcomeEmail} 
          disabled={isLoading}
          className="test-btn welcome"
        >
          Test Welcome Email
        </button>
        
        <button 
          onClick={testContactEmail} 
          disabled={isLoading}
          className="test-btn contact"
        >
          Test Contact Email
        </button>
        
        <button 
          onClick={testPortfolioShareEmail} 
          disabled={isLoading}
          className="test-btn share"
        >
          Test Portfolio Share Email
        </button>
      </div>

      <div className="test-results">
        {Object.entries(testResults).map(([type, result]) => (
          <div key={type} className={`result ${result.success ? 'success' : 'error'}`}>
            <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Email Test</h3>
            <p>Status: {result.success ? '✅ Success' : '❌ Failed'}</p>
            {result.message && <p>Message: {result.message}</p>}
            {result.error && <p>Error: {result.error}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailTest;
