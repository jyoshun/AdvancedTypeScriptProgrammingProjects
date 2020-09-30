"use strict";
/*! *****************************************************************************
REST解构对象
***************************************************************************** */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
let guitar = {
    manufacturer: 'Ibanez',
    type: 'Jem 777',
    strings: 6,
};
// let { manufacturer, type, strings } = guitar;
// let { manufacturer: maker, type, strings } = guitar;
let { manufacturer } = guitar, details = __rest(guitar, ["manufacturer"]);
const instruments = ['Guitar', 'Violin', 'Oboe', 'Drums'];
// let [ gtr, violin, oboe, drums ] = instruments;
let [gtr, ...instrumentslice] = instruments;
//# sourceMappingURL=1.3.5.RestDestructing.js.map