import React from 'react';
import axios from 'axios';
import {Card, CardHeader, Col} from "reactstrap";
import {AppSwitch} from "@coreui/react";
import Container from "reactstrap/es/Container";
import Spinner from "reactstrap/es/Spinner";

export default class Switches extends React.Component {
  state = {
    queues: [],
    loading: true
  };

  button;

  componentDidMount() {

    getSwitches().then(res => {
        const queues = res.data;
        this.setState({queues, loading: false});
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <Col sm={6} xs={12} lg={2}>
          <Card className={Card}>
            <CardHeader><i className="fa fa-exchange fa-lg"/>Omskiftere</CardHeader>
            <Spinner/>
          </Card>
        </Col>
      )
    } else {
      return (
        <Col sm={6} xs={12} lg={2}>
          <Card className={Card}>
            <CardHeader><i className="fa fa-exchange fa-lg"/>Omskiftere</CardHeader>
            {
              this.state.queues.map(function (item) {

                let button;
                if(item.active) {
                  button = <AppSwitch onClick={patchSwitch(item.switchID,!item.active).then(value => {getSwitch(item.switchID).then(value1 => {const queues = value1.data;this.setState({queues, loading: false});})})} className={'mx-1'} color={'primary'} label checked/>
                } else {
                  button = <AppSwitch onClick={patchSwitch(item.switchID,!item.active).then(value => {getSwitch(item.switchID).then(value1 => {const queues = value1.data;this.setState({queues, loading: false});})})} className={'mx-1'} color={'primary'} label />
                }
                return (

                  <Container>
                    <h1>{item.switchID}</h1>
                    {button}
                  </Container>
                );
              })
            }
          </Card>
        </Col>
      )
    }
  };
}

function getSwitches() {
  return axios.get(`https://api.everconnect.dk/manager/v1/switches`, {
    headers: {
      'X-Token': 'papa',
      'Content-Type': 'application/json'
    }, data: {}
  })
}

function getSwitch(switchID) {
  return axios.get(`https://api.everconnect.dk/manager/v1/switch/` + switchID, {
    headers: {
      'X-Token': 'papa',
      'Content-Type': 'application/json'
    }, data: {}
  })
}

function patchSwitch(switchID,active) {
  return axios.patch(`https://api.everconnect.dk/manager/v1/switch/` + switchID, {
    headers: {
      'X-Token': 'papa',
      'Content-Type': 'application/json'
    }, data: {
      active
    }
  })
}
