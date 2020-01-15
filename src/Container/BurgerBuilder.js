import React,{Component} from 'react';
import Aux from '../hoc/Aux/Aux';
import Burger from '../Components/Burger/Burger';
import BuildControls from '../Components/Burger/BuildControls/BuildControls';
import Modal from '../Components/UI/Modal/Modal';
import OrderSummary from '../Components/Burger/OrderSummary/OrderSummary';
import axios from "../axios-orders";
import Spinner from '../Components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../store/actions/index';
import {connect} from 'react-redux';
import { stat } from 'fs';

import BurgerIngredient from '../Components/Burger/BurgerIngredients/BurgerIngredients';

class BurgerBuilder extends Component{

   

    state={
        // ingredients:null
        purchasable:false,
        purchasing:false,
        // loading:false,
        // error:false
    }

    componentDidMount=()=>{
       this.props.onInitIngredient();
    }

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            this.props.onSetAuthRedirect("/checkout")
            this.props.history.push("/auth");
        }
        
    }


    updatePurchaseState=(mutableIngredient)=>{
        const sum=Object.keys(mutableIngredient).map((igKey)=>{
            return mutableIngredient[igKey]
        }).reduce((arr,el)=>{
                return arr+el
        },0);
        this.setState({purchasable:sum>0});
    }

    purchaseCancelHandler=()=>{
        console.log("purchase handler canceled");
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        // alert("you continued");
  
    const queryArr=[];

    for(let i in this.state.ingredients){
        queryArr.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
    }
    queryArr.push("price="+ this.state.totalPrice);
    let queryString=queryArr.join("&");
    this.props.onInitPurchase();
    this.props.history.push({
        pathname:"/checkout",
        // search:"?"+queryString
    });
    }
    render(){
        let disabledInfo={...this.props.ings}
            for(let keys in disabledInfo){
                disabledInfo[keys]=disabledInfo[keys]<=0;
            }
            console.log("dsabled info",disabledInfo)

            let orderSummary=null;
             
            console.log(this.props.ings);
            let burger=this.props.error?<p>Ingredients cannot be loaded at this time</p>:<Spinner />
            if(this.props.ings){
                burger=(<Aux> <Burger  ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={this.props.onIngredientAdded}
                               ingredientRemoved={this.props.onIngredientRemoved} 
                               disabled={disabledInfo}
                               price ={this.props.tPrice}
                               purchasable={this.state.purchasable}
                               ordered={this.purchaseHandler}
                               isAuth={this.props.isAuthenticated}
                               />
                        </Aux>);
                         orderSummary=(<OrderSummary purchaseCancelled={this.purchaseCancelHandler} 
                            purchaseContinued={this.purchaseContinueHandler} ingredients={this.props.ings}/>);
           
            }
       return <Aux>
            <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing} >
                {orderSummary}
                </Modal>
              {burger}
            </Aux>
    }
    // addIngredientBuilder=(type)=>{
    //     const oldCount=this.state.ingredients[type];
      
        
    //     const updatedCount=oldCount+1;
    //     let mutableIngredient={...this.state.ingredients};
    //     mutableIngredient[type]=updatedCount;

    //     console.log("type : "+ mutableIngredient[type]+"\n"+"count :" + updatedCount)
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=INGREDIENTS_PRICE[type]+oldPrice;
    //     this.setState({totalPrice:newPrice,ingredients:mutableIngredient});
    //     this.updatePurchaseState(mutableIngredient);
    // }
    // removeIngredientHandler=(type)=>{
       
    //     const oldCount=this.state.ingredients[type];
       
    //     if(oldCount<=0){
    //         console.log("old count is less than 0")
    //         return;
    //     }
    //     const updatedCount=oldCount-1;
    //     let mutableIngredient={...this.state.ingredients};
    //     mutableIngredient[type]=updatedCount;

    //     console.log("type : "+ mutableIngredient[type]+"\n"+"count :" + updatedCount)
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=INGREDIENTS_PRICE[type]+oldPrice;
    //     this.setState({totalPrice:newPrice,ingredients:mutableIngredient});
    //     this.updatePurchaseState(mutableIngredient);
    // }
}


const matchStateToProps=(state)=>{
    return{
        ings:state.burgerBuilder.ingredients,
        tPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    }
}
const matchDispatchToProps=(dispatch)=>{
    return{
        onIngredientAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirect:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default  connect(matchStateToProps,matchDispatchToProps)(withErrorHandler(BurgerBuilder,axios));