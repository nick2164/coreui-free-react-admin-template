import axios from "axios";
import managerAPI from "./mangerAPI";
import {managerAPIGet} from "./managerAPIGet";

export function getUsers(token) {

  managerAPIGet('');

  //  return axios.get(managerAPI.URL + `/users`, managerAPI.setConfig(token, active));
}
