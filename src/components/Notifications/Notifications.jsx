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
import {
    Card,
    CardHeader,
    Container,
    Row,
    Button

} from "reactstrap";
import { Header as Header1, Icon, Image, Modal } from 'semantic-ui-react'

import Header from "../Headers/Header.jsx";

import { PricingTable, PricingSlot, PricingDetail } from 'react-pricing-table';
import { Message} from 'semantic-ui-react'

import Cookies from 'js-cookie';
import moment from 'moment'
import routes from "routes.js";
import axios from "axios";

class Notifications extends React.Component {
    state = {
        nots: [],
        email: '',
        name: localStorage.getItem('username')
    }

    componentDidMount() {
        document.body.classList.add("bg-default");
        this.getNotifications()
    }

    async getNotifications() {
        console.log('getting nots')
        await axios.get(`/api/notifications/${this.state.name}`,{
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
            .then(res => {
                if (res.status === 200) {
                    const data = res.data
       //             console.log(data)
                    this.setState({ nots: data.notifications });
                } else {
                 //   console.log(res.error)
                    const error = new Error(res.error);
                    throw error;
                }
            }).catch(err => {
               // console.log(err)
                // this.setState({ email: "Guest" });
            })
    }
    async addSeen(replyId) {
        await axios.put(`/api/notifications/reply/${this.state.name}/${replyId}`)
            .then(res => {
                if (res.status === 200) {
                    const data = res.data
                  //  console.log(data)
                    localStorage.setItem('notsCount', Number(localStorage.getItem('notsCount')) - 1)
                } else {
                 //   console.log(res.error)
                    const error = new Error(res.error);
                    throw error;
                }
            }).catch(err => {
              //  console.log(err)
            })
    }
    componentWillUnmount() {
        document.body.classList.remove("bg-default");
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/Notifications") {
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
                <Header />
                {/* Page content */}

                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Message style={{marginBottom: ''}} size="small" color='green'>
        <Message.Header>New Notifications will Appear at the Top | Click the specific notification to get rid the red number and see the reply to your post</Message.Header>
      
      </Message>

                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader>

                                    <h1 className="text-center">Notifications</h1>

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
                                        <img className='img3' ></img>

                                    </div>

                                    <div className="row" >
                                        <ul style={{ listStyleType: "none" }}>
                                            {this.state.nots.length > 0 ? this.state.nots.map(not => (
                                                not.posts.reverse().map((post, k) => {
                                                    if (!post.replies[post.replies.length - 1]) return;
                                                    return <li key={k} style={{ fontSize: 30, margin: 15 }}>
                                                        <a href={"/admin/mentor/" + post._id} onClick={() => this.addSeen(post.replies[post.replies.length - 1]._id)}>
                                                            <strong>{post.replies[post.replies.length - 1].username}</strong> replied to your post <strong>{post.title}</strong>
                                                            <br />
                                                            
                                                            <small style={{ marginTop: 35 }}>
                                                                {moment(post.replies[post.replies.length - 1].timestamp).format('hh:mm:ss A D/M/YYYY ')}
                                                            </small>
                                                            
                                                            <br />
                                                        </a>
                                                    </li>
                                                })
                                            )) : <h2 style={{ textAlign: 'center', margin: 15 }}>No Notifications Yet</h2>}
                                        </ul>
                                    </div>

                                </div>
                            </Card>
                        </div>
                    </Row>

                </Container>
                {/* 
                <Card className="shadow">
                    <CardHeader>
                        <h1 className="text-center">Notifications</h1>
                    </CardHeader>
                    <ul className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'>
                        {this.state.nots.map(not => (
                            not.posts.map((post, k) => <li key={k}>new reply to {post.title}</li>)
                        ))}
                    </ul>
                </Card> */}
            </>
        );
    }
}

export default Notifications;
