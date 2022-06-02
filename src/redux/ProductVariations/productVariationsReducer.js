import { SET_PRODUCT_VARIATIONS, SET_STATUS } from "./productVariationsConstant";

const initialState = {
    productVariations: [],
    status:"create"
}

const ProductVariationsReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_PRODUCT_VARIATIONS:
            return { ...state, productVariations: [...payload.productVariations] }
        case SET_STATUS:
            return { ...state, status: payload.status }
        default:
            return state
    }
}

export default ProductVariationsReducer