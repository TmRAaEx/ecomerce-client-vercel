import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-plugin-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";

import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss(), svgr()],
    base: "/",
    build:{
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: {
            '@components': '/src/components',
            '@hooks': '/src/hooks',
            '@styles': '/src/styles',
            '@pages': '/src/pages',
            '@models': '/src/models',
            '@interfaces': '/src/interfaces',
            '@context': '/src/context',
            '@providers': '/src/providers',
            '@services': 'src/services',
            '@reducers': 'src/reducers',
            '@ui': '/src/components/UI',
            "@utils": '/src/utils',
        },
    },
});

