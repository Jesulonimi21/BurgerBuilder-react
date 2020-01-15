import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../Components/UI/Button/Button';

class OrderSummary extends Component{
   
    render(){
        const ingredientSummary=Object.keys(this.props.ingredients).map((igKeys)=>{
            return <li key ={igKeys}><span style={{textTransform:"capitalize"}}>{igKeys}</span>: {this.props.ingredients[igKeys]}</li>
        })
        return( <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
    
            <ul>{ingredientSummary}</ul>
            <p>Continue to checkout?</p>
            <Button clicked={this.props.purchaseCancelled} buttonType='Danger'>CANCEL</Button>
            <Button clicked={this.props.purchaseContinued} buttonType='Success'>CONTINUE</Button>
        </Aux>)
    }
}

export default OrderSummary;