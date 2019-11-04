import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { deleteMovieById } from '../api';

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

// Function to delete movie from the list
const DeleteMovie = (props) => {
  // Make sure that the movie being deleted is the right one
  const { name } = props;
  const deleteM = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    if (window.confirm(`Do you want to delete the movie: ${name}, permanently?`)) {
      deleteMovieById(props.id);
      window.location.reload();
    }
  };
  // Render delete button
  return (
    <Delete onClick={deleteM}>Delete</Delete>
  );
};

DeleteMovie.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export { DeleteMovie as default };
