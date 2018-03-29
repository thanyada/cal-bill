import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Form,Row, Col,Button ,Alert,Fade, FormGroup,Label,Input,FormFeedback,FormText,InputGroup,InputGroupAddon
} from 'reactstrap';


class CalPromotion extends Component {

constructor(props) {
        super(props);
        const PRICE_PER_PERSON = 459
        this.state = { fadeIn: false,promotion:{}};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        

    }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let validData = this.state.value == '' || this.state.value == undefined

    console.log( this.state.value +' and '+ validData )
    
    if(validData) alert("Invalid Data Count of customer")

    var pm =  this.CalPromotion(this.state.value)

    this.setState({
            fadeIn: !validData,
            promotion : pm
    });
      
      event.preventDefault();
  }


CalPromotion(count_customer){

  var promotion = {promotions:[],promotion_title:"", origin_price:0, discount_price:0,price_per_person:0};
  var price = count_customer*this.PRICE_PER_PERSON

  promotion.origin_price = price

  
  if(count_customer == 1){
    promotion.promotion_title = "You not have Promotion"
  }else{
    promotion.promotion_title = "You should this Promotion"
    var array_promotion = []

    if(count_customer < 4){
      array_promotion.push("LUCKY TWO")

    }else{
      if(count_customer / 4 >0){
        if(count_customer / 4==1){
          array_promotion.push("4PAY3")
        }else  array_promotion.push("4PAY3 ("+count_customer%4+" Sets )")
       
      }

      if((count_customer%4) >= 2 &&  (count_customer%4) / 2 > 0){
        array_promotion.push("LUCKY TWO")
      }

      if(count_customer > 13){
        array_promotion.push("Discount 25%")
      }
    }

    promotion.promotions = array_promotion
  }
 
  return promotion
  
}



  render() {
    var lis = [];
    

    for (var key in this.state.promotion.promotions) {
        var element = this.state.promotion.promotions[key];
      lis.push(<p>{element}</p>);
     
    }

    return (
      <div  className="App-Main">

      <Form onSubmit={this.handleSubmit}>

        <FormGroup>
            {/*<Input className="Stlye-Input" type="number" value={this.state.value} onChange={this.handleChange} placeHolder="Count of customer"/>*/}
           
           <label>
              <InputGroup className="Stlye-Input" >
              <InputGroupAddon addonType="prepend" >Count of Customer</InputGroupAddon>
              <Input invalid={!this.state.fadeIn} type="number" value={this.state.value} onChange={this.handleChange} />
            </InputGroup>
             </label>
            <Button className="Stlye-botton" color="info">Calculate</Button>
        </FormGroup>

          <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
            <Alert>
            <h3> {this.state.promotion.promotion_title}</h3>
            {lis}
            </Alert>

             <Alert color="danger">
            <h3> Price</h3>
            <p>Original Price : {this.state.promotion.origin_price}</p>
            <p>Discount Price : {this.state.promotion.discount_price}</p>
            <p>Price per person : {this.state.promotion.price_per_person}</p>
            </Alert>
          </Fade>

      </Form>

    </div>

    );
  }
}

export default CalPromotion;
