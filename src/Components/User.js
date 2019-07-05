import React, {useEffect, useState} from 'react';
import {CardGroup} from "reactstrap";
import Widget02 from "./CoreUI/Widgets/Widget02";
import UserPhones from "./UserPhones";

const User = props => {

  const [color, setColor] = useState('');

  useEffect(() => {
    switch (props.user.presence.suggestedIconDescription) {
      case 'available':
        setColor('success');
        break;
      case 'away':
        setColor('warning');
        break;
      case 'busy':
        setColor('danger');
        break;
      case 'working-from-home':
        setColor('primary');
        break;
      default:
        setColor('info');
        break;
    }
  },[]);

  return (
    <React.Fragment>
      {
        <CardGroup key={props.user.userID}>
          <Widget02 icon="fa fa-user-o" color={color} header={`${props.user.firstName + " " + props.user.lastName}`}
                    value="25"
                    mainText={props.user.presence.statusName}>New Clients</Widget02>

        </CardGroup>
      }

    </React.Fragment>
  )

};

export default React.memo(User);
