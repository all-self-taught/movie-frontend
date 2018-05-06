const BASE_URL = "http://localhost:9292/"

export function registerUser(credentials) {
  const user = {
    user: credentials
  }

  return fetch(`${BASE_URL}register`, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(user)
  })
  .then(res => res.json());
}

export function loginUser(credentials) {
  const user = {
    user: credentials
  }

  return fetch(`${BASE_URL}login`, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(user)
  })
  .then(res => res.json());
}

export function getFavorites(token) {
  return fetch(`${BASE_URL}movies`, {
    headers: {
      token: token
    }
  })
  .then(res => res.json())
  .catch(error => {
    console.log(error);
  });
}

export function searchMovies(token, title) {
  return fetch(`${BASE_URL}search?title=${title}`, {
    headers: {
      token: token
    }
  })
  .then(res => res.json())
  .catch(error => {
    console.log(error);
  });
}

export function addMovie(request, token) {
  return fetch(`${BASE_URL}movie/`, {
    method: "post",
    mode: "cors",
    body: JSON.stringify(request),
    headers: {
      token: token
    }
  });
}

export function getAllMovies() {
  return fetch(BASE_URL, {
    method: "get",
    mode: "cors"
  })
  .then(res => res.json())
  .catch(error => {
    console.log(error);
  });
}

export function updateUserMovieRating(token, id, request) {
  return fetch(`${BASE_URL}/user_movie_rating/${id}`, {
    method: "put",
    mode: "cors",
    body: JSON.stringify(request),
    headers: {
      token: token
    }
  })
}

export function deleteUserMovieRating(token, id) {
  return fetch(`${BASE_URL}/user_movie_rating/${id}`, {
    method: "delete",
    mode: "cors",
    headers: {
      token: token
    }
  })
}
