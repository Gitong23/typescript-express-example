import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
// import mongoose from 'mongoose'
import router from './router'
import sequelize from './db/db.sequelize'

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

// Sync Sequelize models with the database
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every startup (useful during development)
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

server.listen(8080, () => {
    console.log('Server running on port: 8080')
})

app.use('/', router())
