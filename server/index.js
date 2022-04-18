require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const db = require('./db');

const app = express();

app.use(staticMiddleware);

app.get('/api/games', (req, res, next) => {
  // v--- will be req.user.userID later ---v
  const userID = 1;
  const sql = `
  select
    "gameName"
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

app.get('/api/lists', (req, res, next) => {
  // v--- will be req.user.userID later ---v
  const userID = 1;
  const sql = `
  select
    "listName"
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
