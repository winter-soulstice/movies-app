import React from 'react';

const home = 'Home Page';
const message = 'An app which displays showtimes';

const wrapperStyles = {
  display: 'block',
  margin: '3rem 3rem',
  textAlign: 'center',
};

const titleStyles = {
  color: '#007bff',
};

const HomePage = () => (
  <div style={wrapperStyles}>
    <h1 style={titleStyles}>{home}</h1>
    <p>{message}</p>
  </div>
);

export { HomePage as default };
