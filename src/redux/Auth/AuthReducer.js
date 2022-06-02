import { AUTH_START_LOAD, AUTH_ERROR, USER_SIGN_IN, LOGOUT } from "./AuthConstant";


const initialState={
    token:"",
    userRole:{},
    userData:{},
    authLoading:false,
    error:""
}

const AuthReducer=(state=initialState,action)=>{
    const {type,payload}=action
    switch (type) {    
        case AUTH_START_LOAD:
            return {...state,authLoading:true,error:""}
        case AUTH_ERROR:
            return {...state,authLoading:false,error:payload.errorMessage}
        case USER_SIGN_IN:
            return {
                ...state,
                authLoading:false,
                token:payload.token,
                userRole:payload.userRole,
                userData:payload.user,
            }
        case LOGOUT:
            return {
                ...state,
                token:"",
                userRole:{},
                userData:{}
            }
        default:
            return state;
    }
}

export default AuthReducer;
