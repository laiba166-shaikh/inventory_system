
import { GET_ALL_USERS, USERS_START_LOADING, USER_ERROR, USERS_STOP_LOADING, UPDATE_USER } from "./UserConstant";

const initialState = {
    usersLoading: false,
    error: "",
    users: [],
    totalCount: 0
}

const UsersReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USERS_START_LOADING:
            return { ...state, usersLoading: true };
        case USERS_STOP_LOADING:
            return { ...state, usersLoading: false };
        case USER_ERROR:
            return { ...state, usersLoading: false, error: payload.error };
        case GET_ALL_USERS:
            return {
                ...state,
                usersLoading: false,
                users: [...payload.users],
                totalCount: payload.totalCount
            }
        case UPDATE_USER:
            return {
                ...state,
                usersLoading: false,
                users: state.users.map((user) => {
                    if (user._id === payload.user._id) return { ...payload.user }
                    else return user
                })
            }
        default:
            return state
    }
}

export default UsersReducer