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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// reactstrap components

import axios from "axios";

import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactWeather from 'react-open-weather'
import 'react-open-weather/lib/css/ReactWeather.css';
import '../assets/css/indexPage.css'

import {
  Button,
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Alert,
  Form,
  Input,
  Col,
  Label,
  FormGroup,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

import * as firebase from 'firebase';

import { Message, Image, Accordion} from 'semantic-ui-react'
// core components
import {
  chartOptions,
  parseOptions,
} from "../variables/charts.jsx";

import Header from "../components/Headers/Header.jsx";
const announcmentStyle = {
  fontSize: '150%'  
};




class Index extends React.Component {


  componentWillMount() {

  
//["jordan.alikhan@ucc.on.ca", "zachary.alikhan@ucc.on.ca", "michael.aruldoss@ucc.on.ca", "stefan.ateljevic@ucc.on.ca", "ben.atkinson@ucc.on.ca", "james.bao@ucc.on.ca", "david.bard@ucc.on.ca", "alex.bastin@ucc.on.ca", "troy.boydell@ucc.on.ca", "tyler.bradlow@ucc.on.ca", "josh.chan@ucc.on.ca", "ryan.chan@ucc.on.ca", "alex.chee-wong@ucc.on.ca", "dexter.chin@ucc.on.ca", "justin.chin@ucc.on.ca", "jacob.cho@ucc.on.ca"," michael.cowling@ucc.on.ca", "jason.crooks@ucc.on.ca", "justin.crooks@ucc.on.ca"," elijah.cyriac@ucc.on.ca", "joshua.cyriac@ucc.on.ca", "olamide.dinah@ucc.on.ca", "gaurav.dogra@ucc.on.ca", "alexander.dua@ucc.on.ca", "jack.falcone@ucc.on.ca", "joshua.gelfand@ucc.on.ca"," jaiman.gledhill@ucc.on.ca", "reid.gledhill@ucc.on.ca", "kei.hagiwara@ucc.on.ca"," nathan.hannam@ucc.on.ca", "liam.hilson@ucc.on.ca"," nico.jeffery@ucc.on.ca"," jasnoor.johal@ucc.on.ca"," cole.jones@ucc.on.ca"," arjun.kapur@ucc.on.ca"," jinoo.kim@ucc.on.ca", "pierce.lapham@ucc.on.ca"," lewis.lapham@ucc.on.ca", "euan.lathrop@ucc.on.ca", "john.liu@ucc.on.ca"," sean.lizzola@ucc.on.ca"," jb.mckinlay@ucc.on.ca"," gerry.mei@ucc.on.ca"," matthew.meyerowitz@ucc.on.ca", "lucas.mouzitchka@ucc.on.ca", "Andrew.Newall@ucc.on.ca", "colin.odwyer@ucc.on.ca", "simon.ofiara@ucc.on.ca", "duro.ogunsola@ucc.on.ca", "ben.orbach@ucc.on.ca"," memo.ozdincer@ucc.on.ca", "jack.paterson@ucc.on.ca", "oscar.perren@ucc.on.ca", "Quinn.Perren@ucc.on.ca"," ben.popper@ucc.on.ca", "ben.puskas@ucc.on.ca", "ryan.qin@ucc.on.ca"," nigel.radhakrishnan@ucc.on.ca"," jake.rivett@ucc.on.ca"," max.rivett@ucc.on.ca", "sean.robertson@ucc.on.ca", "carledmund.roux@ucc.on.ca"," Oliver.Sanderson@ucc.on.ca"," kaden.seguin@ucc.on.ca", "beck.sennecke@ucc.on.ca"," mateo.seymour@ucc.on.ca"," matthew.sheehy@ucc.on.ca"," aj.shulman@ucc.on.ca"," Ben.Swan@ucc.on.ca"," roy.taguchi@ucc.on.ca", "Mikey.Thien@ucc.on.ca", "alan.van@ucc.on.ca"," noah.verhoeff@ucc.on.ca", "john.voudouris@ucc.on.ca", "fergus.webb@ucc.on.ca", "jack.wildi@ucc.on.ca", "Jules.Wile@ucc.on.ca", "david.wood@ucc.on.ca",  "tony.zheng@ucc.on.ca"," princeton.zhou@ucc.on.ca"," aarav.dogra@ucc.on.ca", "yusuf.mian@ucc.on.ca", "gigi.ciarlandini@ucc.on.ca", "spencer.adams@ucc.on.ca", "edward.xia@ucc.on.ca", "david.mcquillenyoung@ucc.on.ca", "mritik.dodla@ucc.on.ca", "kevin.han@ucc.on.ca"];
  //  const students_jacksons = ["jordan.alikhan@ucc.on.ca", "zachary.alikhan@ucc.on.ca", "michael.aruldoss@ucc.on.ca", "stefan.ateljevic@ucc.on.ca", "ben.atkinson@ucc.on.ca", "james.bao@ucc.on.ca", "david.bard@ucc.on.ca", "alex.bastin@ucc.on.ca", "troy.boydell@ucc.on.ca", "tyler.bradlow@ucc.on.ca", "josh.chan@ucc.on.ca", "ryan.chan@ucc.on.ca", "alex.chee-wong@ucc.on.ca", "dexter.chin@ucc.on.ca", "justin.chin@ucc.on.ca", "jacob.cho@ucc.on.ca"," michael.cowling@ucc.on.ca", "jason.crooks@ucc.on.ca", "justin.crooks@ucc.on.ca"," elijah.cyriac@ucc.on.ca", "joshua.cyriac@ucc.on.ca", "olamide.dinah@ucc.on.ca", "gaurav.dogra@ucc.on.ca", "alexander.dua@ucc.on.ca", "jack.falcone@ucc.on.ca", "joshua.gelfand@ucc.on.ca"," jaiman.gledhill@ucc.on.ca", "reid.gledhill@ucc.on.ca", "kei.hagiwara@ucc.on.ca"," nathan.hannam@ucc.on.ca", "liam.hilson@ucc.on.ca"," nico.jeffery@ucc.on.ca"," jasnoor.johal@ucc.on.ca"," cole.jones@ucc.on.ca"," arjun.kapur@ucc.on.ca"," jinoo.kim@ucc.on.ca", "pierce.lapham@ucc.on.ca"," lewis.lapham@ucc.on.ca", "euan.lathrop@ucc.on.ca", "john.liu@ucc.on.ca"," sean.lizzola@ucc.on.ca"," jb.mckinlay@ucc.on.ca"," gerry.mei@ucc.on.ca"," matthew.meyerowitz@ucc.on.ca", "lucas.mouzitchka@ucc.on.ca", "Andrew.Newall@ucc.on.ca", "colin.odwyer@ucc.on.ca", "simon.ofiara@ucc.on.ca", "duro.ogunsola@ucc.on.ca", "ben.orbach@ucc.on.ca"," memo.ozdincer@ucc.on.ca", "jack.paterson@ucc.on.ca", "oscar.perren@ucc.on.ca", "Quinn.Perren@ucc.on.ca"," ben.popper@ucc.on.ca", "ben.puskas@ucc.on.ca", "ryan.qin@ucc.on.ca"," nigel.radhakrishnan@ucc.on.ca"," jake.rivett@ucc.on.ca"," max.rivett@ucc.on.ca", "sean.robertson@ucc.on.ca", "carledmund.roux@ucc.on.ca"," Oliver.Sanderson@ucc.on.ca"," kaden.seguin@ucc.on.ca", "beck.sennecke@ucc.on.ca"," mateo.seymour@ucc.on.ca"," matthew.sheehy@ucc.on.ca"," aj.shulman@ucc.on.ca"," Ben.Swan@ucc.on.ca"," roy.taguchi@ucc.on.ca", "Mikey.Thien@ucc.on.ca", "alan.van@ucc.on.ca"," noah.verhoeff@ucc.on.ca", "john.voudouris@ucc.on.ca", "fergus.webb@ucc.on.ca", "jack.wildi@ucc.on.ca", "Jules.Wile@ucc.on.ca", "david.wood@ucc.on.ca",  "tony.zheng@ucc.on.ca"," princeton.zhou@ucc.on.ca"," aarav.dogra@ucc.on.ca", "yusuf.mian@ucc.on.ca", "gigi.ciarlandini@ucc.on.ca", "spencer.adams@ucc.on.ca", "edward.xia@ucc.on.ca", "david.mcquillenyoung@ucc.on.ca", "mritik.dodla@ucc.on.ca", "kevin.han@ucc.on.ca"];
//  const students_jacksons = ["Sufian Alawiye",
//   "Charlie de Ajuria Perez",
//   "Salam Gueye",
//   "Christophe Li",
//   "Daniel McDonald",
//   "Steven Tian",	
//   "Tre Ahn",
//   "Jason Cai",
//   "Jamie Edelist",
//   "Nasrudeen Oladimeji",
//   "Junyoung Park",
//   "Max Ploessl",
//   "Steven Prasetya",
//   "Sirvan Saee",
//   "Patrick Szente",
//   "Coulter Taylor",
//   "Dara Ahmadi",
//   "Shiqiao Bi",
//   "Jade Boucetta",
//   "Guclu Can",
//   "Nicholas de Chazal",
//   "Anthony Dicriscio",
//   "Jack Edelist",
//   "Jack Gao",
//   "Jay Kang",
//   "Artem Khachaturov",
//   "Jay Kim",
//   "Amirezza Modaressanavi",
//   "Arman Narzibekov",
//   "Abdusalam Oladimeji",
//   "Kosei Satoh",
//   "William Zhao",
//   "Luca De Carolis",
//   "Faizan Haider ",
//   "Jeremy Iacobacci ",
//   "James Liao ",
//   "Neo Lou",
//   "Brandon Sambrano",
//   "Bassem Sandeela",
//   "Alexander Schutz ",
//   "Billy Shi ",
//   "Phillips Tran",
//   "Brian Tu",
//   "William Uk"
//   ];
//START HERE
    // console.log("hi");
    // for(const student of students_jacksons) {
    //   axios.get(`/api/users?name=${student}`,{
        
    //     headers: {
    //       Authorization: localStorage.getItem('token')
    //     }
    //   }).then(res => {
    //     if(res.status == 200) {
    //       const usero = res.data.users[0]
    //       console.log(usero)
    //       const user = usero.name
    //       axios.post(`/api/groups/5d8cf3fd8214f450bae16ca1/members/`, {
    //         username: user
    //       }, {
    //         headers: {
    //           Authorization: localStorage.getItem('token')
    //         }
    //       }).then(res => {
    //         if(res.status == 200) {
              
    //           const usere = usero._id
    //          // const user = res.data.user._id;
    //           console.log(usere);
    
    //           // const groups = user.groups;
    //           // groups.push({
    //           //   groupID: "5d54af0329a20e6d53b80f7a",
    //           //   memberType: "MEMBER"
    //           // });
    //           console.log(usere);
    //           axios.post(`/api/users/${usere}/groups`, {
    //             group: {
    
                
    //             groupID: "5d8cf3fd8214f450bae16ca1",
    //             memberType: "MEMBER"
    //           }
    //           },{
    //             headers: {
    //               Authorization: localStorage.getItem('token')
    //             }
    //           }).then(res => {
    //             if(res.status == 200) {
    //               console.log("SUCCESS");
    //             }
    //           });
    //         }
    //         })
          
    //     }
    //   })
    // }
    //END HERE

    
    // let i = 0;
    // axios.get(`/api/users/`).then(res => {
    //   console.log("TEST");
    //   if(res.status == 200) {
    //     const users = res.data;
    //     console.log(users);
    //     for(const user of users) {
    //       for(const student of students_jacksons) {
    //         if(user.email == students_jacksons) {
    //           // Change user's house to jacksons
    //         }
    //       }
    //     }
    //   }
    // })

    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    axios.get(`/api/announcements/recent`,{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      if (res.status === 200) {
        const data = res.data
        console.log(data)
        this.setState({announcement: data.announcement});
      }else{
        console.log("Unable to get this announcement by id")
      }
      axios.get(`/api/users?name=${this.props.name}`,{
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(res => {
        if (res.status === 200) {
          const user = res.data.users[0]
          this.setState({current_user: user});
          firebase.database().ref("users").once('value', (val)=>{
            if(val.child(this.state.current_user['_id']).exists()){
                console.log("DATA EXISTS");
                firebase.database().ref("users").child(this.state.current_user['_id']).set(this.state.current_user).then(v=>{
                  firebase.database().ref('users').child(this.state.current_user['_id']).child('status').set({
                    status: 'online',
                    last_changed: firebase.database.ServerValue.TIMESTAMP,
                  })
                })
            }
            else {console.log("NO FIREBASE USER FOUND");
              firebase.database().ref("users").child(this.state.current_user['_id']).set(this.state.current_user).then(v=>{
                firebase.database().ref('users').child(this.state.current_user['_id']).child('status').set({
                  status: 'online',
                  last_changed: firebase.database.ServerValue.TIMESTAMP,
                })
              })
          }
          });
          axios.get('/api/users/',{
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
            .then(res => {
              if(res.status === 200) {
                const data = res.data
                this.setState({all_users: data.users})
                console.log("Sorted USer:")
                console.log(this.getUsersSortedByPoints())
              }
            })
        }else{
          console.log("Unable to get all posts")
        }
      })
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      announcement : {},
      new_announcement : "",
      current_user: {},
      all_users:  [{}],
      open: false,
      modal : false,
      announcementContent: "",
      announcementMini: "",
      announcementPic: ""
    };

    // if(localStorage.getItem('chatToggle')){
    //   console.log("chat toggle exists");
    //   // this.setState({
    //   //   groupsToggle: localStorage.getItem('chatToggle')
    //   // })
    // }
    // else {
    //   console.log("chat toggle not found")
    //   localStorage.setItem('chatToggle', false);
    // }
  }

  
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name] : value
    });
  }

  getUsersSortedByPoints() {
    return this.state.all_users.sort((user1, user2) => {
      return (user1.points <= user2.points) ? 1 : -1
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    let announcement_id = "5da870f94db4be0a37de29b7"
    axios.patch(`/api/announcements/${announcement_id}/`,  {
      content: this.state.announcementContent,
      mini: this.state.announcementMini,
      pic: this.state.announcementPic
    },{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      if ( res.status === 200) {
        axios.get(`/api/announcements/recent`,{
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then(res => {
            if (res.status === 200) {
              const data = res.data
              this.setState({announcement: data.announcement});
            }else{
              console.log("Unable to get this announcement by id")
            }
          })
      }
    })
  }

  

  getTrophyStyle(index) {
    if(index > 2) {
      return {
        display: 'none'
      }
    }
    let style = {
      paddingRight: '5%',
      fontSize: '200%',
      color: ''
    }
    if(index === 0) {
      style.color = 'rgb(248,206,56)'
    }else if(index === 1) {
      style.color = 'rgb(192,192,192)'
    }else if(index === 2) {
      style.color = '#cd7f32'
    }
    return style;
  }


 

  render() {
    console.log(this.state.current_user);
    const { open, size } = this.state

    const toggle = () => this.setState({
      modal: !this.state.modal
    })

    const submit = () => {
      console.log("UPDATING")
      console.log()
      if (this.state.announcementMini != "" && this.state.announcementContent != ""){
        console.log("DETAILS")
        console.log(this.state.announcementContent, this.state.announcementMini)
        let announcement_id = "5d5e0effd782c7f9e44ea318"
    axios.patch(`/api/announcements/${announcement_id}/`,  {
      content: this.state.announcementContent,
      mini: this.state.announcementMini,
      pic: this.state.announcementPic
    },{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      if ( res.status === 200) {
        axios.get(`/api/announcements/recent`,{
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then(res => {
            if (res.status === 200) {
              const data = res.data
              this.setState({announcement: data.announcement});
            }else{
              console.log("Unable to get this announcement by id")
            }
          })
      }
    })
      }

      toggle();
    }



    let top_users = this.getUsersSortedByPoints().slice(0,5).map((user, index)=> {
      return (
        <tr>
          <th scope="row"><span style={this.getTrophyStyle(index)} ><FontAwesomeIcon icon={faTrophy}/></span><b>{user.name}</b></th>
          {/* <td>{user.points}</td> THIS IS LEGIT ONE */}
          <td>Currently Disabled</td>
          <td>
            <div className="d-flex align-items-center">
              <div>
                <Progress
                  max="100"
                  value={100- index*20}
                  barClassName="bg-gradient-danger"
                />
              </div>
            </div>
          </td>
        </tr>
      )
    })
    return (
      
      <>
         <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>

      <Message style={{margin: '0'}} size="large" color='orange'>
        <Message.Header>{this.state.announcement.content}</Message.Header>
        <p>{this.state.announcement.mini}</p>
       
       {this.state.current_user.userType=="ADMIN" ? <Button color="danger" onClick={toggle}>OPEN</Button> : <div></div>}
        


<div>
<Modal isOpen={this.state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Notification</ModalHeader>
        <ModalBody>

    <Label>Content</Label>
    <Input placeholder={this.state.announcement.content} onChange={evt =>  this.setState({
      announcementContent: evt.target.value
    })}/>

      <br/>
      <br/>
    <Label>Mini</Label>
    <Input placeholder={this.state.announcement.mini} onChange={evt =>  this.setState({
      announcementMini: evt.target.value
    })}/>
    <br/>
      <br/>
    <Label>Pic</Label>
    <Input placeholder={this.state.announcement.pic} onChange={evt =>  this.setState({
      announcementPic: evt.target.value
    })}/>



        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submit}>Apply</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
        </div>

      </Message>

      
      {/* <Form style={(!this.state.current_user || !this.state.current_user.userType || this.state.current_user.userType !== 'ADMIN') ?  {display: 'none'}: {}}  onSubmit={this.onSubmit} >
        <FormGroup >
          <Label for="new_announcement">Edit an Description</Label>
          <Input 
            name="new_announcement" 
            placeholder="sample announcement"
            value={this.state.new_announcement}
            onChange={this.handleInputChange}
          ></Input>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </Form> */}
          <Row>
          
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                  <ReactWeather
                      forecast="today"  
                      apikey="7ad07aac9b0943040a4abdd2c23dfc4e"
                      type="city"
                      city="Toronto"
                    />
                    {/* <p style={{position: "absolute", bottom: "10%"}}>Today is day 2</p> */}
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Leaderboard</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">User Name</th>
                      <th scope="col">Points</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
            
                      {top_users}
                      
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
         
          {/* <img style={{width:'100%'}} src="https://cdn1.imggmi.com/uploads/2019/8/24/6e6281565b3a24591bcc81461a0361e6-full.jpg"></img> */}
          <Image style={{marginTop:"-22%", zIndex:'-1'}} bordered src={this.state.announcement.pic} fluid />
        </Container>
      </>
    );
  }
}

export default Index;
