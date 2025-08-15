/* eslint-env node */
/* global process */

import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async (req, res) => {
  const { date } = req.query
  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date || ''}`
    const response = await axios.get(url)
    res.json(response.data)
  } catch (error) {
    console.error('NASA API error:', error.message)
    res.status(500).json({ error: 'Failed to fetch NASA APOD' })
  }
  
})

export default router
