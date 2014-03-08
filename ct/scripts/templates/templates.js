/**
 * Created by Danil on 18.02.14.
 */

angular.module("ct.templates", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/datepicker/popup.html",
        "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
            "	<li ng-transclude></li>\n" +
            "	<li ng-show=\"showButtonBar\" style=\"padding:10px 0 2px; text-align: center\">\n" +
            "		<span class=\"btn-group\">\n" +
            "			<button type=\"button\" class=\"btn btn-xs btn-info\" ng-click=\"today()\">{{currentText}}</button>\n" +
            "			<button type=\"button\" class=\"btn btn-xs btn-success pull-right\" ng-click=\"isOpen = false\">{{closeText}}</button>\n" +
            "		</span>\n" +
            "	</li>\n" +
            "</ul>\n" +
            "");

    $templateCache.put("unplannedOrderTpl",
        "<span>{{order.name}}</span>"
    );

    $templateCache.put("vehicleTpl",
        "<span ng-click=\"nameClick(vs.vehicle)\">{{vehicle.name}}</span><br>" +
            "<span>Runs-{{vs.schedule.runs.length}}</span>"
    );

    $templateCache.put("timescaleTpl",
        "<div id=\"timescale_date_content\"></div>" +
            "<div id=\"timescale_content\"></div>"
    );
}]);
