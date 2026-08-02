import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    css: {
        // Some bundled vendor CSS (old jQuery-plugin stylesheets, e.g.
        // bootstrap-datepicker) contains legacy IE hacks (`*zoom`, star-prefixed
        // properties) that Vite's lightningcss minifier otherwise rejects.
        lightningcss: {
            errorRecovery: true,
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/sass/tabler.scss',
                'resources/js/tabler.js',
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            'vector-map': 'jsvectormap',
        },
    },
});
