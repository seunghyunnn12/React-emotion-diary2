import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/React-emotion-diary2/', // 필수: GitHub repo 이름
  build: {
    outDir: 'docs', // ← build 결과를 docs 폴더로!
  },
  plugins: [react()],
})
