## Overview
This app requires the Ruby based backend.

## Setup
Use Node v8.9.0 ```nvm use v8.9.0```
Run ```yarn install``` then run ```yarn start```
Please note that this app DOES NOT SUPPORT HTTPS, and so if you have ```HTTPS=true``` set in your environment variables, use ```HTTPS=false yarn start```

## Usage
On the homepage, you'll see a list of movies previously rated by users. If a movie has more than one set of ratings/comments, you'll see the average rating in stars, and a carousel that slides to show each comment.

Create an account with email and password, it'll direct you to the search page. Search a movie, rate it, and then go to favorites to see your rated movie. From there, you can edit your rating and comment, or delete it from your profile.

## Known issues
If the backend does not run on ```localhost:9292``` Please change the BackendService URL in `BackendService.js` to your localhost port.
