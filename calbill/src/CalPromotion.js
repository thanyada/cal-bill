import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Form,Row, Col,Button ,Alert,Fade, FormGroup,Label,Input,FormFeedback,FormText,InputGroup,InputGroupAddon
} from 'reactstrap';


class CalPromotion extends Component {

constructor(props) {
        super(props);
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

  digit2(number){
    var number_Digit = Math.round(number*100)/100
    return  number_Digit.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }


CalPromotion(count_customer){

  let price_p_1 = 459
  var promotion = {promotions:[],promotion_title:"", origin_price:0, discount_price:0,price_per_person:0};
  var price = count_customer *  price_p_1

  promotion.origin_price = this.digit2(price)

  console.log("origin_price : "+price+" // "+this.PRICE_PER_PERSON)

  if(count_customer == 1){
    promotion.promotion_title = "You not have Promotion"
    promotion.price_per_person = price_p_1
    promotion.discount_price = price_p_1
  }else{
    promotion.promotion_title = "You should this Promotion"
    var array_promotion = []


    if(count_customer < 4){
      array_promotion.push("LUCKY TWO")
      console.log("count_customer < 4 : "+Math.floor(count_customer/2) +" // "+count_customer%2+" // "+((Math.floor(count_customer/2)*2)*price_p_1*0.8+" // "+((count_customer%2)*price_p_1)))
      var discount_price = ((Math.floor(count_customer/2)*2)*price_p_1*0.8)+((count_customer%2)*price_p_1)
      promotion.discount_price = this.digit2(discount_price)
      var price_per_person = discount_price/count_customer
      promotion.price_per_person =  this.digit2(price_per_person)

    }else{

      var discount_price = 0

      if(count_customer / 4 >0){
        if(Math.floor(count_customer / 4)==1){
          array_promotion.push("4PAY3")
          discount_price = price_p_1*3
        }else  {
          array_promotion.push("4PAY3 ("+Math.floor(count_customer / 4)+" Sets )") 
          discount_price = price_p_1*3*(Math.floor(count_customer / 4))
        }
      }

      if((count_customer%4) >= 2 &&  (count_customer%4) / 2 > 0){
        array_promotion.push("LUCKY TWO")
         discount_price += ((Math.floor(count_customer%4/2)*2)*price_p_1*0.8)
      }

      if(count_customer%2 == 1){
         discount_price += price_p_1
      }

      if( count_customer>=14){
       
        var discount_price_25 = price_p_1*count_customer * 0.75
        if(discount_price_25 < discount_price) {
          discount_price = discount_price_25
          array_promotion = []
          array_promotion.push("Discount 25%")
        }else if(discount_price_25 == discount_price) {
          discount_price = discount_price_25
          array_promotion = []
           array_promotion.push("Discount 25% OR 4PAY3 (    "+Math.floor(count_customer / 4)+" Sets )")
        }
          
      }

          promotion.discount_price = this.digit2(discount_price)
          var price_per_person = discount_price/count_customer
          promotion.price_per_person =  this.digit2(price_per_person)

    }

    promotion.promotions = array_promotion
  }
 
  return promotion
  
}



  render() {
    var list_promotion = [];
    

    for (var key in this.state.promotion.promotions) {
        var element = this.state.promotion.promotions[key];
      list_promotion.push(<h6>{element}</h6>);
     
    }

    return (
      <div  className="App-Main">

      <Form onSubmit={this.handleSubmit}>

        <FormGroup>
            
           <label>
              <InputGroup className="Stlye-Input" >
              <InputGroupAddon addonType="prepend" >Count of Customer (1 - 60)</InputGroupAddon>
              <Input type="number" value={this.state.value} onChange={this.handleChange}  min="1" max="60"/>
            </InputGroup>
             </label>
            <Button className="Stlye-botton" color="info">Calculate</Button>
        </FormGroup>

          <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
            <Alert>
            <h4> {this.state.promotion.promotion_title}</h4>
            {list_promotion}
            </Alert>

             <Alert color="danger">
            <h4> Price</h4>
            <h6>Original Price : <del> {this.state.promotion.origin_price}</del> B</h6>
            <h6>Total Price : {this.state.promotion.discount_price} B (  {this.state.promotion.price_per_person} B / 1 person )</h6>
            </Alert>
          </Fade>

      </Form>

    </div>

    );
  }
}

export default CalPromotion;
