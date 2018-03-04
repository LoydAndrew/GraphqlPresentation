import resolvers from  './resolvers.js';
import {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema,GraphQLList} from 'graphql';
const _ = require('lodash');
import users from './resolvers';


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
        return _.find(users, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema ({
  query: RootQuery
});

export default GraphQLSchema;