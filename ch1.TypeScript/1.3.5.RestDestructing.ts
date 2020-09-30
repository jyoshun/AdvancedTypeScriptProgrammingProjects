/*! *****************************************************************************
REST解构对象
***************************************************************************** */

let guitar =  {
    manufacturer: 'Ibanez',
    type: 'Jem 777',
    strings: 6,
};

// let { manufacturer, type, strings } = guitar;
// let { manufacturer: maker, type, strings } = guitar;
let { manufacturer, ...details } = guitar;

const instruments = [ 'Guitar', 'Violin', 'Oboe', 'Drums' ];

// let [ gtr, violin, oboe, drums ] = instruments;
let [ gtr, ...instrumentslice ] = instruments;
