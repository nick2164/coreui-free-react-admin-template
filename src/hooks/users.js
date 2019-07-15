import {ManagerAPIGet} from "./mangerAPI";
import {loremIpsum} from "lorem-ipsum";

export function get1600FakeUsers(token,depedencies) {

  let list = [];
  const statusName = ['available','away','busy','working-from-home'];

  for (let i = 0; i < 150; i++) {

    let suggestedColor = statusName[Math.floor(Math.random() * statusName.length)];

    list.push(
      {
        "presence": {
          "statusName": suggestedColor,
          "lastChange": "2005-08-15T15:52:01+00:00",
          "suggestedIconDescription": suggestedColor,
          "suggestedColor": "RED",
          "lastSeen": "2005-08-15T15:52:01+00:00"
        },
        "firstName": loremIpsum({count:1,units: "word"}),
        "lastName": loremIpsum({count:1,units: "word"}),
        "email": loremIpsum({count:1,units: "word"}),
        "phoneCount": 0,
        "userID": 0
      }

    );
  }
  return [false, list];

}

export function getUsers(token,dependencies) {

  return ManagerAPIGet(`/users`, {headers: {'X-Token': token}},dependencies)
}

export function getUser(token,userID,dependencies) {

  return ManagerAPIGet(`/user/${userID}`, {headers: {'X-Token': token}},dependencies)
}

export function getUserPhones(token,userID,dependencies) {

  return ManagerAPIGet(`/user/${userID}/phones`, {headers: {'X-Token': token}},dependencies)
}
