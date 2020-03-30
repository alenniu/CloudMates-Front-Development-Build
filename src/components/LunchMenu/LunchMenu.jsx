
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

  

class LunchMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            lunchMenu: {images:[], timestamp: ''}
        }
    }
    

    componentWillMount() {
        axios.get('/api/lunchMenus/',{
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
            .then((res)=> {
                if(res.status === 200) {
                    this.setState({
                        lunchMenu: res.data.menus[res.data.menus.length-1]
                    })
                }
            })
    }

    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name] : value
      });
    }

    onSubmit = (event) => {
      event.preventDefault();
      let lunchMenu_id = "5d5f24448498fb0d52f30f93"
      axios.patch(`/api/lunchMenus/${lunchMenu_id}/`,  {
        images: []
      },{
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(res => {
        if ( res.status === 200) {
          axios.get(`/api/lunchMenus/recent`,{
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
            .then(res => {
              if (res.status === 200) {
                const data = res.data
                this.setState({lunchMenu: data.menus[data.menus.length-1]});
              }else{
                console.log("Unable to get this announcement by id")
              }
            })
        }
      })
    }

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
                         
                          <h1 className="text-center">Lunch Menu</h1>
                       
                      </CardHeader>
                      <div className="menuWrapper" >
                          {/* <div className="col-12">
                            <h3 style={{paddingLeft: '30%'}}>Upper Dining Hall</h3>
                            <img className='img3'src={this.state.lunchMenu.images[0]}></img>
                        
                          </div> */}
                          <div className="col-12">
                            <h3 style={{paddingLeft: '43.5%',paddingTop: '0.5%'}}><b>Upper Dining Hall</b></h3>
                            <img className='img4'src={this.state.lunchMenu.images[0]}></img>
                            {/* <Form  onSubmit={this.onSubmit}>
                   
            
                    <div className="pl-lg-4">
                      <FormGroup>
            
                        <Input
                          className="form-control-alternative"
                          name="lunchMenu"
                          placeholder="A few words about you ..."
                          rows="1"
                          value={this.state.lunchMenu} 
                          type="textarea"
                          onChange={this.handleInputChange}
                        />
                        <Button className="my-4" color="primary" type="submit" >
                              Change Bio
                            </Button>
                      </FormGroup>
                    </div>
                  </Form> */}
                          </div>

                          <div style={{paddingTop: '2%'}}>
                              
                              </div>
                              
                          {/* <div className="col-12">
                          <h3 style={{paddingLeft: '50%'}}>Lower Dining Hall</h3>
                          <img  className='img5'src={this.state.lunchMenu.images[1]}></img>
                          </div> */}
                          <div className="col-12">
                          <h3 style={{paddingLeft: '44%'}}><b>Lower Dining Hall</b></h3>
                          <img  className='img3'src={this.state.lunchMenu.images[1]}></img>
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

export default LunchMenu;
