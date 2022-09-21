import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { extname } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-syntax-import-assertions'],
      },
    }),
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
