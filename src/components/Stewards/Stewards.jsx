
import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,

} from "reactstrap";
import { Button, Comment, Form, Image, Icon, Card as CardSemanticUI } from 'semantic-ui-react'

// core components
import Header from "../Headers/Header.jsx";
import "../../assets/css/stewards.css"

import axios from "axios";
import { PricingTable, PricingSlot, PricingDetail } from 'react-pricing-table';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../assets/css/editor.css'



class Stewards extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      title: '',
      editorState: EditorState.createEmpty(),
      current_user: {points: 0, userType: '', _id: ''},

    }
  }


  onEditorStateChange = (editorState) => {
    console.log(editorState)
    this.setState({
      editorState,
    });
  };

  componentWillMount() {
    axios.get('/api/stewards/')
      .then((res) => {
        if (res.status === 200) {
          this.setState({ data: res.data.stewardsAnnounce })
        }
      })

      let name = localStorage.getItem("username");
    console.log(name)
    console.log(`/api/users?name=${name}`)
    axios.get(`/api/users?name=${name}`,{
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

  onSubmit(x, id) {
    return e => {
      e.preventDefault()
      console.log(x, id)
      fetch(`/api/stewards/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          "title": this.state.title,
          "content": x
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(async res => {
          if (res.status === 200) {
            let d = await res.json();
            let data = this.state.data.map(x => x._id == d._id ? { ...x, content: d.content, title: d.title } : x)

            this.setState({ data })
          } else {
            alert("Unable to submit reply. Please try again.")
          }
        })
        .catch(err => {
          alert('Wrong Email or Password, please try again later')

        });
    }
  }

  render() {
    let { editorState } = this.state
    console.log(this.state)
    return (
      <>


        <Header />
        {/* Page content */}

        <Container className="mt--7" fluid>
          {/* Table */}

          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader>

                  <h1 className="text-center">Stewards Announcements</h1>

                </CardHeader>
                <div className="menuWrapper" >
                  {/* <div className="col-12">
                            <h3 style={{paddingLeft: '30%'}}>Upper Dining Hall</h3>
                            <img className='img3'src={this.state.lunchMenu.images[0]}></img>
                        
                          </div> */}
                  {/* <div className="col-12">
                            <h3 style={{paddingLeft: '43.5%',paddingTop: '0.5%'}}><b>Upper Dining Hall</b></h3>
                            <img className='img4'src={this.state.lunchMenu.images[0]}></img>
                        
                          </div> */}

                  <div style={{ paddingTop: '' }}>
                    <img className='img6' ></img>

                  </div>

                  <div className="row"  >
                    {this.state.data.map(x => (

                      <div className="col-4" style={{ paddingTop: '0.5%' }} >

                        <PricingSlot title={x.title}>

                          <div id='price1' >
                            <div >
                              <Comment.Text style={{ fontSize: '130%' }}>
                                <div dangerouslySetInnerHTML={{ __html: x.content }}></div>
                              </Comment.Text>
                            </div>

                          </div>

                        </PricingSlot>
                        <input className="form-control" placeholder={x.title} onChange={(e) => this.setState({ title: e.target.value })} style={this.state.current_user.userType !== "ADMIN"
                          ? { display: "none" }
                          : {}
                      } />
                        <Form style={this.state.current_user.userType !== "ADMIN"
                          ? { display: "none" }
                          : {width: '100%'}
                      }  reply onSubmit={this.onSubmit(draftToHtml(convertToRaw(editorState.getCurrentContent())), x._id)}>
                          
                          <Editor 
                            placeholder={"Enter Text to edit " + x.title}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                          />
                          {/* <div>
                            {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            </div> */}
                          <Button content='Edit' primary style={this.state.current_user.userType !== "ADMIN"
                          ? { display: "none" }
                          : {}
                      }/>
                        </Form>

                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </Row>

        </Container>

      </>
    );

  }
}

export default Stewards;
