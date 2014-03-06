/**
 * Created by Danil on 04.02.14.
 */

'use strict';

/* Filters */

angular.module('ct.filters', []).
    filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]);
