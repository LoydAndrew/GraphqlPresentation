import express from 'express';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './schema.js';

const server = express();
const PORT = 4000;

// graphiql handles request to express

server.use('/graphiql', graphiqlExpress({
  endpointURL: "/graphql"
}));


// graph resolves requests and mutations

server.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

server.listen(PORT, () =>{
  console.log('Go to \n' + `http://example.com:${PORT}`+ '/graphiql');
});








