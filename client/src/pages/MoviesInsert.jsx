// Import react and useState
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
// Importing styled components
import styled from 'styled-components';

import { insertMovie } from '../api';

// Created different styled components for each tag with in-line css
const Title = styled.h1.attrs({
  className: 'h1',
})`
  color: #007bff;
  margin-top: 3rem;
  text-align: center;
`;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 2.375rem;
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

const create = 'Create Movie';
const nameLabel = 'Name: ';
const ratingLabel = 'Rating: ';
const timeLabel = 'Time: ';

// Functional component used to insert each movie
const MoviesInsert = () => {
  // Hook declaration in order to store state
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [time, setTime] = useState('');

  const alert = useAlert();

  // Asynchronous function to save each movie
  const saveMovie = async () => {
    const arrayTime = time.split('/');
    const payload = { name, rating, time: arrayTime };

    // Send the payload to database before reseting form fields
    await insertMovie(payload).then((res) => {
      alert.show(res.data.message);
      setName('');
      setRating('');
      setTime('');
    });
  };

  // Render the forms
  return (
    <Wrapper>
      <Title>{create}</Title>

      <Label>{nameLabel}</Label>
      <InputText
        type="text"
        value={name}
        onChange={(e) => { setName(e.target.value); }}
      />

      <Label>{ratingLabel}</Label>
      <InputText
        type="number"
        step="0.1"
        lang="en-us"
        min="0"
        max="10"
        pattern="[0-9]+([,\.][0-9]+)?"
        value={rating}
        onChange={(e) => { setRating(e.target.value); }}
      />

      <Label>{timeLabel}</Label>
      <InputText
        type="text"
        value={time}
        onChange={(e) => { setTime(e.target.value); }}
      />

      <CancelButton href="/movies/list">Cancel</CancelButton>
      <Button onClick={saveMovie}>Add Movie</Button>
    </Wrapper>
  );
};

export { MoviesInsert as default };
