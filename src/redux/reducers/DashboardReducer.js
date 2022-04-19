import type from "../type";

const initialState = {
    usersList: null
}

const DashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case type.STORE_USERS_LIST:
            return { ...state, usersList: action.payload }
        default:
            return state
    }
}

export {DashboardReducer}