import Movie from '../models/movie-models';
import regeneratorRuntime from 'regenerator-runtime';

// Import the movie schema from movie-models
//const Movie = require('../models/movie-models');

// Send a request to create a Movie
let createMovie = (req, res) => {
    const body = req.body;

    // Check to see if the request has a payload
    if (!body) 
    {
        return res.status(400).json({
            success: false, 
            error: 'A movie has not been provided.'})
    }
    
    // Create a new instance using the payload
    const movie = new Movie(body);

    // Make sure that the payload was accurate.
    if (!movie)
    {
        return res.status(400).json({
            success: false,
            error: "Movie could not be created." })
    }

    // Save the movie to the database
    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Successfully created a movie!' });
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                error: 'Connection to database not established!' });
        })
}

// Method to update a previously created movie 
let updateMovie = (req, res) => {
    const body = req.body;

    // Check to see if the request has a payload
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "A movie has not been provided"
        })
    }
    
    // Find the movie we want to update and update its values
    Movie.findOne({ _id: req.params.id }, (err, movie) => {

        // Movie could not be found 
        if (err) {
            return res.status(404).json({
                err,
                message: "Movie could not be found!"
            })
        }

        // Assign new values to the movie 
        movie.name = body.name;
        movie.time = body.time;
        movie.rating = body.rating;

        // Save the movie to the database
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true, 
                    id: movie._id,
                    message: "Movie has been updated!" })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: "Movie not found in database!"})
            })
    })
}

// Method to delete movie
let deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id}, (err, movie) => {
        
        // Checks for errors 
        if (err) {
            return res.status(400).json({ 
                sucess: false, 
                error: err })
        }
        
        // Checks if the movie has been found 
        if (!movie) {
            return res.status(404).json({
                success: false,
                error: 'Movie not found'})
        }

        // Otherwise return true
        return res.status(200).json({
            success: true,
            data: movie,
            message: "Movie has been deleted!"})
    }).catch(err => console.log(err))
}

// Method to find a movie by its id. 
let getMovieById = async (req, res) => {

    await Movie.findOne({ _id: req.params.id }, (err, movie) => {

        // Checks to see if an error has been thrown
        if (err) {
            return res.status(400).json({
                success: false,
                error: err })
        }

        // Checks if the movie has been found 
        if (!movie) {
            return res.status(404).json({
                success: false,
                error: 'Movie not found' })
        }

        // Otherwise return true
        return res.status(200).json({
            success: true,
            data: movie })
    }).catch(err => console.log(err))
}

// Method to populate the list of movies
let getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        
        // Check to see if an error has been thrown
        if (err) {
            return res.status(400).json({
                success: false,
                error: err })
        }

        // Check if the list of movies is empty
        if (!movies.length) {
            return res.status(404).json({
                success: false,
                error: "The list of movies is empty!" })
        }

        // Otherwise return true
        return res.status(200).json({
            success: true,
            data: movies})
    }).catch(err => console.log(err))
}

// Export the methods 
module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    getMovies
};