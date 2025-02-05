import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/generate-idea': 'http://localhost:3000',
      '/calculate-investments': 'http://localhost:3000'
    }
  }
});
