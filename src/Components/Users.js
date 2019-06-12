import React from 'react';
import axios from 'axios';
import {Card, CardGroup, CardHeader, Col} from "reactstrap";
import Widget02 from "../views/Widgets/Widget02";
import Container from "reactstrap/es/Container";

export default class UserList extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get(`https://api.everconnect.dk/manager/v1/users`, {
      headers: {
        'X-Token': 'papa',
        'Content-Type': 'application/json'
      }, data: {}

    })
      .then(res => {
        const users = res.data;
        this.setState({users});
      });
  };

  render() {
    return (
      <Col sm={6} xs={12} lg={5}>
        <Card>
          <CardHeader><i className="fa fa-address-book fa-lg"/>Medarbejdere</CardHeader>
          {
            this.state.users.map(function (item) {
              let color = '';
              switch (item.presence.suggestedIconDescription) {
                case 'available':
                  color = 'success';
                  break;
                case 'away':
                  color = 'warning';
                  break;
                case 'busy':
                  color = 'danger';
                  break;
                case 'working-from-home':
                  color = 'primary';
                  break;
                default:
                  color = 'info';
                  break;
              }

              return (
                <CardGroup>
                  <Widget02 icon="fa fa-user-o" color={color} header={`${item.firstName + " " + item.lastName}`}
                            value="25"
                  mainText={item.presence.statusName}>New Clients</Widget02>
                </CardGroup>
              );
            })
          }
        </Card>
      </Col>
    )
  };
}
