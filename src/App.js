import React, { useEffect, useState } from "react";
import { getMovieList, searchMovie, getMovieDetails } from './api';
import './App.css';
import { Container, Typography, TextField, Grid, Card, CardMedia, CardContent, Dialog, DialogTitle, DialogContent } from '@mui/material';
import YouTube from 'react-youtube';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const ImgUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const search = async (q) => {
    setSearchQuery(q);
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  const handleMovieClick = async (movieId) => {
    const movieDetails = await getMovieDetails(movieId);
    setSelectedMovie(movieDetails);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const PopularMovieList = () => {
    return (
      <Grid container spacing={3}>
        {popularMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={movie.id}>
            <Card onClick={() => handleMovieClick(movie.id)}>
              <CardMedia
                component="img"
                alt={movie.title}
                height="300"
                image={`${ImgUrl}/${movie.poster_path}`}
                style={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">Release Date: {movie.release_date}</Typography>
                <Typography variant="body2">Rating: {movie.vote_average}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Film List App
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Cari Film Favorit mu :)....."
        onChange={({ target }) => search(target.value)}
        value={searchQuery}
      />
      <div style={{ marginTop: '20px' }}>
        <PopularMovieList />
      </div>
      {selectedMovie && (
        <Dialog open={true} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>{selectedMovie.title}</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Release Date: {selectedMovie.release_date}</Typography>
            <Typography variant="h6">Rating: {selectedMovie.vote_average}</Typography>
            <Typography variant="body1" gutterBottom>
              {selectedMovie.overview}
            </Typography>
            {selectedMovie.videos.results.length > 0 && (
              <YouTube
                videoId={selectedMovie.videos.results[0].key}
                opts={{ width: '100%', height: '400px' }}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

export default App;
