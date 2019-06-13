import React from 'react';
import axios from 'axios';
import {Card, CardGroup, CardHeader, Col} from "reactstrap";
import Widget02 from "../views/Widgets/Widget02";
import CardBody from "reactstrap/es/CardBody";
import {ScaleLoader} from "react-spinners";

export default class UserList extends React.Component {
  state = {
    users: [],
    loading: true

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
        this.setState({users, loading: false});
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <Col sm={6} xs={12} lg={5}>
          <Card key={'lol'}>
            <CardHeader><i className="fa fa-address-book fa-lg"/>Medarbejdere</CardHeader>
            <CardBody><ScaleLoader height={12} width={2}/></CardBody>

          </Card>
        </Col>
      )
    } else {
      return (
        <Col sm={6} xs={12} lg={5}>
          <Card key={'lol'}>
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
                  <CardGroup key={item.userID}>
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
    }

  };
}
