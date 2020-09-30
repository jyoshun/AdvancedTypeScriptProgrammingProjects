/*! *****************************************************************************
交叉类型
***************************************************************************** */

class Grid {
    Width: number = 0;
    Height: number = 0;
    Padding: number = 0;
}

class Margin {
    Left: number = 0;
    Top: number = 0;
    Width: number = 10;
    Height: number = 20;
    Padding?: number;
}

/**
 * 返回交叉类型
 */
function ConsolidatedGrid(grid: Grid, margin: Margin): Grid & Margin {
    let consolidatedGrid = <Grid & Margin>{};
    consolidatedGrid.Width = grid.Width + margin.Width;
    consolidatedGrid.Height = grid.Height + margin.Height;
    consolidatedGrid.Left = margin.Left;
    consolidatedGrid.Top = margin.Top;
    consolidatedGrid.Padding = margin.Padding ?? grid.Padding;
    return consolidatedGrid;
}
