// Import react, useState, and useEffect
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getAllMovies } from '../api';
import { UpdateMovie, DeleteMovie } from '../components';

import 'react-table/react-table.css';

// Created different styled components for each tag with in-line css
const Wrapper = styled.div`
  padding: 1rem 1rem 1rem 1rem;
`;

const Title = styled.h1`
  color: #007bff;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TimeCol = (props) => {
  const { value } = props;
  return (
    <span>
      {value.join(' / ')}
    </span>
  );
};
TimeCol.propTypes = {
  value: PropTypes.string.isRequired,
};

const DelCol = (props) => {
  const { original } = props;
  const { _id, name } = original;
  return (
    <span>
      <DeleteMovie id={_id} name={name} />
    </span>
  );
};
DelCol.propTypes = {
  original: PropTypes.instanceOf(Object).isRequired,
};

const UpdateCol = (props) => {
  const { original } = props;
  const { _id } = original;
  return (
    <span>
      <UpdateMovie id={_id} />
    </span>
  );
};
UpdateCol.propTypes = {
  original: PropTypes.instanceOf(Object).isRequired,
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
    Cell: (props) => TimeCol(props),
  },

  {
    Header: '',
    accessor: '',
    Cell: (props) => UpdateCol(props),
  },

  {
    Header: '',
    accessor: '',
    Cell: (props) => DelCol(props),
  },
];

const list = 'List of Movies';

// Functional component used to list out the movies
const MoviesList = () => {
  // Hook declaration in order to store state
  const [movies, setMovies] = useState([]);
  const [columns] = useState(cols);
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

  // Render the table
  return (
    <Wrapper>
      <Title>{list}</Title>
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
