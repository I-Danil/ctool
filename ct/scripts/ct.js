/**
 * Created by Danil on 12.02.14.
 */

'use strict';

var GlobalConfig = {
    locale: "ru",
    getTranslations: function (locale) {
        switch (locale) {
            case TranslationsRU.LOCALE.id:
                return TranslationsRU;
            default:
                return TranslationsEN;
        }
    }
};

angular.module("ct", [
        'ct.filters',
        'ct.services',
        'ct.directives',
        'ct.controllers',
        'ui.bootstrap',
        'pascalprecht.translate',
        'ct.templates'
    ])
    .config(['$translateProvider', '$locationProvider', '$provide', function ($translateProvider, $locationProvider, $provide) {
        $locationProvider.html5Mode(true);
        $translateProvider.translations(TranslationsEN.LOCALE.id, TranslationsEN);
        $translateProvider.translations(TranslationsRU.LOCALE.id, TranslationsRU);
        $translateProvider.preferredLanguage(GlobalConfig.locale);
        $translateProvider.fallbackLanguage(TranslationsEN.LOCALE.id);
    }]);

angular.module("ngLocale", [], ["$provide", function ($provide) {
    $provide.value("$locale", GlobalConfig.getTranslations(GlobalConfig.locale).LOCALE);
}]);

var DateTimeConstant = {
    MILLISECONDS_IN_MINUTE: 60000,
    MILLISECONDS_IN_HOUR: 3600000,
    MILLISECONDS_IN_DAY: 86400000
};




