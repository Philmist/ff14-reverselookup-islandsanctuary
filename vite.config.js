import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { extname } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ff14-reverselookup-islandsanctuary/',
  plugins: [
    react(),
    /*
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
         plugins: ['@babel/plugin-syntax-import-assertions'],
      },
    })
    */
  ],
});
