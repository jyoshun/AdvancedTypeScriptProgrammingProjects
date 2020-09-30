/*! *****************************************************************************
REST参数
***************************************************************************** */

function PrintInstruments(log: string, ...instruments: string[]): void {
    console.log(log);
    instruments.forEach(instrument => {
        console.log(instrument);
    });
}

PrintInstruments('Music Shop Inventory', 'Guitar', 'Drums', 'Clarinet', 'Clavinova');
