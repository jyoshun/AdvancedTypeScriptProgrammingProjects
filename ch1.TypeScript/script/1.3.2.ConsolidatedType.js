"use strict";
/*! *****************************************************************************
交叉类型
***************************************************************************** */
class Grid {
    constructor() {
        this.Width = 0;
        this.Height = 0;
        this.Padding = 0;
    }
}
class Margin {
    constructor() {
        this.Left = 0;
        this.Top = 0;
        this.Width = 10;
        this.Height = 20;
    }
}
/**
 * 返回交叉类型
 */
function ConsolidatedGrid(grid, margin) {
    var _a;
    let consolidatedGrid = {};
    consolidatedGrid.Width = grid.Width + margin.Width;
    consolidatedGrid.Height = grid.Height + margin.Height;
    consolidatedGrid.Left = margin.Left;
    consolidatedGrid.Top = margin.Top;
    consolidatedGrid.Padding = (_a = margin.Padding) !== null && _a !== void 0 ? _a : grid.Padding;
    return consolidatedGrid;
}
//# sourceMappingURL=1.3.2.ConsolidatedType.js.map