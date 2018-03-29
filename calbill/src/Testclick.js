import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col,Button ,Alert,Fade, FormGroup,Label,Input,FormFeedback,FormText
} from 'reactstrap';


class Testclick extends Component {

constructor(props) {
        super(props);
        this.state = { fadeIn: true };
        this.toggle = this.toggle.bind(this);
    }

  render() {
    return (
      <Input type="number" name="email" id="exampleEmail" 
           placeholder="count of customer"></Input>
    );
  }

toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }

}

export default Testclick;
