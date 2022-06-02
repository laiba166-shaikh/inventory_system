import { Route, Routes } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../modules/Auth/Login";
import Users from "../modules/Administration/subpages/User/Users";
import Company from "../modules/Administration/subpages/Company/Company";
import Warehouse from "../modules/Administration/subpages/Warehouse/Warehouse";
import ProductCategory from "../modules/Administration/subpages/ProductCategory/ProductCategory";
import VariationType from "../modules/Administration/subpages/VariationType/VariationType";
import Product from "../modules/Administration/subpages/ProductUpload/ProductUpload";
import AddProduct from "../modules/Administration/subpages/ProductUpload/AddProduct";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="main">
                <Route path="admin" element={<MainLayout />} >
                    {/* <Route path="users/*" element={<Users />} /> */}
                    {/* <Route path="company/*" element={<Company />} /> */}
                    <Route path="warehouse/*" element={<Warehouse />} />
                    <Route path="product-category/*" element={<ProductCategory />} />
                    <Route path="variation-type/*" element={<VariationType />} />
                    <Route path="product" element={<Product />} />
                    <Route path="product/edit" element={<AddProduct />} />
                    <Route path="product/:productId/edit" element={<AddProduct />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;