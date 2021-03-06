import React,{Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { stat } from 'fs';
class Checkout extends Component{
    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }
    
    // componentWillMount(){
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
            
    //         if(param[0]==="price"){
    //         price=param[1];
    //         }else{
    //             ingredients[param[0]]=+param[1];
    //         }

          
    //     }
    //     this.setState({ingredients:ingredients,totalPrice:price});
    // }

    checkOutCanceledHandler=()=>{
        this.props.history.goBack();
    }

    checkOutContinuedHandler=()=>{
        this.props.history.replace("/checkout/contact-data");
    }
    render(){
        let summary=<Redirect to="/" />
        if(this.props.ings){
            const purchasedRedirect=this.props.purchased?<Redirect to="/"/>:null;
                    summary=(<div>
                        {purchasedRedirect}
                         <CheckoutSummary 
            checkOutContinued={this.checkOutContinuedHandler}
            checkOutCancelled={this.checkOutCanceledHandler}   
           ingredients={this.props.ings}/>
            <Route path={this.props.match.path+"/contact-data"}
           component={ContactData}/>
           </div>
           );
        }
        return(
            <div>    
                {summary}  
                   
      
            </div>

        );
    }
}
const mapStateToProps=(state)=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }


}
export default connect(mapStateToProps)(Checkout);