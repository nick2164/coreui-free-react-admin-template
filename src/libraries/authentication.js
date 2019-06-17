import axios from "axios";
import managerAPI from "./mangerAPI";

export default class authentication {
  static getToken(mainNumber, username, password) {
    return axios.get(managerAPI.URL + `/token`, managerAPI.setConfig(null, null, {
        'X-MainNumber': mainNumber,
        'X-Username': username,
        'X-Password': password
      })
    )
  }
}
