import React from 'react';
import axios from 'axios';
import {Card, CardHeader, Col, Table} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import {ScaleLoader} from "react-spinners";
import ReactHowler from 'react-howler';
import Button from "reactstrap/es/Button";
import base64 from "base-64/base64";

export default class Voicemails extends React.Component {
  state = {
    voicemailBoxes: [],
    loading: true
  };

  componentDidMount() {
    const self = this;
    getVoicemailBoxes()
      .then(res => {
        const data = res.data.map(function (voicemailBox) {
          let voicemailBoxes = {};
          if (voicemailBox.voicemailCount > 0) {
            voicemailBoxes.voicemailBox = voicemailBox.voicemailBox;
            Object.keys(voicemailBox).forEach(folder => {
              if (folder !== 'voicemailBox' && folder !== 'voicemailCount') {
                const realFolder = folder.replace('Count', '');
                voicemailBoxes.voicemailFolders = [];
                getVoicemailFolder(voicemailBox.voicemailBox, realFolder).then(value => {
                  voicemailBoxes.voicemailFolders.push({voicemailFolder: realFolder, voicemails: value.data});
                  self.setState({loading: false, voicemailBoxes: data});
                })
              }
            });
          }
          return voicemailBoxes;
        });


      });
  };

  render() {
    if (this.state.loading) {
      return (
        <Col sm={12} xs={12} lg={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"/>Beskeder
            </CardHeader>
            <CardBody><ScaleLoader height={12} width={2}/></CardBody>
          </Card>
        </Col>
      )
    } else {
      return (
        <Col sm={12} xs={12} lg={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"/> Beskeder
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th>Fra nummer</th>
                  <th>Til nummer</th>
                  <th>Modtaget</th>
                  <th>Varighed</th>
                  <th>Aflyt</th>
                  <th>Slet</th>
                </tr>
                </thead>
                {
                  this.state.voicemailBoxes.map(function (voicemailBox) {
                    if (typeof voicemailBox.voicemailBox !== 'undefined') {
                      return (
                        <tbody key={voicemailBox.voicemailBox}>
                        <tr>
                          <th>{voicemailBox.voicemailBox}</th>
                        </tr>
                        {
                          voicemailBox.voicemailFolders.map(function (voicemailFolder) {
                            return (
                              voicemailFolder.voicemails.map(function (voicemail) {
                                {
                                  console.log(voicemail)
                                }
                                return (
                                  <tr key={voicemail.voicemailID}>
                                    <td>{voicemail.bNumber}</td>
                                    <td>{voicemail.aNumber}</td>
                                    <td>{voicemail.received}</td>
                                    <td>{voicemail.duration + 's'}</td>
                                    <td>
                                      <Button>
                                        <i className="fa fa-play "/>
                                      </Button>
                                    </td>
                                    <td>
                                      <Button className={'btn btn-danger'}>
                                        <i className="fa fa-trash"/>
                                      </Button>
                                    </td>
                                  </tr>
                                )

                              }))
                          })
                        }
                        </tbody>

                      );
                    } else {
                      return null;
                    }
                  })
                }
              </Table>
            </CardBody>
          </Card>
        </Col>
      )
    }

  };
}

function getVoicemailBoxes() {
  return axios.get(`https://api.everconnect.dk/manager/v1/voicemailBoxes`, {
    headers: {
      'X-Token': 'papa',
      'Content-Type': 'application/json'
    }, data: {}

  })
}

function getVoicemailFolder(voicemailBox, voicemailFolder) {
  return axios.get(`https://api.everconnect.dk/manager/v1/voicemailBox/${voicemailBox}/${voicemailFolder}`, {
    headers: {
      'X-Token': 'papa',
      'Content-Type': 'application/json'
    }, data: {}

  })
}

function getVoicemailWAV(voicemailBox, voicemailFolder, voicemailID) {
  return axios.get(`https://api.everconnect.dk/manager/v1/voicemailBox/${voicemailBox}/${voicemailFolder}/${voicemailID}`, {
    headers: {
      'X-Token': 'papa',
      'Content-Type': 'audio/wav'
    }, data: {}

  })
}
