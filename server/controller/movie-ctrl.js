/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import Movie from '../models/movie-models';

// Send a request to create a Movie
const createMovie = (req, res) => {
  const { body } = req;

  // Check to see if the request has a payload
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'A movie has not been provided.',
    });
  }

  // Create a new instance using the payload
  const movie = new Movie(body);

  // Make sure that the payload was accurate.
  if (!movie) {
    return res.status(400).json({
      success: false,
      error: 'Movie could not be created.',
    });
  }

  // Save the movie to the database
  movie
    .save()
    .then(() => res.status(201).json({
      success: true,
      // eslint-disable-next-line no-underscore-dangle
      id: movie._id,
      message: 'Successfully created a movie!',
    }))
    .catch((error) => res.status(400).json({
      success: false,
      error,
      message: 'Connection to database not established!',
    }));
  return res;
};

// Method to update a previously created movie
const updateMovie = (req, res) => {
  const { body } = req;
  // Check to see if the request has a payload
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'A movie has not been provided',
    });
  }

  // Find the movie we want to update and update its values
  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    // Movie could not be found
    if (err) {
      return res.status(404).json({
        err,
        message: 'Movie could not be found!',
      });
    }

    // Assign new values to the movie
    const { name, time, rating } = body;
    const updatedMovie = movie;
    updatedMovie.name = name;
    updatedMovie.time = time;
    updatedMovie.rating = rating;

    // Save the movie to the database
    updatedMovie
      .save()
      .then(() => res.status(200).json({
        success: true,
        // eslint-disable-next-line no-underscore-dangle
        id: movie._id,
        message: 'Movie has been updated!',
      }))
      .catch((error) => res.status(404).json({
        error,
        message: 'Movie not found in database!',
      }));
    return movie;
  });
  return res;
};

// Method to delete movie
const deleteMovie = async (req, res) => {
  await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
    // Checks for errors
    if (err) {
      return res.status(400).json({
        sucess: false,
        error: err,
      });
    }

    // Checks if the movie has been found
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found',
      });
    }

    // Otherwise return true
    return res.status(200).json({
      success: true,
      data: movie,
      message: 'Movie has been deleted!',
    });
  }).catch((err) => console.log(err));
};

// Method to find a movie by its id.
const getMovieById = async (req, res) => {
  await Movie.findOne({ _id: req.params.id }, (err, movie) => {
    // Checks to see if an error has been thrown
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    // Checks if the movie has been found
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found',
      });
    }

    // Otherwise return true
    return res.status(200).json({
      success: true,
      data: movie,
    });
  }).catch((err) => console.log(err));
};

// Method to populate the list of movies
const getMovies = async (req, res) => {
  await Movie.find({}, (err, movies) => {
    // Check to see if an error has been thrown
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    // Check if the list of movies is empty
    if (!movies.length) {
      return res.status(404).json({
        success: false,
        error: 'The list of movies is empty!',
      });
    }

    // Otherwise return true
    return res.status(200).json({
      success: true,
      data: movies,
    });
  }).catch((err) => console.log(err));
};

// Export the methods
module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  getMovies,
};
