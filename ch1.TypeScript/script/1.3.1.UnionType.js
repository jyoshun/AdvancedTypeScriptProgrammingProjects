"use strict";
/*! *****************************************************************************
联合类型
***************************************************************************** */
/**
 * 基础校验, 指定目标区间的最小值和最大值.
 */
class RangeValidationBase {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    RangeCheck(value) {
        return value >= this.start && value <= this.end;
    }
    GetNumber(value) {
        return Number(value).valueOf();
    }
}
/**
 * 提供两种函数, 分别接受一种类型
 */
class SeparateTypeRangeValidation extends RangeValidationBase {
    IsInRangeString(value) {
        return this.RangeCheck(this.GetNumber(value));
    }
    IsInRangeNumber(value) {
        return this.RangeCheck(value);
    }
}
/**
 * 只用一种函数
 */
class AnyRangeValidation extends RangeValidationBase {
    IsInRange(value) {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        else if (typeof value === 'string') {
            return this.RangeCheck(this.GetNumber(value));
        }
        return false;
    }
}
/**
 * 使用联合类型
 */
class UnionRangeValidation extends RangeValidationBase {
    IsInRange(value) {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    }
}
//# sourceMappingURL=1.3.1.UnionType.js.map