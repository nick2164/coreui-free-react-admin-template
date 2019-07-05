import React, {useState, useEffect} from 'react';
import {Card, CardHeader, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import {ScaleLoader} from "react-spinners";
import {getUsers} from "../hooks/users";
import User from "./User";
import {Icon, Input} from "semantic-ui-react";

const UserList = props => {

  const [isLoading, fetchedData] = getUsers('papa', []);
  const [viewableUsers, setViewableUsers] = useState([]);

  const viewLoading = (
    <Col sm={9} xs={12} lg={9} xl={9} md={9}>
      <Card key={'lol'}>
        <CardHeader><i className="fa fa-address-book fa-lg"/>Medarbejdere</CardHeader>
        <CardBody><ScaleLoader height={12} width={2}/></CardBody>

      </Card>
    </Col>
  );

  if(JSON.parse(localStorage.getItem('userList')) === null) {
    localStorage.setItem('userList',JSON.stringify([]));
  }

  // Viewable users handler
  useEffect(() => {
    setViewableUsers( JSON.parse(localStorage.getItem('userList') ) );


    if(fetchedData.length > 0) {

      if(JSON.parse(localStorage.getItem('userList') ).length < 1) {

        localStorage.setItem('userList',JSON.stringify(fetchedData));

        setViewableUsers( JSON.parse(localStorage.getItem('userList') ) );

      } else {

        if(localStorage.getItem('userList') !== JSON.stringify(fetchedData)) {

          localStorage.setItem('userList',JSON.stringify(fetchedData));

          setViewableUsers( JSON.parse(localStorage.getItem('userList') ) );

        }
      }

    }

  }, [fetchedData]);

  return (
    <React.Fragment>

      { JSON.parse(localStorage.getItem('userList') ).length < 1 ? (viewLoading) :
        (
          <Col sm={12} xs={12} lg={8} xl={9} md={9}>
            <Card key={'lol'}>
              <CardHeader><i className="fa fa-address-book fa-lg"/>Medarbejdere <Input icon placeholder='Search...'>
                <input/>
                <Icon name='search'/>
              </Input>
              </CardHeader>
              {
                viewableUsers.map((user) => {
                  return <User user={user}/>
                })
              }
            </Card>
          </Col>
        )
}
    </React.Fragment>
  )
};

export default React.memo(UserList);
