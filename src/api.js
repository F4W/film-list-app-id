import axios from "axios";

const api = {
  key: "d6fdfc5335ac0158c18be7bd161bebce",
  base: "https://api.themoviedb.org/3"
};

export const getMovieList = async () => {
  const movie = await axios.get(`${api.base}/movie/popular?page=1&api_key=${api.key}`);
  return movie.data.results;
};

export const searchMovie = async (q) => {
  const search = await axios.get(`${api.base}/search/movie?query=${q}&page=1&api_key=${api.key}`);
  return search.data;
};

export const getMovieDetails = async (movieId) => {
  const movie = await axios.get(`${api.base}/movie/${movieId}?api_key=${api.key}&append_to_response=videos`);
  return movie.data;
};
