const Sequelize = require("sequelize");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres"; //Created new container in Docker
const db = new Sequelize(databaseUrl);

const Movie = db.define(
  "movie",
  {
    title: {
      type: Sequelize.STRING,
      field: "movie_title"
    },
    yearOfRelease: {
      type: Sequelize.INTEGER,
      field: "movie_year"
    },
    synopsis: {
      type: Sequelize.STRING,
      field: "movie_synopsis"
    }
  },
  { tableName: "movies" }
);

db.sync()
  .then(() => {
    console.log("Schema will be updated here");
  })
  .catch(console.error);

module.exports = db;
