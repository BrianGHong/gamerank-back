# GameGauge

A video game scoring system, a project to apply concepts learned regarding DB design and application.

## Development

- Run command `npm install` in both the root directory and in the `client` directory.
- Run `npm run dev` in the root directory

## Deployment

*IMPORTANT*

Before proceeding, ensure that you have built the react app in the client directory - this is because the node app on the GCloud app engine relies on the static files from `client/build` during production.
- `cd client` then `npm run build`

Finally run: `gcloud app deploy` in the root dir

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

