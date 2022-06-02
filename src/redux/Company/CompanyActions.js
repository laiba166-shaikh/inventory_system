import client from "../client"
import { GET_ALL_COMPANY, COMPANY_START_LOADING, COMPANY_ERROR, COMPANY_STOP_LOADING, UPDATE_COMPANY, CREATE_COMPANY } from "./CompanyConstant";


export const getAllCompanies=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:COMPANY_START_LOADING})
        const {data}=await client.get(`/companies?page=${page+1}&limit=${limit}`)
        console.log("api -> ",data);
        dispatch({
            type:GET_ALL_COMPANY,
            payload:{
                companies:data.data.companies,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:COMPANY_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getCompany=(companyId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/companies/${companyId}`)
        console.log("api -> ",data);
        if(status === 200) {
            return {...data.data.company}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateCompany=(company)=>async (dispatch)=>{
    try {
        dispatch({type:COMPANY_START_LOADING})
        const {_id,...body}=company
        const {data}=await client.patch(`/companies/${_id}`,{...body})
        console.log("api -> ",data);
        dispatch({
            type:UPDATE_COMPANY,
            payload:{
                company:{...data.data.company}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:COMPANY_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createCompany=(company)=>async (dispatch,getState)=>{
    try {
        dispatch({type:COMPANY_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...company,userId:userData.id}
        const {data,status}=await client.post(`/companies/`,{...reqBody})
        dispatch({
            type:CREATE_COMPANY,
            payload:{
                company:{...data.data.company}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:COMPANY_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}