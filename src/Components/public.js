import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardTitle } from "material-ui/Card";
import Divider from "material-ui/Divider";
import NextArrow from "material-ui/svg-icons/image/navigate-next";
import PrevArrow from "material-ui/svg-icons/image/navigate-before";
import Slider from "react-slick";
import Star from "material-ui/svg-icons/toggle/star";
import { getAllMovies } from "../Services/BackendService"

const Next = props => {
  const { currentSlide, slideCount, ...arrowProps } = props;
  return <NextArrow {...arrowProps} />
}

const Prev = props => {
  const { currentSlide, slideCount, ...arrowProps } = props;
  return <PrevArrow {...arrowProps} />
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <Next />,
  prevArrow: <Prev />
};

export default class Public extends Component {

  componentWillMount() {
    getAllMovies().then(movies => {
      this.setState({ movies });
    });
  }

  aggregateRatings = movie => {
    if (movie && movie.user_movie_ratings) {
      return movie.user_movie_ratings.map(r => r.rating).reduce((t, i) => t + i, 0) / movie.user_movie_ratings.length;
    }
    return 0;
  }

  renderStars = rating => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} index={i} style={{ fill: i <= rating ? "#dfdf20" : "#E8E8E8", height: 48, width: 48 }} />);
    }
    return stars;
  }

  renderMovie = (movie, i) => (
    <div key={i} style={{ margin: "50px 0"}}>
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
            <div style={{ padding: "0 20px", display: "block" }}>
              {
                movie.user_movie_ratings
                ? this.renderStars(this.aggregateRatings(movie))
                : null
              }
            </div>
            <div style={{ padding: "0 20px", display: "block"}}>
              <div style={{ height: 76, width: 500, fontFamily: "Raleway, sans-serif", padding: "20px 10px" }}>
                <Slider {...settings}>
                  {movie.user_movie_ratings
                    ? movie.user_movie_ratings.map((movie, i) => <div key={i}><div style={{ height: 76, padding: "10px 10px"}}>{movie.comment}</div></div>)
                    : null}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  render() {

    if (!this.state || !this.state.movies) return null;

    return (
      <MuiThemeProvider>
        <div>
          {
            this.state.movies.map((movie, i) => this.renderMovie(movie, i))
          }
        </div>
      </MuiThemeProvider>
    )
  }
}
