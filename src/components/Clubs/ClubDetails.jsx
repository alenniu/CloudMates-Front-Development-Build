


import React from "react";
import { Tab, Image, List, FormGroup } from 'semantic-ui-react'
import { Feed } from 'semantic-ui-react'

import Select from 'react-select';
import { colourOptions } from './data';
// reactstrap components
import {
  Card,
  Container,
  Alert,
  Jumbotron,
  Input,
  Label,
  Form,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Header from "../Headers/Header.jsx";
import axios from "axios";

class Tables extends React.Component {
  constructor() {
    super();
    this.state = {
      new_description: "",
      new_announcement: "",
      new_houseman: "",
      toggle: false,
      new_content: "",
      new_date: "",
      new_icon: "",
      modal_eventKey: "",
      modal_content: "",
      modal_date: "",
      modal_icon: "",
      group: {
        description: "",
        members: [],
        _id: "",
        houseman: "",
        title: "",
        eventOne: "",
        eventTwo: "",
        eventThree: "",
        eventFour: "",
        eventFive: "",
        eventSix: "",
        announcements: [{}]
      },
      current_user: {
        groups: [{ groupID: "", memberType: "", _id: "" }]
      },
    }
  }

  componentWillMount() {
    let paths = this.props.location.pathname.split("/")
    let group_id = paths[paths.length - 1]
    axios.get(`http://localhost:8080/api/groups/${group_id}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.status === 200) {
          const data = res.data
          this.setState({ group: data.group });
          // console.log(this.state.group)
          // console.log(this.state.group.announcements)
        } else {
          console.log("Unable to get this group")
        }
        axios.get(`http://localhost:8080/api/users?name=${this.props.name}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then(res => {
            if (res.status === 200) {
              const user = res.data.users[0]
              this.setState({ current_user: user });
            } else {
              console.log("Unable to get current user")
            }
          })
      })
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onNewAnnouncement = (event) => {
    event.preventDefault();
    let paths = this.props.location.pathname.split("/")
    let group_id = paths[paths.length - 1]
    event.preventDefault();
    axios.post(`http://localhost:8080/api/groups/${group_id}/announcements`, {
      announcement: { content: this.state.new_announcement }
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log("successfully added new announcement")
          // HARD REFRESH
          axios.get(`http://localhost:8080/api/groups/${group_id}`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
            .then(res => {
              if (res.status === 200) {
                const data = res.data
                this.setState({ group: data.group });
              } else {
                console.log("Unable to get this group")
              }
            })
          // HARD REFRESH
          this.setState({ new_announcement: "" })

        } else {
          console.log("Unable to add new announcement")
        }
      })
  }

  checkProperties(obj) {
    console.log(obj)
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "")
        console.log('object is empty')
      return false;
    }
    return true;
  }

  onGroupHeadEdit = (event, body) => {
    event.preventDefault();

    if (this.checkProperties(body)) return
    let paths = this.props.location.pathname.split("/")
    let group_id = paths[paths.length - 1]
    console.log('will make request')
    axios.put(`http://localhost:8080/api/groups/grouphead/${group_id}/`, {
      ...body
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log("successfully added new description")
          // HARD REFRESH
          axios.get(`http://localhost:8080/api/groups/${group_id}`)
            .then(res => {
              if (res.status === 200) {
                const data = res.data
                this.setState({ group: data.group });
              } else {
                console.log("Unable to get this group")
              }
            })
          // HARD REFRESH
          this.setState({ new_description: "" })

        } else {
          console.log("Unable to add new description")
        }
      })
  }




  checkGroupAdmin() {
    let paths = this.props.location.pathname.split("/")
    let group_id = paths[paths.length - 1]
    let groups = this.state.current_user.groups
    for (let i = 0; i < groups.length; i++) {
      let group = groups[i];
      if (group.groupID === group_id) {
        return group.memberType === "GROUPHEAD"
      }
    }
    return false;
  }


  render() {
    console.table(this.state)
    const toggle = (data) => this.setState({
      modal: !this.state.modal,
      modal_content: data.modal_content,
      modal_eventKey: data.modal_eventKey,
      modal_date: data.modal_date,
      modal_icon: data.modal_icon,
      new_icon: data.new_icon,

    })

    let members = this.state.group.members.map((member) => {
      return (

        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
          <List.Content>
            <List.Header>{member}</List.Header>
          </List.Content>
        </List.Item>

      )
    })

    let announcement = null;
    if (this.state.group.announcements.length > 0) {
      announcement = (
        <Alert style={{ fontSize: "150%" }} color="primary">
          {this.state.group.announcements[this.state.group.announcements.length - 1].content}
        </Alert>
      )
    }

    let breakfast = null;
    if (this.state.group.announcements.length > 0) {
      breakfast = (
        <Alert style={{ fontSize: "150%" }} color="warning">
          Please vote for your favorite house breakfast next week.
        </Alert>

      )
    }
    let hs = null;
    if (this.state.group.announcements.length > 0) {
      hs = (
        <Alert style={{ fontSize: "150%" }} color="info">
          Recent and Upcoming House Sports Events!
        </Alert>

      )
    }
    const panes = [
      {
        menuItem: 'Announcements', render: () => (
          <Tab.Pane>
            {announcement}
            <Form style={(!this.checkGroupAdmin()) ? { display: 'none' } : {}} onSubmit={this.onNewAnnouncement} >
              <FormGroup >
                <Label for="new_announcement">Post an announcement</Label>
                <Input
                  name="new_announcement"
                  placeholder="sample announcement"
                  value={this.state.new_announcement}
                  onChange={this.handleInputChange}
                ></Input>
                <Button type="submit">Submit</Button>
              </FormGroup>
            </Form>
            <Jumbotron style={{ "height": "400px" }}>
              <h1>House Description:</h1>

              <div class="col-6" style={{ float: "left", clear: "none", textAlign: 'left' }}>
                <p className="lead">{this.state.group.description}</p>
                <Form style={(!this.checkGroupAdmin()) ? { display: 'none' } : {}} onSubmit={(e) => this.onGroupHeadEdit(e, { description: this.state.new_description })} >
                  <FormGroup >
                    <Label for="new_description">Edit Description</Label>
                    <Input
                      name="new_description"
                      placeholder="sample description"
                      style={{ "width": '50%', marginBottom: '3px' }}

                      value={this.state.new_description}
                      onChange={this.handleInputChange}
                    ></Input>
                    <Button type="submit">Submit</Button>
                  </FormGroup>
                </Form>
              </div>
              <div class="col-6" style={{ float: "left", clear: "none", textAlign: 'center', height: '100%', border: '3px solid black', borderRadius: '30px' }}>
                <div style={{ padding: "30px" }}>
                  <h3>HOUSE MAN OF THE WEEK</h3>

                  <h4 style={{ fontSize: "30px" }}>{this.state.group.houseman}</h4>
                  <Form style={(!this.checkGroupAdmin()) ? { display: 'none' } : {}} onSubmit={(e) => this.onGroupHeadEdit(e, { houseman: this.state.new_houseman })} >
                    <hr />

                    <FormGroup >
                      <Label for="houseman">Edit HOUSEMAN</Label>
                      <Input
                        name="new_houseman"
                        placeholder="houseman name"
                        style={{ "width": '50%', margin: 'auto' }}
                        value={this.state.new_houseman}
                        onChange={this.handleInputChange}
                      ></Input>
                      <Button type="submit">Submit</Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
              {/* FOR NOW TAKE OUT EDIT DESC */}


            </Jumbotron>
          </Tab.Pane>

        )
      },
      {
        menuItem: 'House Breakfast', render: () => (
          <Tab.Pane>
            {breakfast}
            <Select
              defaultValue={[colourOptions[2]]}
              isMulti
              name="colors"
              options={colourOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <Button style={{ backgroundColor: "#00FF00", color: "white", marginTop: "3px" }}>Submit</Button>


          </Tab.Pane>
        )
      },
      {
        menuItem: 'House Sports', render: () => (
          <Tab.Pane>
            {hs}
            <Card>

              <Feed>
                <Feed.Event>
                  <Feed.Label image={`/icons/${this.state.group.eventOne.icon}.png`} />
                  <Feed.Content>
                    <Feed.Date style={{ color: "blue" }} content={this.state.group.eventOne.date} />
                    <Feed.Summary>
                      <a>{this.state.group.eventOne.description}</a>
                    </Feed.Summary>
                    <Button color="danger" onClick={() => toggle({
                      modal_content: this.state.group.eventOne.description,
                      modal_date: this.state.group.eventOne.date,
                      modal_eventKey: "eventOne",
                      modal_icon: this.state.group.eventOne.icon,
                      new_icon: this.state.group.eventOne.icon,
                    })}>EDIT</Button>
                    <div>
                      <Modal isOpen={this.state.modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Update Notification</ModalHeader>
                        <ModalBody>
                          <Label>Icon</Label>
                          <br />
                          <select className="custom-select col-8" style={{ color: 'black' }} onChange={(o) => this.setState({ new_icon: o.target.value })}>
                            {['basketball', 'football', 'hockey', 'volley', 'baseball'].map(o => <option style={{ color: 'black' }} value={o} selected={this.state.modal_icon == o}>{o}</option>)}
                          </select>
                          <br />
                          <br />

                          <Label>Date</Label>
                          <Input placeholder={this.state.modal_date} onChange={evt => this.setState({
                            new_date: evt.target.value
                          })} />

                          <br />
                          <br />
                          <Label>Content</Label>
                          <Input placeholder={this.state.modal_content} onChange={evt => this.setState({
                            new_content: evt.target.value
                          })} />

                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={(e) => {
                            this.setState({ modal: false })
                            this.onGroupHeadEdit(e, {
                              [this.state.modal_eventKey]: {
                                description: this.state.new_content,
                                icon: this.state.new_icon,
                                date: this.state.new_date,

                              }
                            })
                          }}>Edit</Button>{' '}
                          <Button color="secondary" onClick={() => this.setState({ modal: false })}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    </div>

                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image={`/icons/${this.state.group.eventTwo.icon}.png`} />
                  <Feed.Content>
                    <Feed.Date style={{ color: "blue" }} content={this.state.group.eventTwo.date} />
                    <Feed.Summary>
                      <a>{this.state.group.eventTwo.description}</a>

                    </Feed.Summary>
                    <Button color="danger" onClick={() => toggle({
                      modal_content: this.state.group.eventTwo.description,
                      modal_date: this.state.group.eventTwo.date,
                      modal_eventKey: "eventTwo",
                      modal_icon: this.state.group.eventTwo.icon,
                      new_icon: this.state.group.eventTwo.icon,
                    })}>EDIT</Button>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Label image={`/icons/${this.state.group.eventThree.icon}.png`} />
                  <Feed.Content>
                    <Feed.Date style={{ color: "blue" }} content={this.state.group.eventThree.date} />
                    <Feed.Summary>
                      {this.state.group.eventThree.description}
                    </Feed.Summary>
                    <Button color="danger" onClick={() => toggle({
                      modal_content: this.state.group.eventThree.description,
                      modal_date: this.state.group.eventThree.date,
                      modal_eventKey: "eventThree",
                      modal_icon: this.state.group.eventThree.icon,
                      new_icon: this.state.group.eventThree.icon,

                    })}>EDIT</Button>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Label image={`/icons/${this.state.group.eventFour.icon}.png`} />
                  <Feed.Content>
                    <Feed.Date style={{ color: "blue" }} content={this.state.group.eventFour.date} />
                    <Feed.Summary>
                      {this.state.group.eventFour.description}
                    </Feed.Summary>
                    <Button color="danger" onClick={() => toggle({
                      modal_content: this.state.group.eventFour.description,
                      modal_date: this.state.group.eventFour.date,
                      modal_eventKey: "eventFour",
                      modal_icon: this.state.group.eventFour.icon,
                      new_icon: this.state.group.eventFour.icon,

                    })}>EDIT</Button>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Label image={`/icons/${this.state.group.eventFive.icon}.png`} />
                  <Feed.Content>
                    <Feed.Date style={{ color: "blue" }} content={this.state.group.eventFive.date} />
                    <Feed.Summary>
                      {this.state.group.eventFive.description}
                    </Feed.Summary>
                    <Button color="danger" onClick={() => toggle({
                      modal_content: this.state.group.eventFive.description,
                      modal_date: this.state.group.eventFive.date,
                      modal_eventKey: "eventFive",
                      modal_icon: this.state.group.eventFive.icon,
                      new_icon: this.state.group.eventFive.icon,

                    })}>EDIT</Button>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image={`/icons/${this.state.group.eventSix.icon}.png`} />
                  <Feed.Content>
                    <Feed.Date style={{ color: "blue" }} content={this.state.group.eventSix.date} />
                    <Feed.Summary>
                      {this.state.group.eventSix.description}
                    </Feed.Summary>
                    <Button color="danger" onClick={() => toggle({
                      modal_content: this.state.group.eventSix.description,
                      modal_date: this.state.group.eventSix.date,
                      modal_eventKey: "eventSix",
                      modal_icon: this.state.group.eventSix.icon,
                      new_icon: this.state.group.eventSix.icon,

                    })}>EDIT</Button>
                  </Feed.Content>
                </Feed.Event>
              </Feed>

            </Card>

          </Tab.Pane>
        )
      },
      {
        menuItem: 'Members', render: () => <Tab.Pane>
          <List animated verticalAlign='middle'>
            {members}
          </List>

        </Tab.Pane>
      }
    ]


    return (
      <>
        <Header />
        {/* Page content */}

        <Container className="mt--7" fluid>
          {/* Table */}

          {/* <Row> */}
          <div className="col">
            <Card className="shadow">
              <div>
                <h2 style={{ marginBottom: "2%", marginTop: "1%", marginLeft: "1%" }}>{this.state.group.title}</h2>
              </div>
              <Tab panes={panes} />
            </Card>
            <Jumbotron>

              <p className="lead">{this.state.group.title} Head and Prefix</p>
              {/* FOR NOW TAKE OUT EDIT DESC */}
              <h1>{this.state.group.one}</h1>
              <p>{this.state.group.two}</p>

            </Jumbotron>
          </div>



          {/* </Row> */}


        </Container>

      </>
    );
  }
}



export default Tables;
