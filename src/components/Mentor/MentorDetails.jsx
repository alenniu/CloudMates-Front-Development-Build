// /*!


// =========================================================
// * Mentr Website - v1.0.0
// =========================================================

// * Copyright 2019 Mentr Team 

// * Coded by Mentr Team

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


// */
// import React from "react";
// import axios from "axios";
// import { Button, Comment, Form, Image, Icon, Card as CardSemanticUI } from 'semantic-ui-react'

//   // reactstrap components
// import { Card, CardHeader ,CardBody ,CardTitle ,Container, Row, Alert } from "reactstrap";
// import Header from "components/Headers/Header.jsx";
// import moment from 'moment';
// import "../../assets/css/divider.scss"

// import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';
// import { faCrown } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import '../../assets/css/editor.css'




// class MentorDetails extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             post: null, 
//             post_id: '',
//             users_info: {},
// 	    current_user: {},
//             editorState: EditorState.createEmpty(), 
//         };
//     }
//     onEditorStateChange = (editorState) => {
//       console.log(editorState)
//       this.setState({
//         editorState,
//       });
//     };
    

    


//     componentWillMount() {
//         let paths = this.props.location.pathname.split("/")
//         let post_id = paths[paths.length-1]
//         this.setState({ post_id })

//         axios.get(`http://localhost:8080/api/posts/${post_id}`)
//         .then(res => {
//           if (res.status === 200) {
//             const data = res.data
//             this.setState({post: data.post});
//             // console.log(data.post)
//             let replies = data.post.replies
//             for(let i = 0; i < replies.length; i++){
//               let reply = replies[i]
//               let reply_username = reply.username
//               axios.get(`http://localhost:8080/api/users/?name=${reply_username}`)
//                .then(res => {
//                  if(res.status === 200) {
//                    const user = res.data.users[0]
//                    const new_users_info = {
//                      ...this.state.users_info,
//                      [reply_username]: user
//                    }
//                    this.setState({users_info: new_users_info});
//                  }
//                })
//             }

//           }else{
//             console.log("Unable to get this post by id")
//           }
// axios.get(`http://localhost:8080/api/users?name=${this.props.name}`)
//         .then(res => {
//           if (res.status === 200) {
//             const user = res.data.users[0]
//             this.setState({current_user: user});
//           }else{
//             console.log("Unable to get all posts")
//           }
//         })
//         })
//       }

//       onSubmit (text) {
//         return event => {
//           event.preventDefault();
//           let new_reply = {
//             content: text,
//             username: this.props.name
//           }
//           this.setState({reply_content: ''})
//           fetch(`http://localhost:8080/api/posts/${this.state.post_id}/replies`,  {
//             method : 'POST',
//             body: JSON.stringify({
//               replies: [new_reply]
//             }),
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           })
//           .then(res => {
//             if ( res.status === 200) {
//               axios.get(`http://localhost:8080/api/posts/${this.state.post_id}`)
//               .then(res => {
//                 if (res.status === 200) {
//                   const data = res.data
//                   this.setState({ post: data.post });
//                 }
//                 this.changeUserPoints(1,this.props.name)
//               })
//               console.log('Success')
//             } else {
//               alert("Unable to submit reply. Please try again.")
//             }
//           })
//           .catch(err => {
//             alert('Wrong Email or Password, please try again later')
      
//           });
//       }
//       }
//       isLoggedIn() {
//         return this.props.name !== 'Guest'
//       }

//       removeOnClick(reply_id,reply_username) {
//         axios.delete(`http://localhost:8080/api/posts/${this.state.post_id}/replies/${reply_id}`)
//         .then(res => {
//           if (res.status === 200) {
//             this.changeUserPoints(-1,reply_username)
//             axios.get(`http://localhost:8080/api/posts/${this.state.post_id}`)
//             .then(res => {
//               if (res.status === 200) {
//             const data = res.data
//             this.setState({post: data.post});
//           }else{
//             console.log("Unable to get this post by id")
//           }
//         })
//       }else{
//         console.log("Unable to Delete this reply")
//       }
//     })
//   }

