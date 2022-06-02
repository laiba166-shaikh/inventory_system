import React, { useState } from 'react';

const readFile = (file,name) => {
    return new Promise(function(resolve,reject){
        let fr = new FileReader();
        fr.onload = function(){
            resolve({
                imageUrl:fr.result,
                filename:name
            });
        };
        fr.onerror = function(){
            reject(fr);
        };
        fr.readAsDataURL(file);
    });
}


export const UseDisplayImage = () => {
    // const [result, setResult] = useState("");
    var singleResultPromise=[]

    function ImagePreview(imageFile) {
        singleResultPromise.push(readFile(imageFile,imageFile.name))
        return singleResultPromise
    }

    return { ImagePreview };
}