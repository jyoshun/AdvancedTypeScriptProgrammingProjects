"use strict";
/*! *****************************************************************************
类型别名
***************************************************************************** */
class UnionRangeValidationWithTypeAlias extends RangeValidationBase {
    IsInRange(value) {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    }
}
let total = 0;
if (new UnionRangeValidationWithTypeAlias(0, 100).IsInRange(total)) {
    console.log('This value is in range');
}
//# sourceMappingURL=1.3.3.TypeAlias.js.map