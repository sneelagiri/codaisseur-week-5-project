// Dependencies
const Sequelize = require("sequelize");
const express = require("express");
const app = express();
const { Router } = express;
const router = new Router();
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres"; //Created new container in Docker
const port = process.env.PORT || 4000;
const db = new Sequelize(databaseUrl);
app.use(express.json());
app.use(router);

// Model Schema
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
  { tableName: "movie_details" }
);
// Sync
db.sync()
  .then(() => {
    console.log("Schema will be updated here");
  })
  .then(() => {
    createExampleData();
  })
  .catch(console.error);

// 3 rows of example data
createExampleData = () => {
  Movie.findAll().then(movies => {
    if (movies.length === 0) {
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
    }
  });
};

// CRUD 1.) Create a movie
router.post("/movie", (req, res, next) => {
  if (req.body.text === undefined || req.body.text.length === 0) {
    res.status(400).end();
  } else {
    Movie.create(req.body)
      .then(movie => res.json(movie))
      .catch(next);
  }
});

// CRUD 2.) Read all movies
router.get("/movie", (req, res, next) => {
  const limit = Math.min(req.query.limit || 5, 500);
  const offset = req.query.offset || 0;
  Movie.findAndCountAll({ limit, offset })
    .then(movies => {
      res.json({ movies: movies.rows, total: movies.count });
    })
    .catch(next);
});

// CRUD 3.) Read a single movie
router.get("/movie/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        res.status(404).end();
      } else {
        res.json(movie);
      }
    })
    .catch(next);
});

// CRUD 4.) Update a single movie
router.put("/movie/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) {
        movie.update(req.body).then(movie => res.json(movie));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
module.exports = { db, router };
