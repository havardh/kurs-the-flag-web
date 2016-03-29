import React from 'react';
import { Link } from 'react-router';

const IndexPage = () => (
  <div>
    <p>
      <Link to="/rounds/start">Start new round</Link>
    </p>

    <p>
      <Link to="/simulate">Simulate</Link>
    </p>
  </div>
);

export default IndexPage;
