import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // Игра живёт в подпапке на gh-pages: https://gorangefresh.github.io/bubble
    base: '/bubble/',
    plugins: [react()],
    build: {
        // Намеренно 'build', а не дефолтный 'dist': так скрипт деплоя
        // `gh-pages -d build` остаётся без изменений.
        outDir: 'build',
        sourcemap: true
    },
    server: {
        open: true
    }
});
