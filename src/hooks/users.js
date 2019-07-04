import {ManagerAPIGet} from "./mangerAPI";

export function getUsers(token,dependencies) {

  return ManagerAPIGet(`/users`, {headers: {'X-Token': token}},dependencies)
}

export function getUser(token,userID,dependencies) {

  return ManagerAPIGet(`/user/${userID}`, {headers: {'X-Token': token}},dependencies)
}

export function getUserPhones(token,userID,dependencies) {

  return ManagerAPIGet(`/user/${userID}/phones`, {headers: {'X-Token': token}},dependencies)
}
