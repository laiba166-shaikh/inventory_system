import { GET_ALL_CATEGORY, CATEGORY_START_LOADING, CATEGORY_ERROR, CATEGORY_STOP_LOADING, UPDATE_CATEGORY, CREATE_CATEGORY } from "./CategoryConstant";

const initialState = {
    categoryLoading: false,
    error: "",
    category: [],
    totalCount: 0
}

const CategoryReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CATEGORY_START_LOADING:
            return { ...state, categoryLoading: true };
        case CATEGORY_STOP_LOADING:
            return { ...state, categoryLoading: false };
        case CATEGORY_ERROR:
            return { ...state, categoryLoading: false, error: payload.error };
        case CREATE_CATEGORY:
            return {
                ...state,
                categoryLoading: false,
                category:[...state.category,{...payload.category}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_CATEGORY:
            return {
                ...state,
                categoryLoading: false,
                category: [...payload.categories],
                totalCount: payload.totalCount
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                categoryLoading: false,
                category: state.category.map((cat) => {
                    if (cat._id === payload.category._id) return { ...payload.category }
                    else return cat
                })
            }
        default:
            return state
    }
}

export default CategoryReducer