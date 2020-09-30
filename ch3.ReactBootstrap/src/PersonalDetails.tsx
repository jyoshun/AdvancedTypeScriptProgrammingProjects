import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { IPersonState } from './State';
import FormValidation from './FormValidation';
import { DataBase } from './Database/DataBase';
import { PersonRecord } from './Types';
import { PersonalDetailsTableBuilder } from './PersonalDetailsTableBuilder';
import { IRecordState, RecordState } from './RecordState';

interface IProps {
    DefaultState: IPersonState;
}

export default class PersonalDetails extends React.Component<IProps, IPersonState> {
    private readonly defaultState: Readonly<IPersonState>;
    private canSave: boolean = false;
    private readonly dataLayer: DataBase<PersonRecord>;
    private people: IPersonState[] = [];

    constructor(props: IProps) {
        super(props);
        this.defaultState = props.DefaultState;
        this.state = props.DefaultState;
        const tableBuilder: PersonalDetailsTableBuilder = new PersonalDetailsTableBuilder();
        this.dataLayer = new DataBase<PersonRecord>(tableBuilder.Build());
    }

    private updateBinding = (event: any) => {
        switch (event.target.id) {
            case 'firstName':
                this.setState({ FirstName: event.target.value });
                break;
            case 'lastName':
                this.setState({ LastName: event.target.value });
                break;
            case 'add1':
                this.setState({ Address1: event.target.value });
                break;
            case 'add2':
                this.setState({ Address2: event.target.value });
                break;
            case 'town':
                this.setState({ Town: event.target.value });
                break;
            case 'country':
                this.setState({ Country: event.target.value });
                break;
            case 'postcode':
                this.setState({ PostCode: event.target.value });
                break;
            case 'phoneNumber':
                this.setState({ PhoneNumber: event.target.value });
                break;
            case 'dateOfBirth':
                this.setState({ DateOfBirth: event.target.value });
                break;
        }
    }

    private userCanSave = (hashErrors: boolean) => {
        this.canSave = hashErrors;
    }

    private loadPeople = () => {
        this.people = new Array<PersonRecord>();
        this.dataLayer.Read().then(people => {
           this.people = people;
           this.setState(this.state);
        });
    }

    private clear = () => {
        this.setState(this.defaultState);
    }

    private delete = (event: any) => {
        const person: string = event.target.value;
        this.DeletePerson(person);
    }
    private async DeletePerson(person: string): Promise<void> {
        const foundPerson = this.people.find((element: IPersonState) => {
           return element.PersonId === person;
        });
        if (!foundPerson) {
            return;
        }

        const personState: IRecordState = new RecordState();
        personState.IsActive = false;
        const state: PersonRecord = {
            ...foundPerson,
            ...personState,
        }
        await this.dataLayer.Update(state);
        this.loadPeople();
        this.clear();
    }

    private savePerson = () => {
        if (!this.canSave) {
            alert('Cannot save this record with missing or incorrect items');
            return;
        }
        const personState: IRecordState = new RecordState();
        personState.IsActive = true;
        const state: PersonRecord = {
            ...this.state,
            ...personState,
        }
        if (state.PersonId === '') {
            state.PersonId = Date.now().toString();
            this.dataLayer.Create(state);
            this.loadPeople();
            this.clear();
        } else {
            this.dataLayer.Update(state)
                .then(() => this.loadPeople());
        }
    }

    private setActive = (event: any) => {
        const person: string = event.target.value;
        const state = this.people.find((element: IPersonState) => {
           return element.PersonId === person;
        });
        if (state) {
            this.setState(state);
        }
    }

    public render() {
        let people = null;
        if (this.people) {
            const copyThis = this;
            people = this.people.map(function it(p) {
                return (
                    <Row key={p.PersonId}>
                        <Col lg="6">
                            <label>{p.FirstName} {p.LastName}</label>
                        </Col>
                        <Col lg="3">
                            <Button value={p.PersonId} color="link" onClick={copyThis.setActive}>
                                Edit
                            </Button>
                        </Col>
                        <Col lg="3">
                            <Button value={p.PersonId} color="link" onClick={copyThis.delete}>
                                Delete
                            </Button>
                        </Col>
                    </Row>
                );
            }, this);
        }
        return (
            <Row>
                <Col lg="8">
                    <Row>
                        <Col>
                            <h4 className="mb-3">Personal details</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="firstName">First name</label>
                        </Col>
                        <Col>
                            <label htmlFor="lastName">Last name</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" id="firstName" className="form-control" value={this.state.FirstName} onChange={this.updateBinding} placeholder="First name"/>
                        </Col>
                        <Col>
                            <input type="text" id="lastName" className="form-control" value={this.state.LastName} onChange={this.updateBinding} placeholder="Last name"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="add1">Address line 1</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" id="add1" className="form-control" value={this.state.Address1} onChange={this.updateBinding} placeholder="Address line 1"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="add2">Address line 2</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" id="add2" className="form-control" value={this.state.Address2!} onChange={this.updateBinding} placeholder="Address line 2"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="town">Town</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" id="town" className="form-control" value={this.state.Town} onChange={this.updateBinding} placeholder="Town"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="country">Country</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" id="country" className="form-control" value={this.state.Country} onChange={this.updateBinding} placeholder="Country"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3">
                            <label htmlFor="postcode">Postal/ZipCode</label>
                        </Col>
                        <Col lg="4">
                            <label htmlFor="phoneNumber">Phone number</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" id="postcode" className="form-control" value={this.state.PostCode} onChange={this.updateBinding}/>
                        </Col>
                        <Col>
                            <input type="text" id="phoneNumber" className="form-control" value={this.state.PhoneNumber} onChange={this.updateBinding}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="dateOfBirth">Date of birth</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" id="dateOfBirth" className="form-control" value={this.state.DateOfBirth!} onChange={this.updateBinding}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button siez="lg" color="success" onClick={this.savePerson}>
                                Save
                            </Button>
                        </Col>
                        <Col>
                            <Button siez="lg" color="secondary" onClick={this.clear}>
                                Clear
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <FormValidation CurrentState={this.state} CanSave={this.userCanSave}/>
                    </Row>
                </Col>
                <Col>
                    <Col>
                        <Row>
                            <Col>{people}</Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                                <Button siez="lg" color="success" onClick={this.loadPeople}>
                                    Load
                                </Button>
                            </Col>
                            <Col lg="6">
                                <Button siez="lg" color="info" onClick={this.clear}>
                                    New Person
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        );
    }
}
