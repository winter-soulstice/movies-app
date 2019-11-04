// Import react, useState, and useEffect
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getAllMovies, deleteMovieById } from '../api';

import 'react-table/react-table.css';

// Created different styled components for each tag with in-line css
const Wrapper = styled.div`
  padding: 40px 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

// Function to re-route user to a different page for movie-update
const UpdateMovie = (props) => {
  const updateM = (event) => {
    event.preventDefault();
    window.location.href = `/movies/update/${props.id}`;
  };
  return (
    <Update onClick={updateM}>Update</Update>
  );
};

UpdateMovie.propTypes = {
  id: PropTypes.string.isRequired,
};

// Function to delete movie from the list
const DeleteMovie = (props) => {
  // Make sure that the movie being deleted is the right one
  const deleteM = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    if (window.confirm(`Do you want to delete the movie ${props.id} permanently?`)) {
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
};

// Constant of columns to be used for react-table
const cols = [
  {
    Header: 'ID',
    accessor: '_id',
    filterable: true,
  },

  {
    Header: 'Name',
    accessor: 'name',
    filterable: true,
  },

  {
    Header: 'Time',
    accessor: 'time',
    Cell: (props) => <span>{props.value.join(' / ')}</span>,
  },

  {
    Header: '',
    accessor: '',
    Cell(props) {
      return (
        <span>
          <DeleteMovie id={props.original._id} />
        </span>
      );
    },
  },

  {
    Header: '',
    accessor: '',
    Cell(props) {
      return (
        <span>
          <UpdateMovie id={props.original._id} />
        </span>
      );
    },
  },
];

// Functional component used to list out the movies
const MoviesList = () => {
  // Hook declaration in order to store state
  const [movies, setMovies] = useState([]);
  // eslint-disable-next-line
  const [columns, setColumns] = useState(cols);
  const [isLoading, setIsLoading] = useState(false);

  // Asynchronous function to populate the movie list
  const getMovies = async () => {
    setIsLoading(true);
    await getAllMovies().then((movie) => {
      setMovies(movie.data.data);
      setIsLoading(false);
    });
  };

  // Render the movies once
  useEffect(() => {
    getMovies();
  }, []);

  // Makes sure that the list of movies is not empty
  let showTable = true;
  if (!movies.length) {
    showTable = false;
  }
  console.log('TCL: MoviesList -> render -> movies', movies);

  // Render the table
  return (
    <Wrapper>
      {showTable && (
        <ReactTable
          data={movies}
          columns={columns}
          loading={isLoading}
          defaultPageSize={10}
          showPageSizeOptions={showTable}
          minRows={0}
        />
      )}
    </Wrapper>
  );
};

export { MoviesList as default };
