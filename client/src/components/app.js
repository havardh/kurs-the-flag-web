import React, { PropTypes } from 'react';

export const App = ({ errors, children }) => (
  <div>
    {errors && errors.length > 0 &&
      <div className="errors">
        {errors.map(error =>
          <div className="error" dangerouslySetInnerHTML={{ __html: error }} />
        )}
      </div>
    }
    <h1>The Flag</h1>
    <div>{children}</div>
  </div>
);

App.propTypes = {
  children: PropTypes.any,
  errors: PropTypes.array,
};
