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
import { PropTypes } from "prop-types";
import axios from 'axios'
import Autocomplete from 'react-autocomplete'
import Cookies from "js-cookie";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import * as firebase from 'firebase';


class AdminNavbar extends React.Component {

  logout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.props.history.push('/auth/login')
  }
  state = {

    users: [],
    search:'',
    chatrooms: [],
    value: ""

  };

  
  constructor(){
    super()
   
  }
  

  async componentDidMount() {

    await this.getusers()

    firebase.database().ref('chatrooms').once('value', v=>{
      //    console.log(v.val());
          this.setState({
            chatrooms: v.val()
          });
          console.log(this.state.chatrooms)
        })
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
            console.log("broke");
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

  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.name == "Profile") {
        return <div></div>
      }
      else
        console.log("hi")
    });
  };
  search = e => {
    this.setState({ search: e.target.value })
    console.log('changing')
  }

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  
                  <Autocomplete
                  
                  items={this.state.users}
                  getItemValue={item => item.name}
                  shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1}
                  inputProps={{ style: { height: '32px',borderRadius: '25px'}, placeholder: '    Search For Users'}}  
                 // wrapperStyle={{ width:  '100%'   }}
                  renderItem={(item, isHighlighted) =>
                    <ul key={item._id} style={{ listStyleType: 'none', backgroundColor: isHighlighted ? '#039FEE' : 'white' }}>
                      <a href={"/admin/profile/" + item._id}><li style={{ fontSize: '15px', color: isHighlighted ? 'white' : undefined,  }}>{item.name}</li></a>
                    </ul>
                  }
                  value={this.state.search}
                  //menuStyle={height:"20",borderRadius: '25px'}
                  // className="form-control"
                  placeholder="Search users.."
                  onChange={e => this.setState({ search: e.target.value })}
                />
                

              
                

                
             

                </InputGroup>
              </FormGroup>
            </Form>
            <Nav className="align-it`ems-center d-none d-md-flex" navbar>
              {this.props.name !== "Guest" && 
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={`https://ui-avatars.comhttp://localhost:8080/api/?background=0D8ABC&color=fff&bold=true&name=${this.props.name}`}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        
                        {this.props.name}
                      </span>
                    </Media>
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
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem> */}
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout} >
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              }
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
