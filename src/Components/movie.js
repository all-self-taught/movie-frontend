import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { Card, CardTitle } from "material-ui/Card";
import Divider from "material-ui/Divider";
import Star from "material-ui/svg-icons/toggle/star";
import Edit from "material-ui/svg-icons/editor/mode-edit";
import Check from "material-ui/svg-icons/navigation/check";
import Delete from "material-ui/svg-icons/action/delete";
import Close from "material-ui/svg-icons/navigation/close";
import { updateUserMovieRating, deleteUserMovieRating } from "../Services/BackendService";

export default class Movie extends Component {

  constructor() {
    super();
    this.state = {
      editable: false
    }
  }

  onEdit = () => {
    const editable = true;
    const rating = this.props.rating;
    const comments = this.props.comment;
    this.setState({ editable, rating, comments });
  }

  onSave = () => {
    const id = this.props.id;
    const request = {
      user_movie_rating: {
        rating: this.state.rating,
        comment: this.state.comments
      }
    }
    updateUserMovieRating(this.props.token, id, request);
    const editable = false;
    this.setState({ editable });
    this.props.pullMovies();
  }

  onCancel = () => {
    const editable = false;
    const rating = this.props.rating;
    const comments = this.props.comment;
    this.setState({ editable, rating, comments });
  }

  onDelete = () => {
    const id = this.props.id;
    deleteUserMovieRating(this.props.token, id);
    this.props.pullMovies();
  }

  setRating = (rating) => {
    this.setState({ rating });
  }

  setComments = (e, comments) => {
    this.setState({ comments });
  }

  renderStars = rating => {
    if (this.state.editable) rating = this.state.rating;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} index={i} style={{ fill: i <= rating ? "#dfdf20" : "#E8E8E8", height: 48, width: 48, cursor: this.state.editable ? "pointer" : null }} onClick={this.state.editable ? this.setRating.bind(this, i) : () => null } />)
    }
    return stars;
  }

  render() {

    const movie = this.props.movie;

    return (
      <div style={{ margin: "50px 0"}}>
        <Card zDepth={2} style={{ width: "65%", margin: "0 auto", height: 574 }}>
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
              <div style={{ height: 56}}>
                <div style={{ padding: "0 20px", width: 250, float: "left" }}>
                  {
                    this.renderStars(this.props.rating)
                  }
                </div>
                <div style={{ float: "right", marginRight: 56, marginTop: 18 }}>
                  {
                    !this.state.editable
                      ? <Edit onClick={this.onEdit} style={{ fill: "green", cursor: "pointer"}} />
                      : <Check onClick={this.onSave} style={{ fill: "green", cursor: "pointer"}} />
                  }
                  <span style={{ marginLeft: 20}} />
                  {
                    !this.state.editable
                      ? <Delete onClick={this.onDelete} style={{ fill: "red", cursor: "pointer"}} />
                      : <Close onClick={this.onCancel} style={{ fill: "red", cursor: "pointer"}} />
                  }
                </div>
              </div>
              <div style={{ padding: "0 20px"}}>
                {
                  !this.state.editable
                    ? <div style={{ height: 96, overflowY: "scroll", fontFamily: "Raleway, sans-serif", padding: "20px 10px" }}>{this.props.comment}</div>
                    : <TextField multiLine rows={3} rowsMax={3} fullWidth hintText="Comments..." value={this.state.comments} onChange={this.setComments} />
                }
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
