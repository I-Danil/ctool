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
        ScheduleService.list(function (values) {
            $scope.zoom = 4;
            $scope.vehicles = values;
            $scope.minScheduleTime = ScheduleService.getScheduleBounds().minTime;
            $scope.maxScheduleTime = ScheduleService.getScheduleBounds().maxTime;
            $scope.hoursInSchedule = ScheduleService.getHoursInSchedule();
        });

        $scope.zoomChange = function(zoom) {
            if (zoom > $scope.hoursInSchedule || zoom == $scope.zoom) return;
            $scope.zoom = zoom;
        };

        $scope.setMillsInPx = function(millsInPx) {
            $scope.millsInPx = millsInPx;
        }
    }]);
