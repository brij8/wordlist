require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();

// app.use(express.json());
app.use(staticMiddleware, bodyParser.json());

// GET users Games
app.get('/api/games', (req, res, next) => {
  // v--- will be req.user.userID later ---v
  const userID = 1;
  const sql = `
  select
    "gameName", "gameID"
  from
    "games"
  where
    "userID" = $1;
  `;
  const param = [userID];
  db.query(sql, param)
    .then(results => {
      const games = results.rows;
      res.json(games);
    })
    .catch(err => next(err));
});

// GET users Lists
app.get('/api/lists', (req, res, next) => {
  // v--- will be req.user.userID later ---v
  const userID = 1;
  const sql = `
  select
    "listName", "listID"
  from
    "lists"
  where
    "userID" = $1;
  `;
  const param = [userID];
  db.query(sql, param)
    .then(results => {
      const lists = results.rows;
      res.json(lists);
    })
    .catch(err => next(err));
});

// GET a Games Lists
app.get('/api/gamelist/:gameID', (req, res, next) => {
  const gameID = Number(req.params.gameID);
  const sql = `
  select
    "listID",
    "listName"
  from
    "gamelist"
  join
    "lists"
  using
    ("listID")
  where
    "gameID" = $1;
  `;
  const param = [gameID];
  db.query(sql, param)
    .then(results => {
      const lists = results.rows;
      res.json(lists);
    })
    .catch(err => next(err));
});

// GET a Lists words
app.get('/api/listwords/:listID', (req, res, next) => {
  const listID = Number(req.params.listID);
  const sql = `
  select
    "listWordID",
    "word"
  from
    "listwords"
  where
    "listID" = $1;
  `;
  const param = [listID];
  db.query(sql, param)
    .then(results => {
      const words = results.rows;
      res.json(words);
    })
    .catch(err => next(err));
});

// create new Game
app.post('/api/games', (req, res, next) => {
  // v--- will be req.user.userID later ---v
  const userID = 1;
  const sql = `
  insert into "games" ("userID")
  values ($1)
  returning *
  `;
  const params = [userID];
  db.query(sql, params)
    .then(results => {
      const ng = results.rows;
      res.json(ng);
    })
    .catch(err => next(err));
});

// create new List
app.post('/api/lists', (req, res, next) => {
  // v--- will be req.user.userID later ---v
  const userID = 1;
  const sql = `
  insert into "lists" ("userID")
  values ($1)
  returning *
  `;
  const params = [userID];
  db.query(sql, params)
    .then(results => {
      const nl = results.rows;
      res.json(nl);
    })
    .catch(err => next(err));
});

// delete a selected game
app.delete('/api/games/:gameID', (req, res, next) => {
  const gameID = Number(req.params.gameID);
  const sql = `
  delete from
    "games"
  where
    "gameID" = $1
  `;
  const param = [gameID];
  db.query(sql, param)
    .catch(err => next(err));
});

// delete a selected list
app.delete('/api/lists/:listID', (req, res, next) => {
  const listID = Number(req.params.listID);
  const sql = `
  delete from
    "lists"
  where
    "listID" = $1
  `;
  const param = [listID];
  db.query(sql, param)
    .catch(err => next(err));
});

// add list to game
app.post('/api/gamelist/', (req, res, next) => {
  const game = Number(req.body.selGameID);
  const list = Number(req.body.selListID);
  const sql = `
  WITH inserted AS (
    INSERT INTO "gamelist" ("gameID", "listID") VALUES ($1, $2) RETURNING *
  )
  SELECT
    inserted.*, lists.*
  FROM
    inserted
  INNER JOIN
    lists
  USING ("listID")
  `;
  const params = [game, list];
  db.query(sql, params)
    .then(results => {
      const nl = results.rows;
      res.json(nl);
    })
    .catch(err => next(err));
});

// EDIT selected gameName

// EDIT selected listName

// EDIT selected word

// create new word

// delete selected word
app.delete('/api/listwords/:listWordID', (req, res, next) => {
  const wordID = Number(req.params.listWordID);
  const sql = `
  delete from
    "listwords"
  where
    "listWordID" = $1
  `;
  const param = [wordID];
  db.query(sql, param)
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
