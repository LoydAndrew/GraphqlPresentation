// import resolvers from  './resolvers.js';
import {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema,GraphQLList} from 'graphql';
import axios from 'axios';
// import users from './resolvers';

const dbUrlUser = "http://localhost:3000/users/";
const dbUrlTeam = "http://localhost:3000/team/";


const TeamType = new GraphQLObjectType ({
  name:'Team',
  fields:() => ({                     // closure he-he
    id:{type:GraphQLInt},
    name:{type:GraphQLString},
    description:{type: new GraphQLList (GraphQLString)},
    users: {
      type: new GraphQLList (UserType),
      resolve(parentValue, args) {
        console.log(parentValue, args);
        return axios.get(`${dbUrlTeam}${parentValue.id}/users`)
          .then(resp => resp.data);
      }
    }
  })
});

const UserType= new GraphQLObjectType({
  name: 'User',
  fields:() => ({                   // another closure
    age: {type:GraphQLInt},
    id: {type:GraphQLInt},
    name:{type:GraphQLString} ,
    gender: {type:GraphQLString},
    label: {type:GraphQLString},
    team:{
      type:TeamType,
      resolve(parentValue, args) {
        console.log(parentValue, args);
        return axios.get(`${dbUrlTeam}${parentValue.teamId}`)
          .then(resp => resp.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id:{type:GraphQLInt}},
      resolve (parentValue, args) {
        return axios.get(`${dbUrlUser}${args.id}`)
        .then(resp => resp.data); // for returning only data and not full object
      }
    },
    team: {
      type: TeamType,
      args: {id:{type:GraphQLInt}},
      resolve(parentValue, args) {
        console.log(parentValue, args);
        return axios.get(`${dbUrlTeam}${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});




module.exports = new GraphQLSchema ({
  query: RootQuery
});

export default GraphQLSchema;