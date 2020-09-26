import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
    loggedIn: null,     //initial value for state
    userId: null
}

//taking {} object bcoz of other data besides true/false flag
//Replacing {} with INITIAL_STATE 
export default (state = INITIAL_STATE , action) => {    
    switch( action.type ) {
        case SIGN_IN: 
            return {...state, loggedIn: true , userId: action.payload};
        case SIGN_OUT: 
            return {...state, loggedIn: false , userId : false};
        default: 
            return state;
    }
}