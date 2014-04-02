/**
 * Created by Danil on 04.02.14.
 */

'use strict';

/* Directives */

angular.module('ct.directives', [])
    .directive('ctLayout', [function () {
        return {
            link: function (scope, elem) {
                elem.layout({
                    closable: false,
                    resizable: false,
                    slidable: false,
                    applyDefaultStyles: false,
                    north: {
                        size: 25,
                        paneClass: "actions-pane",
                        paneSelector: "#actions-panel",
                        togglerClass: "actions-toggler",
                        resizerClass: "actions-resizer",
                        spacing_open: 0,
                        spacing_closed: 0
                    },
                    center: {
                        paneClass: "plan-pane",
                        paneSelector: "#plan-panel"
                    }
                });
            }
        };
    }
    ])
    .directive('planLayout', [function () {
        return {
            link: function (scope, elem) {
                elem.layout({
                    resizable: false,
                    slidable: false,
                    togglerTip_open: "Close This Pane",
                    togglerTip_closed: "Open This Pane",
                    applyDefaultStyles: false,
                    east: {
                        size: 250,
                        paneSelector: "#orders-panel",
                        paneClass: "orders-pane",
                        togglerClass: "orders-toggler"
                    },
                    center: {
                        paneSelector: "#resource-panel",
                        paneClass: "resource-pane"
                    }
                });
            }
        };
    }
    ])
    .directive('resourceLayout', [function () {
        return {
            link: function (scope, elem) {
                elem.layout({
                    applyDefaultStyles: false,
                    togglerTip_open: "Close This Pane",
                    togglerTip_closed: "Open This Pane",
                    resizerTip: "Resize This Pane",
                    north: {
                        paneSelector: "#kpi-panel",
                        paneClass: "kpi-pane",
                        size: 25,
                        spacing_open: 0,
                        spacing_closed: 0
                    },
                    west: {
                        paneSelector: "#vehicle-panel",
                        paneClass: "vehicle-pane",
                        size: 250,
                        spacing_open: 0,
                        spacing_closed: 0
                    },
                    center: {
                        paneSelector: "#schedule-panel",
                        paneClass: "schedule-pane"
                    },
                    south: {
                        size: 0.4,
                        minSize: 0.1,
                        maxSize: 0.9,
                        paneSelector: "#map-panel",
                        paneClass: "map-pane",
                        togglerClass: "map-toggler"
                    }
                });
            }
        };
    }
    ])
    .directive('scheduleLayout', [function () {
        return {
            link: function (scope, elem) {
                elem.layout({
                    closable: false,
                    resizable: false,
                    slidable: false,
                    applyDefaultStyles: false,
                    north: {
                        size: 25,
                        paneClass: "timescale-pane",
                        paneSelector: "#timescale-panel",
                        togglerClass: "timescale-toggler",
                        resizerClass: "timescale-resizer",
                        spacing_open: 0,
                        spacing_closed: 0
                    },
                    center: {
                        paneClass: "time-line-pane",
                        paneSelector: "#time-line-panel"
                    }
                });
            }
        };
    }
    ])
    .directive('vehicleLayout', [function () {
        return {
            link: function (scope, elem) {
                elem.layout({
                    closable: false,
                    resizable: false,
                    slidable: false,
                    applyDefaultStyles: false,
                    north: {
                        size: 25,
                        paneClass: "vehicle-toolbar-pane",
                        paneSelector: "#vehicle-toolbar-panel",
                        togglerClass: "vehicle-toolbar-toggler",
                        resizerClass: "vehicle-toolbar-resizer",
                        spacing_open: 0,
                        spacing_closed: 0
                    },
                    center: {
                        paneClass: "vehicle-card-pane",
                        paneSelector: "#vehicle-card-panel"
                    }
                });
            }
        };
    }
    ])
    .directive('infiniteScroll', [
        '$rootScope', '$timeout', function ($rootScope, $timeout) {
            return {
                link: function (scope, elem, attrs) {
                    var handler,
                        lastScrollTop = 0,
                        container = elem.parent(),
                        alertHeight = parseInt(attrs.alertHeight, 10);

                    var apply = function (call) {
                        if ($rootScope.$$phase) {
                            return scope.$eval(call);
                        } else {
                            return scope.$apply(call);
                        }
                    };

                    handler = function () {
                        var bottomHg, scrollTop;
                        scrollTop = container.scrollTop();
                        bottomHg = elem.height() - container.height() - scrollTop;
                        // go down
                        if (scrollTop > lastScrollTop) {
                            lastScrollTop = scrollTop;
                            if (bottomHg > alertHeight) {
                                return;
                            }
                            apply(attrs.infiniteScrollDown);
                        }
                    };
                    container.on('scroll', handler);
                    scope.$on('$destroy', function () {
                        return container.off('scroll', handler);
                    });
                    return $timeout((function () {
                        return handler();
                    }), 0);
                }
            };
        }
    ])
    .directive('unplannedOrder', [
        '$rootScope', '$templateCache', function ($rootScope, $templateCache) {
            return {
                scope: {
                    order: '='
                },
                template: $templateCache.get('unplannedOrderTpl'),
                link: function (scope, elem) {
                    var el = elem[0];

                    var dragStart = function (ev) {
                        ev.dataTransfer.effectAllowed = 'move';
                        ev.dataTransfer.setData('Text', this.id);
                        this.classList.add('drag');
                        return false;
                    };

                    var dragEnd = function (ev) {
                        ev.dataTransfer.effectAllowed = 'move';
                        ev.dataTransfer.setData('Text', this.id);
                        this.classList.add('drag');
                        return false;
                    };

                    el.addEventListener('dragstart', dragStart, false);
                    el.addEventListener('dragend', dragEnd, false);
                    scope.$on('$destroy', function () {
                        elem.off('dragstart', dragStart);
                        return elem.off('dragend', dragEnd());
                    });
                }
            };
        }
    ])
    .directive('vehicleCard', [
        '$rootScope', '$templateCache', function ($rootScope, $templateCache) {
            return {
                template: $templateCache.get('vehicleCardTpl'),
                link: function (scope, elem, attrs) {
                }
            };
        }
    ])
    .directive('timescale', [
        '$rootScope', '$templateCache', '$filter', function ($rootScope, $templateCache, $filter) {
            return {
                scope: {
                    setMillsInPx: '&',
                    zoom: '='
                },
                template: $templateCache.get('timescaleTpl'),
                link: function (scope, elem, attrs) {
                    var dayStart = new Date(),
                        min = parseInt(attrs.minTime),
                        max = parseInt(attrs.maxTime),
                        timescaleElement = elem.find('#timescale_content'),
                        timescaleDateElement = elem.find('#timescale_date_content');

                    var hours, pxsPerHour, timescaleWidth, stepPx, days, dayStep, millsPerPx,
                        c, timescale_value, width, curDate, timescale_date;
                    var rescale = function (minTime, maxTime, zoom, visibleWidth) {
                        hours = (maxTime - minTime) / DateTimeConstant.MILLISECONDS_IN_HOUR;
                        pxsPerHour = visibleWidth / zoom;
                        timescaleWidth = pxsPerHour * hours;
                        timescaleElement.html("");
                        timescaleDateElement.html("");
                        timescaleElement.width(timescaleWidth);
                        timescaleDateElement.width(timescaleWidth);
                        dayStart.setUTCHours(0, 0, 0, 0);
                        millsPerPx = DateTimeConstant.MILLISECONDS_IN_HOUR / pxsPerHour;
                        days = hours / 24;
                        dayStep = zoom / 2;
                        var hourStep = 1;
                        if (zoom == 24) {
                            hourStep = 2;
                        } else if (zoom == 48) {
                            hourStep = 4;
                        }
                        stepPx = (hourStep * DateTimeConstant.MILLISECONDS_IN_HOUR / millsPerPx);
                        var dayPx = zoom / hourStep * stepPx / 2;
                        var timescaleValues = "";
                        var timescaleDates = "";
                        for (var x = 0; x < days; x++) {
                            for (var y = 0; y < 24; y++) {
                                if (y % hourStep != 0) continue;
                                c = 255 - (y * 3);
                                timescaleValues += "<div class='timescale_value' " +
                                    "style='width:" + stepPx + "px; color: rgb(0,0,0); background-color: rgb(" + c + "," + c + "," + c + ")'>" +
                                    "&nbsp;" + y + "<span class='timescale_minutes'>00</span></div>";

                                if (y % dayStep != 0) continue;
                                curDate = new Date(minTime + (new Date().getTimezoneOffset() * DateTimeConstant.MILLISECONDS_IN_MINUTE) + (((x * 24 ) + y) * DateTimeConstant.MILLISECONDS_IN_HOUR));
                                var style = "";
                                if (y == 0) {
                                    style += "border-left:1px solid black";
                                }
                                timescaleDates += "<div class='timescale_date' style='width:" + dayPx + "px;" + style + "'>" + $filter('date')(curDate, "dd MMMM (EEE)") + "</div>";
                            }
                            scope.setMillsInPx({millsPerPx: millsPerPx});
                            $rootScope.calculateWidth = function (min, max) {
                                return (max - min) / millsPerPx
                            };
                        }
                        timescaleElement.html(timescaleValues);
                        timescaleDateElement.html(timescaleDates);
                    };

                    scope.$watch('zoom', function () {
                        rescale(min, max, scope.zoom, elem.width());
                    });
                }
            };
        }
    ])
    .directive('scrollSynchronize', [function () {
        return {
            link: function (scope, elem, attrs) {
                var timeLinePanel = elem.find("#time-line-panel");
                var vehiclePanel = elem.find("#vehicle-card-panel");
                var timescalePanel = elem.find("#timescale-panel");
                var previousScrollTop = 0;
                var handler = function () {
                    var scrollTop = timeLinePanel.scrollTop();
                    if (scrollTop == previousScrollTop) {
                        timescalePanel.scrollLeft(timeLinePanel.scrollLeft());
                    } else {
                        vehiclePanel.scrollTop(scrollTop);
                        previousScrollTop = scrollTop;
                    }
                };
                timeLinePanel.on('scroll', handler);
                scope.$on('$destroy', function () {
                    return timeLinePanel.off('scroll', handler);
                });
            }
        };
    }
    ])
    .directive('timeline', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, elem, attrs) {
                var workStartTime = scope.vehicle.workStartTime,
                    workEndTime = scope.vehicle.workEndTime,
                    runs = scope.vehicle.schedule.runs,
                    runsEls = elem.children(".run");
                var offDutyLeft = elem.children(":first");
                var offDutyRight = elem.children(":last");

                if (scope.vehicle.schedule.runs.length > 0) {
                    workStartTime = Math.min(workStartTime, runs[0].loadingStartTime);
                    workEndTime = Math.max(workEndTime, runs[runs.length - 1].returnEndTime);
                }
                scope.$watch('millsInPx', function () {
                    var diff = 1;
                    if (workStartTime < runs[0].loadingStartTime) {
                        offDutyLeft.next().css({
                            'width': $rootScope.calculateWidth(workStartTime, runs[0].loadingStartTime),
                            'background': 'initial',
                            'margin': '0'
                        });
                        diff = 0;
                    }
                    offDutyLeft[0].style.width = $rootScope.calculateWidth(scope.$parent.minScheduleTime, workStartTime) - diff + "px";

                    diff = 1;
                    if (workEndTime > runs[runs.length - 1].returnEndTime) {
                        offDutyRight.prev().css({
                                'width': $rootScope.calculateWidth(runs[runs.length - 1].returnEndTime, workEndTime),
                                'background': 'initial',
                                'margin': '0'
                            });
                        diff = 0;
                    }
                    offDutyRight[0].style.width = $rootScope.calculateWidth(workEndTime, scope.$parent.maxScheduleTime) - diff + "px";

                    elem[0].style.width = $rootScope.calculateWidth(scope.$parent.minScheduleTime, scope.$parent.maxScheduleTime) + "px";
                });
            }
        };
    }
    ])
    .directive('run', ['$rootScope', '$compile', '$templateCache', function ($rootScope, $compile, $templateCache) {
        return {
            template: $templateCache.get('runTpl'),
            link: function (scope, elem) {

                var setSpreaderSize = function(spreader, leftWidth, rightWidth) {
                    spreader.style.width = leftWidth + rightWidth + 2 + "px";
                    spreader.style.marginLeft = -leftWidth + "px";
                    spreader.style.marginRight = -rightWidth + "px";
                };

                var calculateOrderWidth = function(order) {
                    return $rootScope.calculateWidth(order.startTime, order.endTime);
                };

                scope.$watch('millsInPx', function () {
                    /* calculate run header and footer width*/
                    var headerWidth = $rootScope.calculateWidth(scope.run.loadingStartTime, scope.run.loadingEndTime);
                    var footerWidth = $rootScope.calculateWidth(scope.run.returnStartTime, scope.run.returnEndTime);
                    elem.children(":first")[0].style.width = headerWidth - 2 + "px";
                    elem.children(":last")[0].style.width = footerWidth - 2 + "px";

                    /* calculate run spreaders size*/
                    var spreaders = elem.children(".spreader");
                    var firstOrderWidth = calculateOrderWidth(scope.run.orders[0]);
                    setSpreaderSize(spreaders[0], headerWidth / 2, firstOrderWidth / 2);
                    for (var i = 1; i < scope.run.orders.length; i++) {
                        var prevOrderWidth = calculateOrderWidth(scope.run.orders[i - 1]);
                        var nextOrderWidth = calculateOrderWidth(scope.run.orders[i]);
                        setSpreaderSize(spreaders[i], prevOrderWidth / 2, nextOrderWidth / 2);
                    }
                    var lastOrderWidth = calculateOrderWidth(scope.run.orders[scope.run.orders.length - 1]);
                    setSpreaderSize(spreaders[spreaders.length - 1], footerWidth / 2, lastOrderWidth / 2);

                    // run width
                    elem[0].style.width = $rootScope.calculateWidth(scope.run.loadingStartTime, scope.run.returnEndTime) - 2 + "px";
                });
            }
        };
    }
    ])
    .directive('scheduledOrder', ['$rootScope', '$templateCache', function ($rootScope, $templateCache) {
        return {
            link: function (scope, elem, attrs) {
                scope.$watch('millsInPx', function () {
                    var width = $rootScope.calculateWidth(scope.order.startTime, scope.order.endTime) - 2;
                    elem[0].style.width = width + "px";
                });
            }
        };
    }
    ]);