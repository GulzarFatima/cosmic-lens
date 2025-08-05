import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { spawn } from 'child_process'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001'
    }
  },
  configureServer() {
    let serverProcess
    return {
      configureServer() {
        if (!serverProcess) {
          serverProcess = spawn('node', ['./src/server.js'], {
            stdio: 'inherit',
            shell: true
          })
        }
      }
    }
  }
})
