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

// import { MDBContainer, MDBAutocomplete } from "mdbreact";


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
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import * as firebase from 'firebase';


import Autocomplete from 'react-autocomplete'

// core components
import UserHeader from "../../components/Headers/UserHeader.jsx";
import axios from "axios";
import { Message } from "semantic-ui-react";
import { isEmptyBindingElement } from "typescript";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      current_user: { points: 0, userType: "", _id: "" },
      loggedUser: {},
      password: "",
      goodChange: false,
      modalLevel: false,
      modalUserType: false,
      modalPoints: false,
      userPoints: 0,
      userType: "",
      userLevel: 0,
      chatrooms: [],
      value: ''
    };

    firebase.database().ref('chatrooms').once('value', v=>{
  //    console.log(v.val());
      this.setState({
        chatrooms: v.val()
      });
      console.log(this.state.chatrooms)
    })
  }

   isEmpty =  (obj) =>{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  componentWillMount() {
    const id = window.location.href.split("profile/")[1];
    console.log("IDD");
    console.log(id);

    axios
      .get(`http://localhost:8080/api/users/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          if(this.state.current_user.userType === ""){
            this.setState({
              current_user: res.data.user,
              
            });
  
          }
        
          console.log("logged user: ", this.state.current_user);
        }
      });

    console.log(this.props.name);
    console.log(`http://localhost:8080/api/users?name=${localStorage.getItem("username")}`);
    axios
      .get(`http://localhost:8080/api/users?name=${localStorage.getItem("username")}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status === 200) {

          console.log(res.data);
          const user = res.data.users[0];
          if(this.isEmpty(this.state.loggedUser)){
            this.setState({loggedUser: user})
          }
        /*   this.setState({ current_user: user});
          console.log(user);
          console.log(this.state.current_user); */
        } else {
          console.log("Unable to get current user");
        }
      });
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };


  onSubmit = event => {
    event.preventDefault();
    axios
      .patch(
        `http://localhost:8080/api/users/${this.state.current_user._id}`,
        {
          password: this.state.password
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          console.log("Password changed successfully");
          this.setState({ goodChange: true });
        }
      });
  };

  search = e => {
    this.setState({ search: e.target.value })
    console.log('changing')
  }

  render() {
    const updatePoints = points => {
      console.log(points);

      let id = this.state.current_user._id;
      console.log(id);
      axios
        .patch(
          `http://localhost:8080/api/users/${id}`,
          {
            points: this.state.userPoints
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            console.log("Points updated successfully");
            axios
              .get(`http://localhost:8080/api/users/${id}`, {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
              })
              .then(res => {
                if (res.status === 200) {
                  console.log(res.data);
                  this.setState({
                    current_user: res.data.user
                  });

                  console.log("current user: ", this.state.current_user);
                }
              });
          }
        });
    };

    const updateLevel = level => {
      let id = this.state.current_user._id;
      console.log(id);
      axios
        .patch(
          `http://localhost:8080/api/users/${id}`,
          {
            level: this.state.userLevel
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            console.log("Points updated successfully");
            axios
              .get(`http://localhost:8080/api/users/${id}`, {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
              })
              .then(res => {
                if (res.status === 200) {
                  console.log(res.data);
                  this.setState({
                    current_user: res.data.user
                  });

                  console.log("current user: ", this.state.current_user);
                }
              });
          }
        });
    };

    const updateUserType = type => {
      let id = this.state.current_user._id;
      console.log(id);
      axios
        .patch(
          `http://localhost:8080/api/users/${id}`,
          {
            userType: this.state.userType
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            console.log("Points updated successfully");
            axios
              .get(`http://localhost:8080/api/users/${id}`, {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
              })
              .then(res => {
                if (res.status === 200) {
                  console.log(res.data);
                  this.setState({
                    current_user: res.data.user
                  });

                  console.log("current user: ", this.state.current_user);
                }
              });
          }
        });
    };

    // const search = e => {
    //   this.setState({ search: e.target.value })
    //   console.log('changing')
    // } 

    return (
      <>
    
        <UserHeader name={this.props.name} />

     
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Points modal */}

          <Modal isOpen={this.state.modalPoints}>
            <ModalHeader>Update Points</ModalHeader>
            <ModalBody>
              <Label>Points</Label>
              <Input
                placeholder={this.state.current_user.points}
                onChange={evt =>
                  this.setState({
                    userPoints: evt.target.value
                  })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  updatePoints(this.state.userPoints);
                }}
              >
                Apply
              </Button>{" "}
              <Button
                color="secondary"
                onClick={() => {
                  console.log("cancel");
                  this.setState({
                    modalPoints: false
                  });
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Level modal */}

          <Modal isOpen={this.state.modalLevel}>
            <ModalHeader>Update Level</ModalHeader>
            <ModalBody>
              <Label>Level</Label>
              <Input
                placeholder={this.state.current_user.level}
                onChange={evt =>
                  this.setState({
                    userLevel: evt.target.value
                  })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  updateLevel(this.state.userLevel);
                }}
              >
                Apply
              </Button>{" "}
              <Button
                color="secondary"
                onClick={() => {
                  this.setState({
                    modalLevel: false
                  });
                  console.log("cancel");
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* userType modal */}

          <Modal isOpen={this.state.modalUserType}>
            <ModalHeader>Update Role</ModalHeader>
            <ModalBody>
              <Label>User Role</Label>
              <Input
                placeholder={this.state.current_user.userType}
                onChange={evt =>
                  this.setState({
                    userType: evt.target.value
                  })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  updateUserType(this.state.userType);
                }}
              >
                Apply
              </Button>{" "}
              <Button
                color="secondary"
                onClick={() => {
                  console.log("cancel");
                  this.setState({
                    modalUserType: false
                  });
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Row>
            
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={`https://ui-avatars.comhttp://localhost:8080/api/?size=160&background=0D8ABC&color=fff&bold=true&name=${this.state.current_user.name}`}
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
                          <span
                            className="heading"
                            onClick={() => {
                              if(this.state.loggedUser.userType === "ADMIN"){
                                this.setState({
                                  modalPoints: true
                                });
                              }
                              else console.log("errrrr")
                            }}
                          >
                            {this.state.current_user.points}
                          </span>
                          <span className="description">Points</span>
                        </div>
                        <div>
                          <span
                            className="heading"
                            onClick={() => {
                              if(this.state.loggedUser.userType === "ADMIN"){
                                this.setState({
                                  modalLevel: true
                                });
                              }
                              else console.log("errrrr")
                            
                            }}
                          >
                            {this.state.current_user.level}
                          </span>
                          <span className="description">Level</span>
                        </div>
                        <div>
                          <span
                            className="heading"
                            onClick={() => {
                              if(this.state.loggedUser.userType === "ADMIN"){
                                this.setState({
                                  modalUserType: true
                                });
                              }
                              else console.log("errrrr")
                            }}
                          >
                            {this.state.current_user.userType}
                          </span>
                          <span className="description">User Type</span>
                        </div>
                      </div>
                    </div>
                  </Row>

                  {/* <MDBContainer>
        <MDBAutocomplete
          data={this.state.chatrooms}
          label="Choose your favorite state"
          icon="heart"
          clear
          id="input"
          
        />
      </MDBContainer> */}

                  {this.state.loggedUser['userType']=='ADMIN' ? 
                  <Autocomplete
                  items={this.state.chatrooms}
                  
           
                  shouldItemRender={(item, value) =>  item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                  getItemValue={item => item.name}
                  inputProps={{ style: { height: '32px',borderRadius: '25px'}, placeholder: '    Search For Groups'}}  
                  
                  
                  renderItem={(item, isHighlighted) =>
                  
                    
                    
                     <div key={item.id}> {item.name} <br/> <button onClick={()=>{console.log(item.name.indexOf(this.state.search));
                       firebase.database().ref('chatrooms').child(item.id).child('members').child(this.state.current_user['_id']).set(this.state.current_user);
                       firebase.database().ref('chatrooms').child(item.id).child('online').child(this.state.current_user['_id']).set({
                         'name': this.state.current_user.name,
                         'online': false
                       })
                       firebase.database().ref("users").child(this.state.current_user['_id']).set(this.state.current_user)
                     }}>ADD</button> </div>
 
                  }
                  value={this.state.value}
                  placeholder="Search users.."
                  onChange={e => this.setState({ value: e.target.value })}
                  onSelect = {value => this.setState({ value })}
                />: null}
                  
                  <div className="text-center">
                    <h3>{this.state.current_user.name}</h3>
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
            {/* <Col className="order-xl-1" xl="8">
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

                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="In Progress"
                          type="textarea"
                        />
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col> */}
          </Row>

          <div style={{height:'500px'}}></div>
        </Container>
      </>
    );
  }
}

export default Profile;
