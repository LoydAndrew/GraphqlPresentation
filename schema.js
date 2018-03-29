import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
}
  from 'graphql';

import axios from 'axios';


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
      args: {id: {type: GraphQLInt}},
      resolve (parentValue, args) {
        return axios.get(`${dbUrlUser}${args.id}`)
          .then(resp => resp.data); // for returning only data and not full object
      }
    },
    team: {
      type: TeamType,
      args: {id: {type: GraphQLInt}},
      resolve (parentValue, args) {
        console.log(parentValue, args);
        return axios.get(`${dbUrlTeam}${args.id}`)
          .then(resp => resp.data);
      }
    },
    people: {
      type: new GraphQLList(UserType),
      resolve () {
        return axios.get(`${dbUrlUser}`)
          .then(resp => resp.data);
      }
    },
    qaTeams: {
      type: new GraphQLList(TeamType),
      resolve () {
        return axios.get(`${dbUrlTeam}`)
          .then(resp => resp.data);
      }
    }
  }
});


const mutation = new GraphQLObjectType ({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull (GraphQLString)},
        age: {type: GraphQLInt},
        gender: {type: GraphQLString},
        teamId:{type: GraphQLInt}
      },
      resolve (parentValue, {id, name}) {
        console.log(parentValue, {id, name});
        return axios.post(`${dbUrlUser}`, {id, name})
          .then(res => res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve (parentValue, {id}) {
        console.log(parentValue, {id});
        return axios.delete(`${dbUrlUser}${id}`)
          .then(res => res.data);
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        gender: {type: GraphQLString},
        teamId:{type: GraphQLInt}
      },
      resolve (parentValue, args) {
        console.log(parentValue, args);
        return axios.patch(`${dbUrlUser}${args.id}`, args) // id won't be updated caused db is clever patsan
          .then(res => res.data);
      }
    }
  }
});


module.exports = new GraphQLSchema ({
  query: RootQuery,
  mutation
});

export default GraphQLSchema;