# GameGauge

A video game scoring system, a project to apply concepts learned regarding DB design and application.

## Development

- Run command `npm install` in both the root directory and in the `client` directory.
- Run `npm run dev` in the root directory and `npm start` in the client directory
- This will run the client on port `3000` and the server on port `8000`
    - use port `3000` solely for developing on the front end
    - use port `8000` to develop server (node) functionality with a preexisting client build 

## Deployment

*IMPORTANT*

Before proceeding, ensure that you can build the react app in the client directory - if so, do the following before deploying:
- change `.env` API URI route to whatever route the app is hosted on
- ensure the environment variables are being used for nodejs

All additions to the master branch will be deployed automatically for the time being.

If you want to test the development build locally, please run `heroku local web` in the root directory and the web app should be running on port `5000`.

## Resources

Resources used/referenced during development.
- https://www.digitalocean.com/community/tutorials/getting-started-with-the-mern-stack#node-server-setup
- https://www.codementor.io/@mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
- https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
- https://github.com/rohan-paul/material-ui-table-with-node-mongodb
- https://github.com/styleguidist/react-styleguidist/issues/1321
- https://www.npmjs.com/package/react-gaugejs
- https://medium.com/@paulrohan/deploying-a-react-node-mongodb-app-to-google-cloud-platforms-google-app-engine-1ba680447d59
- https://blog.cloudboost.io/learn-how-to-create-a-simple-blog-with-react-node-c05fa6889de3
- https://medium.com/@etherealm/node-and-react-a-brief-introduction-99b672262fed

## Authors

Brian Hong, Carl Zhang, Peter Felland, Hua Uehara

CS 4750 - Spring 2020

