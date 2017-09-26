const pg = require("pg");
const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let firstName = process.argv[2];
let lastName = process.argv[3];
let dateOfBirth = process.argv[4];

knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: dateOfBirth})
  .asCallback(function(err, rows) {
    if (err){
      return console.log('error');
    }
      knex.destroy();
});
