import React from 'react';
import axios from 'axios';
import {Card, CardHeader, Col} from "reactstrap";
import Container from "reactstrap/es/Container";
import {ScaleLoader} from "react-spinners";
import CardBody from "reactstrap/es/CardBody";
import Switch from "react-switch";

export default class Switches extends React.Component {
  state = {
    queues: [],
    loading: true,
    checked: false
  };

  button;

  handleChange(checked) {
    this.setState({ checked });
  }

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
          <Card>
            <CardHeader><i className="fa fa-exchange fa-lg"/>Omskiftere</CardHeader>
            <CardBody><ScaleLoader height={12} width={2}/></CardBody>
          </Card>
        </Col>
      )
    } else {
      return (
        <Col sm={6} xs={12} lg={2}>
          <Card>
            <CardHeader><i className="fa fa-exchange fa-lg"/>Omskiftere</CardHeader>
            {
              this.state.queues.map(function (item) {

                let button;
                button = <Switch
                  onClick={patchSwitch()}
                  checked={item.active}
                  className="react-switch"
                  uncheckedIcon={<div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 15,
                      color: "white",
                      paddingRight: 2
                    }}
                  >fra</div>}
                  checkedIcon={<div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 15,
                      color: "white",
                      paddingRight: 2
                    }}
                  >til</div>}
                />;

                return (

                  <div key={item.switchID}>
                    <h1>{item.switchID}</h1>
                    {button}
                  </div>
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

function patchSwitch(switchID, active) {
  axios.patch(`https://api.everconnect.dk/manager/v1/switch/` + switchID, {
    headers: {
      'X-Token': 'papa',
      'Content-Type': 'application/json'
    }, data: {
      active
    }
  }).then(value => {
    getSwitch(switchID).then(value1 => {
      const queues = value1.data;
      this.setState({queues, loading: false});
    })
  })
}
