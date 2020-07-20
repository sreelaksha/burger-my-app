import * as actionTypes from './actions.js';

const initialState = {
     ingredients : {
        bacon : 0,
        cheese: 0,
        meat: 0,
        salad: 0,
     },
     totalPrice: 4
};

const reducer = (state = initialState, action) => {
    switch(actionTypes){
        case actionTypes.ADD_INGREDIENT:
            return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                    }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                    }
            };
        default:
            return state;
    }
};


export default reducer;