const _ = require('lodash');

const users = [{
  id: 1, // todo: remove id in purpose of demo2
  name: 'Svyat',
  age: 18,
  gender:'male',
  skills: ['Security, Automation, LeadPower'],
  label: 'gansta_test_lead'
},
  {
  id: 3,
  name: 'Oleg',
  age: 18, // todo: make it to string in purpose of demo1
  gender:'male',
  //skills: ['Junior, Asking, Bagging']
},

  {
  id: 4,
  name: 'Pasha',
  age: 18,
  gender:'male',
  //skills: ['Automation, Manual, API-Expert']
},


  {
  id: 6,
  name: 'Roma',
  age: 18,
  gender:'male',
  //skills: ['Automation, Manual, API-Expert, Bug-fixing']
},

{
  id: 6,
  name: 'Roma',
  age: 18,
  gender:'male',
  //skills: ['Automation, Manual, API-Expert, Bug-fixing']
}

];

/*const resolvers = {
  Query: {
    RootQueryType: (parentValue, args) => {
      return _.find(user, {id: args.id});
    }
  }
};*/




export default users;