
import React from "react";


// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button

} from "reactstrap";
import "../../assets/css/election.css"
import {  Header as Header1, Icon, Image, Modal } from 'semantic-ui-react'
// core components
import Header from "../Headers/Header.jsx";
import axios from "axios";
import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table';

import ExampleComponent from "react-rounded-image";
import VoteScreen from './voteScreen'
import { Message } from 'semantic-ui-react'



class Election extends React.Component {
  constructor() {
    super();
    this.state = {
        election: {participants: []},
        participants: [{name:"", slogan:"", votes: 0, voters: [], iconurl:"" }],
        failedLogin: false,
        failedVoted: false
    }
  }
    

  updateElectionInfo() {
    axios.get('http://localhost:8080/api/elections/',{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
        .then((res)=> {
            if(res.status === 200) {
                let election = res.data.elections[0];
                this.setState({election})
                let election_id = election._id;
                axios.get(`http://localhost:8080/api/elections/${election_id}/participants`,{
                  headers: {
                    Authorization: localStorage.getItem('token')
                  }
                })
                    .then((res)=> {
                        if(res.status === 200) {
                            this.setState({participants: res.data.participants})
                        }
                    })
            }
        })
  }
  componentWillMount() {
      this.updateElectionInfo()
  }
  
  vote= (participant) => {
    if(this.props.name !== 'Guest') {
        let voted = false;
        for(let i=0; i<this.state.participants.length; i++) {
            let participant = this.state.participants[i];
            if(participant.voters.includes(this.props.name)) {
                voted = true;
            }
        }
        if(voted) {
          this.setState({failedVoted: true})
            return 
        }
        axios.patch(`http://localhost:8080/api/elections/${this.state.election._id}/participants/${participant._id}`, {
            votes: participant.votes + 1,
            voters: participant.voters.concat([this.props.name])
        },{
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then((res)=> {
              if(res === 200){
                  console.log("success")
              }
              this.updateElectionInfo()
          })
    }else {
      this.setState({failedLogin: true})
        //alert('Please log in to vote!')
    }
  }
  
  render() {
  

    let participants = this.state.participants.map((participant)=> {
        return (
          
            
          
            <div   className="col-4">
              
              
             <PricingSlot highlighted={participant.voters.includes(this.props.name)} title={participant.name} >
              
              <div className="electionClickable" onClick={()=>this.vote(participant)}>
                
              {/* <ExampleComponent
                image={participant.iconurl}
                roundedColor="#321124"
                imageWidth="150"
                imageHeight="150"
                roundedSize="13"
               /> */}
               <div >
                    <a href = "#" className = "column" id = "caption"><span className= "text"><h1>VOTE ME!</h1></span><img src={participant.iconurl} ></img></a>
                    <div className="frame col-xs-6">  
                    </div>        
                </div>
                  
                  
              </div>
             

                <Modal trigger={<Button className="electionButton">Show Declaration</Button>}>
                    <Modal.Header>{participant.name}</Modal.Header>
                    <Modal.Content image>
                    <Modal.Description  >
                        <Header1>Declaration Details</Header1>
                        <p className="text-center" style={{width: '8%', fontSize: '150%', lineHeight: '1.5'}}>{participant.slogan}</p>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                
            </PricingSlot> 
            </div>
            
        )

    })
    return (
      <>
        <Header />
        {/* Page content */}
        
        <Container className="mt--7" fluid>
          {/* Table */}
          
         
          <Row>
          
            <div className="col">
              <Card className="shadow">
                <CardHeader style={{}} className="border-0"><h1 className="text-center">This Page is Currently Under Construction</h1><br></br><p className="text-center">Check Back Later For Updates!</p>
                <Message style={!this.state.failedLogin? {display: 'none'}: {}} negative>
          <Message.Header>Voting Failed</Message.Header>
          <p>Please login to be cast a vote.</p>
         </Message>
         <Message style={!this.state.failedVoted? {display: 'none'}: {}} negative>
          <Message.Header>Voting Failed</Message.Header>
          <p>You can only vote once.</p>
         </Message>
                </CardHeader>
                {/* <PricingTable className="row" highlightColor='#1976D2' >
                    {participants}
                </PricingTable>  */}
                
                
                 </Card>
                 
             </div>
            </Row>
           
</Container>

      </>
    );
  }
}



export default Election;
