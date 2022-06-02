import client from "../client"
import { GET_ALL_USERS, USERS_START_LOADING, USER_ERROR, USERS_STOP_LOADING, UPDATE_USER } from "./UserConstant";


export const getAllUsers=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:USERS_START_LOADING})
        const {data,status}=await client.get(`/users?page=${page+1}&limit=${limit}`)
        console.log("api -> ",data);
        const users=data.data.users.map((user)=>({...user,role:user.role.name}))
        dispatch({
            type:GET_ALL_USERS,
            payload:{
                users:users,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:USER_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getUser=(userId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/users/${userId}`)
        console.log("api -> ",data);
        const {role,password,...userData}=data.data.user
        if(status === 200) {
            return {...userData,roleId:role._id}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateUser=(user)=>async (dispatch)=>{
    try {
        dispatch({type:USERS_START_LOADING})
        const {_id,...body}=user
        const {data,status}=await client.patch(`/users/${_id}`,{...body})
        console.log("api -> ",data);
        const {role,password,...userData}=data.data.user
        dispatch({
            type:UPDATE_USER,
            payload:{
                user:{...userData,role:role.name}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:USER_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}