import React,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import Classes from "./ContactData.css";
import axios from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import { stat } from 'fs';
class ContactData extends Component{

    state={
            orderForm:{
           name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:"",
                validation:{
                required:true
                },
                valid:false,
                touched:false
            
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:'Your Zip Code'
                },
                value:"",
                 validation:{
                required:true,
                minLength:5,
                maxLength:5
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value:"",
                 validation:{
                required:true
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value:"",
                 validation:{
                required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your E-mail'
                },
                value:"",
                 validation:{
                required:true
                },
                valid:false,
                touched:false
            },   
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[{
                        value:'fastest',displayValue:'Fastest'
                    },{
                        value:'cheapest',displayValue:'Cheapest'
                    }]
                },
                value:"fastest",
                 validation:{
                required:true
                },
                valid:true,
                touched:false
            },},   
          
            formIsValid:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
              const formData={};
              for(let formElementIdentifier in this.state.orderForm){
                  formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
              }
        const orders={
            ingredients:this.props.ings,
            totalPrice:this.props.price,
            orderData:formData,
            userId:this.props.userId    
                };
    this.props.onOrderBurger(orders,this.props.token);
    }
    checkValidity=(value,rules)=>{
        let isValid=true;

        if(rules.required){
            isValid=value.trim()!==''&&isValid;
        };
        if(rules.minLength){
            isValid=value.trim().length>=rules.minLength&&isValid;
        }

        if(rules.maxLength){
            isValid=value.trim().length<=rules.maxLength&&isValid;
        }
        return isValid;
    }
    inputChangedHandler=(event,identifier)=>{
        console.log(event.target.value);
        let updatedForm = {...this.state.orderForm};
        let updatedFormElement= {...updatedForm[identifier]};
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        console.log(updatedFormElement.valid);
        updatedForm[identifier]=updatedFormElement;

        let formIsValid=true;
        for(let inputIdentifier in updatedForm){
            formIsValid=updatedForm[inputIdentifier].valid&&formIsValid;
        }
        this.setState({orderForm:updatedForm, formIsValid:formIsValid});
    }

    render(){
        let formElementsArray=[];
        for(let keys in this.state.orderForm){
            formElementsArray.push({
                id:keys,
                config:this.state.orderForm[keys]
            });
        }
        let form = <form onSubmit={this.orderHandler}>

        {formElementsArray.map((formElement)=>{
            return  <Input key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig}
                             value={formElement.config.value}
                             invalid={!formElement.config.valid}
                             shouldValidate={formElement.config.validation}
                             touched={formElement.config.touched}
                             changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                             />
        })}
       
        
        <Button disabled={!this.state.formIsValid} buttonType="Success" >Order</Button>
    </form>;
    if(this.props.loading){
        form= <Spinner />
    }

return <div className={Classes.ContactData}>
   {form}
</div>
    }
}

const mapStateToProps=(state)=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }  
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));