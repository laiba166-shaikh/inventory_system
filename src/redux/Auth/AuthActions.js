import client from "../client.js";
import { getAllUsers } from "../User/UserActions.js";
import { AUTH_START_LOAD, AUTH_ERROR, USER_SIGN_IN, LOGOUT } from "./AuthConstant.js";

export const signin = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_START_LOAD })
        const { data } = await client.post(`/auth/signin`, { username, password });
        const { role, ...userData } = data.data.user

        localStorage.setItem("authToken", data.token)
        localStorage.setItem("userRole", data.data.user.role)
        dispatch({
            type: USER_SIGN_IN,
            payload: {
                token: data.token,
                userRole: data.data.user.role,
                user: userData
            }
        })
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: { errorMessage: "invalid email or password" } })
        console.log(error.response)
    }
}

export const createUser = (user) => async (dispatch) => {
    try {
        const { data } = await client.post(`/auth/signup`, { ...user });
        console.log(data);
        dispatch(getAllUsers(1, 5))
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: { errorMessage: "error in creating user" } })
        console.log(error.response)
    }
}

export const signout = () => async (dispatch) => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
    dispatch({ type: LOGOUT })
}