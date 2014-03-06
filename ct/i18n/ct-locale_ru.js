/**
 * Created by Danil on 10.02.14.
 */

var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
var TranslationsRU = {
    LOCALE: {
        id: "ru",
        DATETIME_FORMATS: {
            DAY: [
                "Воскресенье",
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота"
            ],
            MONTH: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            SHORTDAY: [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ],
            SHORTMONTH: [
                "Янв",
                "Фев",
                "Maр",
                "Апр",
                "Май",
                "Июн",
                "Июл",
                "Авг",
                "Сен",
                "Окт",
                "Ноя",
                "Дек"
            ],
            fullDate: "EEEE, d MMMM y\u00a0'\u0433'.",
            longDate: "d MMMM y\u00a0'\u0433'.",
            medium: "dd.MM.yyyy H:mm:ss",
            mediumDate: "dd.MM.yyyy",
            mediumTime: "H:mm:ss",
            short: "dd.MM.yy H:mm",
            shortDate: "dd.MM.yy",
            shortTime: "H:mm"
        },
        NUMBER_FORMATS: {
            CURRENCY_SYM: "\u0440\u0443\u0431.",
            DECIMAL_SEP: ",",
            GROUP_SEP: "\u00a0",
            PATTERNS: [
                {
                    "gSize": 3,
                    "lgSize": 3,
                    "macFrac": 0,
                    "maxFrac": 3,
                    "minFrac": 0,
                    "minInt": 1,
                    "negPre": "-",
                    "negSuf": "",
                    "posPre": "",
                    "posSuf": ""
                },
                {
                    "gSize": 3,
                    "lgSize": 3,
                    "macFrac": 0,
                    "maxFrac": 2,
                    "minFrac": 2,
                    "minInt": 1,
                    "negPre": "-",
                    "negSuf": "\u00a0\u00a4",
                    "posPre": "",
                    "posSuf": "\u00a0\u00a4"
                }
            ]
        },
        pluralCat: function (n) {
            if (n % 10 == 1 && n % 100 != 11) {
                return PLURAL_CATEGORY.ONE;
            }
            if (n == (n | 0) && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {
                return PLURAL_CATEGORY.FEW;
            }
            if (n % 10 == 0 || n == (n | 0) && n % 10 >= 5 && n % 10 <= 9 || n == (n | 0) && n % 100 >= 11 && n % 100 <= 14) {
                return PLURAL_CATEGORY.MANY;
            }
            return PLURAL_CATEGORY.OTHER;
        }
    },
    clear_schedule: "Очистить расписание",
    today: "Сегодня",
    close: "Закрыть"
};