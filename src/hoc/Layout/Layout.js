import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../Components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/UI/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component{

    state={
        showSideDrawer:false
    }

    sideDrawerCloseHandler=()=>{
       console.log("inside side drawer");
        this.setState((prevState,props)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }
    render(){
        return <Aux>
        <Toolbar
        isAuth={this.props.isAuthenticated}
         drawerToggleClicked={this.sideDrawerCloseHandler}/>
        <SideDrawer 
        isAuth={this.props.isAuthenticated}
         open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        {/* <div>ToolbarNavugation drawer and backdrop</div> */}
    <main   className={classes.Content}>{this.props.children}</main>
    </Aux>
    }
}

const mapStateToProps=(state)=>{
        return{
            isAuthenticated:state.auth.token!==null
        }
}

export default  connect(mapStateToProps)(Layout);