import React, {useState,useEffect} from 'react';
import {Card, CardGroup, CardHeader, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import {ScaleLoader} from "react-spinners";
import {getUsers} from "../hooks/users";
import User from "./User";

const UserList = props => {

  const [isLoading, fetchedData] = getUsers('papa',[]);

  const viewLoading = (
    <Col sm={6} xs={12} lg={5}>
      <Card key={'lol'}>
        <CardHeader><i className="fa fa-address-book fa-lg"/>Medarbejdere</CardHeader>
        <CardBody><ScaleLoader height={12} width={2}/></CardBody>

      </Card>
    </Col>
  );

  return (
    <React.Fragment>

      {isLoading ? (viewLoading
      ) : (
        <Col sm={6} xs={12} lg={5}>
          <Card key={'lol'}>
            <CardHeader><i className="fa fa-address-book fa-lg"/>Medarbejdere</CardHeader>
            {
              fetchedData.map((user) => {
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
