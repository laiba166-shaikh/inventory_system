
import { GET_ALL_PRODUCT, PRODUCT_START_LOADING, PRODUCT_ERROR, PRODUCT_STOP_LOADING, UPDATE_PRODUCT, CREATE_PRODUCT, DELETE_PRODUCT } from "./ProductUploadConstant";

const initialState = {
    productLoading: false,
    error: "",
    products: [],
    totalCount: 0
}

const ProductReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_START_LOADING:
            return { ...state, productLoading: true };
        case PRODUCT_STOP_LOADING:
            return { ...state, productLoading: false };
        case PRODUCT_ERROR:
            return { ...state, productLoading: false, error: payload.error };
        case GET_ALL_PRODUCT:
            return {
                ...state,
                productLoading: false,
                products: [...payload.products],
                totalCount: payload.totalCount
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(prod => prod._id !== payload.productId),
                totalCount: state.totalCount - 1
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                productLoading: false,
                products: [...state.products, { ...payload.product }],
                totalCount: state.totalCount + 1
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                productLoading: false,
                products: state.products.map((product) => {
                    if (product._id === payload.product._id) return { ...payload.product }
                    else return product
                })
            }
        default:
            return state
    }
}

export default ProductReducer;