//   changeUserPoints(delta,reply_username) {
//     let user_name = reply_username
//     axios.get(`http://localhost:8080/api/users?name=${user_name}`)
//     .then(res => {
//       if(res.status === 200) {
//         let users = res.data.users
//         console.log(users)
//      if(users.length > 0) {
//         let user_found = users[0]
//         let user_id = user_found._id
//         let new_points = user_found.points + delta
//         axios.patch(`http://localhost:8080/api/users/${user_id}`, {points: new_points}, {})
//         .then(res => {
//           if(res.status === 200) {
//             console.log(`Succesfully incremenet points of user: ${user_name} by ${delta}`)
//       }
//       else{
//         console.log('problems')
//       }
//     })
//   }
//   }
// })
// }

//   getUser(username) {
//     if(this.state.users_info[username]) {
//       return this.state.users_info[username]
//     }else{
//       return {}
//     }
//   }


//     render() {
//       const isLoggedIn = this.isLoggedIn()
//         if(this.state.post === null){
//             return null;
//         }
//         // console.log(this.state.post)
//         let replies = this.state.post.replies
//         const { editorState } = this.state;
//         let comments = replies.map((reply) => {
//         let isSameUser = (reply.username === this.props.name) 
        

//             return (
              
//                 <Comment className='row'>
                  
//                 {/* <Comment.Avatar as='a' src={`https://ui-avatars.comhttp://localhost:8080/api/?background=0D8ABC&color=fff&bold=true&rounded=true&name=${reply.username}` }/> */}
//                 <CardSemanticUI className='col-md-2 col-lg-2' style={{maxHeight: '40vh'}}>
//                   <Image src={`https://ui-avatars.comhttp://localhost:8080/api/?background=0D8ABC&color=fff&bold=true&name=${reply.username}` } wrapped ui={false} />
//                   <CardSemanticUI.Content>
//                     <CardSemanticUI.Header>{reply.username}</CardSemanticUI.Header>
//                     <CardSemanticUI.Meta>
//                       <span className='date'>{ moment.parseZone(reply.timestamp).local().fromNow()}</span>
//                     </CardSemanticUI.Meta>

//                     <CardSemanticUI.Description style={(this.getUser(reply.username).userType === "ADMIN") ? {backgroundColor: "#FF2322", borderRadius: '5px'}: (this.getUser(reply.username).userType === "MOD") ? {backgroundColor: "#DAA520", borderRadius: '5px'}: {backgroundColor: "#4D87C1", borderRadius: '5px'}} >
//                       <p className="text-center" style={{ fontWeight: 'bold', color: 'white'}}>{this.getUser(reply.username).userType}</p>
//                     </CardSemanticUI.Description>
                    
                    
//                   </CardSemanticUI.Content>
//                   <CardSemanticUI.Content extra>
                    
                  
//                   <FontAwesomeIcon icon={faCanadianMapleLeaf}  />
//                    <span style={{paddingLeft: '5%', paddingRight: '30%'}}>
//                       {this.getUser(reply.username).points}
//                   </span>

//                   <FontAwesomeIcon icon={faCrown}  />
//                  <span style={{paddingLeft: '5%'}} >
//                       {this.getUser(reply.username).level}
//                     </span>
//                     {/* style={(this.getUser(reply.username).level > 10) ? {color: 'blue'}: {}} */}
//                   </CardSemanticUI.Content>
//                 </CardSemanticUI>
//                 <Comment.Content className='col-md-10 col-lg-10' style={{paddingLeft: '10%'}}>
//                     <Comment.Text style={{fontSize: '130%'}}>
//                       <div dangerouslySetInnerHTML={{__html: reply.content}}></div>
//                     </Comment.Text>
//                     <Comment.Actions>
//                     <Comment.Action>
// <span style={(isSameUser || !isLoggedIn) ? {display: 'none'}: {}}>
//                         <i className="ni ni-like-2"></i>
//                         <span style={{paddingRight: '10px'}}><a>Love</a></span>
//                       </span>
//  <span style={((!isSameUser || !isLoggedIn) && (!this.state.current_user || !this.state.current_user.userType || this.state.current_user.userType !== 'ADMIN')) ? {display: 'none'} : {}}><a onClick={()=>this.removeOnClick(reply._id,reply.username)}>Remove </a></span>
//                  <span style={ (!this.state.current_user || !this.state.current_user.userType || this.state.current_user.userType !== 'MOD') ? {display: 'none'} : {}}><a onClick={()=>this.removeOnClick(reply._id,reply.username)}>Remove </a></span>
                               


