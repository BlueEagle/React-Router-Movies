import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios';
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'

import SavedList from './Movies/SavedList';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <Router>
      <div>
        <SavedList list={savedList} />
        <Switch>
          <Route path="/movies/:id" render={() => <Movie />} />
          <Route path="/" render={() => <MovieList movies={movieList}/>} />
        </Switch>
      </div>
    </Router>
  );
};



export default App;
