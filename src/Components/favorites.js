import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Movie from './movie';
import { getFavorites } from "../Services/BackendService"

export default class Favorites extends Component {

  componentWillMount() {
    this.pullMovies();
  }

  pullMovies = () => {
    if (this.props.token) {
      getFavorites(this.props.token).then(movies => {
        this.setState({ movies });
      });
    }
  }

  render() {

    if (!this.state || !this.state.movies) return null;

    return (
      <MuiThemeProvider>
        <div>
          {
            this.state.movies.map((movie, i) => <Movie key={i} id={movie.id} comment={movie.comment} rating={movie.rating} movie={movie.movie} token={this.props.token} pullMovies={this.pullMovies} />)
          }
        </div>
      </MuiThemeProvider>
    )
  }
}
