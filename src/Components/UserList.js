import React, {useEffect, useState} from 'react';
import {Card, CardHeader, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import {ScaleLoader} from "react-spinners";
import {getUsers, get1600FakeUsers} from "../hooks/users";
import User from "./User";
import {Icon, Input} from "semantic-ui-react";
import "./UserList.css";
import {List} from "react-virtualized";

const UserList = props => {

  // const [, fetchedData] = getUsers('papa', []);
  const [, fetchedData] = get1600FakeUsers('papa', []);
  const [viewableUsers, setViewableUsers] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [searchedWord, setSearchedWord] = useState('');

  const viewLoading = (
    <Col sm={9} xs={12} lg={9} xl={9} md={9}>
      <Card key={'Co-workers'}>
        <CardHeader><i className="fa fa-address-book fa-lg"/>Medarbejdere</CardHeader>
        <CardBody><ScaleLoader height={12} width={2}/></CardBody>

      </Card>
    </Col>
  );

  if (JSON.parse(localStorage.getItem('userList')) === null) {
    localStorage.setItem('userList', JSON.stringify([]));
  }

  // Viewable users handler
  useEffect(() => {
    setViewableUsers(JSON.parse(localStorage.getItem('userList')));

    if (fetchedData.length > 0) {

      if (JSON.parse(localStorage.getItem('userList')).length < 1) {

        localStorage.setItem('userList', JSON.stringify(fetchedData));

        setViewableUsers(JSON.parse(localStorage.getItem('userList')));

      } else {

        if (localStorage.getItem('userList') !== JSON.stringify(fetchedData)) {

          localStorage.setItem('userList', JSON.stringify(fetchedData));

          setViewableUsers(JSON.parse(localStorage.getItem('userList')));

        }
      }

    }

  }, []); // [fetchedData]

  const getFilteredUsers = (searchWord) => {

    let list = [];

    viewableUsers.map(value => {
      if (value.firstName.toUpperCase().includes(searchWord.toUpperCase()) || value.lastName.toUpperCase().includes(searchWord.toUpperCase())) {
        list.push(value);
      }
    });

    return list;

  };

  useEffect(() => {

    if (searchedWord === '') {
      setFilteredUserList(viewableUsers);
    } else {
      setFilteredUserList(getFilteredUsers(searchedWord));
    }

  }, [searchedWord, viewableUsers]);

  const setSearch = props => {
    setSearchedWord(props.target.value);
  };

  return (
    <React.Fragment>

      {JSON.parse(localStorage.getItem('userList')).length < 1 ? (viewLoading) : // Check if there is found any userList in the local storage and decide if loading screen is showed..
        (
          <Col sm={props.sm} xs={props.xs} lg={props.lg} xl={props.xl} md={props.md}>
            <Card key={'Coworkers'}>
              <CardHeader><i className="fa fa-address-book fa-lg"/>Medarbejdere <Input name className={'search'} icon
                                                                                       placeholder='Search...'>
                <input name={'searchInput'} onKeyUp={setSearch}/>
                <Icon name='search'/>
              </Input>
              </CardHeader>
              {

                <List
                  height={600}
                  width={500}
                  rowHeight={20}
                  rowCount={filteredUserList.length}
                  overscanRowCount={3}

                  rowRenderer={
                    ({
                       key,         // Unique key within array of rows
                       index,       // Index of row within collection
                       isScrolling, // The List is currently being scrolled
                       isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                       style        // Style object to be applied to row (to position it)
                     }) =>
                      <User
                        key={key}
                        user={filteredUserList[index]}
                        isScrolling={isScrolling}
                        isVisible={isVisible}
                        style={style}
                      />
                  }
                />

                // filteredUserList.map((user) => {
                //   return <User user={user}/>
                // })
              }
            </Card>
          </Col>
        )
      }
    </React.Fragment>
  )
};

export default React.memo(UserList);
