/* eslint-env node */
/* global process */

import express from 'express';
import { Buffer } from 'node:buffer';

const router = express.Router();

router.get('/', async (req, res) => {
  const { lat, lon, date } = req.query;

  try {
    const id = process.env.ASTRO_USER;
    const secret = process.env.ASTRO_SECRET;
    const basic = Buffer.from(`${id}:${secret}`).toString('base64');

    const r = await fetch('https://api.astronomyapi.com/api/v2/studio/star-chart', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        observer: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          date
        },
        view: {
          type: 'constellation',
          parameters: { constellation: 'ori' }
        },
        style: 'inverted'
      })
    });

    const data = await r.json();
    res.status(r.ok ? 200 : r.status).json({ imageUrl: data?.data?.imageUrl });
  } catch (err) {
    console.error('StarMap API error:', err);
    res.status(500).json({ error: 'Failed to fetch star chart' });
  }
});

export default router;
