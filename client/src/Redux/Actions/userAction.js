import {USER_LOGIN, USER_LOGOUT} from "../types";

export const userLogin = (user) => {
    return {
        type: USER_LOGIN,
        playLoad: user
    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}
