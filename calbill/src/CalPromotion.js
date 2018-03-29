import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Form,Row, Col,Button ,Alert,Fade, FormGroup,Label,Input,FormFeedback,FormText
} from 'reactstrap';


class CalPromotion extends Component {

constructor(props) {
        super(props);
        this.state = { fadeIn: false };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let validData = this.state.value == '' || this.state.value == undefined

    console.log( this.state.value +' and '+ validData )
    
    this.setState({
            fadeIn: !validData
    });
      
      event.preventDefault();
  }



  render() {
    return (
      <div  className="App-Main">

      <Form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            
            <input type="submit" value="Submit" />
      
          <Fade in={this.state.fadeIn} tag="h5" className="mt-3">This content will {this.state.value}</Fade>

      </Form>

    </div>

    );
  }
}

export default CalPromotion;
