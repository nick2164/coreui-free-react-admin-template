import React, {Component} from 'react';
import UserList from "../../Components/UserList";
import Row from "reactstrap/es/Row";
// import Queues from "../../Components/Queues";
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
        <UserList sm={12} xs={12} lg={8} xl={9} md={9}/>
        {/*<Queues/>*/}
        <Switches/>
      </Row>
    );
  }
}

export default Dashboard;
