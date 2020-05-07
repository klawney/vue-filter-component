const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//mix.sass('resources/assets/sass/app.scss', 'public/css/app_css.css')

mix.js([
    'resources/assets/js/cdn/bootbox.min.js',
    'node_modules/tinymce/tinymce.min.js',
    'resources/assets/js/app.js',
], 'public/js/app.js')

mix.styles([
    'node_modules/vue-select/dist/vue-select.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/vuejs-dialog/dist/vuejs-dialog.min.css',
], 'public/css/app.css')

mix.copy('node_modules/tinymce/plugins', 'public/js/plugins')
mix.copy('node_modules/tinymce/skins', 'public/js/skins')
mix.copy('node_modules/tinymce/themes', 'public/js/themes')
mix.copy('node_modules/bootstrap/dist/fonts', 'public/fonts')
mix.copy('node_modules/font-awesome/fonts', 'public/fonts')
mix.copy('resources/assets/css/tinymce.css', 'public/css/tinymce.css')

mix.browserSync({
    proxy: 'http://127.0.0.1:8000'
})