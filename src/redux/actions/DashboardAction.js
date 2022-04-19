import type from "../type"

const StoreUsersListAction = (data) => {
    return {
        type: type.STORE_USERS_LIST,
        payload: data
    }
}

export {StoreUsersListAction}