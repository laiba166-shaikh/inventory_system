import { SET_PRODUCT_VARIATIONS,SET_STATUS,GET_PRODUCT_VARIATIONS } from "./productVariationsConstant";

export const setProductVariations = (productVariations) => dispatch => {
    console.log('variations redux state set',productVariations)
    dispatch({
        type: SET_PRODUCT_VARIATIONS,
        payload: {
            variations:[...productVariations]
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