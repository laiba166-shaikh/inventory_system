import { GET_ALL_VARIATION_TYPE, VARIATION_TYPE_START_LOADING, VARIATION_TYPE_ERROR, VARIATION_TYPE_STOP_LOADING, UPDATE_VARIATION_TYPE, CREATE_VARIATION_TYPE } from "./variationTypeConstant";

const initialState = {
    variationTypeLoading: false,
    error: "",
    variationType: [],
    totalCount: 0
}

const VariationTypeReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case VARIATION_TYPE_START_LOADING:
            return { ...state, variationTypeLoading: true };
        case VARIATION_TYPE_STOP_LOADING:
            return { ...state, variationTypeLoading: false };
        case VARIATION_TYPE_ERROR:
            return { ...state, variationTypeLoading: false, error: payload.error };
        case CREATE_VARIATION_TYPE:
            return {
                ...state,
                variationTypeLoading: false,
                variationType:[...state.variationType,{...payload.variationType}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_VARIATION_TYPE:
            return {
                ...state,
                variationTypeLoading: false,
                variationType: [...payload.variationTypes],
                totalCount: payload.totalCount
            }
        case UPDATE_VARIATION_TYPE:
            return {
                ...state,
                variationTypeLoading: false,
                variationType: state.variationType.map((vat) => {
                    if (vat._id === payload.variationType._id) return { ...payload.variationType }
                    else return vat
                })
            }
        default:
            return state
    }
}

export default VariationTypeReducer