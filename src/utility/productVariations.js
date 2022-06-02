import { v4 as uuidv4 } from 'uuid';
export const getOptionsValues = (variation, index) => {
    const optionList = document.querySelector(`#option-list-${index}`);
    const optionItems = optionList.querySelectorAll(".option-item")
    const temp = []
    optionItems.forEach((option) => temp.push(option.children[0].value))
    variation.options = temp
    return variation
}

export const modelProductReqBody = (productInfo, productVariations, userId, oldVariations) => {
    var productBasicInfo = productInfo
    var productMapVariations = []
    if (productVariations.length >= 1) {
        const { quantity, warehouseId, upc, ...resInfo } = productBasicInfo
        productBasicInfo = { ...resInfo }
    }
    productVariations.forEach((variation, ix) => {
        const { options } = variation
        var returnObj = {}
        var newVariationsData = options.map((opt) => {
            returnObj = {
                name: opt.optionName,
                userId: userId,
                variationTypeId: variation.variationTypeId,
            }
            return returnObj
        })
        productMapVariations = [...productMapVariations, ...newVariationsData]
    });
    const productReqBody = {
        ...productBasicInfo,
        productVariations: productMapVariations,
        // productVariationDetail: productVariationDetail
    }
    return productReqBody
}

export const mapProductVariationDetail = (productVarDetail) => {
    const productVariationDetail = productVarDetail.map(single => {
        // var { var1, var2, img, preview, ...varDetail } =single
        const varDetail = { 
            quantity: parseInt(single.quantity),
            warehouseId:single.warehouseId,
            productSku:single.productSku,
            variationTypeId:single.variationTypeId
        }
        return varDetail
    })
    return productVariationDetail
}

export const modelProductVariationsFromResponse = (productVariations, variationType) => {
    var variations = []
    productVariations.forEach((variation) => {
        const prevVariation = variations?.find((vart) => vart.variationTypeId === variation.variationTypeId)
        if (prevVariation) {
            prevVariation["options"] = [...prevVariation.options, { id: variation.name, optionName: variation.name }]
        } else {
            const newVariation = {
                variationTypeId: variation.variationTypeId,
                options: [{ id: variation.name, optionName: variation.name }],
                name: variationType.find(type => type._id === variation.variationTypeId)?.name
            }
            variations.push(newVariation)
        }
    })
    return variations
}

export const validErrors = (rows)=>{
    var isNoError=false
    var errorMessages = rows.map((row,index)=>{
        var errorObj =  {
            quantity: row.quantity==="" ? "Quantity is required" : "",
            warehouseId:row.warehouseId===""?"Warehouse is required":""
        }
        return errorObj
    })
    isNoError = errorMessages.every(single=>{
        return Object.values(single).every(val => val === "")
    })
    return {errorMessages,isNoError}
}

const createVariationInitData = (options, rowObject) => {
    options.forEach((vart, ix) => {
        rowObject[`var${ix + 1}`] = vart
    })
    return { ...rowObject }
};

export const createTableInitialValues = (productVariations,rows) => {
    const rowElements = []
    if (productVariations.length === 1) {
        const variation1Options = productVariations[0]?.options
        // const variationTypeIds = [productVariations[0].variationTypeId,productVariations[1].variationTypeId]
        for (let i = 0; i < variation1Options?.length; i++) {
            const rowVariations = [variation1Options[i]]
            const variationCopyRows = rows?.filter(row => row.var1?.id === variation1Options[i]?.id && !row["var2"]?.id)
            if (variationCopyRows.length) {
                for (let j = 0; j < variationCopyRows?.length; j++) {
                    const rowObject = variationCopyRows[j]
                    // const rowObject = getRowObject(rowVariations)
                    rowElements.push(createVariationInitData(rowVariations, rowObject))
                }
            } else {
                // const rowObject = getRowObject(rowVariations)
                const rowObject = { img: "", preview: "",hasImage:false, quantity: 0, productSku: "", warehouseId: "" }
                rowElements.push(createVariationInitData(rowVariations, rowObject))
            }
        }
    } else {
        const variation1Options = productVariations[0]?.options //[sm,medium]
        const variation2Options = productVariations[1]?.options //[blue,gray]
        // const variationTypeIds = [productVariations[0].variationTypeId,productVariations[1].variationTypeId]
        for (let i = 0; i < variation1Options?.length; i++) {
            for (let j = 0; j < variation2Options?.length; j++) {
                const rowVariations = [variation1Options[i], variation2Options[j]] //[sm,blue]
                const variationCopyRows = rows?.filter(row => {
                    return ((row.var1?.id === variation1Options[i]?.id && row.var2?.id === variation2Options[j]?.id) ||
                        (row.var1?.id === variation2Options[j]?.id && row.var2?.id === variation1Options[i]?.id))
                })
                if (variationCopyRows.length) {
                    for (let j = 0; j < variationCopyRows?.length; j++) {
                        const rowObject = variationCopyRows[j]
                        // const rowObject = getRowObject(rowVariations)
                        rowElements.push(createVariationInitData(rowVariations, rowObject))
                    }
                } else {
                    // const rowObject = getRowObject(rowVariations)
                    const rowObject = { img: "", preview: "",hasImage:false, quantity: 0, productSku: "", warehouseId: "" }
                    rowElements.push(createVariationInitData(rowVariations, rowObject))
                }
            }
        }
    }
    return rowElements
}