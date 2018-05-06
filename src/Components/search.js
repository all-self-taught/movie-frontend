import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Card, CardTitle } from "material-ui/Card";
import Divider from "material-ui/Divider";
import Star from "material-ui/svg-icons/toggle/star";
import { searchMovies, addMovie } from "../Services/BackendService";

export default class Search extends Component {

  onSearchChange = (e, search) => {
    this.setState({ search });
  }

  onSearchClick = e => {
    e.preventDefault();
    if (this.state.search && this.props.token) {
      searchMovies(this.props.token, this.state.search)
      .then(movie => {
        const confirmMsg = "Movie already rated..."
        let editable = true;
        let comments;
        let rating;
        if (movie && movie.user_feedback && movie.user_feedback[0]) {
          comments = movie.user_feedback[0].comment;
          rating = movie.user_feedback[0].rating;
          editable = false;
        }
        this.setState({ movie, editable, rating, comments, confirmMsg });
      })
    }
  }

  renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} index={i} style={{ fill: i <= this.state.rating ? "#dfdf20" : "#E8E8E8", height: 48, width: 48, cursor: "pointer" }} onClick={this.state.editable ? this.setRating.bind(this, i) : () => null } />)
    }
    return stars;
  }

  renderMovie = movie => (
    <Card zDepth={2} style={{ width: "65%", height: 574, margin: "0 auto"}}>
      <CardTitle title={`${movie.title}`} subtitle={`(${movie.rated}) - ${movie.year}`}/>
      <Divider />
      <div style={{ display: "flex"}}>
        <img src={movie.imageUrl} alt={movie.title} style={{ padding: 20, width: 340, clear: "both" }}/>
        <div>
          <div style={{ padding: 20, display: "block" }}>
            <div style={{ margin: "10px 0"}}>
              <span style={{ float: "left", display: "inline-block", width: 85, fontWeight: 600 }}>Genre:</span>
              <span style={{ display: "inline-block", marginLeft: 10, width: 500 }}>{`${movie.genre}`}</span>
            </div>
            <div style={{ margin: "10px 0"}}>
              <span style={{ float: "left", display: "inline-block", width: 85, fontWeight: 600 }}>Director(s):</span>
              <span style={{ display: "inline-block", marginLeft: 10, width: 500 }}>{`${movie.director}`}</span>
            </div>
            <div style={{ margin: "10px 0"}}>
              <span style={{ float: "left", display: "inline-block", width: 85, fontWeight: 600 }}>Writer(s):</span>
              <span style={{ display: "inline-block", marginLeft: 10, width: 500 }}>{`${movie.writer}`}</span>
            </div>
            <div style={{ margin: "10px 0"}}>
              <span style={{ float: "left", display: "inline-block", width: 85, fontWeight: 600 }}>Actor(s):</span>
              <span style={{ display: "inline-block", marginLeft: 10, width: 500 }}>{`${movie.actor}`}</span>
            </div>
          </div>
          <div style={{ padding: 20, display: "block" }}>
            <div>{movie.plot}</div>
          </div>
          <div style={{ padding: "0 20px", display: "block" }}>
            {
              this.renderStars()
            }
          </div>
          <div style={{ padding: "0 20px", display: "block"}}>
            { this.state.editable
                ? <TextField multiLine rows={3} rowsMax={3} fullWidth hintText="Comments..." onChange={this.setComments} />
                : <div style={{ height: 56, overflowY: "scroll", fontFamily: "Raleway, sans-serif", padding: "20px 10px" }}>{this.state.comments}</div>
            }
            <RaisedButton secondary fullWidth disabled={!this.state.editable} label={this.state.editable ? `Add Rating and Comment` : this.state.confirmMsg} onClick={this.submit} />
          </div>
        </div>
      </div>
    </Card>
  )

  renderPlaceHolder = () => (
    <Card zDepth={2} style={{ width: "65%", margin: "0 auto"}}>
      <CardTitle title="No movie found by that title" />
    </Card>
  )

  setRating = (rating) => {
    this.setState({ rating });
  }

  setComments = (e, comments) => {
    this.setState({ comments });
  }

  submit = () => {
    const request = {
      movie: this.state.movie,
      rating: this.state.rating,
      comment: this.state.comments
    }
    addMovie(request, this.props.token);
    const confirmMsg = "Movie Added to Favorites";
    const editable = false;
    this.setState({ confirmMsg, editable });
  }

  render() {
    let movie;
    if (this.state && this.state.movie) {
      movie = this.state.movie;
    }

    return (
      <MuiThemeProvider>
        <div>
          <div style={{ width: 385, margin: "30px auto", display: "flex" }}>
            <TextField
              hintText="Search Movies"
              onChange={this.onSearchChange}
              underlineShow={false}
              inputStyle={{ borderRadius: 5, padding: "0 10px", width: 256, height: 36, marginTop: 2 }}
              style={{ width: 276, lineHeight: "18px", height: 36, border: "1px solid black", backgroundColor: "white", borderRadius: 5 }}
              hintStyle={{ top: "10px", padding: "0 10px", color: "grey" }}
            />
            <RaisedButton style={{ marginLeft: 10, height: 36, marginTop: 1 }} primary label="Search" onClick={this.onSearchClick} />
          </div>
          <div>
            {
              movie && movie.title
                ? this.renderMovie(movie)
                : null
            }
            {
              movie && !movie.title
                ? this.renderPlaceHolder()
                : null
            }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

// display: inline-block; width: 530px
