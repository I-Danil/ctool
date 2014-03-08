/**
 * Created by Danil on 04.02.14.
 */

'use strict';

/* Controllers */

angular.module('ct.controllers', [], function () {
})
    .controller('ActionButtonsCtrl', ['$scope', function ($scope) {
        $scope.locked = false;
        $scope.unlocked = true;
        $scope.played = false;

        $scope.lock = function () {
            $scope.locked = true;
            $scope.unlocked = false;
        };
        $scope.unlock = function () {
            $scope.locked = false;
            $scope.unlocked = true;
        };
        $scope.play = function () {
            $scope.played = true;
        };
        $scope.playAll = function () {
            $scope.played = true;
        }

    }])
    .controller('DatePickerCtrl', ['$scope', '$locale', function ($scope, $locale) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.select = function () {
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'show-weeks': false,
            'starting-day': 1
        };

        $scope.format = $locale.DATETIME_FORMATS.fullDate;

    }])
    .controller('AreaCtrl', ['$scope', 'AreaOfControl', function ($scope, AreaOfControl) {
        AreaOfControl.list(function (aocs) {
            $scope.aocs = aocs;
            $scope.aoc = AreaOfControl.getSelected();
        });

        $scope.change = function () {
            AreaOfControl.saveToCooke($scope.aoc);
        };
    }])
    .controller('UnplannedOrdersCtrl', ['$scope', 'UnplannedOrdersService', function ($scope, UnplannedOrdersService) {
        var cache = [], add = 50, last = 100;
        UnplannedOrdersService.list(function (orders) {
            cache = orders;
            $scope.orders = cache.slice(0, last);
        });

        $scope.scrollDown = function (a) {
            if (last >= cache.length) return;
            angular.forEach(cache.slice(last, last + add), function (value) {
                $scope.orders.push(value);
            });
            last += add;
        };

        $scope.selectOrder = function (order) {
            alert(order)
        };
    }])
    .controller('ScheduleCtrl', ['$scope', 'ScheduleService', function ($scope, ScheduleService) {
        var minTime, maxTime;

        var calculateScheduleBounds = function(min, max) {
            minTime = min - ((min / DateTimeConstant.MILLISECONDS_IN_HOUR) % 24) * DateTimeConstant.MILLISECONDS_IN_HOUR;
            var fullHours = (24 - ((max / DateTimeConstant.MILLISECONDS_IN_HOUR) % 24));
            fullHours = fullHours == 24 ? 0 : fullHours;
            maxTime = max + fullHours * DateTimeConstant.MILLISECONDS_IN_HOUR;
            $scope.maxZoom = (maxTime - minTime) / DateTimeConstant.MILLISECONDS_IN_HOUR;
        };
        calculateScheduleBounds(1396569600000, 1396569600000 + DateTimeConstant.MILLISECONDS_IN_DAY + DateTimeConstant.MILLISECONDS_IN_DAY);

        $scope.zoomChange = function(zoom) {
            if (zoom > $scope.maxZoom || zoom == $scope.zoom) return;
            $scope.zoom = zoom;
            $scope.timescale = {
                zoom: zoom,
                minTime: minTime,
                maxTime: maxTime
            };
        };
        $scope.zoomChange(4);

        ScheduleService.list(function (values) {
            var vehicles = [];
            var schedules = [];
            for (var i = 0; i < values.length; i++) {
                var obj = values[i];
                vehicles.push(obj.vehicle);
                schedules.push(obj.schedule);
            }
            $scope.vehicles = vehicles;
            $scope.schedules = schedules;
        });
    }]);
