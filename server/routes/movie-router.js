import express from 'express';
import MovieCtrl from '../controller/movie-ctrl';

// const express = require('express');
// const MovieCtrl = require('../controller/movie-ctrl');
const router = express.Router();

// Connect the website with methods 
router.post('/movie', MovieCtrl.createMovie);
router.get('/movie/:id', MovieCtrl.getMovieById);
router.get('/movies', MovieCtrl.getMovies);
router.put('/movie/:id', MovieCtrl.updateMovie);
router.delete('/movie/:id', MovieCtrl.deleteMovie);

module.exports = router;