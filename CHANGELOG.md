# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

 
## [Unreleased]
Major upgrade to keep the package current: Laravel 12/13 and PHP ^8.3 support, Bootstrap 5.3 (from Bootstrap 4), and Vite (from Laravel Mix).
1. `composer.json`: require `php: ^8.3` and `laravel/framework: ^12.0||^13.0`; added `orchestra/testbench` and `phpunit/phpunit: ^11` as dev dependencies.
1. `phpunit.xml` migrated to the PHPUnit 11 schema.
1. Rewrote package tests to use Orchestra Testbench instead of a bootstrap/app.php-based `CreatesApplication` trait, which never worked for a package.
1. Replaced Laravel Mix (`webpack.mix.js`) with Vite (`vite.config.js`, `laravel-vite-plugin`); `TablerMakeCommand` now prints instructions instead of blindly appending to a webpack config.
1. Upgraded Bootstrap 4 to Bootstrap 5.3 across `resources/sass` and `resources/views`: renamed variables (`$custom-select-*` to `$form-select-*`, removed the YIQ contrast system, fixed unitless division for Dart Sass), converted markup (`data-toggle`/`data-dismiss`/`data-target` to `data-bs-*`, `custom-control`/`custom-checkbox` to `form-check`, `custom-select` to `form-select`, `input-group-prepend`/`append` removed, RTL-safe spacing/float utilities `ml-`/`mr-`/`float-left`/`float-right` to `ms-`/`me-`/`float-start`/`float-end`, `btn-block` to `w-100`).
1. Swapped unmaintained/incompatible npm packages: `node-sass` to `sass` (Dart Sass), `eonasdan-bootstrap-datetimepicker` to `@eonasdan/tempus-dominus` v6, `selectize` to `tom-select`, `jvectormap` to `jsvectormap`, `chart.js` v2 to v4, dropped `bootstrap-sass`, `popper.js` v1, and unused `vue`/`vue-template-compiler`.
1. Fixed pre-existing bugs found along the way: removed helpers (`title_case`/`snake_case`) that no longer exist since Laravel 6, a `taber::` typo in `errors/403.blade.php`, and removed a bundled Laravel 5-era `public/index.php` that `make:tabler` was copying into the host app's `public/` directory (this would have silently overwritten a Laravel 12/13 app's actual front controller and broken it). Removed the stale precompiled Bootstrap 4 assets (`public/css`, `public/js`, `public/mix-manifest.json`) that no longer match the new Vite/Bootstrap 5 source.
1. Verified the new frontend build end-to-end with `npm install && npx vite build`, fixing everything it surfaced (undefined `bg-variant()` mixin, `$yiq-*`/`$custom-checkbox-indicator-icon-checked` variables removed in Bootstrap 5, a `$border-color-dark` name collision with Bootstrap 5's own dark-mode variable, wrong npm package CSS paths, and legacy IE CSS hacks tripping up Vite's default minifier).
 
## [1.0.1] - 2019-09-06
Made package that support not only laravel 5.8 but also laravel 6.0.
1. Deleted ```php artisan make:auth``` in *TablerMakeCommand*.
1. Updated requirement of laravel's version in *composer.json*.
 
## [1.0.0] - 2019-09-06
First stable package that support for laravel 5.8.
 