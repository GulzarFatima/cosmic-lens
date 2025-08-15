/* eslint-env node */
// api/starmap.js
import { Buffer } from 'buffer';

export default async function handler(req, res) {
  try {
    const { lat, lon, date } = req.query || {};
    if (!lat || !lon || !date) {
      return res.status(400).json({ error: "Missing lat, lon, or date" });
    }

    const user = process.env.ASTRO_USER;
    const secret = process.env.ASTRO_SECRET;
    if (!user || !secret) {
      return res.status(500).json({ error: "Missing ASTRO_USER/ASTRO_SECRET on server" });
    }

    const basic = Buffer.from(`${user}:${secret}`).toString("base64");

    const r = await fetch("https://api.astronomyapi.com/api/v2/studio/star-chart", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        observer: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          date
        },
        view: { type: "constellation", parameters: { constellation: "ori" } },
        style: "inverted"
      }),
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data?.error || "Astronomy API request failed" });

    return res.status(200).json({ imageUrl: data?.data?.imageUrl });
  } catch (e) {
    console.error("StarMap API error:", e);
    return res.status(500).json({ error: "Failed to fetch star chart" });
  }
}
