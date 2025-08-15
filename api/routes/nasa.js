/* eslint-env node */
/* global process */

import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const params = new URLSearchParams({
      api_key: process.env.NASA_API_KEY || ''
    });
    if (req.query.date) params.set('date', req.query.date);

    const r = await fetch(`https://api.nasa.gov/planetary/apod?${params.toString()}`);
    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json(data);
    }
    res.json(data);
  } catch (error) {
    console.error('NASA API error:', error);
    res.status(500).json({ error: 'Failed to fetch NASA APOD' });
  }
});

export default router
