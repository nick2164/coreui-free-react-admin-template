import axios from "axios";

let axiosConfig;

function setConfig(token) {
  axiosConfig = {
    headers: {
      'X-Token': token,
      'Content-Type': 'application/json'
    }, data: {}
  }
}

const basePath = 'https://api.everconnect.dk/manager/v1';

export async function getUsers(token) {

  setConfig(token);
  try {

    const res = await axios.get(`${basePath}/users`, axiosConfig);

    return res.data;
  } catch (e) {
    // This is just a hypothetical utility function to display a toast
    // notification to the user in the event of an error.
    console.log(e)
  }
}

export async function handleClickGetOneUser(userId,token) {
  setConfig(token);
  try {

    const res = await axios.get(`${basePath}/users`, axiosConfig);

    return res.data;
  } catch (e) {
    console.log(e)
  }
}
