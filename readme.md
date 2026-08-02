# Laravel Tabler Bootstrap 5

Laravel package for integrating the [Tabler](https://tabler.io) admin template, built on Bootstrap 5 and Vite.

> **Note on the package name:** this package started life as a Bootstrap 4 integration (`guszandy/laravel-tabler-bootstrap4`). The frontend has since been upgraded to Bootstrap 5 and the Composer package was renamed to `guszandy/laravel-tabler-bootstrap5` to match. The PHP namespace (`GusZandy\Tabler`) is unchanged, so config/view publishing commands below still reference it.

## Requirements

- PHP ^8.3
- Laravel ^12.0 or ^13.0
- Node.js 18+ (for building assets with Vite)

# Pre-Installation

Before installing, scaffold authentication in your app. Any Laravel starter kit that provides `login`/`register`/`password.email`/`password.update` routes works (for example [Laravel Breeze](https://laravel.com/docs/starter-kits)):

```bash
composer require laravel/breeze --dev
php artisan breeze:install blade
```

# Installation

```bash
composer require guszandy/laravel-tabler-bootstrap5
```

Run this to scaffold the views into your app:

```bash
php artisan make:tabler
```

Make sure you've run `php artisan migrate`, then:

```bash
php artisan serve
```

# Configuration and Views Customization

## Config
To publish this package's config to your app config, run:
```bash
php artisan vendor:publish --provider="GusZandy\Tabler\Providers\AppServiceProvider" --tag="config"
```

## Views
To publish this package's views so you can customize them, run:
```bash
php artisan vendor:publish --provider="GusZandy\Tabler\Providers\AppServiceProvider" --tag="views"
```

# Next Step

This package uses [Vite](https://laravel.com/docs/vite) (Laravel's default asset bundler) instead of Laravel Mix.

After running `php artisan make:tabler`, add the Tabler entry points to the `input` array of the `laravel()` plugin in your app's `vite.config.js`:

```js
laravel({
    input: [
        'resources/css/app.css',
        'resources/js/app.js',
        'resources/sass/tabler.scss',
        'resources/js/tabler.js',
    ],
    refresh: true,
}),
```

Then install the npm dependencies and build the assets:

```bash
npm install
npm run dev    # local development, with HMR
npm run build  # production build
```

In your Blade layout, load the compiled assets with the `@vite` directive:

```blade
@vite(['resources/sass/tabler.scss', 'resources/js/tabler.js'])
```

Then have a good look at these files:
- `vite.config.js`
- `resources/js/tabler.js`
- `resources/sass/tabler.scss`

Happy experimenting!

# How to use components in this package
## 1. Panel
```php
@component('tabler::components.panel', [ 'title' => 'Welcome' ])
  @slot('tools')
      <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i
              class="fe fe-chevron-up"></i></a>
      <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
  @endslot
  You are logged in!
@endcomponent
```

## 2. Alert
```php
@component('tabler::components.alert', [ 'type' => 'info' ])
  @slot('text')
     This is an alert component.
  @endslot
@endcomponent
```

## 3. Button
```php
@component('tabler::components.button', [ 'type' => 'info', 'url' => 'www.google.com' ])
  @slot('text')
     This is a button component.
  @endslot
@endcomponent
```
## 4. Tabs
```php
@component('tabler::components.tabs', [ 'nav_tabs' => 'info' ])
  @slot('tab_panes')
     This is a tab component.
  @endslot
@endcomponent
```

# Frontend stack

- **Bootstrap 5.3** (upgraded from Bootstrap 4)
- **Vite** (upgraded from Laravel Mix)
- **Tom Select** for enhanced multi-selects/tagging (replaces the unmaintained Selectize)
- **Tempus Dominus 6** for date/time pickers (replaces `eonasdan-bootstrap-datetimepicker`; no longer needs jQuery or Moment)
- **jsvectormap** for interactive maps (replaces `jvectormap`)
- **Chart.js 4**, **select2**, **bootstrap-datepicker**, **tablesorter** and **sparkline** are still bundled and still rely on jQuery, which remains a dependency of this package.
