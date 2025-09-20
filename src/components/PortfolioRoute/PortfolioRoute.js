import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PublicPortfolio from '../PublicPortfolio/PublicPortfolio';

const PortfolioRoute = () => {
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdParam = searchParams.get('userid') || searchParams.get('userId');
    if (userIdParam) {
      setUserId(userIdParam);
    }
  }, [searchParams]);

  if (!userId) {
    return (
      <div className="portfolio-error">
        <div className="container">
          <div className="error-content">
            <h1>Portfolio Not Found</h1>
            <p>The requested portfolio could not be found. Please check the URL and try again.</p>
            <a href="/" className="btn btn-primary">Go Home</a>
          </div>
        </div>
      </div>
    );
  }

  return <PublicPortfolio userId={userId} />;
};

export default PortfolioRoute;
