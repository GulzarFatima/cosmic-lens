// src/pages/StarMap.jsx

// Import necessary hooks and axios for API call
import { useEffect, useState } from 'react'
import axios from 'axios'
import './StarMap.css'

// Component for showing star chart
export default function StarMap() {
  // Setup state variables for image, location, date, and status
  const [imageUrl, setImageUrl] = useState(null)
  const [latitude, setLatitude] = useState(43.65)
  const [longitude, setLongitude] = useState(-79.38)
  const [date, setDate] = useState('2025-08-04')
  const [loading, setLoading] = useState(false)
  const [updated, setUpdated] = useState(false)

  // Function to call the backend API and fetch the image
  const fetchChart = async () => {
    try {
      setLoading(true)
      setUpdated(false)

      // Show what is being submitted to API
      console.log('Submitting with:', { latitude, longitude, date })

      // Call Express server with params
      const res = await axios.get('http://localhost:5001/api/starmap', {
        params: {
          lat: parseFloat(latitude),
          lon: parseFloat(longitude),
          date,
        },
      })

      // Store image URL and update UI states
      console.log('New star chart image URL:', res.data.imageUrl)
      setImageUrl(res.data.imageUrl)
      setLoading(false)
      setUpdated(true)

      // Hide updated message after 3 sec
      setTimeout(() => setUpdated(false), 3000)
    } catch (error) {
      // If there's an error, log it and stop loading state
      console.error('Failed to load star chart:', error.message)
      setLoading(false)
    }
  }

  // Load the chart once when the component first mounts
  useEffect(() => {
    fetchChart()
  }, [])

  // When form is submitted, fetch new chart
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchChart()
  }

  return (
    <div className="star-map-container">
      {/* Header section with title and status messages */}
      <div className="star-map-header">
        <h2 className="star-map-title">Star Map View</h2>
        {loading && <span className="loading-message">Updating...</span>}
        {updated && <span className="updated-message">Updated!</span>}
      </div>

      {/* Main row: form on the left, image on the right */}
      <div className="top-row">
        <div className="form-column">
          {/* Form inputs for lat, lon, and date */}
          <form onSubmit={handleSubmit} className="form">
            <label>
              Latitude:
              <input
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                step="0.01"
                required
              />
            </label>
            <label>
              Longitude:
              <input
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                step="0.01"
                required
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <button type="submit">Generate Star Chart</button>
          </form>

          {/* Display current lat, lon, and date below form */}
          <p className="meta-info">
            <strong>Location:</strong> Latitude {latitude}, Longitude {longitude} <br />
            <strong>Date:</strong> {date}
          </p>
        </div>

        {/* Show the chart image once it's loaded */}
        <div className="image-column">
          {imageUrl && !loading ? (
            <img
              className="star-chart-image"
              src={`${imageUrl}?t=${Date.now()}`}
              alt="Star Chart"
            />
          ) : null}
        </div>
      </div>

      {/* Info section at the bottom explaining what chart shows */}
      <div className="info-box">
        <h3>What You’re Seeing</h3>
        <p>This is a star chart showing the night sky from your selected location and date.</p>
        <ul>
          <li>Stars visible from your location</li>
          <li>Moon if it's above the horizon</li>
          <li>Planets (if visible)</li>
          <li>Constellation outlines and labels</li>
          <li>Cardinal directions (N, S, E, W)</li>
        </ul>
        <p>It’s like a snapshot of the night sky, as seen from the ground!</p>
      </div>
    </div>
  )
}
