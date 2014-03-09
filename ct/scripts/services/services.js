/**
 * Created by Danil on 04.02.14.
 */

'use strict';

/* Services */

angular.module('ct.services', ['ngResource', 'ngCookies'], function () {
})
    .service('AreaOfControl', ['$resource', '$cookieStore', function ($resource, $cookieStore) {
        var aocs = [];
        var list = function (callback) {
            $resource('data/aocs.json', {}, {
                list: {method: 'JSONP', isArray: true}
            }).list(function (data) {
                    aocs = data;
                    callback(data);
                })
        };
        var get = function (id) {
            var aoc = null;
            if (!angular.isDefined(id)) return aoc;
            angular.forEach(aocs, function (value) {
                if (angular.equals(value.id, id)) aoc = value;
            });
            return aoc;
        };

        var saveToCookie = function (aoc) {
            $cookieStore.put("ct.aoc", aoc.id);
        };

        var getFromCookie = function () {
            return get($cookieStore.get("ct.aoc"))
        };

        var getSelected = function () {
            return getFromCookie() || aocs[0];
        };
        return {
            list: list,
            get: get,
            saveToCooke: saveToCookie,
            getFromCookie: getFromCookie,
            getSelected: getSelected
        }
    }])
    .service('UnplannedOrdersService', ['$resource', function ($resource) {
        var orders = [];
        var list = function (callback) {
            $resource('data/orders.json', {}, {
                list: {method: 'JSONP', isArray: true}
            }).list(function (data) {
                    orders = data;
                    callback(data);
                }, function (data) {
                    console.log("error")
                })
        };
        return {
            list: list
        }
    }])
    .service('ScheduleService', ['$resource', function ($resource) {
        var minTime, maxTime;

        var list = function (callback) {
            $resource('data/schedule.json', {}, {
                list: {method: 'JSONP', isArray: true}
            }).list(function (data) {
                    calculateScheduleBounds(data);
                    callback(data);
                }, function () {
                    callback([]);
                    console.log("error while loading schedule data")
                })
        };

        var calculateScheduleBounds = function (vehicles) {
            if (vehicles.length == 0) return;
            var min = vehicles[0].workStartTime;
            var max = vehicles[0].workEndTime;
            for (var i = 0; i < vehicles.length; i++) {
                var vehicle = vehicles[i];
                min = Math.min(min, vehicle.workStartTime);
                max = Math.max(max, vehicle.workEndTime);
            }
            minTime = min - ((min / DateTimeConstant.MILLISECONDS_IN_HOUR) % 24) * DateTimeConstant.MILLISECONDS_IN_HOUR;
            var fullHours = (24 - ((max / DateTimeConstant.MILLISECONDS_IN_HOUR) % 24));
            fullHours = fullHours == 24 ? 0 : fullHours;
            maxTime = max + fullHours * DateTimeConstant.MILLISECONDS_IN_HOUR;
        };

        var getScheduleBounds = function () {
            return {
                minTime: minTime,
                maxTime: maxTime
            }
        };

        var getHoursInSchedule = function () {
            return (maxTime - minTime) / DateTimeConstant.MILLISECONDS_IN_HOUR
        };

        return {
            list: list,
            getScheduleBounds: getScheduleBounds,
            getHoursInSchedule: getHoursInSchedule
        }
    }]);
