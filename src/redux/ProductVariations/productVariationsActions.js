import { SET_PRODUCT_VARIATIONS,SET_STATUS } from "./productVariationsConstant";

export const setProductVariations = (productVariations) => dispatch => {
    console.log('variations redux state set')
    dispatch({
        type: SET_PRODUCT_VARIATIONS,
        payload: {
            productVariations
        }
    })
}

export const setEditStatus = (status) => (dispatch) => {
    dispatch({
        type: SET_STATUS,
        payload: {
            status
        }
    })
}