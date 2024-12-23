import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        src: resolve(__dirname, 'src/slots-wheel.html'),
        spin: resolve(__dirname, 'src/sub-wheel.html'),
        kev: resolve(__dirname, 'src/kevin-spin.html'),
        deal: resolve(__dirname, 'src/deal.html'),
        plinko: resolve(__dirname, 'src/plinko.html'),
        cards: resolve(__dirname, 'src/cards.html'),
        matchcards:resolve(__dirname,'src/matchcards.html'),
        callwheels:resolve(__dirname, 'src/call-wheels.html')
      },
    },
  },
})