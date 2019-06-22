import React, {Component} from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import authentication from "../../hooks/authentication";
import Redirect from "react-router-dom/es/Redirect";

class Login extends Component {

  state = {
    buttonLogin: <Button
      color='primary'
      className='px-4'
      onClick={() => this.loginHandler()}
    >Login</Button>,
    redirect: false,
    mainNumber: '',
    username: '',
    password: '',
  };

  setUsername(event) {
    this.setState({username: event.target.value});
  }

  setMainNumber(event) {
    this.setState({mainNumber: event.target.value});
  }

  setPassword(event) {
    this.setState({password: event.target.value});
  }

  loginHandler = () => {

    validateLogin(this.state.mainNumber, this.state.username, this.state.password).then(res => {

        this.setState({buttonLogin: 'Loading...', alert: null});

        localStorage.setItem('token', res.data.token);
        this.setState({redirect: true});


      }, res => {
        this.setState({
          buttonLogin: <Button
            color='primary'
            className='px-4'
            onClick={() => this.loginHandler()}
          >Login</Button>,
          alert: <Alert color="warning">
            Ingen forbindelse til evercall ApS - Prøv igen senere
          </Alert>
        })
      }
    );
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/target'/>
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center animated fadeIn">
        <Container>
          {this.renderRedirect()}
          <Row className="jusInputtify-content-center">
            <Col md="5">
              {this.state.alert}
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <form onSubmit={this.loginHandler}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-phone"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="text" className={'form-control'} placeholder="Hovednummer"
                               value={this.state.mainNumber}
                               autoComplete="Hovednummer" onChange={this.setMainNumber.bind(this)}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="text" className={'form-control'} placeholder="Brugernavn" autoComplete="username"
                               value={this.state.username}
                               onChange={this.setUsername.bind(this)}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="password" className={'form-control'} placeholder="Adgangskode"
                               value={this.state.password}
                               autoComplete="current-password" onChange={this.setPassword.bind(this)}/>
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
