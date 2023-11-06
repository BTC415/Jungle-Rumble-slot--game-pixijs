import { defineConfig } from 'vite';
import dotenv from 'dotenv';
export default defineConfig({
  publicDir: 'public',
  plugins: [
    // Load environment variables
    dotenv(),
  ],
})
