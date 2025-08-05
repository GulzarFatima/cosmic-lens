// src/components/Layout.jsx
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <header className="site-header">
        <h1 className="logo">Cosmic-Lens</h1>
        <p className="description">
          Explore the cosmos with NASA’s Astronomy Picture of the Day and an interactive star map based on your location and date. Perfect for astronomy enthusiasts, students, and night sky watchers!
        </p>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Cosmic-Lens. All rights reserved.
      </footer>
    </div>
  )
}
