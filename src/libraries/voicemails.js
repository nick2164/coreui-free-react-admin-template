import axios from "axios";
import managerAPI from "./mangerAPI";

export function getVoicemailBoxes(token) {
  return axios.get(`https://api.everconnect.dk/manager/v1/voicemailBoxes`, managerAPI.setConfig(token, {}))
}

export function getVoicemailFolder(token,voicemailBox, voicemailFolder) {
  return axios.get(`https://api.everconnect.dk/manager/v1/voicemailBox/${voicemailBox}/${voicemailFolder}`, managerAPI.setConfig(token, {}))
}

export function getVoicemailWAV(token,voicemailBox, voicemailFolder, voicemailID) {
  return axios.get(`https://api.everconnect.dk/manager/v1/voicemailBox/${voicemailBox}/${voicemailFolder}/${voicemailID}`, managerAPI.setConfig(token, {}))
}
