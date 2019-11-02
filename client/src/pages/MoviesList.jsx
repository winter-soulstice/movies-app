
// Import react, useState, and useEffect
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import api from '../api';

import styled from 'styled-components';

import 'react-table/react-table.css';

// Created different styled components for each tag with in-line css
const Wrapper = styled.div`
    padding: 40px 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

// Function to re-route user to a different page for movie-update
function UpdateMovie(props){
    const updateM = event => {
        event.preventDefault();
        window.location.href = `/movies/update/${props.id}`;
    }
    return (
        <Update onClick={updateM}>Update</Update>
    )
}

// Function to delete movie from the list 
function DeleteMovie(props){
    // Make sure that the movie being deleted is the right one
    const deleteM = event => {
        event.preventDefault();
        if (window.confirm(
            `Do you want to delete the movie ${props.id} permanently?`))
        {
            api.deleteMovieById(props.id);
            window.location.reload();
        }
    }
    // Render delete button
    return (
        <Delete onClick={deleteM}>Delete</Delete>
    )
}

// Constant of columns to be used for react-table
const cols = [
    {
        Header: 'ID',
        accessor: '_id', 
        filterable: true
    },

    {
        Header: 'Name',
        accessor: 'name',
        filterable: true
    },

    {
        Header: 'Time',
        accessor: 'time',
        Cell: props => <span>{props.value.join(' / ')}</span>
    },

    {
        Header: '',
        accessor: '',
        Cell: function(props) {
            return (
                <span>
                    <DeleteMovie id={props.original._id} />
                </span>
            );
        }
    },

    {
        Header: '',
        accessor: '',
        Cell: function(props) {
            return (
                <span>
                    <UpdateMovie id={props.original._id} />
                </span>
            );
        }
    },
]

// Functional component used to list out the movies 
export const MoviesList = () => {

    // Hook declaration in order to store state
    const [movies, setMovies] = useState([]);
    // eslint-disable-next-line
    const [columns, setColumns] = useState(cols);
    const [isLoading, setIsLoading] = useState(false);

    // Asynchronous function to populate the movie list
    async function getMovies(){
        setIsLoading(true);
        await api.getAllMovies().then(movies => {
            setMovies(movies.data.data);
            setIsLoading(false);
        })
    }

    // Render the movies once 
    useEffect(() => {
        getMovies();
    }, []);

    // Makes sure that the list of movies is not empty
    let showTable = true;
    if(!movies.length) {
        showTable = false; 
    }
    console.log('TCL: MoviesList -> render -> movies', movies);

    // Render the table 
    return (
        <Wrapper>
            {showTable && (
                <ReactTable
                    data = {movies}
                    columns = {columns}
                    loading = {isLoading}
                    defaultPageSize = {10}
                    showPageSizeOptions = {true}
                    minRows = {0}
                />
            )}
        </Wrapper>
    )
}