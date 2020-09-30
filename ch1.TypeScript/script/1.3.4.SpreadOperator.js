"use strict";
/*! *****************************************************************************
展开运算符
***************************************************************************** */
function ConsolidatedGrid2(grid, margin) {
    var _a;
    // let consolidatedGrid = <Grid & Margin>{...margin};
    let consolidatedGrid = Object.assign(Object.assign({}, margin), grid);
    consolidatedGrid.Width += grid.Width;
    consolidatedGrid.Height += grid.Height;
    consolidatedGrid.Padding = (_a = margin.Padding) !== null && _a !== void 0 ? _a : grid.Padding;
    return consolidatedGrid;
}
//# sourceMappingURL=1.3.4.SpreadOperator.js.map