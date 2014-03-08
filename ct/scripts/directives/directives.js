/**
 * Created by Danil on 04.02.14.
 */

'use strict';

/* Directives */

angular.module('ct.directives', [])
    .directive('ctLayout', [function () {
        return {
            link: function (scope, elem, attrs) {
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
            link: function (scope, elem, attrs) {
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
            link: function (scope, elem, attrs) {
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
            link: function (scope, elem, attrs) {
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
            link: function (scope, elem, attrs) {
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
                link: function (scope, elem, attrs) {
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
    .directive('fixedScroll', [
        '$rootScope', '$templateCache', function ($rootScope, $templateCache) {
            return {
                link: function (scope, elem, attrs) {
                    var previousScroll = 0;
                    var children = elem.find(".vehicle");
                    var handler = function () {
                        var scrollLeft = elem.scrollLeft();
                        if (scrollLeft == previousScroll) return;
                        previousScroll = scrollLeft;
                        scope.style = {left: scrollLeft};
                        scope.$digest();
                    };
                    elem.on('scroll', handler);
                    scope.$on('$destroy', function () {
                        return elem.off('scroll', handler);
                    });
                }
            };
        }
    ])
    .directive('vehicle', [
        '$rootScope', '$templateCache', function ($rootScope, $templateCache) {
            return {
                template: $templateCache.get('vehicleTpl'),
                link: function (scope, elem, attrs) {
                }
            };
        }
    ])
    .directive('timescale', [
        '$rootScope', '$templateCache', '$filter', function ($rootScope, $templateCache, $filter) {
            return {
                template: $templateCache.get('timescaleTpl'),
                link: function (scope, elem, attrs) {
                    var dayStart = new Date(),
                        timescaleElement = elem.find('#timescale_content'),
                        timescaleDateElement = elem.find('#timescale_date_content');

                    scope.$watch("timescale", function (value) {
                        rescale(value.minTime, value.maxTime, value.zoom, elem.width());
                    });

                    var hours, pxsPerHour, timescaleWidth, stepPx, days, dayStep, millsPerPx,
                        c, timescale_value, width, curDate, timescale_date;
                    var rescale = function (minTime, maxTime, scale, visibleWidth) {
                        hours = (maxTime - minTime) / DateTimeConstant.MILLISECONDS_IN_HOUR;
                        pxsPerHour = visibleWidth / scale;
                        timescaleWidth = pxsPerHour * hours;
                        timescaleElement.html("");
                        timescaleDateElement.html("");
                        timescaleElement.width(timescaleWidth);
                        timescaleDateElement.width(timescaleWidth);
                        dayStart.setUTCHours(0, 0, 0, 0);
                        millsPerPx = DateTimeConstant.MILLISECONDS_IN_HOUR / pxsPerHour;
                        days = hours / 24;
                        dayStep = scale / 2;
                        var hourStep = 1;
                        if (scale == 24) {
                            hourStep = 2;
                        } else if (scale == 48) {
                            hourStep = 4;
                        }
                        stepPx = (hourStep * DateTimeConstant.MILLISECONDS_IN_HOUR / millsPerPx);
                        var dayPx = scale / hourStep * stepPx / 2;
                        for (var x = 0; x < days; x++) {
                            for (var y = 0; y < 24; y++) {
                                if (y % hourStep != 0) continue;
                                c = 255 - (y * 3);
                                $("<div class='timescale_value' " +
                                    "style='width:" + stepPx + "px; color: rgb(0,0,0); background-color: rgb(" + c + "," + c + "," + c + ")'>" +
                                    "&nbsp;" + y + "<span class='timescale_minutes'>00</span></div>").appendTo(timescaleElement);

                                if (y % dayStep != 0) continue;
                                curDate = new Date(minTime + (new Date().getTimezoneOffset() * DateTimeConstant.MILLISECONDS_IN_MINUTE) + (((x * 24 ) + y) * DateTimeConstant.MILLISECONDS_IN_HOUR));
                                var style = "";
                                if (y == 0) {
                                    style += "border-left:1px solid black";
                                }
                                $("<div class='timescale_date' style='width:" + dayPx + "px;" + style + "'>" + $filter('date')(curDate, "dd MMMM (EEE)") + "</div>").appendTo(timescaleDateElement);
                            }
                        }
                    };
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
    ]);