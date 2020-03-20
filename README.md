# GameGauge

A video game scoring system, a project to apply concepts learned regarding DB design and application.

## Development

- Run command `npm install` in both the root directory and in the `client` directory.
- Run `npm run dev` in the root directory
- This will run the client on port `3000` and the server on port `8000`
    - use port `3000` solely for developing on the front end
    - use port `8000` to develop server (node) functionality with a preexisting client build (`3000` and `8000` do not interact directly for the time being) 

## Deployment

*IMPORTANT*

Before proceeding, ensure that you have built the react app in the client directory - this is because the node app on Heroku relies on the static files from `client/build` during production.
- `cd client` then `npm run build`

All additions to the master branch will be deployed automatically for the time being.

If you want to test the development build locally, please run `heroku local web` in the root directory and the web app should be running on port `5000`.

## Resources

Resources used/referenced during development.
- https://github.com/rohan-paul/material-ui-table-with-node-mongodb
- https://github.com/styleguidist/react-styleguidist/issues/1321
- https://www.npmjs.com/package/react-gaugejs
- https://medium.com/@paulrohan/deploying-a-react-node-mongodb-app-to-google-cloud-platforms-google-app-engine-1ba680447d59
- https://blog.cloudboost.io/learn-how-to-create-a-simple-blog-with-react-node-c05fa6889de3
- https://medium.com/@etherealm/node-and-react-a-brief-introduction-99b672262fed

## Authors

Brian Hong, Carl Zhang, Peter Felland, Hua Uehara

CS 4750 - Spring 2020

