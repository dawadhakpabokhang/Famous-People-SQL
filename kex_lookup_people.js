let userInput = process.argv[2];

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

knex.select('*').from('famous_people')
  .where('first_name', 'ILIKE', userInput)
  .orWhere('last_name', 'ILIKE', userInput)
  .asCallback(function(err, rows) {
    if (err){
      return console.log('error');
    }
      console.log(rows);
      knex.destroy();
});