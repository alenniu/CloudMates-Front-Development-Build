
import React from "react";
import {
    Card,
    CardHeader,
    Container,
    Row,
    Button
  
  } from "reactstrap";
  import {  Header as Header1, Icon, Image, Modal } from 'semantic-ui-react'
  // core components
  import Header from "../Headers/Header.jsx";
  import "../../assets/css/lunchMenu.css"
  import axios from "axios";
  import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table';

  

class Landing extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    

    // componentWillMount() {
    //     axios.get('/api/lunchMenus/')
    //         .then((res)=> {
    //             if(res.status === 200) {
    //                 this.setState({
    //                     lunchMenu: res.data.menus[res.data.menus.length-1]
    //                 })
    //             }
    //         })
    // }


    render() {
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
                         
                          <h1 className="text-center">Landing Page</h1>
                       
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

                          <div style={{paddingTop: ''}}>
                              <img className='img3' ></img>
                        
                              </div>
                              
                       <div className="row" >
            <div   className="col-4" style={{paddingTop: '0.5%'}}>
              <PricingSlot  title='ManageBac' >
               <div className="electionClickable" > 
                <div >
                     <a href = "https://ucc.managebac.com"><span className= "text"><img src='https://pbs.twimg.com/profile_images/879283732603166720/yUntnbs1.jpg' style={{paddingRight:'22%', marginLeft:'6%'}}></img></span></a>
                     <div className="frame col-xs-6">  
                     </div>        
                 </div>           
                   
               </div>
              
                 <Modal trigger={<Button className="electionButton" >Specific Links</Button>}>
                     <Modal.Header>Specific Links</Modal.Header>
                     <Modal.Content image>
                     <Modal.Description  >
                         <Header1>Specific Links</Header1>
                         {/* <p className="text-center" style={{width: '8%', fontSize: '150%', lineHeight: '1.5'}}>Hello</p> */}
                         <a href = "https://ucc.managebac.com/student" style={{fontSize: '50px',paddingLeft:'25%'}}>Student HomePage</a> <br></br>
                         <a href = "https://ucc.managebac.com/login" style={{fontSize: '50px',paddingLeft:'30%'}}> Student Login</a><br></br>
                         <a href = "https://ucc.managebac.com/student/calendar" style={{fontSize: '50px',paddingLeft:'36%'}}>Calendar</a><br></br>
                         <a href = "https://ucc.managebac.com/student/ib/activity/cas" style={{fontSize: '50px',paddingLeft:'43%'}}>CAS</a>
                                        
                     </Modal.Description>
                     </Modal.Content>
                 </Modal>
             </PricingSlot> 
             </div>
{/* POWERSCHOOL*/}

             <div   className="col-4" style={{paddingTop: '0.5%'}}>
              <PricingSlot  title='PowerSchool' >
               <div className="electionClickable" > 
                <div >
                     <a href = "https://ucc.learning.powerschool.com"><span className= "text"><img src='http://www.powerschool.com/wp-content/uploads/2018/12/powerschool-logo-vertical.png' style={{paddingRight:'22%',paddingTop:'15%', paddingBottom:'25%', marginLeft:'6%'}}></img></span></a>
                     <div className="frame col-xs-6">  
                     </div>        
                 </div>           
                  
               </div>
              
                 <Modal trigger={<Button className="electionButton" >Specific Links</Button>}>
                     <Modal.Header>Specific Links</Modal.Header>
                     <Modal.Content image>
                     <Modal.Description  >
                         <Header1>Specific Links</Header1>
                         {/* <p className="text-center" style={{width: '8%', fontSize: '150%', lineHeight: '1.5'}}>Hello</p> */}
                         <a href = "https://ucc.learning.powerschool.com" style={{fontSize: '50px',paddingLeft:'30%'}}>Student Portal</a> <br></br>
                         <a href = "https://ucc.learning.powerschool.com/_jmclean__1505334879_/cfl/cms_page/view" style={{fontSize: '50px',paddingLeft:'24%'}}> Center For Learning</a><br></br>
                         <a href = "https://ucc.learning.powerschool.com/mroughneen/libraryonlineresources/cms_page/view" style={{fontSize: '50px',paddingLeft:'26%'}}>Library Resources</a><br></br>
        
                                        
                     </Modal.Description>
                     </Modal.Content>
                 </Modal>
             </PricingSlot> 
             </div>
{/* Next thing*/}

<div   className="col-4" style={{paddingTop: '0.5%'}}>
              <PricingSlot  title='UCC Athletics' >
               <div className="electionClickable" > 
                <div >
                     <a href = "https://www.ucc.on.ca/athletics/ucc-teams"><span className= "text"><img src='https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Upper_Canada_College_Crest.svg/1200px-Upper_Canada_College_Crest.svg.png' style={{paddingRight:'22%',paddingTop:'0%', paddingBottom:'7%', marginLeft:'6%' }}></img></span></a>
                     <div className="frame col-xs-6">  
                     </div>        
                 </div>           
                   
               </div>
              
                 <Modal trigger={<Button className="electionButton" >Specific Links</Button>}>
                     <Modal.Header>Specific Links</Modal.Header>
                     <Modal.Content image>
                     <Modal.Description  >
                         <Header1>Specific Links</Header1>
                         {/* <p className="text-center" style={{width: '8%', fontSize: '150%', lineHeight: '1.5'}}>Hello</p> */}
                         <a href = "https://www.ucc.on.ca/athletics" style={{fontSize: '50px',paddingLeft:'30%'}}>What is Athletics At UCC?</a> <br></br>
                         <a href = "https://www.ucc.on.ca/athletics/ucc-teams" style={{fontSize: '50px',paddingLeft:'24%'}}> UCC Teams</a><br></br>
                         <a href = "https://www.ucc.on.ca/athletics/blues-booster-club" style={{fontSize: '50px',paddingLeft:'26%'}}>Blues Booster Club</a><br></br>
                         <a href = "https://ucc.gameonstream.com/  " style={{fontSize: '50px',paddingLeft:'26%'}}>UCC Live</a><br></br>
        
                                       
                     </Modal.Description>
                     </Modal.Content>
                 </Modal>
             </PricingSlot> 
             </div>


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

export default Landing;
