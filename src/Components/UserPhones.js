import React from 'react';
import {getUserPhones} from "../hooks/users";
import Widget02 from "./CoreUI/Widgets/Widget02";

const UserPhones = props => {

  const [isLoading, fetchedData] = getUserPhones('papa', props.user.userID, []);

  return (
    <React.fragment>
      {
        isLoading ? (
          fetchedData.map((phone) => {
            return <Widget02 mainText={phone.phoneNumber} variant="2"/>
          })
        ) : (null)
      }
    </React.fragment>
  )
};

export default React.memo(UserPhones);