//                     </Comment.Action>
//                     </Comment.Actions>
//                 </Comment.Content>
//                 <b className="hrr anim"></b>
//                 </Comment>
//             )
//           })

  
//         return (
//           <>
//             <Header />
//             {/* Page content */}
//             <Container className="mt--7" fluid>
//               <Row>
//                   <Card body>
//                       <CardHeader className="text-primary" style={{fontSize: '200%'}}>{this.state.post.title}</CardHeader>
//                       Created By {this.state.post.username} {moment.parseZone (this.state.post.timestamp).local().fromNow()}
//                       <CardBody> 
//                           <div>
//                               <CardTitle style={{fontSize: '130%', mariginRight: '25%', lineHeight: '1.5'}}>{this.state.post.content}
// </CardTitle>
//                           </div>
//                           <Comment.Metadata>
//                     <div></div>
//                     </Comment.Metadata>
//                          <Comment.Group size='large' style={{maxWidth: '80%'}}>
//                           <b className="hrr anim"></b>
//                            {comments}
//   <Form style={(this.state.post.readOnly || this.state.post.readOnly === true) ? {display: 'none'}: {}} reply onSubmit={this.onSubmit(draftToHtml(convertToRaw(editorState.getCurrentContent())))}>
//                         <Editor 
//                              placeholder="Enter Text to reply to this post"
//                               toolbarClassName="toolbarClassName"
//                               wrapperClassName="wrapperClassName"
//                               editorClassName="editorClassName"
//                               onEditorStateChange={this.onEditorStateChange}
//                             />
//                             {/* <div>
//                             {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//                             </div> */}
//                             <Alert style={isLoggedIn ? {display: 'none'} : {}} color="dark">
//                               You have to login in order to reply to this post
//                               </Alert>
//                             <Button disabled={!isLoggedIn || this.state.post.readOnly === true}  content='Add Comment'  primary />
//                             </Form>
//                         </Comment.Group>
//                     </CardBody>
//                   </Card>
//               </Row>
//             </Container>
//           </>
//         );
//       }
// }



// export default MentorDetails;
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
import axios from "axios";
import { Button, Comment, Form, Image, Icon, Card as CardSemanticUI } from 'semantic-ui-react'

  // reactstrap components
import { Card, CardHeader ,CardBody ,CardTitle ,Container, Row, Alert } from "reactstrap";
import Header from "../Headers/Header.jsx";
import moment from 'moment';
import "../../assets/css/divider.scss"

import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../assets/css/editor.css'
import {Link} from 'react-router-dom';




class MentorDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            post: null, 
            post_id: '',
            users_info: {},
	    current_user: {},
            editorState: EditorState.createEmpty(),
           
        };
    }
    onEditorStateChange = (editorState) => {
      console.log(editorState)
      this.setState({
        editorState,
      });
    };
    

    


    componentWillMount() {
        let paths = this.props.location.pathname.split("/")
        let post_id = paths[paths.length-1]
        this.setState({ post_id })

        axios.get(`http://localhost:8080/api/posts/${post_id}`,{
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.status === 200) {
            const data = res.data
            this.setState({post: data.post});
            // console.log(data.post)
            let replies = data.post.replies
            for(let i = 0; i < replies.length; i++){
              let reply = replies[i]
              let reply_username = reply.username
              axios.get(`http://localhost:8080/api/users/?name=${reply_username}`,{
                headers: {
                  Authorization: localStorage.getItem('token')
                }
              })
               .then(res => {
                 if(res.status === 200) {
                   const user = res.data.users[0]
                   const new_users_info = {
                     ...this.state.users_info,
                     [reply_username]: user
                   }
                   this.setState({users_info: new_users_info});
                 }
               })
            }

            console.log("USERS")
            console.log(this.state.users_info)

          }else{
            console.log("Unable to get this post by id")
          }
axios.get(`http://localhost:8080/api/users?name=${this.props.name}`,{
  headers: {
    Authorization: localStorage.getItem('token')
  }
})
        .then(res => {
          if (res.status === 200) {
            const user = res.data.users[0]
            this.setState({current_user: user});
          }else{
            console.log("Unable to get all posts")
          }
        })
        })
      }

      onSubmit (text) {
        return event => {
          event.preventDefault();
          let new_reply = {
            content: text,
            username: this.props.name
          }
          this.setState({reply_content: ''})
          fetch(`http://localhost:8080/api/posts/${this.state.post_id}/replies`,  {
            method : 'POST',
            body: JSON.stringify({
              replies: [new_reply]
            }),
            headers: {
              'Content-Type': 'application/json',
                  Authorization: localStorage.getItem('token')
            }
          })
          .then(res => {
            if ( res.status === 200) {
              axios.get(`http://localhost:8080/api/posts/${this.state.post_id}`,{
                headers: {
                  Authorization: localStorage.getItem('token')
                }
              })
              .then(res => {
                if (res.status === 200) {
                  const data = res.data
                  this.setState({ post: data.post });
                }
                this.changeUserPoints(10,this.props.name)
              })
              console.log('Success')
            } else {
              alert("Unable to submit reply. Please try again.")
            }
          })
          .catch(err => {
            alert('Wrong Email or Password, please try again later')
      
          });
      }
      }
      isLoggedIn() {
        return this.props.name !== 'Guest'
      }

     

      

      removeOnClick(reply_id,reply_username) {
        axios.delete(`http://localhost:8080/api/posts/${this.state.post_id}/replies/${reply_id}`,{
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.changeUserPoints(-15,reply_username)
            axios.get(`http://localhost:8080/api/posts/${this.state.post_id}`,{
              headers: {
                Authorization: localStorage.getItem('token')
              }
            })
            .then(res => {
              if (res.status === 200) {
            const data = res.data
            this.setState({post: data.post});
          }else{
            console.log("Unable to get this post by id")
          }
        })
      }else{
        console.log("Unable to Delete this reply")
      }
    })
  }

  changeUserPoints(delta,reply_username) {
    let user_name = reply_username
    axios.get(`http://localhost:8080/api/users?name=${user_name}`,{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      if(res.status === 200) {
        let users = res.data.users
     if(users.length > 0) {
        let user_found = users[0]
        let user_id = user_found._id
        let new_points = user_found.points + delta
        axios.patch(`http://localhost:8080/api/users/${user_id}`, {points: new_points},{
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          if(res.status === 200) {
            this.setState({ liked: true });
            console.log(`Succesfully incremenet points of user: ${user_name} by ${delta}`)
      }
    })
  }
  }
})
}

// changeLiked(delta,reply_username) {
//   let user_name = reply_username
//   axios.get(`http://localhost:8080/api/users?name=${user_name}`)
//   .then(res => {
//     if(res.status === 200) {
//       let users = res.data.users
//    if(users.length > 0) {
//       let user_found = users[0]
//       let user_id = user_found._id
//       let new_points = user_found.points + delta
//       axios.patch(`http://localhost:8080/api/users/${user_id}`, {points: new_points}, {})
      
//       .then(res => {
//         if(res.status === 200) {
          
//           console.log(`Succesfully incremenet points of user: ${user_name} by ${delta}`)
          
