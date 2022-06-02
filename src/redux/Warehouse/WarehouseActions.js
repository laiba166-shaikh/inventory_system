import client from "../client"
import { GET_ALL_WAREHOUSE, WAREHOUSE_START_LOADING, WAREHOUSE_ERROR, WAREHOUSE_STOP_LOADING, UPDATE_WAREHOUSE, CREATE_WAREHOUSE } from "./WarehouseConstant";

export const getAllWarehouses=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:WAREHOUSE_START_LOADING})
        const {data}=await client.get(`/warehouses?page=${page+1}&limit=${limit}`)
        dispatch({
            type:GET_ALL_WAREHOUSE,
            payload:{
                warehouses:data.data.warehouses,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:WAREHOUSE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getWarehouse=(warehouseId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/warehouses/${warehouseId}`)
        if(status === 200) {
            return {...data.data.warehouse}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateWarehouse=(warehouse)=>async (dispatch)=>{
    try {
        dispatch({type:WAREHOUSE_START_LOADING})
        const {_id,...body}=warehouse
        const {data}=await client.patch(`/warehouses/${_id}`,{...body})
        dispatch({
            type:UPDATE_WAREHOUSE,
            payload:{
                warehouse:{...data.data.warehouse}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:WAREHOUSE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createWarehouse=(warehouse)=>async (dispatch,getState)=>{
    try {
        dispatch({type:WAREHOUSE_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...warehouse,userId:userData.id,organizationId:"62968ddb18de783ad3936e0e"}
        const {data}=await client.post(`/warehouses/`,{...reqBody})
        dispatch({
            type:CREATE_WAREHOUSE,
            payload:{
                warehouse:{...data.data.warehouse}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:WAREHOUSE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}