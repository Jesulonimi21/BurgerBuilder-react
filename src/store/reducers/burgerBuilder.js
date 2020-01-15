import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
import { stat } from 'fs';

const initialState={
    ingredients:null,
    totalPrice:4,
    building:false
}
const INGREDIENTS_PRICE={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:1.7    
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient={ [action.ingredientName]:state.ingredients[action.ingredientName]+1};
            const updatedIngredients=updateObject(state.ingredients,updatedIngredient);
            const updatedState={
                ingredients:updatedIngredients,
                totalPrice:state.totalPrice+INGREDIENTS_PRICE[action.ingredientName],
                building:true
            }
            return updateObject(state,updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENTS_PRICE[action.ingredientName],
                building:true
            };

        case actionTypes.SET_INGREDIENT:
             return{
                 ...state,
                 ingredients:{
                     salad:action.ingredients.salad,
                     cheese:action.ingredients.cheese,
                     bacon:action.ingredients.bacon,
                     meat:action.ingredients.meat                     
                 },
                 error:false,
                 totalPrice:4,
                 building:false
             }   

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        default: return state;
    }
}

export default reducer;

