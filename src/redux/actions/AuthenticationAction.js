import type from "../type";

const RegistrationAction = (userData) => {
    return{
        type: type.SIGNUP,
        payload: userData
    }
}

const LoginAction = (userData) => {

    return {
        type: type.LOGIN,
        payload: userData
    }
}

const LogOutAction = (state) => {

    return {
        type: type.LOG_OUT,
        payload: state
    }
}


export {RegistrationAction, LoginAction, LogOutAction}