import * as React from 'react';
import { IPersonState } from './State';
import { IValidation } from './Validation/IValidation';
import { PersonValidation } from './Validation/PersonValidation';
import { AddressValidation } from './Validation/AddressValidation';
import { PhoneValidation } from './Validation/PhoneValidation';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

interface IValidationProps {
    CurrentState: IPersonState;
    CanSave: (canSave: boolean) => void;
}

export default class FormValidation extends React.Component<IValidationProps> {
    private failures: Array<string> = [];
    private validation: Array<IValidation>;

    constructor(props: IValidationProps) {
        super(props);
        this.validation = new Array<IValidation>();
        this.validation.push(new PersonValidation());
        this.validation.push(new AddressValidation());
        this.validation.push(new PhoneValidation());
    }

    private Validate() {
        this.failures = new Array<string>();
        this.validation.forEach(validation => {
            validation.Validate(this.props.CurrentState, this.failures);
        });

        this.props.CanSave(this.failures.length === 0);
    }

    public render() {
        this.Validate();
        const errors = this.failures.map(function it(failure) {
           return (
               <Row key={failure}>
                   <Col>
                       <label>{failure}</label>
                   </Col>
               </Row>
           );
        });
        return (
            <Col>{errors}</Col>
        );
    }
}
