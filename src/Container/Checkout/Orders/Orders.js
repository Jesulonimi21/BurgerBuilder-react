import React,{Component} from 'react';
import Order from './Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../../Components/UI/Spinner/Spinner';
class Orders extends Component{

   
    componentDidMount(){
       this.props.onFetchOrders(this.props.token,this.props.userId);
       console.log("token is ",this.props.token);
    }
    render(){
    let orders=<Spinner />;
    if(!this.props.loading){
        orders=(
            this.props.orders.map((order)=>{
          return  <Order key={order.id}
                    ingredients={order.ingredients}
                    price={+order.totalPrice}/>
        })
        )
    }
      return( 
        <div>  
            {orders}
        
        </div>);
    }
}

const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));