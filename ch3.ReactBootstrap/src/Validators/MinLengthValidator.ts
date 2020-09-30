import { IValidator } from './IValidator';
import { StringOrNull } from '../Types';

export class MinLengthValidator implements IValidator<StringOrNull> {
    private readonly minLength: number;

    constructor(minLength: number) {
        this.minLength = minLength;
    }

    public IsValid(input: StringOrNull): boolean {
        if (!input) {
            return false;
        }
        return input.length >= this.minLength;
    }
}
