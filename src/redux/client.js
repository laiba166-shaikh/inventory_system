import axios from "axios";
import { store } from "./store";

const client = axios.create({
    // baseURL: "http://localhost:8000/api/v1",
    baseURL: "https://inventory-manag-system.herokuapp.com/api/v1"
    // withCredentials:false
})

client.interceptors.request.use(
    (config) => {
        // const { auth } = store.getState();
        const authToken = localStorage.getItem("authToken")
        if (authToken) {
            config.headers.common['Authorization'] = `Bearer ${authToken}`
        }
        return config;
    },
    (err) => {
        console.log("client error");
        return Promise.reject(err);
    }
)

// const headers = { 'Response-Type': 'blob' };

// export const exportClient = axios.create({
//     baseURL: "https://inventory-manag-system.herokuapp.com/api/v1",
// })

// exportClient.interceptors.request.use(
//     (config) => {
//         const { auth } = store.getState();
//         if (auth) {
//             config.headers.common['Authorization'] = `Bearer ${auth.token}`
//         }
//         return config;
//     },
//     (err) => {
//         console.log("client error");
//         return Promise.reject(err);
//     }
// )

export default client;
// {
//     "name": "productD",
//     "userId": "627bfee3c054a934889d2662",
//     "categoryId": "627c0c194feaeecadfae04b0",
//     "organizationId": "62968ddb18de783ad3936e0e",
//     "description": "desc",
//     "masterSku": "sku",
//     "isvariableProduct": true,
//     "productVariations": [
//         {
//             "name": "S",
//             "userId": "627bfee3c054a934889d2662",
//             "variationTypeId": "628128d308896a8614717ec1"
//         },
//         {
//             "name": "M",
//             "userId": "627bfee3c054a934889d2662",
//             "variationTypeId": "628128d308896a8614717ec1"
//         },
//         {
//             "name": "Blue",
//             "userId": "627bfee3c054a934889d2662",
//             "variationTypeId": "628128cd08896a8614717ebb"
//         }
//     ],
//     "productVariationDetail": [
//         {
//             "productSku": "pvOne",
//             "warehouseId": "627c017c5cee0454e2d3d8ba",
//             "quantity": 85
//         },
//         {
//             "productSku": "pvTwo",
//             "warehouseId": "627c017c5cee0454e2d3d8ba",
//             "quantity": 90
//         }
//     ]
// }