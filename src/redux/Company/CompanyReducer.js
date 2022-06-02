
import { GET_ALL_COMPANY, COMPANY_START_LOADING, COMPANY_ERROR, COMPANY_STOP_LOADING, UPDATE_COMPANY, CREATE_COMPANY } from "./CompanyConstant";

const initialState = {
    companyLoading: false,
    error: "",
    companies: [],
    totalCount: 0
}

const CompanyReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case COMPANY_START_LOADING:
            return { ...state, companyLoading: true };
        case COMPANY_STOP_LOADING:
            return { ...state, companyLoading: false };
        case COMPANY_ERROR:
            return { ...state, companyLoading: false, error: payload.error };
        case CREATE_COMPANY:
            return {
                ...state,
                companyLoading: false,
                companies:[...state.companies,{...payload.company}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_COMPANY:
            return {
                ...state,
                companyLoading: false,
                companies: [...payload.companies],
                totalCount: payload.totalCount
            }
        case UPDATE_COMPANY:
            return {
                ...state,
                companyLoading: false,
                companies: state.companies.map((company) => {
                    if (company._id === payload.company._id) return { ...payload.company }
                    else return company
                })
            }
        default:
            return state
    }
}

export default CompanyReducer