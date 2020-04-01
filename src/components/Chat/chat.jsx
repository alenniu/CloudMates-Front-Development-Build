import React, { Component } from 'react'
import * as firebase from 'firebase';
import axios from "axios";

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

import ScrollToBottom from 'react-scroll-to-bottom';

import { css } from 'glamor';

import Header from "../../components/Headers/Header.jsx";

import $ from 'jquery';



class ChatRoom extends Component {



    constructor(props) {
        super(props);

        console.log(window.location.href)

        this.state = {
            chatrooms: [],
            current_user: [],
            currentGroup: 1,
            chats: [],
            messageController: "",
            currentUser: [],
            height: '',
            currentGroupName: "",
            uid: '',
            enabled: false,
            mems: [],
            onlineMembers: []
        }





    }


    componentWillMount() {

        let that = this;
        if (!localStorage.getItem('activeRoom')) {
            localStorage.setItem('activeRoom', "1")
        }
        let name = localStorage.getItem('username');

        axios.get(`http://localhost:8080/api/users?name=${name}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.status === 200) {
                    const user = res.data.users[0]
                    this.setState({ current_user: user });
                    let id = this.state.current_user['_id'];
                    let name = this.state.current_user['name'];
                    this.setState({
                        uid: id

                    });

                    var isOfflineForDatabase = {
                        status: 'offline',
                        last_changed: firebase.database.ServerValue.TIMESTAMP,
                    };

                    var isOnlineForDatabase = {
                        status: 'online',
                        last_changed: firebase.database.ServerValue.TIMESTAMP,
                    };

                    var chatRoomOnline = {
                        name: this.state.current_user['name'],
                        online: true
                    };

                    var chatRoomOffline = {
                        name: this.state.current_user['name'],
                        online: false
                    };

                    var userStatusDatabaseRef = firebase.database().ref('users/' + id + '/status');
                    var chatRoomRef = firebase.database().ref('chatrooms/' + localStorage.getItem('activeRoom') + '/online/' + id);
                    // var lastOnlineRef = firebase.database().ref('users/joe/lastOnline');

                    firebase.database().ref('.info/connected').on('value', function (snapshot) {
                        // If we're not currently connected, don't do anything.
                        if (snapshot.val() == false) {
                            return;
                        };




                        // If we are currently connected, then use the 'onDisconnect()' 
                        // method to add a set which will only trigger once this 
                        // client has disconnected by closing the app, 
                        // losing internet, or any other means.

                        chatRoomRef.onDisconnect().set(chatRoomOffline).then(function () {
                            chatRoomRef.set(chatRoomOnline);
                        })

                        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
                            // The promise returned from .onDisconnect().set() will
                            // resolve as soon as the server acknowledges the onDisconnect() 
                            // request, NOT once we've actually disconnected:
                            // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

                            // We can now safely set ourselves as 'online' knowing that the
                            // server will mark us as offline once we lose connection.
                            userStatusDatabaseRef.set(isOnlineForDatabase);
                        });
                    });

                    firebase.database().ref('users').once('value', (val) => {
                        if (val.child(id).exists()) {
                            this.setState({
                                currentUser: val.child(id).val(),
                                enabled: true
                            });
                            //    console.log(this.state.currentUser);
                        } else {
                            firebase.database().ref('users').child(id).set(this.state.current_user).then(v => console.log("USER ADDED")).catch(c => console.log(c));
                        }
                    })


                    firebase.database().ref('typingStatus').child(localStorage.getItem('activeRoom')).on('value', (c) => {
                        var typers = ""
                        //  console.log(c.val())

                        if (c.val() != null) {
                            c.forEach(f => {
                                //   console.log(f.val()['name']);
                                if (f.val()['name'] != this.state.current_user['name']) {
                                    typers = typers + " , " + f.val()['name']
                                    typingStatus.text(`${typers} is typing ... `)
                                }
                            })


                        } else {
                            typingStatus.text(" ")
                        }
                    })



                    var textarea = $('#textarea');
                    var typingStatus = $('#typing_on');
                    var lastTypedTime = new Date(0); // it's 01/01/1970
                    var typingDelayMillis = 5000; // how long user can "think about his spelling" before we show "No one is typing -blank space." message



                    function refreshTypingStatus() {
                        // console.log(id);
                        if (!textarea.is(':focus') || textarea.val() == '' || new Date().getTime() - lastTypedTime.getTime() > typingDelayMillis) {
                            ///   typingStatus.html('No one is typing -blank space.');
                            firebase.database().ref('typingStatus').child(localStorage.getItem('activeRoom')).child(id).remove();

                        } else {
                            //  typingStatus.html('User is typing...');
                            firebase.database().ref('typingStatus').child(localStorage.getItem('activeRoom')).child(id).set({
                                'name': name
                            });
                        }
                    }
                    function updateLastTypedTime() {
                        lastTypedTime = new Date();
                    }

                    // console.log(id);

                    textarea.keypress(updateLastTypedTime);
                    textarea.blur(refreshTypingStatus);



                    window.addEventListener("storage", (e) => {
                        //    console.log("this is it", e);
                    });
                    //  console.log(window.innerHeight);
                    this.setState({
                        innerHeight: (window.innerHeight - 100) + 'px'
                    })


                    setInterval(refreshTypingStatus, 100);
                    //  console.log(id);

                } else {
                    //  console.log("Unable to get current user")
                }
            });



        let rooms = [];

        firebase.database().ref("chatrooms").once('value', (val) => {
            this.setState({
                currentGroupName: val.val()[localStorage.getItem('activeRoom')].name,
                currentGroup: val.val()[localStorage.getItem('activeRoom')].id
            })
            //console.log(val.val()[1].id);
            val.forEach(v => {
                //   console.log(v.val());
                rooms.push(v.val())
            });
            this.setState({
                chatrooms: rooms
            });

            // console.log(this.state.chatrooms);
        })


        let members = [];
        let allMembers = [];
        let online = []
        firebase.database().ref('chatrooms').child(localStorage.getItem('activeRoom')).child('members').once('value').then((val) => {
            try {
                Object.entries(val.val()).map(obj => {
                    const key = obj[0];
                    const value = obj[1];
                    console.log(value);
                    members.push(value);
                    // do whatever you want with those values.
                });
            } catch (e) { }
            //  console.log(members);
            try {
                members.forEach(f => {
                    firebase.database().ref('users').child(f['_id']).once('value', v => {
                        //    console.log(v.val());
                        allMembers.push(v.val());
                    })
                })

                this.setState({
                    mems: allMembers
                })
            } catch (e) { }
        }).then(v => {

            let chatmsgs = [];
            firebase.database().ref('chatrooms').child(localStorage.getItem('activeRoom')).child('chat').on('value', (val) => {
                chatmsgs = [];
                //members = []

                this.setState({
                    chats: []
                })
                val.forEach(v => {
                    chatmsgs.push(v.val());
                });
                this.setState({
                    chats: chatmsgs
                });


                //  console.log(this.state.chats)
            });


        });

        firebase.database().ref('chatrooms').child(localStorage.getItem('activeRoom')).child('online').on('value', val => {
            let onlineMems = []
            let onlines = []
            //   console.log(val.val());
            try {
                Object.entries(val.val()).map(obj => {
                    const key = obj[0];
                    const value = obj[1];
                    const objl = {
                        id: key,
                        val: value
                    }
                    //  console.log(value);
                    onlineMems.push(objl);
                    // do whatever you want with those values.
                });
                onlineMems.forEach(f => {
                    //   console.log(f);
                    if (f.val.online) {
                         
                        onlines.push(f);
                    }
                });
                this.setState({
                    onlineMembers: onlines
                })
                //      console.log(this.state.onlineMembers);
            } catch (e) { }
        });








    }

    // componentDidMount() {




    // }

    // componentDidUpdate() {
    //     //this.scrollToBottom();

    // }




    callme(m, i) {
        //   console.log(b)
        console.log(this.state.mems)
        var currentState = document.getElementById(i).style.display;

        var elements = document.getElementsByClassName('popup')
        //  console.log(m)
        for (var ii = 0; ii < elements.length; ii++) {
            elements[ii].style.display = 'none';
        }

        //  console.log(m.from)
        let badges = ''
        firebase.database().ref('users').child(m.from).once('value').then(function (v) {
            try {
                v.val().badge.forEach(v => {
                    let badgeName = v.name;
                    let img = v.img
                    badges += "<div style='display: flex; margin:5px; border-radius: 20px; border: 1px solid white; padding:2px'> <img src=" + img + " height='20px' width='20px' style='border-radius: 50%'> <p style='margin-left: 4px; margin-right: 4px'>" + badgeName + "</p></div>"
                })
                document.getElementById(i + "badge").innerHTML = badges
            } catch (e) {

            }
            if (currentState == 'none')
                document.getElementById(i).style.display = 'flex'
            else document.getElementById(i).style.display = 'none'
        }).catch(e => {
            //   console.log(e)
        })

    }

    hidepopups(){
        var elements = document.getElementsByClassName('popup')
        //  console.log(m)
        for (var ii = 0; ii < elements.length; ii++) {
            elements[ii].style.display = 'none';
        }
    }

    callme2(m,i){
        console.log(m, i)
        var currentState = document.getElementById(i+"side").style.display;

        var elements = document.getElementsByClassName('popup')
        //  console.log(m)
        for (var ii = 0; ii < elements.length; ii++) {
            elements[ii].style.display = 'none';
        }
        
        let badges = ''
        firebase.database().ref('users').child(m._id).once('value').then(function (v) {
            try {
                v.val().badge.forEach(v => {
                    let badgeName = v.name;
                    let img = v.img
                    badges += "<div style='display: flex; margin:5px; border-radius: 20px; border: 1px solid white; padding:2px'> <img src=" + img + " height='20px' width='20px' style='border-radius: 50%'> <p style='margin-left: 4px; margin-right: 4px; color: white'>" + badgeName + "</p></div>"
                })
                document.getElementById(i+"side"+"badge").innerHTML = badges
            } catch (e) {

            }
            if (currentState == 'none')
                document.getElementById(i+"side").style.display = 'flex'
            else document.getElementById(i+"side").style.display = 'none'
        }).catch(e => {
            //   console.log(e)
        })
    }

    callme3(m,i){
        console.log(m, i)
        var currentState = document.getElementById(i+"side").style.display;

        var elements = document.getElementsByClassName('popup')
        //  console.log(m)
        for (var ii = 0; ii < elements.length; ii++) {
            elements[ii].style.display = 'none';
        }
        
        let badges = ''
        firebase.database().ref('users').child(m.id).once('value').then(function (v) {
            try {
                v.val().badge.forEach(v => {
                    let badgeName = v.name;
                    let img = v.img
                    badges += "<div style='display: flex; margin:5px; border-radius: 20px; border: 1px solid white; padding:2px'> <img src=" + img + " height='20px' width='20px' style='border-radius: 50%'> <p style='margin-left: 4px; margin-right: 4px; color: white'>" + badgeName + "</p></div>"
                })
                document.getElementById(i+"side"+"badge").innerHTML = badges
            } catch (e) {

            }
            if (currentState == 'none')
                document.getElementById(i+"side").style.display = 'flex'
            else document.getElementById(i+"side").style.display = 'none'
        }).catch(e => {
            //   console.log(e)
        })
    }

    sendMsg() {

        if (this.state.messageController != "") {
            this.setState({ messageController: "" });
            //   console.log("MSG SEND")
            var key = firebase.database().ref('chatrooms').child(this.state.currentGroup).child('chat').push();
            //  console.log(key.key);
            //   console.log(this.state.currentUser['name']);
            firebase.database().ref("chatrooms").child(this.state.currentGroup).child('chat').child(key.key).set(
                {
                    'msg': this.state.messageController,
                    'key': key.key,
                    'name': this.state.currentUser['name'],
                    'from': this.state.currentUser['_id']
                }
            ).then(v => { });
        }
        else {
            alert("EMPTY MESSAGE");
        }

    }




    render() {

        const ROOT_CSS = css({
            height: 700,
            overflowX: 'hidden'

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

        const chats = this.state.chats.map((m, i) => {

            let badges = ""
            let color = "#ffffff"
            let boxColor = "#00cc99"

            this.state.mems.forEach(v => {
                if (v._id === m.from) {
                    try {
                        color = v.color;
                    } catch (c) { }
                    try {
                        if(v.boxColor)
                            boxColor = v.boxColor
                        console.log(boxColor)
                    } catch (c) {
                        boxColor = 'pink'
                     }
                    console.log("gotcha")
                    try {
                        v.badge.forEach(b => {
                            console.log(b.img, " here")
                            badges += "<img src=" + b.img + " height='20px' width='20px' style='border-radius: 50%; margin:5px 5px 0px'/>"
                        })
                    } catch (x) {

                    }
                }
            })



            if (m.name === this.state.current_user['name']) {
                if(boxColor=='#00cc99'){
                    boxColor = 'red'
                }
                return (
                    <div onClick={() => { this.callme(m, i) }} style={{
                        marginTop: "10px", backgroundColor: boxColor, color: 'white', width: 'fit-content', borderRadius: '10px', marginRight: '20px', position: 'relative'
                    }}>
                        <div style={{ margin: '8px', wordBreak: 'break-all' }}>
                            <div style={{ display: 'flex' }}><b style={{ marginBottom: '0px', color: color }}>{m.name}</b>  <div style={{ marginLeft: '10px' }} dangerouslySetInnerHTML={{ __html: badges }} /></div>
                            <p style={{ marginTop: '0px', }}>{m.msg}</p>
                        </div>

                        <div class="popup" id={i} style={{ position: 'absolute', backgroundColor: '#2e2e2e', zIndex: 2, display: 'none', borderRadius: '5px', marginLeft: '100px', flexDirection: 'column', width: '300px', height: '300px', alignItems: 'center' }}>

                            <img src={`https://ui-avatars.com/api/?size=160&background=0D8ABC&color=fff&bold=true&name=${m.name}`} style={{ height: '100px', width: '100px', margin: '10px', borderRadius: '50%' }} />
                            <h1 style={{ marginTop: '0px', color: 'white' }}>{m.name}</h1>
                            <div id={i + "badge"} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            </div>
                        </div>
                    </div>
                )
            }
            else {
                if(boxColor=='#00cc99'){
                    boxColor = 'orange'
                }
                return (
                    <div onClick={() => { this.callme(m, i) }} style={{ marginTop: "10px", backgroundColor: boxColor, color: 'white', width: 'fit-content', borderRadius: '10px', marginRight: '20px', position: 'relative' }}>
                        <div style={{ margin: '8px', wordBreak: 'break-all' }}>
                            <div style={{ display: 'flex' }}><b style={{ marginBottom: '0px', color: color }}>{m.name}</b>  <div style={{ marginLeft: '10px' }} dangerouslySetInnerHTML={{ __html: badges }} /></div>
                            <p style={{ marginTop: '0px', }}>{m.msg}</p>
                        </div>
                        <div class="popup" id={i} style={{ position: 'absolute', backgroundColor: '#2e2e2e', zIndex: 2, display: 'none', borderRadius: '5px', marginLeft: '100px', flexDirection: 'column', width: '300px', height: '300px', alignItems: 'center' }}>

                            <img src={`https://ui-avatars.com/api/?size=160&background=0D8ABC&color=fff&bold=true&name=${m.name}`} style={{ height: '100px', width: '100px', margin: '10px', borderRadius: '50%' }} />
                            <h1 style={{ marginTop: '0px', color: 'white' }}>{m.name}</h1>
                            <div id={i + "badge"} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}></div>
                        </div>
                    </div>
                )
            }



        });

        const groupMembers = this.state.mems.map((m, i) => {
            //   console.log(m)

            return (
                <div onClick={()=>this.callme2(m,i)} className={groupCard}>
                    <h4 className="text-center" style={{ paddingTop: '4px' }}>{m.name}</h4>
                    <div class="popup" id={i+"side"} style={{ position: 'absolute', backgroundColor: '#2e2e2e', zIndex: 2, display: 'none', borderRadius: '5px', marginLeft: '0px', flexDirection: 'column', width: '240px', height: '300px', alignItems: 'center' }}>

                        <img src={`https://ui-avatars.com/api/?size=160&background=0D8ABC&color=fff&bold=true&name=${m.name}`} style={{ height: '100px', width: '100px', margin: '10px', borderRadius: '50%' }} />
                        <h1 style={{ marginTop: '0px', color: 'white', textAlign: 'center' }}>{m.name}</h1>
                        <div id={i +"side" + "badge"} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', color: 'white !important' }}></div>
                    </div>

                </div>
            )
            //}
        })

        const groupMembersOnline = this.state.onlineMembers.map((m, i) => {
            
            return (
                <div onClick={()=>{this.callme3(m,i)}} className={groupCard}>
                    <h4 className="text-center" style={{ paddingTop: '4px' }}>{m.val.name}</h4>
                    <div class="popup" id={i+"side"} style={{ position: 'absolute', backgroundColor: '#2e2e2e', zIndex: 2, display: 'none', borderRadius: '5px', marginLeft: '0px', flexDirection: 'column', width: '240px', height: '300px', alignItems: 'center' }}>

                        <img src={`https://ui-avatars.com/api/?size=160&background=0D8ABC&color=fff&bold=true&name=${m.val.name}`} style={{ height: '100px', width: '100px', margin: '10px', borderRadius: '50%' }} />
                        <h1 style={{ marginTop: '0px', color: 'white', textAlign: 'center' }}>{m.val.name}</h1>
                        <div id={i +"side" + "badge"} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', color: 'white' }}></div>
                    </div>

                </div>
            )
        })


        const chatRooms = this.state.chatrooms.map((m) => {
            return (

                <div className={this.state.currentGroup == m.id ? active : groupCard} key={m.id} onClick={() => {
                    var id = m.id
                    //  console.log(id);
                    this.setState({ currentGroup: id }, () => {
                        //    console.log(this.state.currentGroup);

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
                            //   console.log(this.state.chats)
                        });
                    });
                }}>
                    <h4 className="text-center" style={{ paddingTop: '4px' }}>{m.name}</h4>
                </div>
            );
        });
        return (
            <div>
                <Header name={this.props.name} />

                <Container style={{ height: this.state.innerHeight, marginTop: '40px' }}>
                    <Row style={{ backgroundColor: '#293031', height: '40px' }}>
                        <Container>
                            <h1 style={{ marginLeft: '20px', color: '#fff' }}>{this.state.currentGroupName}</h1>
                        </Container>
                    </Row>
                    <Row>
                        {/* <Col xs="3" sm="3" style={{ backgroundColor: '#3C3E40' }}>
                        <ScrollToBottom className={ROOT_CSS}>
                            {chatRooms}
                        </ScrollToBottom>
                    </Col> */}
                        <Col xs="9" sm="9" style={{ backgroundColor: '#E2EDF3' }} onClick={()=>{this.hidepopups()}}>
                            <ScrollToBottom className={ROOT_CSS} onClick={()=>{this.hidepopups()}}>
                                {chats}
                            </ScrollToBottom>

                            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
                                <Col xs="9" md="9" sm="8"><Input id="textarea" onKeyPress={(e) => {
                                    console.log(e.target.value);
                                    if (e.charCode == '13') {
                                        console.log("enter")
                                        this.sendMsg();
                                    }
                                }} disabled={!this.state.enabled} onChange={(e) => this.setState({ messageController: e.target.value })} placeholder="write a message" style={{ width: "100%" }} value={this.state.messageController}></Input></Col>
                                <Col xs="3" md="3" sm="4"><Button style={{ width: '100%' }} onClick={this.sendMsg.bind(this)}>SEND</Button></Col>
                            </Row>

                            <Row>
                                <div style={{ margin: '10px' }} id="typing_on"></div>
                            </Row>

                        </Col>

                        <Col xs="3" sm="3" style={{ backgroundColor: '#000' }}>
                            <ScrollToBottom className={ROOT_CSS}>
                                <h4 style={{ color: 'white', marginTop: '10px' }}>ONLINE USERS</h4>
                                {groupMembersOnline}
                                <h4 style={{ color: 'white' }}>ALL USERS</h4>
                                {groupMembers}
                            </ScrollToBottom>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ChatRoom
