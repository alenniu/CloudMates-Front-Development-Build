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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader.jsx";
import axios from "axios";
import { Message } from 'semantic-ui-react'

import * as firebase from 'firebase';


class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      current_user: {points: 0, userType: '', _id: ''},
      password: "",
      description: "",
  goodChange: false,
  goodChangeA: false

    }
  }

  componentWillMount() {
    console.log(this.props.name)
    let name = localStorage.getItem("username");
    console.log(name)
    console.log(`http://localhost:8080/api/users?name=${name}`)
    axios.get(`http://localhost:8080/api/users?name=${name}`,{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          const user = res.data.users[0]
          this.setState({current_user: user});
          console.log(user)
          console.log(this.state.current_user)
        }else{
          console.log("Unable to get current user")
        }
      })
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name] : value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:8080/api/users/${this.state.current_user._id}`, {
      password: this.state.password
    },{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      if ( res.status === 200) {
        console.log("Password changed successfully")
	 this.setState({goodChange: true})
      }
    })
  }

  onDescription = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:8080/api/users/${this.state.current_user._id}`, {
      description: this.state.description
    },{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      if ( res.status === 200) {
        console.log("Password changed successfully")
	 this.setState({goodChangeA: true})
      }
    })
  }


  render() {

    //firebase.database().ref("users").child("aditya").set({"id": "mechaadi"}).then(v=>console.log(v)).catch(c=>console.log(c));
    return (
      <>
        <UserHeader name={this.props.name}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={`https://ui-avatars.comhttp://localhost:8080/api/?size=160&background=0D8ABC&color=fff&bold=true&name=${this.props.name}`}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Day Boy
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Student
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{this.state.current_user.points}</span>
                          <span className="description">Points</span>
                        </div>
                        <div>
                          <span className="heading">{this.state.current_user.level}</span>
                          <span className="description">Level</span>
                        </div>
                        <div>
                          <span className="heading">{this.state.current_user.userType}</span>
                          <span className="description">User Type</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.state.current_user.name}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Year : {this.state.current_user.grade}
                    </div>
                    <hr className="my-4" />
                    <p><i>
                     <b> Bio:</b>
                      <br></br>
                      {this.state.current_user.description}
                      </i> </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form  onSubmit={this.onSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
  <Message style={!this.state.goodChange? {display: 'none'}: {}} positive>
          <Message.Header>Change Successful</Message.Header>
          <p>Logout and Relogin to experience changes.</p>
         </Message>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="password"
                              value={this.state.password} 
                              type="password" 
                              onChange={this.handleInputChange}
                            />
                            <Button className="my-4" color="primary" type="submit" >
                              Change password
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    
                    <hr className="my-4" />
                    </Form>
                    <Form  onSubmit={this.onDescription}>
                    <Message style={!this.state.goodChangeA? {display: 'none'}: {}} positive>
          <Message.Header>Change Successful</Message.Header>
          <p>Revisit this page to experience changes.</p>
         </Message>
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>Edit Bio</label>
                        <Input
                          className="form-control-alternative"
                          name="description"
                          placeholder="A few words about you ..."
                          rows="4"
                          value={this.state.description} 
                          type="textarea"
                          onChange={this.handleInputChange}
                        />
                        <Button className="my-4" color="primary" type="submit" >
                              Change Bio
                            </Button>
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default UserProfile;

