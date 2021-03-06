import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBulder from './Container/BurgerBuilder';
import Checkout from './Container/Checkout/Checkout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Orders from './Container/Checkout/Orders/Orders';
import Auth from './Container/Auth/Auth';
import Logout from './Container/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
class App extends Component {


  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes=(
      <Switch>
      <Route path="/auth" component={Auth} />
       <Route path="/" component={BurgerBulder} /> 
       <Redirect to="/"/>
       </Switch> 
    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
         <Route path="/" component={BurgerBulder} />
         <Redirect to="/"/>
         
         </Switch> 
      )
    }
    return (
      <div >
     <Layout>
        {routes}
      </Layout>
  
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onTryAutoSignUp:()=>dispatch(actions.authCheckState())
  }
}

const mapStateToProps=(state)=>{
  return{
    isAuthenticated:state.auth.token!==null
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
