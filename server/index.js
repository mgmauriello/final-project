require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    throw new ClientError(400, 'title is a required field');
  }
  const fileUrl = 'server/public/sounds/' + req.file.filename;
  const sql = `
    insert into "soundscapes" ( "title", "fileUrl", "uploadedAt")
    values ($1, $2, now())
    returning *
  `;
  const params = [title, fileUrl];
  db.query(sql, params)
    .then(result => {
      const [file] = result.rows;
      res.status(201).json(file);
    })
    .catch(err => next(err));
});

app.get('/api/soundscapes', (req, res, next) => {
  const sql = `
    select *
      from "soundscapes"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
