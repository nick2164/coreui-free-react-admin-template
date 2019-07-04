import React, {Component} from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {authentication} from "../../hooks/authentication";

class Login extends Component {

  state = {
    buttonLogin: <Button
      color='primary'
      className='px-4'
      onClick={() => this.useFunction(44408553, 'papa', 'abc112')}
    >Login</Button>,
  };

  useFunction = (mainNumber, username, password) => {

    this.setState({buttonLogin: 'Loading...', alert: null})

    validateLogin(mainNumber, username, password).then(res => {
        console.log('Before')
      }, res => {
        this.setState({
          buttonLogin: <Button
            color='primary'
            className='px-4'
            onClick={() => this.useFunction('44408553', 'papa', 'abc123')}
          >Login</Button>,
          alert: <Alert color="warning">
            Ingen forbindelse til evercall ApS - Prøv igen senere
          </Alert>
        })
      }
    );
  };

  render() {
    return (
      <div className="app flex-row align-items-center animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              {this.state.alert}
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-phone"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Hovednummer" autoComplete="Hovednummer"/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Brugernavn" autoComplete="username"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Adgangskode" autoComplete="current-password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          {this.state.buttonLogin}
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function validateLogin(mainNumber, username, password) {
  return authentication.postToken(mainNumber, username, password)
}

export default Login;
