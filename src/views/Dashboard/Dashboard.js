import React, {Component} from 'react';
import UserList from "../../Components/Users";
import Row from "reactstrap/es/Row";
import Queues from "../../Components/Queues";
import Switches from "../../Components/Switches";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {

    return (
      <Row>
        {localStorage.getItem('token')}
        <UserList/>
        <Queues/>
        <Switches/>
      </Row>
    );
  }
}

export default Dashboard;
