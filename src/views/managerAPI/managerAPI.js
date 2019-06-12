import React, {Component} from 'react';
import axios from 'axios';


const API_URL = 'https://api.everconnect.dk/manager/v1';

class ManagerAPI extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const url = `${API_URL}/users`;
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({users: data});
        console.log(this.state.users)
      })
  }

  render() {

    return (
      <div className="container">
        <div className="col-xs-8">
          <h1>React Axios Example</h1>
          {this.state.users.map((user) => (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {user.email}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

}

export default ManagerAPI;
