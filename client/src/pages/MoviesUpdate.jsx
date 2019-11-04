// Import react, useState, useEffect
import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
// Import styled components
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { updateMovieById, getMovieById } from '../api';

// Created different styled components for each tag with in-line css
const Title = styled.h1.attrs({
  className: 'h1',
})`
  color: #007bff;
  margin-top: 3rem;
  text-align: center;
`;

const Wrapper = styled.div.attrs({
  classname: 'form-group',
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
    margin: 5px;
`;

const Button = styled.button.attrs({
  className: 'btn btn-success',
})`
  margin: 1rem 1rem 1rem 0.5rem;
  float: right;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-secondary',
})`
  margin: 1rem 1rem 1rem 0.5rem;
  float: right;
`;

// Function to take care of updating the movies
const MoviesUpdate = (props) => {
  // Hook declaration to store/read state
  const { match } = props;

  const [id] = useState(match.params.id);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [time, setTime] = useState('');

  const alert = useAlert();

  // Asynchronous function to populate the form fields
  const fillFields = async () => {
    const movie = await getMovieById(id);

    setName(movie.data.data.name);
    setRating(movie.data.data.rating);
    setTime(movie.data.data.time.join('/'));
  };

  // Asynchronous function to save change for the movie being updated
  const handleUpdateMovie = async () => {
    const arrayTime = time.split('/');
    const payload = { name, rating, time: arrayTime };

    // Update the database and refill the form fields
    await updateMovieById(id, payload)
      .then((res) => {
        alert.show(res.data.message);
        fillFields();
      });
  };

  // Onload fill the form fields
  useEffect(() => {
    // Asynchronous function to populate the form fields
    const fill = async () => {
      const movie = await getMovieById(id);

      setName(movie.data.data.name);
      setRating(movie.data.data.rating);
      setTime(movie.data.data.time.join('/'));
    };

    window.addEventListener('onload', fill());
  }, [id]);

  // Render the forms
  return (
    <Wrapper>
      <Title>Update Movie</Title>
      <Label>Name: </Label>
      <InputText
        type="text"
        value={name}
        onChange={(e) => { setName(e.target.value); }}
      />

      <Label>Rating: </Label>
      <InputText
        type="number"
        step="0.1"
        lang="en-US"
        min="0"
        max="10"
        pattern="[0-9]+([,\.][0-9]+)?"
        value={rating}
        onChange={(e) => { setRating(e.target.value); }}
      />

      <Label>Time: </Label>
      <InputText
        type="text"
        value={time}
        onChange={(e) => { setTime(e.target.value); }}
      />

      <CancelButton href="/movies/list">Cancel</CancelButton>
      <Button onClick={handleUpdateMovie}>Update Movie</Button>
    </Wrapper>
  );
};

MoviesUpdate.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export { MoviesUpdate as default };
