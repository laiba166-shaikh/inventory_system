import { HomeOutlined } from '@material-ui/icons';

export const AdministrationLinks = {
    label: "Administration",
    path: "/main/admin",
    icon: <HomeOutlined style={{ color: "#4f4f4f", fontSize: 18 }} />,
    sublinks: [
        // {
        //     label: "Users",
        //     path: "/main/admin/users",
        //     allowed: ["SUPER_ADMIN"]
        // },
        // {
        //     label: "Company",
        //     path: "/main/admin/company",
        //     allowed: ["SUPER_ADMIN","ADMIN"]
        // },
        {
            label: "Warehouse",
            path: "/main/admin/warehouse",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            label: "Product Category",
            path: "/main/admin/product-category",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            label: "Variation Type",
            path: "/main/admin/variation-type",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            label: "Products",
            path: "/main/admin/product",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
    ]
}