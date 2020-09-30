import * as React from 'react';
import Container from 'reactstrap/lib/Container';
import './App.css';
import PersonalDetails from './PersonalDetails';
import { IPersonState } from './State';

export default class App extends React.Component {
  private defaultPerson: IPersonState = {
    FirstName: '',
    LastName: '',
    Address1: '',
    Address2: null,
    Town: '',
    Country: '',
    PhoneNumber: '',
    PostCode: '',
    DateOfBirth: new Date().toISOString().substring(0, 10),
    PersonId: '',
  }

  public render() {
    return (
        <Container>
          <PersonalDetails DefaultState={this.defaultPerson}/>
        </Container>
    )
  }
}
