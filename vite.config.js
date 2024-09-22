import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react()],
    server: {}
  }

  // Only add HTTPS configuration for local development
  if (command === 'serve' && mode === 'development') {
    const certPath = path.resolve(__dirname, 'certificates')
    if (fs.existsSync(path.join(certPath, 'localhost+2-key.pem'))) {
      config.server.https = {
        key: fs.readFileSync(path.join(certPath, 'localhost+2-key.pem')),
        cert: fs.readFileSync(path.join(certPath, 'localhost+2.pem'))
      }
    } else {
      console.warn('HTTPS certificates not found. Running without HTTPS.')
    }
  }

  return config
})