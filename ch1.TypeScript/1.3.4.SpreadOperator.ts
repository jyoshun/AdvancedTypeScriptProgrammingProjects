/*! *****************************************************************************
展开运算符
***************************************************************************** */

function ConsolidatedGrid2(grid: Grid, margin: Margin): Grid & Margin {
    // let consolidatedGrid = <Grid & Margin>{...margin};
    let consolidatedGrid = <Grid & Margin>{...margin, ...grid};
    consolidatedGrid.Width += grid.Width;
    consolidatedGrid.Height += grid.Height;
    consolidatedGrid.Padding = margin.Padding ?? grid.Padding;
    return consolidatedGrid;
}
