import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
const CheckoutSummary=(props)=>{
    return(
       <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
        <div style={{maxWidth:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button 
        buttonType="Danger" clicked={props.checkOutCancelled}>CANCEL</Button>
        <Button buttonType="Success" clicked={props.checkOutContinued}>CONTINUE</Button>
       </div>
    );
}

export default CheckoutSummary;