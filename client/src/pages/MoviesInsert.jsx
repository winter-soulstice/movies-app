
// Import react and useState
import React, { useState } from 'react';
import api from '../api/index';

// Importing styled components
import styled from 'styled-components';

// Created different styled components for each tag with in-line css
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 15px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 15px;
`

// Functional component used to insert each movie
export const MoviesInsert = () => {
    // Hook declaration in order to store state
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [time, setTime] = useState('');

    // Asynchronous function to save each movie
    async function saveMovie() {
        const arrayTime = time.split('/');
        const payload = {name, rating, time: arrayTime};

        // Send the payload to database before reseting form fields
        await api.insertMovie(payload).then((res) => {
            window.alert(res.data.message);
            setName('');
            setRating('');
            setTime('');
        })
    } 

    // Render the forms 
    return(
        <Wrapper>
            <Title>Create Movie</Title>

            <Label>Name: </Label>
            <InputText 
                type="text"
                value={name}
                onChange={e=>{setName(e.target.value)}} />

            <Label>Rating: </Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-us"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"  
                value={rating}
                onChange={e=>{setRating(e.target.value)}} />
            
            <Label>Time: </Label>
            <InputText 
                type="text"
                value={time}
                onChange={e=>{setTime(e.target.value)}} />

            <Button onClick={saveMovie}>Add Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}