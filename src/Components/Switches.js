import React from 'react';
import axios from 'axios';
import {Card, CardGroup, CardHeader, Col} from "reactstrap";
import Widget02 from "../views/Widgets/Widget02";
import {AppSwitch} from "@coreui/react";
import CardBody from "reactstrap/es/CardBody";
import Container from "reactstrap/es/Container";

export default class Switches extends React.Component {
  state = {
    queues: []
  };

  componentDidMount() {
    axios.get(`https://api.everconnect.dk/manager/v1/switches`, {
      headers: {
        'X-Token': 'papa',
        'Content-Type': 'application/json'
      }, data: {}

    })
      .then(res => {
        const queues = res.data;
        this.setState({queues});
      });
  };

  render() {
    return (
      <Col sm={6} xs={12} lg={2}>
        <Card className={Card}>
          <CardHeader><i className="fa fa-exchange fa-lg"/>Omskiftere</CardHeader>
          {
            this.state.queues.map(function (item) {

              return (
                <Container>
                  <h1>{item.switchID}</h1>
                  <AppSwitch className={'mx-1'} color={'primary'} label checked />
                </Container>
              );
            })
          }
        </Card>
      </Col>
    )
  };
}
