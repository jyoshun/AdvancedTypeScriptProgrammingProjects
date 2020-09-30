/*! *****************************************************************************
联合类型
***************************************************************************** */

/**
 * 基础校验, 指定目标区间的最小值和最大值.
 */
class RangeValidationBase {
    constructor(private start: number, private end: number) {}
    protected RangeCheck(value: number) :boolean {
        return value >= this.start && value <= this.end;
    }
    protected GetNumber(value: string): number {
        return Number(value).valueOf();
    }
}

/**
 * 提供两种函数, 分别接受一种类型
 */
class SeparateTypeRangeValidation extends RangeValidationBase {
    IsInRangeString(value: string): boolean {
        return this.RangeCheck(this.GetNumber(value));
    }
    IsInRangeNumber(value: number): boolean {
        return this.RangeCheck(value);
    }
}

/**
 * 只用一种函数
 */
class AnyRangeValidation extends RangeValidationBase {
    IsInRange(value: any): boolean {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        } else if (typeof value === 'string') {
            return this.RangeCheck(this.GetNumber(value));
        }
        return false;
    }
}

/**
 * 使用联合类型
 */
class UnionRangeValidation extends RangeValidationBase {
    IsInRange(value: string | number): boolean {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    }
}
