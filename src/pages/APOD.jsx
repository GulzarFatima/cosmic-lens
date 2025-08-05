// src/pages/APOD.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import './APOD.css'

export default function APOD() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/nasa')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch APOD:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="apod-loading">Loading NASA Image of the Day...</p>
  if (!data) return <p className="apod-error">Could not load APOD data.</p>

  return (
    <div className="apod-container">
      <h2 className="apod-heading">NASA Astronomy Picture of the Day</h2>

      <div className="apod-content">
        <div className="apod-media">
          {data.media_type === 'image' ? (
            <img src={data.url} alt={data.title} className="apod-image" />
          ) : (
            <iframe
              src={data.url}
              title="NASA APOD Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="apod-video"
            />
          )}
        </div>

        <div className="apod-info">
          <h3>{data.title}</h3>
          <p className="apod-date">{data.date}</p>
          <p className="apod-description">{data.explanation}</p>
        </div>
      </div>
    </div>
  )
}
