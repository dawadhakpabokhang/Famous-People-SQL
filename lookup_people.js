let userInput = process.argv[2];

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name ILIKE '%${userInput}%' OR last_name ILIKE '%${userInput}%'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printRows(result);
    client.end();
  });
});

function printRows(dataObject){
  console.log(`Found ${dataObject.rows.length} person(s) by the name ${userInput}`)
  for(let i in dataObject.rows){
    console.log(`${Number(i)+1} ${dataObject.rows[i].first_name} ${dataObject.rows[i].last_name}, born ${dataObject.rows[i].birthdate}`);
  }
}