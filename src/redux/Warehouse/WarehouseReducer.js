
import { GET_ALL_WAREHOUSE, WAREHOUSE_START_LOADING, WAREHOUSE_ERROR, WAREHOUSE_STOP_LOADING, UPDATE_WAREHOUSE, CREATE_WAREHOUSE } from "./WarehouseConstant";

const initialState = {
    warehouseLoading: false,
    error: "",
    warehouses: [],
    totalCount: 0
}

const WarehouseReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case WAREHOUSE_START_LOADING:
            return { ...state, warehouseLoading: true };
        case WAREHOUSE_STOP_LOADING:
            return { ...state, warehouseLoading: false };
        case WAREHOUSE_ERROR:
            return { ...state, warehouseLoading: false, error: payload.error };
        case CREATE_WAREHOUSE:
            return {
                ...state,
                warehouseLoading: false,
                warehouses:[...state.warehouses,{...payload.warehouse}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_WAREHOUSE:
            return {
                ...state,
                warehouseLoading: false,
                warehouses: [...payload.warehouses],
                totalCount: payload.totalCount
            }
        case UPDATE_WAREHOUSE:
            return {
                ...state,
                warehouseLoading: false,
                warehouses: state.warehouses.map((warehouse) => {
                    if (warehouse._id === payload.warehouse._id) return { ...payload.warehouse }
                    else return warehouse
                })
            }
        default:
            return state
    }
}

export default WarehouseReducer