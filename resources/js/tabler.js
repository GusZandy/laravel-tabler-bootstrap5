window._ = require('lodash');

/**
 * We'll load jQuery, which is still required by a handful of the bundled
 * jQuery plugins below (bootstrap-datepicker, select2, tablesorter,
 * sparkline, jquery-circle-progress). Bootstrap 5 itself no longer needs
 * jQuery or a globally exposed Popper — it bundles @popperjs/core.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');

    // Chart.js
    require('chart.js/auto');

    // Sparkline
    require('sparkline');

    // Tablesorter
    require('tablesorter');

    // jQuery vector map
    require('vector-map');

    // Tom Select (successor to Selectize)
    window.TomSelect = require('tom-select').default;

    // bootstrap-datepicker
    require('bootstrap-datepicker');

    // Tempus Dominus (successor to eonasdan-bootstrap-datetimepicker)
    const { TempusDominus } = require('@eonasdan/tempus-dominus');
    window.TempusDominus = TempusDominus;

    // select2
    require('select2');

    // circle-progress
    require('circle-progress');


    // <!----- Here your modules add ----->


    // app.js
    require('./app');

} catch (e) {
    console.error(e);
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/** Core JS
 *
 */
let hexToRgba = function(hex, opacity) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;

    return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
};


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     encrypted: true
// });


$(document).ready(function() {
    /** Constant div card */
    const DIV_CARD = 'div.card';

    /** Initialize tooltips */
    $('[data-bs-toggle="tooltip"]').tooltip();

    /** Initialize popovers */
    $('[data-bs-toggle="popover"]').popover({
        html: true
    });

    /** Function for remove card */
    $('[data-toggle="card-remove"]').on('click', function(e) {
        let $card = $(this).closest(DIV_CARD);

        $card.remove();

        e.preventDefault();
        return false;
    });

    /** Function for collapse card */
    $('[data-toggle="card-collapse"]').on('click', function(e) {
        let $card = $(this).closest(DIV_CARD);

        $card.toggleClass('card-collapsed');

        e.preventDefault();
        return false;
    });

    /** Function for fullscreen card */
    $('[data-toggle="card-fullscreen"]').on('click', function(e) {
        let $card = $(this).closest(DIV_CARD);

        $card.toggleClass('card-fullscreen').removeClass('card-collapsed');

        e.preventDefault();
        return false;
    });

    /**  */
    if ($('[data-sparkline]').length) {
        let generateSparkline = function($elem, data, params) {
            $elem.sparkline(data, {
                type: $elem.attr('data-sparkline-type'),
                height: '100%',
                barColor: params.color,
                lineColor: params.color,
                fillColor: 'transparent',
                spotColor: params.color,
                spotRadius: 0,
                lineWidth: 2,
                highlightColor: hexToRgba(params.color, .6),
                highlightLineColor: '#666',
                defaultPixelsPerValue: 5
            });
        };

        // require(['sparkline'], function() {
        //     $('[data-sparkline]').each(function() {
        //         let $chart = $(this);
        //
        //         generateSparkline($chart, JSON.parse($chart.attr('data-sparkline')), {
        //             color: $chart.attr('data-sparkline-color')
        //         });
        //     });
        // });
    }

    /**  */
    if ($('.chart-circle').length) {
        // require(['circle-progress'], function() {
        //     $('.chart-circle').each(function() {
        //         let $this = $(this);
        //
        //         $this.circleProgress({
        //             fill: {
        //                 color: tabler.colors[$this.attr('data-color')] || tabler.colors.blue
        //             },
        //             size: $this.height(),
        //             startAngle: -Math.PI / 4 * 2,
        //             emptyFill: '#F4F4F4',
        //             lineCap: 'round'
        //         });
        //     });
        // });
    }

    /**
     *  User defined
     */

    $('.js-datepicker').datepicker({
        todayHighlight: true,
        autoclose: true
    });

    /** Tempus Dominus datetimepicker (replaces eonasdan-bootstrap-datetimepicker) */
    document.querySelectorAll('.js-datetimepicker').forEach(function(el) {
        new TempusDominus(el, {
            display: {
                sideBySide: true,
            },
            localization: {
                format: 'yyyy-MM-dd HH:mm:ss',
            },
        });
    });

    $('.js-select2').select2({
        allowClear: true,
        dropdownAutoWidth: true,
        theme: 'bootstrap-5'
    });
});
