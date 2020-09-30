import { IValidation } from './IValidation';
import { MinLengthValidator } from '../Validators/MinLengthValidator';
import { IPersonState } from '../State';

export class PersonValidation implements IValidation {
    private static readonly firstNameMinLength: number = 1;
    private static readonly lastNameMinLength: number = 2;
    private readonly firstNameValidator: MinLengthValidator = new MinLengthValidator(PersonValidation.firstNameMinLength);
    private readonly lastNameValidator: MinLengthValidator = new MinLengthValidator(PersonValidation.lastNameMinLength);

    public Validate(state: IPersonState, errors: Array<string>): void {
        if (!this.firstNameValidator.IsValid(state.FirstName)) {
            errors.push(`The first name is a minimum of ${PersonValidation.firstNameMinLength} character`);
        }
        if (!this.lastNameValidator.IsValid(state.LastName)) {
            errors.push(`The last name is a minimum of ${PersonValidation.lastNameMinLength} characters`);
        }
    }
}
