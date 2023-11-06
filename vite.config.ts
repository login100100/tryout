import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'
import vue from '@vitejs/plugin-vue'
import path, { parse } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteImagemin()],
  resolve: {
    alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        vue: path.resolve(`./node_modules/vue`),
    }
  },
  build: {
    emptyOutDir: true,
  },
})
