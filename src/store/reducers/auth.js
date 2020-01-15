import * as actionTypes from '../actions/actionTypes';
import{ updateObject} from '../utility';
import { stat } from 'fs';
const initialState={
    loading:false,
    error:null,
    userId:null,
    token:null,
    authRedirectPath:'/'
};

const authStart=(state, action)=>{
    return updateObject(state,{error:null,loading:true});
}

const authSuccess=(state,action)=>{
    return updateObject(state,{
        error:null,
        userId:action.userId,
        token:action.idToken,
        loading:false
    });
}

const authFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}

const authLogOut=(state,action)=>{
    console.log("AuthLog out in Auth reducer");
    return updateObject(state,{userId:null,token:null})

}


const setAuthRedirectPath=(state,action)=>{
    return updateObject(state,{authRedirectPath:action.path});
}
const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:
            return authFail(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state,action);
        case actionTypes.AUTH_LOGOUT:
                console.log("I am logout in auth reducer");
                return authLogOut(state,action);
       default: 
        console.log("action,", action);
        return state;

    }
}


export default reducer;