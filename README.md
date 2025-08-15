# Cosmic-Lens

Cosmic-Lens is a web application that lets users explore space through two interactive features:

- **NASA Astronomy Picture of the Day (APOD)**
- **Custom Star Map based on user-selected location and date**

It is designed for astronomy enthusiasts, students, and anyone curious about the cosmos.

---

React + Node/Express app to:
- View NASA’s Astronomy Picture of the Day (APOD) by date.
- Generate a star chart image (via AstronomyAPI) for a given latitude/longitude/date.

---

## Live URLs

- **Frontend:** https://cosmic-lens-2.onrender.com
- **API base:** https://cosmic-lens-1.onrender.com  
  - APOD example: `https://cosmic-lens-1.onrender.com/api/nasa?date=2024-01-01`
  - Star map example: `https://cosmic-lens-1.onrender.com/api/starmap?lat=43.65&lon=-79.38&date=2025-08-04`

---

## Features

- **APOD Viewer:** fetch and display NASA’s APOD by date.
- **Star Map:** request a star chart image for any location/date.

---

## Tech Stack

- **Frontend:** React (Vite), Axios
- **Backend:** Node.js (Express), native `fetch`, CORS
- **Hosting:** Render (Static Site for frontend, Web Service for API)

---

## Architecture & Structure

- Frontend at repo root (Vite) with `src/` and `index.html`.
- Backend under `/api` with routes mounted at `/api/*`.
- CORS restricted to the deployed frontend origin.


