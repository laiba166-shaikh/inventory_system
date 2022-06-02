import client from "../client"
import { Buffer } from "buffer";
import { GET_ALL_PRODUCT, PRODUCT_START_LOADING, PRODUCT_ERROR, DELETE_PRODUCT } from "./ProductUploadConstant";
import { setProductVariations } from "../ProductVariations/productVariationsActions";
import { v4 as uuidv4 } from 'uuid';
import { mapProductVariationDetail, modelProductVariationsFromResponse } from "../../utility/productVariations";

export const getAllProducts = (page, limit, params) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_START_LOADING })
        const { name, categoryId, masterSku } = params
        const { data } = await client.get(`/products?page=${page + 1}&limit=${limit}&categoryId=${categoryId}&masterSku=${masterSku}&name=${name}`)
        dispatch({
            type: GET_ALL_PRODUCT,
            payload: {
                products: data.data.responseObj.products,
                totalCount: data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: PRODUCT_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const getProduct = (productId) => async (dispatch, getState) => {
    try {
        const { data, status } = await client.get(`/products/${productId}`)
        console.log("api -> ", data);
        if (status === 200) {
            var product = data.data.product
            if (product.isvariableProduct) {
                const productVariationDetailItems = []
                //map variations of product
                const productVariations = [...data.data.productVariations]
                // const { variationTypes: { variationType } } = getState()
                // var variations = modelProductVariationsFromResponse(productVariations, variationType)
                // dispatch(setProductVariations([...variations]))
                //map table data (product variation detail)
                var productItems = [...data.data.productItems]
                var productVariationDetails = [...data.data.productVariationDetails]
                for (let i = 0; i < productItems.length; i++) {
                    const productItem = productItems[i]
                    const varDetail = productVariationDetails.find((single) => single._id === productItem.productVariationDetailId)
                    var variationTypeId = varDetail.secondProductVariationId?._id ?
                        [varDetail.firstProductVariationId?.name, varDetail.secondProductVariationId?.name] :
                        [varDetail.firstProductVariationId?.name]
                    const alreadyExist = productVariationDetailItems.find(row => {
                        return row.var2?.id ?
                            (row.var2.optionName === varDetail.secondProductVariationId?.name && row.var1.optionName === varDetail.firstProductVariationId?.name) :
                            (row.var1.optionName === varDetail.firstProductVariationId?.name)
                    })
                    const returnObject = {
                        id: productItem._id,
                        quantity: productItem.quantity,
                        productSku: productItem.productSku,
                        warehouseId: productItem.warehouseId,
                        var1: { id: varDetail.firstProductVariationId?.name, optionName: varDetail.firstProductVariationId?.name },
                        var2: { id: varDetail.secondProductVariationId?.name, optionName: varDetail.secondProductVariationId?.name },
                    }
                    console.log("check1 ->", productVariationDetailItems, productVariationDetailItems.length)
                    alreadyExist ? productVariationDetailItems.push({ ...returnObject, variationTypeId }) : productVariationDetailItems.push({ ...returnObject })
                }
                // productVariationDetailItems = productVariationDetails.map((varDetail) => {
                //     var productItem = productItems.find((item) => item.productVariationDetailId === varDetail._id)
                //     return {
                //         id: productItem._id,
                //         quantity: productItem.quantity,
                //         productSku: productItem.productSku,
                //         warehouseId: productItem.warehouseId,
                //         var1: { id: varDetail.firstProductVariationId?.name, optionName: varDetail.firstProductVariationId?.name },
                //         var2: { id: varDetail.secondProductVariationId?.name, optionName: varDetail.secondProductVariationId?.name },
                //         variationTypeId: varDetail.secondProductVariationId ?
                //          [varDetail.firstProductVariationId?.name,varDetail.secondProductVariationId?.name] :
                //          [varDetail.firstProductVariationId?.name]
                //     }
                // })
                product = { ...product, productVariationDetail: productVariationDetailItems, productVariations: productVariations }
            }
            console.log("product -.", product)
            return {
                status: "success",
                product: { ...product }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            error: "can't get product"
        }
    }
}

export const updateProduct = (product,prevItems) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_START_LOADING })
        const { _id, ...body } = product
        const reqBody = {
            ...body,
            productVariationDetail: mapProductVariationDetail(body.productVariationDetail)
        }
        const { data } = await client.patch(`/products/${_id}`, { ...reqBody })
        const resProdItems = [...data.data.responseObj.productItems[0]]
        const productId = _id
        const imagePromises = await uploadProductImage(productId, resProdItems, body.productVariationDetail,prevItems)
        Promise.all(imagePromises).then(() => console.log("imagesUploaded"))
        return 1;
    } catch (error) {
        console.log(error.response, "something is wrong")
        dispatch({ type: PRODUCT_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_START_LOADING })
        const { userData } = getState().auth
        const reqBody = {
            ...product,
            userId: userData.id,
            organizationId: "62968ddb18de783ad3936e0e",
            productVariationDetail: mapProductVariationDetail(product.productVariationDetail)
        }
        const { data, status } = await client.post(`/products/`, { ...reqBody })
        const resProdItems = [...data.data.product.productItems[0]]
        const productId = data.data.product.product._id
        const imagePromises = await uploadProductImage(productId, resProdItems, product.productVariationDetail)
        Promise.all(imagePromises).then(() => console.log("imagesUploaded"))
        return 1
    } catch (error) {
        console.log("error", error, "something is wrong")
        dispatch({ type: PRODUCT_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const uploadProductImage = (productId, productItems, productArray,prevItems) => {
    try {
        const imagePromises = []
        const updateImageDetailsPromises=[]
        console.log('prevItems ->',prevItems,productArray)
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            }
        };
        productItems.forEach((item, index) => {
            const formData = new FormData()
            // const id = item._id
            const currentItem = productArray[index]
            const image = currentItem?.img
            console.log('image ->',image)
            if (image) {
                console.log('imaegIF ->',item.productSku)
                formData.append('img', image)
                const promise = client.post(`/products/img/?warehouseId=${item.warehouseId}&productId=${productId}&productSku=${item.productSku}`, formData, config)
                imagePromises.push(promise)
            } else if(!image && productArray[index].preview){
                console.log('imaegELSE ->',item.productSku)
                //new data
                const updateImgData = {
                    warehouseId:item.warehouseId,
                    productSku:item.productSku,
                }
                const currentPrevItem = prevItems?.find(prev=>prev.id===currentItem.id)
                console.log('previtem ->',currentPrevItem)
                if(currentPrevItem){
                    const updateImagePromise = client.patch(`/products/img/update?warehouseId=${currentPrevItem?.warehouseId}&productId=${productId}&productSku=${currentPrevItem.productSku}`,updateImgData)
                    updateImageDetailsPromises.push(updateImagePromise)
                }
            }else return
        });
        return [imagePromises,updateImageDetailsPromises]
    } catch (error) {
        console.log('error get image url -> ', error.message)
    }
}
// export const updateProductImage = (productId,productItems,productArray) => {
//     try {
//         const imagePromises = []
//         const config = {
//             headers: {
//                 "content-type": "multipart/form-data",
//             }
//         };
//         productItems.forEach((item, index) => {
//             const formData = new FormData()
//             // const id = item._id
//             const image = productArray[index].img
//             if (image) {
//                 formData.append('img', image)
//                 const promise = client.post(`/products/img/update/?warehouseId=${item.warehouseId}&productId=${productId}&productSku=${item.productSku}`, formData, config)
//                 imagePromises.push(promise)
//             } else return
//         });
//         return imagePromises
//     } catch (error) {
//         console.log('error get image url -> ', error.message)
//     }
// }
export const getProductItemImage = (item, productId) => async (dispatch) => {
    try {
        const image = await client.get(`/products/img/${productId}?warehouseId=${item.warehouseId}&productSku=${item.productSku}`, {
            responseType: "arraybuffer",
            headers: { 'content-Type': 'application/json' }
        });
        if (image.data) {
            let raw = new Buffer.from(image.data).toString('base64');
            return "data:" + image.headers["content-type"] + ";base64," + raw;
        } else {
            return 'error'
        }
    } catch (error) {
        console.log("error geteting image ->", error.message)
        return 'error'
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        const res = await client.delete(`/products/${id}`)
        dispatch({
            type: DELETE_PRODUCT,
            payload: {
                productId: id
            }
        })
    } catch (error) {
        console.log("delete error ->", error.message)
    }
}