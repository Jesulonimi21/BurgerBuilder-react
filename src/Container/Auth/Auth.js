import React,{Component} from 'react';
import Input from "../../Components/UI/Input/Input";
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
class Auth extends Component{

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:"",
                validation:{
                required:true,
                isEmail:true
                },
                valid:false,
                touched:false 
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:"",
                validation:{
                required:true,
                minLength:6
                },
                valid:false,
                touched:false 
            },   
        },
        isSignUp:true
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

    inputChangedHandler=(event,controlName)=>{
        const updatedControls={
           ...this.state.controls,
           [controlName]:{
               ...this.state.controls[controlName],
               value:event.target.value,
               touched:true,
               valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation)
           
            }
        }
        this.setState({controls:updatedControls});
    }

    componentDidMount(){
        if(!this.props.buildingBurger&&this.props.authRedirectPath!=="/"){
            this.props.onSetAuthRedirectPath();
        }
    }

    switchAuthModeHandler=()=>{
        this.setState((prevState)=>{
            return{
                isSignUp:!prevState.isSignUp
            }
        });
    }
    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuthStarted(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }
    render(){
        let formElementsArray=[];
        for(let keys in this.state.controls){
            formElementsArray.push({
                id:keys,
                config:this.state.controls[keys]
            });
        }
        let form=formElementsArray.map((formElement)=>{
            return <Input key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        
                    />
        });
        if(this.props.loading){
            form=<Spinner />
        }

        let errorMessage=null;
        if(this.props.error){
            errorMessage=<p>{this.props.error.message}</p>
        }

        let redirect=null;
        console.log("isAuthenticated",this.props.isAuthenticated);
        if(this.props.isAuthenticated){
            console.log("THe frfedirect path is "+this.props.authRedirectPath)
            redirect=<Redirect to={this.props.authRedirectPath}/>
        }
        return(
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button buttonType="Success">Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                buttonType="Danger">Switch to {this.state.isSignUp?"Sign in":"Sign up"}</Button>
               
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onAuthStarted:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath("/"))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);