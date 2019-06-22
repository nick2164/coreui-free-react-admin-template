import axios from "axios";
import managerAPI from "./mangerAPI";

export default class authentication {
  static postToken(mainNumber, username, password) {
    return axios.post(managerAPI.URL + `/token`, {
        'X-MainNumber': mainNumber,
        'X-Username': username,
        'X-Password': password
      },managerAPI.setConfig(null,null,null)
    )
  }
}
