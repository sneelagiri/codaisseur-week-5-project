const Sequelize = require("sequelize");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres"; //Created new container in Docker
const db = new Sequelize(databaseUrl);
db.sync()
  .then(() => {
    console.log("Schema will be updated here");
  })
  .catch(console.error);

module.exports = db;
