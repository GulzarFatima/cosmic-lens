// src/api/starmap.js (Express backend)
/* eslint-env node */
/* global process */

import express from 'express'
import axios from 'axios'
import { Buffer } from 'buffer'

const router = express.Router()

router.get('/', async (req, res) => {
  const { lat, lon, date } = req.query

  try {
    const response = await axios.post(
        'https://api.astronomyapi.com/api/v2/studio/star-chart',
        {
          observer: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            date: date  
          },
          view: {
            type: "constellation", 
            parameters: {
              constellation: "ori" 
            }
          },
          style: "inverted"
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.ASTRO_USER}:${process.env.ASTRO_SECRET}`).toString('base64')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      

    const imageUrl = response.data?.data?.imageUrl
    res.json({ imageUrl })
} catch (error) {
    console.error('StarMap API error:', error?.response?.data || error.message)
    res.status(500).json({ error: 'Failed to fetch star chart' })
  }
  
  
})

export default router
