import type from "../type"

const initialState = {
    userMetaData: null,
}

const AuthenticationReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case type.LOGIN:
            return { ...state, userMetaData: action.payload }
        case type.SIGNUP:
            return { ...state, userMetaData: action.payload }       

        default:
            return state
    }
}

export { AuthenticationReducer }