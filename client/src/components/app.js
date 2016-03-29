import React, { PropTypes } from 'react';

export const App = ({ errors, children }) => (
  <div>
    <h1>The Flag</h1>
    {errors && errors.length &&
      <div className="errors">
        {errors.map(error =>
          <div className="error" dangerouslySetInnerHTML={{ __html: error }} />
        )}
      </div>
    }
    <div>{children}</div>
  </div>
);

App.propTypes = {
  children: PropTypes.any,
  errors: PropTypes.array,
};
