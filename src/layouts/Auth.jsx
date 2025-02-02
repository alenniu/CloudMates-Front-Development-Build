/*!


=========================================================
* Mentr Website - v1.0.0
=========================================================

* Copyright 2019 Mentr Team 

* Coded by Mentr Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


*/
import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";
import AuthFooter from "../components/Footers/AuthFooter.jsx";

import routes from "../routes";

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    console.log(routes);
    // console.log(prop.layout, " ", prop.path)

    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        console.log(prop.layout, " ", prop.path)
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content">
          {/* <AuthNavbar /> */}
          <div className="header py-7 py-lg-8" style={{backgroundImage: "url(https://faria-managebac-prod-app-assets.s3.ca-central-1.amazonaws.com/uploads/school/login_background/10002498/optimized_UCC-Aerial-0032-FINAL.jpg), url(https://faria-managebac-prod-app-assets.s3.ca-central-1.amazonaws.com/uploads/school/login_background/10002498/optimized_tiny_UCC-Aerial-0032-FINAL.jpg)"}}>
          {/* <div className="header bg-gradient-info py-7 py-lg-8"> */}
            {/* <img src="https://faria-managebac-prod-app-assets.s3.ca-central-1.amazonaws.com/uploads/school/login_background/10002498/optimized_UCC-Aerial-0032-FINAL.jpg"></img> */}
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome to UCC CloudMates!</h1>
                    <p className="text-lead text-darker">
                     <b> Login in to UCC CloudMates here using your UCC Email and account password.</b>
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container style={{marginTop:'100px'}} className="mt-8 pb-5">
            <Row className="justify-content-center">
              <Switch>{this.getRoutes(routes)}</Switch>
            </Row>
          </Container>
        </div>
        {/* <AuthFooter /> */}
      </>
    );
  }
}

export default Auth;
