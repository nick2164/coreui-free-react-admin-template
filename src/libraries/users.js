import axios from "axios";
import managerAPI from "./mangerAPI";

export function getUsers(token) {
    return axios.get(managerAPI.URL + `/users`, managerAPI.setConfig(token, active));
}
