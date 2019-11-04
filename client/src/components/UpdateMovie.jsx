import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

// Function to re-route user to a different page for movie-update
const UpdateMovie = (props) => {
  const { id } = props;
  const updateM = (event) => {
    event.preventDefault();
    window.location.href = `/movies/update/${id}`;
  };
  return (
    <Update onClick={updateM}>Update</Update>
  );
};

UpdateMovie.propTypes = {
  id: PropTypes.string.isRequired,
};

export { UpdateMovie as default };