//     }
//   })
// }
// }
// })
// }

  getUser(username) {
    if(this.state.users_info[username]) {
      console.log(this.state.users_info[username]);
      console.log("USER DETAILS")
      return this.state.users_info[username]
    }else{
      return {}
    }
  }


    render() {
      const isLoggedIn = this.isLoggedIn()
        if(this.state.post === null){
            return null;
        }
        // console.log(this.state.post)
        let replies = this.state.post.replies
        const { editorState } = this.state;
        let comments = replies.map((reply) => {
        let isSameUser = (reply.username === this.props.name) 
        

            return (
              
                <Comment className='row'>
                {/* <Comment.Avatar as='a' src={`https://ui-avatars.comhttp://localhost:8080/api/?background=0D8ABC&color=fff&bold=true&rounded=true&name=${reply.username}` }/> */}
                <CardSemanticUI className='col-md-2 col-lg-2' style={{maxHeight: '45vh'}}>
                {/* <Link style={(post.readOnly) ? {color: "red"}: {}}
                              to={{ pathname: '/admin/mentor/'+post._id}}
                              key={post._id}>
                                {post._id}
                              </Link> */}

                  <Image src={`https://ui-avatars.comhttp://localhost:8080/api/?background=0D8ABC&color=fff&bold=true&name=${reply.username}` } wrapped ui={false} />
                  <CardSemanticUI.Content>
                    <CardSemanticUI.Header style={(this.getUser(reply.username).points > 999) ? {color: "blue"}:  (this.getUser(reply.username).points > 699) ? {color: "orange"}: (this.getUser(reply.username).points > 499) ? {color: "gray"}:{}}>{reply.username}</CardSemanticUI.Header>
                    <CardSemanticUI.Meta>
                      <span className='date'>{ moment.parseZone(reply.timestamp).local().fromNow()}</span>
                    </CardSemanticUI.Meta>

                    {/* <CardSemanticUI.Description style={(this.getUser(reply.username).userType === "ADMIN") ? {backgroundColor: "#FF2322", borderRadius: '5px'}: (this.getUser(reply.username).userType === "MOD") ? {backgroundColor: "#DAA520", borderRadius: '5px'}: {backgroundColor: "#4D87C1", borderRadius: '5px'}} >
                      <p className="text-center" style={{ fontWeight: 'bold', color: 'white'}}>{this.getUser(reply.username).userType}</p>
                    </CardSemanticUI.Description> */}
                    <CardSemanticUI.Description style={(this.getUser(reply.username).userType === "USER") ? {backgroundColor: "#4D87C1", borderRadius: '5px'}:(this.getUser(reply.username).userType === "Steward") ? {backgroundColor: "#DAA520", borderRadius: '5px'}: (this.getUser(reply.username).userType === "MOD") ? {backgroundColor: "#DAA520", borderRadius: '5px'}: {display: 'none'}} >
                      <p className="text-center" style={{ fontWeight: 'bold', color: 'white'}}>{this.getUser(reply.username).userType}</p>
                    </CardSemanticUI.Description>
                    <CardSemanticUI.Description style={(this.getUser(reply.username).userType === "ADMIN") ? {backgroundColor: "#FF2322", borderRadius: '5px'}: {display: 'none'}} >
                      <p className="text-center" style={{ fontWeight: 'bold', color: 'white'}}>TEAM</p>
                    </CardSemanticUI.Description>

                    <CardSemanticUI.Description style={(this.getUser(reply.username).userType === "ADMIN") ? {backgroundColor: "white", borderRadius: '5px', paddingTop: '5%'} : {}} > 
                      
                    </CardSemanticUI.Description>
                    <CardSemanticUI.Description style={(this.getUser(reply.username).userType === "ADMIN") ? {backgroundColor: "#2dce89", borderRadius: '5px'}:  (this.getUser(reply.username).userType === "MOD") ? {display: 'none'}: {display: 'none'}}> 
                      <p className="text-center" style={{ fontWeight: 'bold', color: 'white'}}>LEGEND</p>
                    </CardSemanticUI.Description>

                    <br/>

                    <Link  to={{pathname:"/admin/profile/"+this.getUser(reply.username)._id}} style={{textDecoration:'none'}}>

                    <CardSemanticUI.Description style={{backgroundColor: "#CFA7A7", borderRadius: '5px'}}> 
               <p className="text-center" style={{ fontWeight: 'bold', color: 'black'}}>User Profile</p> 

                    </CardSemanticUI.Description>
                    </Link>
                  </CardSemanticUI.Content>
                  <CardSemanticUI.Content extra >
                    
                  
                  <FontAwesomeIcon icon={faCanadianMapleLeaf}  />
                   <span style={{paddingLeft: '5%', paddingRight: '14%'}}>
                      {this.getUser(reply.username).points}
                  </span>

                  <FontAwesomeIcon icon={faCrown}  />
                 <span style={{paddingLeft: '5%'}}>
                      {this.getUser(reply.username).level}
                    </span>
                    
                   
                  </CardSemanticUI.Content>
                </CardSemanticUI>
              
                <Comment.Content className='col-md-10 col-lg-10' style={{paddingLeft: '10%'}}>
                    <Comment.Text style={{fontSize: '130%'}}>
                      <div dangerouslySetInnerHTML={{__html: reply.content}}></div>
                    </Comment.Text>
                    <Comment.Actions>
                    <Comment.Action>
<span style={(isSameUser || !isLoggedIn) ? {display: 'none'}: {}}>
                        <i className="ni ni-like-2"></i>
                        <span  style={ (this.props.name !== this.state.post.username) ? {display: 'none'} : {paddingRight:'10%'}}><a onClick={()=>this.changeUserPoints(10,reply.username)}>Love</a></span>
                      </span>
 <span style={((!isSameUser || !isLoggedIn) && (!this.state.current_user || !this.state.current_user.userType || this.state.current_user.userType !== 'ADMIN')) ? {display: 'none'} : {}}><a onClick={()=>this.removeOnClick(reply._id,reply.username)}>Remove </a></span>
                 <span style={ (!this.state.current_user || !this.state.current_user.userType || this.state.current_user.userType !== 'MOD') ? {display: 'none'} : {}}><a onClick={()=>this.removeOnClick(reply._id,reply.username)}>Remove </a></span>
                               
                 {/* style={{paddingRight: '10px'}} */}

                    </Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                <b className="hrr anim"></b>
                </Comment>
            )
          })

  
        return (
          <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
              <Row>
                  <Card body>
                      <CardHeader className="text-primary" style={{fontSize: '200%'}}>{this.state.post.title}</CardHeader>
                      Created By {this.state.post.username} {moment.parseZone (this.state.post.timestamp).local().fromNow()}
                      <CardBody> 
                          <div>
                              <CardTitle style={{fontSize: '130%', mariginRight: '25%', lineHeight: '1.5'}}>{this.state.post.content}
</CardTitle>
                          </div>
                          <Comment.Metadata>
                    <div></div>
                    </Comment.Metadata>
                         <Comment.Group size='large' style={{maxWidth: '80%'}}>
                          <b className="hrr anim"></b>
                           {comments}
  <Form style={(this.state.post.readOnly || this.state.post.readOnly === true) ? {display: 'none'}: {}} reply onSubmit={this.onSubmit(draftToHtml(convertToRaw(editorState.getCurrentContent())))}>
                        <Editor 
                             placeholder="Enter Text to reply to this post"
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              onEditorStateChange={this.onEditorStateChange}
                            />
                            {/* <div>
                            {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            </div> */}
                            <Alert style={isLoggedIn ? {display: 'none'} : {}} color="dark">
                              You have to login in order to reply to this post
                              </Alert>
                            <Button disabled={!isLoggedIn || this.state.post.readOnly === true}  content='Add Comment'  primary />
                            </Form>
                        </Comment.Group>
                    </CardBody>
                  </Card>
              </Row>
            </Container>
          </>
        );
      }
}
export default MentorDetails;
