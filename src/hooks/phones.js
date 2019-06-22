import axios from "axios";
import managerAPI from "./mangerAPI";

export function getPhone(token, phoneNumber) {
    return axios.get(managerAPI.URL + `/Phone/` + phoneNumber, managerAPI.setConfig(token, active));
}
