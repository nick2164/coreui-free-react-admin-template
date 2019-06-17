import axios from "axios";
import managerAPI from './mangerAPI';

export function getSwitches(token) {
  return axios.get(managerAPI.URL + `/switches`, managerAPI.setConfig(token, {}))
}

export function getSwitch(token, switchID) {
  return axios.get(managerAPI.URL + `/switch/` + switchID, managerAPI.setConfig(token, {}))
}

export function patchSwitch(token, switchID, active) {
  axios.patch(managerAPI.URL + `/switch/` + switchID, managerAPI.setConfig(token, active).then(value => {
      getSwitch(token, switchID).then(value1 => {
        const queues = value1.data;
        this.setState({queues, loading: false});
      })
    })
  )
}
