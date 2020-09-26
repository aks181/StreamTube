import { SIGN_IN, SIGN_OUT } from "./types";

export const signInAction = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOutAction = () => {
    return {
        type: SIGN_OUT
    }
}

