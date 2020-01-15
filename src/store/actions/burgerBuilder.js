import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient=(name)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const updateIngredients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
        error:true
    }
}

export const initIngredients=()=>{
    return (dispatch)=>{
        axios.get('https://react-my-burger-d112b.firebaseio.com/ingredients.json').then((response)=>{
            dispatch(updateIngredients(response.data));
        }).catch(error=>{
            dispatch(fetchIngredientsFailed())
        });
    }
}