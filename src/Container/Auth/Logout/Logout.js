import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Redirect,withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/index';



class Logout extends Component{
    render(){
        console.log("Enterred the Logout Component")
        return<Redirect to="/"/>
    }
    componentDidMount(){
    this.props.onLogOut();
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onLogOut:()=>dispatch(actions.authLogOut())
    }
}

export default connect(null,mapDispatchToProps)(Logout);