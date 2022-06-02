import { SET_PRODUCT_ITEMS} from "./ProductItemsConstant";

const initialState = {
    productItems: [],
}
const ProductItemsReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_PRODUCT_ITEMS:
            return { ...state, productItems: [...payload.productItems] }
        default:
            return state
    }
}

export default ProductItemsReducer