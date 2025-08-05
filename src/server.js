// src/server.js
import express from 'express'
import dotenv from 'dotenv'
import nasaRoutes from './api/nasa.js'
import starmapRoutes from './api/starmap.js'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'




dotenv.config()

const app = express()
const port = 5001

app.use(cors({
    origin: 'http://localhost:5173',
  }))

app.use(express.json())

app.use('/api/nasa', nasaRoutes)
app.use('/api/starmap', starmapRoutes)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`)
})
