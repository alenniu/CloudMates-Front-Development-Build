/*!


=========================================================
* Mentr Website - v1.0.0
=========================================================

* Copyright 2019 Mentr Team 

* Coded by Mentr Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


*/
/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import axios from 'axios'
import Cookies from 'js-cookie'
import Autocomplete from 'react-autocomplete'
import * as firebase from 'firebase';

import { css } from 'glamor';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

var ps;

const logoStyle = {

  width: '1300px',
  height: '100px'

};

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    notifications: [],
    email: '',
    newNot: false,
    users: [],
    search: '',
    length: localStorage.getItem('notsCount'),
    name: localStorage.getItem('username'),
    groupsToggle: false,
    chatrooms: [],
    currentGroup: 0,
    currentGroupName: ''
  };
  constructor(props) {
    super(props);
    if(localStorage.getItem('chatToggle')){
      console.log("chat toggle exists");
      this.setState({
        groupsToggle: !localStorage.getItem('chatToggle')
      });
      console.log('groupToggle: ', this.state.groupsToggle)
    }
    else {
      console.log("chat toggle not found")
      localStorage.setItem('chatToggle', false);
    }
    
    this.activeRoute.bind(this);
    this.search.bind(this);

    setInterval(() => {
      this.checkForNewNots()
    }, 60000);
  }


  componentWillMount() {
    let name = localStorage.getItem('id');
    console.log(name);
    let that = this;

    axios.get(`http://localhost:8080/api/users/${name}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log(res)
          const user = res.data.user
          console.log(user, " here is it")
          this.setState({ current_user: user });
          console.log(this.state.current_user)
          let id = user['_id'];
          console.log(id);
          firebase.database().ref('users').once('value', (val) => {
            if (val.child(id).exists()) {
              console.log("asdasd", val.val())
              this.setState({
                currentUser: val.child(id).val()
              });
              console.log(this.state.currentUser);

              let rooms = [];
              let that =this;
              firebase.database().ref("chatrooms").once('value', (val) => {
                this.setState({
                  currentGroupName: val.val()[1].name,
                  currentGroup: val.val()[1].id
                })
                console.log(val.val()[1].id);
                //  val[0].val()
                val.forEach(v => {
                //  console.log(v.val());
                  if(v.val().members){
                 //   console.log(v.val().members);
                 Object.keys(v.val().members).forEach(function(key) {
          
                //  console.log(key, v.val().members[key]);
                if(key===id){
                  console.log("found")
                  rooms.push(v.val())
                  that.setState({
                    chatrooms: rooms
                  });
                }
                
                });
                  }
                 
                });
                
          
                console.log(this.state.chatrooms);
              })


            } else {
              firebase.database().ref('users').child(id).set(this.state.current_user).then(v => console.log("USER ADDED")).catch(c => console.log(c));
            }
          })
        } else {
          console.log("Unable to get current user")
        }
      });



  

    let chatmsgs = [];
    firebase.database().ref('chatrooms').child(this.state.currentGroup).child('chat').on('value', (val) => {
      chatmsgs = [];
      this.setState({
        chats: []
      })
      val.forEach(v => {
        chatmsgs.push(v.val());
      });
      this.setState({
        chats: chatmsgs
      })
      console.log(this.state.chats)
    });


  }

  async componentDidMount() {
    await this.checkForNewNots()
    await this.getusers()


  }
  async componentDidUpdate() {
    await this.getusers()

  }
  async getusers() {
    if (localStorage.getItem('users') == undefined) {
      // if already cached dont get them 
      await axios.get(`http://localhost:8080/api/users`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(res => {
          if (res.status === 200) {
            console.log('USES SSSSS', res)
            this.setState({ users: res.data.users })
            localStorage.setItem('users', JSON.stringify(res.data.users))

          } else {
            throw error;
          }
        }).catch(err => {
          console.log(err)
          throw err;
        })
    } else if (this.state.users.length < 1) {
      this.setState({
        users: JSON.parse(localStorage.getItem('users'))
      })
    }
  }
  async checkForNewNots() {
    await axios.get(`http://localhost:8080/api/notifications/new/${this.state.name}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.status === 200) {
          const data = res.data
          // console.log(data)
          if (data.length > 0) {
            this.setState({ newNot: true, length: data.length });
            localStorage.setItem('notsCount', data.length)
          }
        } else {
          //  console.log(res.error)
          const error = new Error(res.error);
          throw error;
        }
      }).catch(err => {
        // console.log(err)
        // this.setState({ email: "Guest" });
      })
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
     // console.log(prop)
      if (prop.name == "Profile" || prop.name == 'CHAT ROOM') {
        return <div></div>
      }
      else
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
              {prop.name == 'Notifications' && this.state.newNot && <small style={{ color: 'red', paddingLeft: '1%' }}>{'  (' + this.state.length + ')  '}</small>}
            </NavLink>
          </NavItem>
        );
    });
  };




  search = e => {
    this.setState({ search: e.target.value })
    console.log('changing')
  }


  render() {

    const ROOT_CSS = css({
      height: 700,

    });


    const active = css({
      color: '#fff',
      background: '#000',
      borderRadius: '10px',
      height: '30px',
      margin: '1rem',
      position: 'relative',
      fontSize: '18px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'
    })


    const groupCard = css({
      background: '#fff',
      borderRadius: '10px',
      height: '30px',
      margin: '1rem',
      fontSize: '18px',
      position: 'relative',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'
    })

    const chatRooms = this.state.chatrooms.map((m) => {
      return (
        <div className={localStorage.getItem('activeRoom') == m.id ? active : groupCard} key={m.id} onClick={() => {
          window.open('/admin/chat-room', '_self')
          localStorage.setItem("activeRoom", m.id)
          var id = m.id
          console.log(id);

          this.setState({ currentGroup: id }, () => {
            console.log(this.state.currentGroup);

            firebase.database().ref('chatrooms').child(this.state.currentGroup).once('value', (v) => {
              this.setState({
                currentGroupName: v.val().name,
              })
            })

            let chatmsgs = [];
            firebase.database().ref('chatrooms').child(this.state.currentGroup).child('chat').on('value', (val) => {
              chatmsgs = [];
              this.setState({
                chats: []
              })
              val.forEach(v => {
                chatmsgs.push(v.val());
              });
              this.setState({
                chats: chatmsgs
              })
              console.log(this.state.chats)
            });
          });
        }}>

          <h4 className="text-center" style={{ paddingTop: '4px' }}>{m.name}</h4>
        </div>
        // </NavLink>
      );
    });

    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    var value = ''
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img className="img=fluid" alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                        <a href={logo.outterLink}>
                          <img className="img=fluid" alt={logo.imgAlt} src={logo.imgSrc} />
                        </a>
                      )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>



            <Nav className="mb-md-3 mt-2  " navbar>



              <NavItem>

                  <a style={{ cursor: 'pointer' }} onClick={() => { this.setState({ groupsToggle: !this.state.groupsToggle }); localStorage.setItem("chatToggle", !this.state.groupsToggle)}} return false>
                    <i style={{ paddingRight: '5%', paddingLeft: '8%' }} className="ni ni-spaceship" />
                    Group Chats <i style={{ paddingTop: '5%', paddingLeft: '4%' }} className="ni ni-bold-right"></i>
                  
                  </a>
                {/* </NavLink> */}

                <div style={{ display: this.state.groupsToggle ? 'block' : 'none' }}>

                  {chatRooms}
                </div>
              </NavItem>
            </Nav>

            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
            <h6 className="navbar-heading text-muted">Contact Us</h6>

            {/* Navigation */}
            <Nav className="mb-md-3" navbar>
              <NavItem>



                <a
                  className="font-weight-bold ml-1"
                  href="https://cloudmates.ca"
                  rel="noopener noreferrer"
                  target="_blank"
                >


                  <i style={{ paddingRight: '5%', paddingLeft: '8%' }} className="ni ni-spaceship" />
                  Support
                  </a>



                <h3 style={{ paddingLeft: '10%', marginTop: '5%', marginBottom: '1%' }} className="navbar-heading text-success">
                  Site Visits
                              </h3>


                <a href="https://www.freecounterstat.com" title="website counter"><img style={{ paddingLeft: '10%', marginTop: '-5%' }} src="https://counter10.wheredoyoucomefrom.ovh/private/freecounterstat.php?c=fyp6awnpceumf6lzrg5n8wd2j1b7cl4l" border="0" title="website counter" alt="website counter"></img></a>
                {/* <ul style={{ "list-style-type": "none;" }}>
                  <input className="form-control" placeholder="Search Users.." onChange={(e) => this.setState({ search: e.target.value })} />
                  {this.state.search == '' ? this.state.users.map(x => {
                    return (
                      <li>{x.name}</li>
                    )
                  })
                    :
                    this.state.users.filter(x => x.name.split(' ').includes(x.title)).map(x => x.name)}
                </ul> */}
                {/* <Autocomplete
                  items={this.state.users}
                  getItemValue={item => item.name}
                  shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1}

                  renderItem={(item, isHighlighted) =>
                    <ul key={item._id} style={{ listStyleType: 'none', backgroundColor: isHighlighted ? '#039FEE' : 'white' }}>
                      <a href={"/admin/profile/" + item._id}><li style={{ fontSize: '15px', color: isHighlighted ? 'white' : undefined,  }}>{item.name}</li></a>
                    </ul>
                  }
                  value={this.state.search}
                  // className="form-control"
                  placeholder="Search users.."
                  onChange={e => this.setState({ search: e.target.value })}
                /> */}

              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
