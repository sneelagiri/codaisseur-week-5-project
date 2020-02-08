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

Movie.create({
  title: "Life of Pi",
  yearOfRelease: 2012,
  synopsis: "Boy shares a boat with a lion in the middle of a sea"
});
Movie.create({
  title: "Slumdog Millionaire",
  yearOfRelease: 2008,
  synopsis: "Man wins competition because of tragic memories"
});
Movie.create({
  title: "My Name is Khan",
  yearOfRelease: 2010,
  synopsis:
    "Man's son dies because of discrimination post 9/11. Man embarks on a journey to change society."
});

module.exports = db;
