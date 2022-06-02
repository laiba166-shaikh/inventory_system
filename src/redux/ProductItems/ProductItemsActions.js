import { SET_PRODUCT_ITEMS } from "./ProductItemsConstant";


export const setProductItems = (rows) => (dispatch) => {
    dispatch({
        type: SET_PRODUCT_ITEMS,
        payload: {
            productItems: rows
        }
    })
}