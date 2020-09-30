import { IPersonState } from '../State';

export interface IValidation {
    Validate(state: IPersonState, errors: Array<string>): void;
}
