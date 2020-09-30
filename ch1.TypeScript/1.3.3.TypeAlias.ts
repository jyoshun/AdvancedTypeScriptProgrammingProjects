/*! *****************************************************************************
类型别名
***************************************************************************** */

type StringOrNumber = string | number;

class UnionRangeValidationWithTypeAlias extends RangeValidationBase {
    IsInRange(value: StringOrNumber): boolean {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    }
}

type NullableStringOrNumber = StringOrNumber | null;

let total: StringOrNumber = 0;
if (new UnionRangeValidationWithTypeAlias(0, 100).IsInRange(total)) {
    console.log('This value is in range');
}
