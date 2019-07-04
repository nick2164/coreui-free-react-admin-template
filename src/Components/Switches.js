import React from 'react';
import {Card, CardHeader, Col} from "reactstrap";
import {ScaleLoader} from "react-spinners";
import CardBody from "reactstrap/es/CardBody";
import Switch from "react-switch";
import {getSwitches, patchSwitch} from "../hooks/switches";

const Switches = () => {

  const [isLoading, fetchedData] = getSwitches('papa',[]);

  const ViewLoading = (
    <Col sm={12} xs={12} lg={12}>
      <Card>
        <CardHeader><i className="fa fa-exchange fa-lg"/>Omskiftere</CardHeader>
        <CardBody><ScaleLoader height={12} width={2}/></CardBody>
      </Card>
    </Col>
  );

  return (
    <React.Fragment>
      {isLoading ? (ViewLoading
      ) : (
        <Col sm={12} xs={12} lg={12}>
          <Card>
            <CardHeader><i className="fa fa-exchange fa-lg"/>Omskiftere</CardHeader>
            {
              fetchedData.map(function (item) {

                let button;
                button = <Switch
                  onClick={patchSwitch()}
                  checked={item.active}
                  className="react-switch"
                  uncheckedIcon={<div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 15,
                      color: "white",
                      paddingRight: 2
                    }}
                  >fra</div>}
                  checkedIcon={<div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 15,
                      color: "white",
                      paddingRight: 2
                    }}
                  >til</div>}
                />;

                return (
                  <div key={fetchedData.switchID}>
                    <h1>{fetchedData.switchID}</h1>
                    {button}
                  </div>
                );
              })
            }
          </Card>
        </Col>
      )}
    </React.Fragment>
  )

};

export default Switches;
