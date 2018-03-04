import resolvers from  './resolvers.js';
import {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema,GraphQLList} from 'graphql';
import axios from 'axios';
import users from './resolvers';

const dbUrl = "http://localhost:3000/users/";
const UserType= new GraphQLObjectType({
  name: 'User',
  fields:{
    age: {type:GraphQLInt},
    id: {type:GraphQLInt},
    name:{type:GraphQLString} ,
    gender: {type:GraphQLString},
    label: {type:GraphQLString}
}});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id:{type:GraphQLInt}},
      resolve (parentValue, args) {
        return axios.get(`${dbUrl}${args.id}`)
        .then(resp => resp.data);
    }
    }
  }
});




module.exports = new GraphQLSchema ({
  query: RootQuery
});

export default GraphQLSchema;