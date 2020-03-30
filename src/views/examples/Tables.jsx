import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";



// core components
import Header from "../../components/Headers/Header.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { Message, Image, Segment, Grid } from "semantic-ui-react";


import { SketchPicker } from 'react-color';


let tags = ["All", "Y8", "Y9", "Y10", "Y11", "Y12", "Suggestions"];

class Tables extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      originalPosts: [],
      modal: false,
      tag: "All",
      filterTag: "All",
      new_post_title: "",
      new_post_content: "",
      current_user: {},
      newpoints: "",
      usernewpoints: "",
      colorModal: false,
      color: 'red',
      selectedPost: {}
    };
    this.toggle = this.toggle.bind(this);
  }


  handleChangeComplete = (c) => {
    this.setState({ color: c.hex });
  };

  componentWillMount() {
    console.log("THIS IS HERE");
    axios
      .get("/api/posts/", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          console.log("Got all posts");
          console.log(data);
          this.setState({ posts: data.posts });
        } else {
          console.log("Unable to get all posts");
        }
        axios
          .get(`/api/users?name=${this.props.name}`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then(res => {
            if (res.status === 200) {
              const user = res.data.users[0];
              this.setState({ current_user: user });
            } else {
              console.log("Unable to get all posts");
            }
          });
      });
  }

  isLoggedIn() {
    return this.props.name !== "Guest";
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
      .post(
        `/api/posts/`,
        {
          username: this.props.name,
          title: this.state.new_post_title,
          content: this.state.new_post_content,
          tag: this.state.tag
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          console.log("added new post");
        } else {
          alert("Unable to add a new post. Please try again");
        }
      });
    this.changeUserPoints(5, this.props.name);
    this.toggle();
    // TODO: Simplify
    axios
      .get(`/api/posts/`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          console.log("Got all posts:");
          console.log(data);
          this.setState({ posts: data.posts });
        } else {
          console.log("Unable to get all posts");
        }
      });
  };

  onDelete(post_id, post_username) {
    //This is what you were working on IBRAHIM
    // const replies = this.state.posts[0].replies;
    // for(let reply of replies) {
    //   console.log(reply);
    // }
    // return;

    axios
      .delete(`/api/posts/${post_id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.changeUserPoints(-10, post_username);
          //This is what you were working on IBRAHIM
          // for(let post of this.state.posts) {
          // for(let reply of post.replies) {
          // console.log(reply);
          // }
          // }
          // for(let reply of this.state.posts[0]) {
          // console.log(reply)
          // }

          axios
            .get(`https://localhost:8080/api/posts`)
            .then(res => {
              if (res.status === 200) {
                const data = res.data;
                this.setState({ posts: data.posts });
              } else {
                console.log("doesnt matter");
              }
            });
        } else {
          console.log("Unable to Delete this post");
        }
      });
  }

  onChangeStatus(post_id) {
    console.log("RESOLVE");
    axios
      .patch(
        `/api/posts/${post_id}`,
        {
          resolved: true
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          // this.changeUserPoints(-1)
          axios
            .get(`/api/posts`, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            })
            .then(res => {
              if (res.status === 200) {
                const data = res.data;
                this.setState({ posts: data.posts });
              } else {
                console.log("doesnt matter");
              }
            });
        } else {
          console.log("Unable to Delete this post");
        }
      });
  }

 

  onChangeColorToRed(post_id) {
    console.log(post_id);

    axios
      .patch(
        `/api/posts/${post_id}`,
        {
          readOnly: true
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          // this.changeUserPoints(-1)
          axios
            .get(`/api/posts`, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            })
            .then(res => {
              console.log("Re Render");
              console.log(res.data);
              if (res.status === 200) {
                const data = res.data;
                this.setState({ posts: data.posts });
              } else {
                console.log("doesnt matter");
              }
            });
        } else {
          console.log("Unable to Delete this post");
        }
      });
  }

  onChangeColorToBlue(post_id) {
    console.log(post_id);
    axios
      .patch(
        `/api/posts/${post_id}`,
        {
          readOnly: false
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          // this.changeUserPoints(-1)
          axios
            .get(`/api/posts`, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            })
            .then(res => {
              if (res.status === 200) {
                const data = res.data;
                this.setState({ posts: data.posts });
              } else {
                console.log("doesnt matter");
              }
            });
        } else {
          console.log("Unable to Delete this post");
        }
      });
  }

  changeUserPoints(delta, post_username) {
    let user_name = post_username;
    axios
      .get(`/api/users?name=${user_name}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          let users = res.data.users;
          if (users.length > 0) {
            let user_found = users[0];
            let user_id = user_found._id;
            let new_points = user_found.points + delta;
            axios
              .patch(
                `/api/users/${user_id}`,
                { points: new_points },
                {},
                {
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                }
              )
              .then(res => {
                if (res.status === 200) {
                  console.log(
                    `Succesfully incremenet points of user: ${user_name} by ${delta}`
                  );
                }
              });
          }
        }
      });
  }

  render() {

    const changeColor = (post_id)=>{
      this.setState({
        colorModal: !this.state.colorModal
      })
      console.log(post_id);
      console.log("CHAGING COLOR")
      axios
      .patch(
        `/api/posts/${post_id}`,
        {
          color: this.state.color
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          // this.changeUserPoints(-1)
          axios
            .get(`/api/posts`, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            })
            .then(res => {
              console.log("Re Render");
              console.log(res.data);
              if (res.status === 200) {
                const data = res.data;
                this.setState({ posts: data.posts });
              } else {
                console.log("doesnt matter");
              }
            });
        } else {
          console.log("Unable to Delete this post");
        }
      });
    }

    console.log(this.state.tag);
    let adminPosts = this.state.posts.filter(post => {
      return post.readOnly;
    });
    let normalPosts = this.state.posts.filter(post => {
      return post.readOnly == null || post.readOnly === false;
    });

    let allPosts = adminPosts.concat(normalPosts);
    let table_rows = allPosts.map(post => {
      let isSameUser = post.username === this.props.name;
      let isResolved = post.resolved;
      let adminTrue = this.props.name === "Admin";
      if (post.tag !== this.state.filterTag && this.state.filterTag !== "All")
        return;
      // let display;
      // if (adminTrue) {
      //   display = (
      //     <div>style={   {display: 'block'} } </div>
      //   )
      // }else{
      //   display = (

      //   <div>style={(!isSameUser || !this.isLoggedIn()) ? {display: 'none'}: {}  } </div>
      //   )
      // }
      console.log(adminTrue);
      let bar;
      if (!isResolved) {
        bar = (
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            In Progress
          </Badge>
        );
      } else if (post.readOnly) {
        bar = (
          <Badge color="" className="badge badge-info">
            IMPORTANT
          </Badge>
        );
      } else {
        bar = (
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-success" />
            Resolved
          </Badge>
        );
      }

      return (
        <tr key={post._id}>
          <th scope="row">
            <Media className="align-items-center">
              <i className="ni ni-align-left-2"> </i>
              <Media>
                <span className="mb-0 text-sm">
                  <Link
                    style={ { color: post.color } }
                    to={{ pathname: "/admin/mentor/" + post._id }}
                    key={post._id}
                  >
                    {post.title}
                  </Link>
                </span>
              </Media>
            </Media>
          </th>
          <td>{post.replies.length}</td>
          <td>
            <Badge color="" className="badge badge-warning">
              {post.tag}
            </Badge>
          </td>
          <td>{bar}</td>
          <td>
            {/* {post.username}    */}

            {post.username}
          </td>
          <td>
            {moment
              .parseZone(post.timestamp)
              .local()
              .fromNow()}
          </td>
          <td className="text-right">
            <div
              style={
                (isSameUser || this.isLoggedIn()) &&
                (!this.state.current_user ||
                  !this.state.current_user.userType ||
                  this.state.current_user.userType !== "ADMIN"
                  )
                  ? { display: "none" }
                  : {}
              }
              //  style={  (!this.isLoggedIn()) ? {display: 'none'}: {}  }
              // style={  (!isSameUser) ? {display: 'none'}: {}  }

              // style={(adminTrue  ||  isSameUser || this.isLoggedIn()) ? {display: 'block'}: {}}
              // style={(!adminTrue ) ? {display: 'none'}: {}}

              // style={
              //   (!isSameUser || !this.isLoggedIn()) ? {display: 'none'}: {}
              //   }
            >
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem>
                    <a
                      className="text-danger"
                      onClick={() => this.onDelete(post._id, post.username)}
                    >
                      Remove
                    </a>
                  </DropdownItem>

                  {this.state.current_user.userType == "ADMIN"  ? (
                    <DropdownItem>
                      <a
                        className="text-danger"
                        onClick={() =>
                          post.readOnly
                            ? this.onChangeColorToBlue(post._id)
                            : this.onChangeColorToRed(post._id)
                        }
                      >
                        {" "}
                        {post.readOnly ? "Mark Read / Write" : "Mark Read Only"}
                      </a>
                    </DropdownItem>
                  ) : (
                    <div></div>
                  )}

                  {this.state.current_user.userType == "ADMIN"  ? (
                    <DropdownItem>
                      <a
                        className="text-danger"
                        onClick={() =>{
                        let sPost = post
                         toggleColor()
                         this.setState({
                           selectedPost: sPost
                         });
                        }
                        }
                      >
                        {"CHANGE COLOR"}
                      </a>
                    </DropdownItem>
                  ) : (
                    <div></div>
                  )}

                  <DropdownItem style={isResolved ? { display: "none" } : {}}>
                    <a
                      className="text-success"
                      onClick={() => this.onChangeStatus(post._id)}
                    >
                      Mark as Resolved{" "}
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div
              style={
                !this.state.current_user ||
                !this.state.current_user.userType ||
                this.state.current_user.userType !== "MOD"
                  ? { display: "none" }
                  : {}
              }
            >
             <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem>
                    <a
                      className="text-danger"
                      onClick={() => this.onDelete(post._id, post.username)}
                    >
                      Remove
                    </a>
                  </DropdownItem>

                  {this.state.current_user.userType == "MOD"  ? (
                    <DropdownItem>
                      <a
                        className="text-danger"
                        onClick={() =>
                          post.readOnly
                            ? this.onChangeColorToBlue(post._id)
                            : this.onChangeColorToRed(post._id)
                        }
                      >
                        {" "}
                        {post.readOnly ? "Mark Read / Write" : "Mark Read Only"}
                      </a>
                    </DropdownItem>
                  ) : (
                    <div></div>
                  )}

                  {this.state.current_user.userType == "MOD"  ? (
                    <DropdownItem>
                      <a
                        className="text-danger"
                        onClick={() =>{
                        let sPost = post
                         toggleColor()
                         this.setState({
                           selectedPost: sPost
                         });
                        }
                        }
                      >
                        {"CHANGE COLOR"}
                      </a>
                    </DropdownItem>
                  ) : (
                    <div></div>
                  )}

                  <DropdownItem style={isResolved ? { display: "none" } : {}}>
                    <a
                      className="text-success"
                      onClick={() => this.onChangeStatus(post._id)}
                    >
                      Mark as Resolved{" "}
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </td>
        </tr>
      );
    });


    const toggleColor = () =>{
        this.setState({colorModal: !this.state.colorModal})
      
    }

    return (
      <>
        <Header />

        {/* Page content */}

        <Container className="mt--7" fluid>
          <Message style={{ marginBottom: "" }} size="small" color="red">
            <Message.Header>
              Welcome to CloudMates - Everyone Stay Safe!
            </Message.Header>

      
          </Message>
          <div
            style={
              !this.state.current_user ||
              !this.state.current_user.userType ||
              this.state.current_user.userType !== "MOD"
                ? { display: "none" }
                : {}
            }
          >
            {/* <iframe
              width="450"
              height="350"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              allowtransparency="true"
              src="https://chatroll.com/embed/chat/cloudmates?id=82DE-42PjaF&platform=html"
            ></iframe> */}
          </div>
          <div
            style={
              !this.state.current_user ||
              !this.state.current_user.userType ||
              this.state.current_user.userType !== "ADMIN"
                ? { display: "none" }
                : {}
            }
          >
            {/* <iframe
              width="1000"
              height="350"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              allowtransparency="true"
              src="https://chatroll.com/embed/chat/cloudmates?id=82DE-42PjaF&platform=html"
            ></iframe> */}
          </div>

          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader
                  style={{
                    backgroundRepeat: "repeat",
                    backgroundImage:
                      'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNarfhvpyI9_wzGSXbXUH5Yn0Q9CAApXoBz8sDxKapfADJkqbiDw")'
                  }}
                  className="border-0"
                >
                  <Row>
                    <h3 className="mb-0">Posts</h3>

                    <Button
                      color="primary"
                      disabled={this.props.name === "Guest"}
                      style={{ marginLeft: "auto" }}
                      onClick={this.toggle}
                    >
                      Create New Post
                    </Button>
                    <select
                      className="custom-select col-2"
                      style={{ color: "black" }}
                      onChange={o =>
                        this.setState({ filterTag: o.target.value })
                      }
                    >
                      {tags.map(o => (
                        <option
                          style={{ color: "black" }}
                          value={o}
                          selected={this.state.tag == o}
                        >
                          {o}
                        </option>
                      ))}
                    </select>
                    <Button
                      color="danger"
                      style={
                        !this.state.current_user ||
                        !this.state.current_user.userType ||
                        this.state.current_user.userType !== "ADMIN"
                          ? { display: "none" }
                          : {}
                      }
                    >
                      You are an Admin
                    </Button>
                    <Button
                      color="warning"
                      style={
                        !this.state.current_user ||
                        !this.state.current_user.userType ||
                        this.state.current_user.userType !== "MOD"
                          ? { display: "none" }
                          : {}
                      }
                    >
                      You are a Moderator
                    </Button>
                  </Row>
                  <div>

                  <Modal isOpen={this.state.colorModal} toggle={toggleColor}>
              <ModalHeader toggle={toggleColor}>Update Color  </ModalHeader>
              <ModalBody >

              <Segment>
  <Grid>
    <Grid.Column textAlign="center">
    <SketchPicker
        width={400}
        color={ this.state.color }
        onChangeComplete={ this.handleChangeComplete }
      />
    </Grid.Column>
  </Grid>
</Segment>

           
          
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={()=>{changeColor(this.state.selectedPost._id)}}>
                  Apply
                </Button>{" "}
                <Button color="secondary" onClick={toggleColor}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

                    <Modal
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                      className={this.props.className}
                    >
                      <ModalHeader toggle={this.toggle}>
                        Create a New Post
                      </ModalHeader>
                      <ModalBody>
                        <Form role="form" onSubmit={this.onSubmit}>
                          <FormGroup>
                            <Label for="exampleEmail">Title</Label>
                            <Input
                              name="new_post_title"
                              value={this.state.new_post_title}
                              onChange={this.handleInputChange}
                              required
                              placeholder="Type your topic here."
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="exampleText">Content</Label>
                            <Input
                              type="textarea"
                              name="new_post_content"
                              value={this.state.new_post_content}
                              onChange={this.handleInputChange}
                              required
                              placeholder="Type your message content here."
                            />
                          </FormGroup>
                          <ModalFooter>
                            <select
                              className="custom-select col-3"
                              style={{ color: "black" }}
                              onChange={o =>
                                this.setState({ tag: o.target.value })
                              }
                              value={this.state.tag}
                            >
                              {tags.map(o => (
                                <option
                                  style={{ color: "black" }}
                                  value={o}
                                  selected={this.state.tag == o}
                                >
                                  {o}
                                </option>
                              ))}
                            </select>
                            <Button color="primary" type="submit">
                              Post
                            </Button>
                            <Button color="secondary" onClick={this.toggle}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </div>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Replies</th>
                      <th scope="col">Tag</th>
                      <th scope="col">Status</th>
                      <th scope="col">User</th>
                      <th scope="col">Creation Date</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>{table_rows}</tbody>
                </Table>
                {/* <div style={(!this.state.current_user || !this.state.current_user.userType || this.state.current_user.userType !== 'MOD') ?  {display: 'none'}: {}}>
                              <iframe width="450" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowtransparency="true" src="https://chatroll.com/embed/chat/cloudmates?id=82DE-42PjaF&platform=html"></iframe>
                              </div>
                              <div style={(!this.state.current_user || !this.state.current_user.userType || this.state.current_user.userType !== 'ADMIN') ?  {display: 'none'}: {}}>
                              <iframe width="450" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowtransparency="true" src="https://chatroll.com/embed/chat/cloudmates?id=82DE-42PjaF&platform=html"></iframe>
                              </div> */}
                {/* <CardFooter className="py-4">
                  <nav aria-label="...">
                  <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter> */}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
