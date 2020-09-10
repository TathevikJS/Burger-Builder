
import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary'

const checkoutSummary = (props) => {
  return (
      <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{width: '100%', height: '300px', margin: 'auto'}}>
      <Burger ingridients={props.ingridients}/>
      {console.log(props)}
      </div>
      <Button 
      btnType='Danger'
      clicked={props.checkoutCancelledHandler}>CANCEL</Button>
      <Button 
      btnType='Success'
      clicked={props.checkoutContinuedHandler}>CONTINUE</Button>

      </div>
  )
}

export default checkoutSummary
