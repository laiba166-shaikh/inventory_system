import client from "../client"
import { GET_ALL_CATEGORY, CATEGORY_START_LOADING, CATEGORY_ERROR, CATEGORY_STOP_LOADING, UPDATE_CATEGORY, CREATE_CATEGORY } from "./CategoryConstant";

export const getAllCategory=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:CATEGORY_START_LOADING})
        const {data}=await client.get(`/categories?page=${page+1}&limit=${limit}`)
        dispatch({
            type:GET_ALL_CATEGORY,
            payload:{
                categories:data.data.categorys,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:CATEGORY_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getCategory=(categoryId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/categories/${categoryId}`)
        if(status === 200) {
            return {...data.data.category}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateCategory=(category)=>async (dispatch)=>{
    try {
        dispatch({type:CATEGORY_START_LOADING})
        const {_id,...body}=category
        const {data}=await client.patch(`/categories/${_id}`,{...body})
        dispatch({
            type:UPDATE_CATEGORY,
            payload:{
                category:{...data.data.category}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:CATEGORY_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createCategory=(category)=>async (dispatch,getState)=>{
    try {
        dispatch({type:CATEGORY_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...category,userId:userData.id,organizationId:"62968ddb18de783ad3936e0e"}
        const {data}=await client.post(`/categories/`,{...reqBody})
        dispatch({
            type:CREATE_CATEGORY,
            payload:{
                category:{...data.data.category}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:CATEGORY_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}