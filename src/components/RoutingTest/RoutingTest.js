import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import './RoutingTest.scss';

const RoutingTest = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <div className="routing-test">
      <div className="container">
        <h2>Routing Test</h2>
        <div className="test-info">
          <div className="info-item">
            <strong>Current Path:</strong> {location.pathname}
          </div>
          <div className="info-item">
            <strong>Search Params:</strong> {location.search}
          </div>
          <div className="info-item">
            <strong>User ID:</strong> {searchParams.get('userid') || 'Not found'}
          </div>
          <div className="info-item">
            <strong>Full URL:</strong> {window.location.href}
          </div>
        </div>
        
        <div className="test-links">
          <h3>Test Links:</h3>
          <div className="link-group">
            <a href="/portfolio?userid=test123" className="test-link">
              /portfolio?userid=test123
            </a>
            <a href="/?userid=test456" className="test-link">
              /?userid=test456 (legacy)
            </a>
            <a href="/test789" className="test-link">
              /test789 (legacy)
            </a>
            <a href="/" className="test-link">
              / (home)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutingTest;
