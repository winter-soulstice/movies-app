import React from 'react';

const home = 'Home Page';
const message = 'Here is an app to display showtimes';

const styles = {
  display: 'block',
  margin: '3rem 3rem',
  textAlign: 'center',
};

const HomePage = () => (
  <div style={styles}>
    <h1>{home}</h1>
    <p>{message}</p>
  </div>
);

export { HomePage as default };
