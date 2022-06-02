import client from "../client"
import { GET_ALL_VARIATION_TYPE, VARIATION_TYPE_START_LOADING, VARIATION_TYPE_ERROR, VARIATION_TYPE_STOP_LOADING, UPDATE_VARIATION_TYPE, CREATE_VARIATION_TYPE } from "./variationTypeConstant";


export const getAllVariationType=(page,limit,queryParams="")=>async (dispatch) => {
    try {
        dispatch({type:VARIATION_TYPE_START_LOADING})
        const {data}=await client.get(`/variationTypes?page=${page+1}&limit=${limit}&categoryId=${queryParams}`)
        console.log(" get api -> ",data);
        dispatch({
            type:GET_ALL_VARIATION_TYPE,
            payload:{
                variationTypes:data.data.variationTypes,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:VARIATION_TYPE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getVariationType=(variationTypeId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/variationTypes/${variationTypeId}`)
        if(status === 200) {
            return {...data.data.variationType}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateVariationType=(variationType)=>async (dispatch)=>{
    try {
        dispatch({type:VARIATION_TYPE_START_LOADING})
        const {_id,...body}=variationType
        const {data}=await client.patch(`/variationTypes/${_id}`,{...body})
        dispatch({
            type:UPDATE_VARIATION_TYPE,
            payload:{
                variationType:{...data.data.variationType}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:VARIATION_TYPE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createVariationType=(variationType)=>async (dispatch,getState)=>{
    try {
        dispatch({type:VARIATION_TYPE_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...variationType,userId:userData.id}
        const {data}=await client.post(`/variationTypes/`,{...reqBody})
        dispatch(getAllVariationType(0,10,""))
        // dispatch({
        //     type:CREATE_VARIATION_TYPE,
        //     payload:{
        //         variationType:{...data.data.variationType}
        //     }
        // })
    } catch (error) {
        console.log(error)
        dispatch({type:VARIATION_TYPE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}