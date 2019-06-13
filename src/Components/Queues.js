import React from 'react';
import axios from 'axios';
import {Card, CardGroup, CardHeader, Col} from "reactstrap";
import Widget02 from "../views/Widgets/Widget02";
import CardBody from "reactstrap/es/CardBody";
import {ScaleLoader} from "react-spinners";

export default class Queues extends React.Component {
  state = {
    queues: [],
    loading: true
  };

  componentDidMount() {
    axios.get(`https://api.everconnect.dk/manager/v1/queues`, {
      headers: {
        'X-Token': 'papa',
        'Content-Type': 'application/json'
      }, data: {}

    })
      .then(res => {
        const queues = res.data;
        this.setState({queues, loading: false});
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <Col sm={6} xs={12} lg={5}>
          <Card>
            <CardHeader><i className="fa fa-users fa-lg"/>Køer</CardHeader>
            <CardBody><ScaleLoader height={12} width={2}/></CardBody>
          </Card>
        </Col>
      )
    } else {
      return (
        <Col sm={6} xs={12} lg={5}>
          <Card>
            <CardHeader><i className="fa fa-users fa-lg"/>Køer</CardHeader>
            {
              this.state.queues.map(function (item) {
                let memberCount;
                switch (item.members.length) {
                  case 1:
                    memberCount = 'medlem';
                    break;
                  default:
                  case 0:
                    memberCount = 'medlemmer';
                    break;
                }

                return (
                  <CardGroup  key={item.queueID}>
                    <Widget02 icon="fa fa-users"
                              value="25"
                              header={`${item.queueID} - ${item.description}`}
                              mainText={`${item.members.length} ${memberCount}`}>New Clients</Widget02>
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
