import * as actionTypes from "./actionTypes";
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START,
       
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authLogOut=()=>{
    console.log("AuthLog out in acton auth.js",actionTypes.AUTH_LOGOUT);
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return{type:actionTypes.AUTH_LOGOUT};
}

export const checkTimeOut=(expirationTime)=>{
    return dispatch=>{
        setTimeout(
            ()=>{
               dispatch( authLogOut());
            },expirationTime*1000)
    }
}

export const setAuthRedirectPath=(path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const auth =(email,password,isSignUp)=>{
 
    return (dispatch)=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnhB62Q5d1umYFn32-gs036y8aRUN9oD0";
        if(!isSignUp){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnhB62Q5d1umYFn32-gs036y8aRUN9oD0"
        }
        axios.post(url,authData) .then((response)=>{
            console.log(response.data);
            localStorage.setItem('token',response.data.idToken);
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem("userId",response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkTimeOut(response.data.expiresIn))
        }).catch((error)=>{
            console.log("error",error);
            dispatch(authFail(error.response.data.error));
        })
     
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem("token");
        if(!token){
            dispatch(authLogOut());
        }else{
            const expirationDate=new Date(localStorage.getItem("expirationDate"));
            console.log("Date",new Date());
            if(expirationDate <= new Date()){
                dispatch(authLogOut());
            }else{
                    
                    const userId=localStorage.getItem("userId");
                dispatch(authSuccess(token,userId));
                dispatch(checkTimeOut((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}




// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyAnhB62Q5d1umYFn32-gs036y8aRUN9oD0",
//     authDomain: "react-my-burger-d112b.firebaseapp.com",
//     databaseURL: "https://react-my-burger-d112b.firebaseio.com",
//     projectId: "react-my-burger-d112b",
//     storageBucket: "react-my-burger-d112b.appspot.com",
//     messagingSenderId: "536533716004",
//     appId: "1:536533716004:web:89223c5b56d2ca19965cb1",
//     measurementId: "G-CX02509S7W"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>