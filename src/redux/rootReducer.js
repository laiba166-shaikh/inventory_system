import { combineReducers } from "redux"
import AuthReducer from "./Auth/AuthReducer";
import CompanyReducer from "./Company/CompanyReducer";
import UsersReducer from "./User/UserReducer";
import WarehouseReducer from "./Warehouse/WarehouseReducer";
import CategoryReducer from "./Category/CategoryReducer";
import ProductReducer from "./ProductUpload/ProductUploadReducer";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import VariationTypeReducer from "./variationType/variationTypeReducer";
import ProductVariationsReducer from "./ProductVariations/productVariationsReducer";
import ProductItemsReducer from "./ProductItems/ProductItemsReducer";

const persistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['auth'] // which reducer want to store
};

const rootReducer = combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    companies: CompanyReducer,
    warehouses: WarehouseReducer,
    categories: CategoryReducer,
    variationTypes:VariationTypeReducer,
    products: ProductReducer,
    storeVariations:ProductVariationsReducer,
    productItems:ProductItemsReducer
});

const pReducer = persistReducer(persistConfig, rootReducer)
export default pReducer;