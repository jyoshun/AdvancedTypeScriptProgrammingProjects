import { IValidation } from './IValidation';
import { MinLengthValidator } from '../Validators/MinLengthValidator';
import { RegularExpressionValidator } from '../Validators/RegularExpressionValidator';
import { IPersonState } from '../State';

export class AddressValidation implements IValidation {
    private static readonly minLength: number = 5;
    private readonly minLengthValidator: MinLengthValidator = new MinLengthValidator(AddressValidation.minLength);

    private readonly zipCodeValidator: RegularExpressionValidator = new RegularExpressionValidator(`^[0-9]{5}(?:-[0-9]{4})?$`);

    public Validate(state: IPersonState, errors: Array<string>): void {
        if (!this.minLengthValidator.IsValid(state.Address1)) {
            errors.push(`Address line 1 must be greater than ${AddressValidation.minLength} characters`);
        }
        if (!this.minLengthValidator.IsValid(state.Town)) {
            errors.push(`Town must be greater than ${AddressValidation.minLength} characters`);
        }
        if (!this.zipCodeValidator.IsValid(state.PostCode)) {
            errors.push('The postal/zip code is invalid');
        }
    }
}
