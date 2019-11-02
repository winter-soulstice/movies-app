
// Import react, useState, useEffect
import React, { useState, useEffect } from 'react';
import api from '../api/index';

// Import styled components
import styled from 'styled-components';

// Created different styled components for each tag with in-line css
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    classname: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: `form-control`,
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

// Function to take care of updating the movies
export function MoviesUpdate(props) {
    
    // Hook declaration to store/read state    
    // eslint-disable-next-line
    const [id, setId] = useState(props.match.params.id);
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [time, setTime] = useState('');

    // Asynchronous function to save change for the movie being updated
    async function handleUpdateMovie() {
        const arrayTime = time.split('/');
        const payload = {name, rating, time: arrayTime};

        // Update the database and refill the form fields
        await api.updateMovieById(id, payload).then(res => {
            window.alert(res.data.message);
            fillFields();
        })
    }

    // Asynchronous function to populate the form fields
    async function fillFields(){
        const movie = await api.getMovieById(id);

        setName(movie.data.data.name);
        setRating(movie.data.data.rating);
        setTime(movie.data.data.time.join('/'));
    }

    // Onload fill the form fields
    useEffect(() => {
        fillFields()
    // eslint-disable-next-line
    }, []);

    // Render the forms 
    return (
        <Wrapper>
            <Title>Update Movie</Title>
            <Label>Name: </Label>
            <InputText 
                type="text"
                value={name}
                onChange={e => {setName(e.target.value)}} />

            <Label>Rating: </Label>
            <InputText 
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={rating}
                onChange={e => {setRating(e.target.value)}} />

            <Label>Time: </Label>
            <InputText
                type="text"
                value={time}
                onChange={e => {setTime(e.target.value)}} />
    
            <Button onClick={handleUpdateMovie}>Update Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}