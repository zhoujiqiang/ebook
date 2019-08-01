import axios from 'axios'
import { setLocalForage } from '../untils/localForage';

export function download (book, onSuccess, onError,onProgress) {
    if (!onProgress) {
        onProgress = onError
        onError = null
    }
    return axios.create({
        baseURL: process.env.VUE_APP_RES_URL,
        method: 'get',
        responseType:'blob',
        timeout: 180 * 1000,    
        onDownloadProgress:ProgressEvent => {
           if (onProgress) onProgress(ProgressEvent)
         } 
    }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
            //console.log(res)
            const blob = new Blob([res.data]) 
            setLocalForage(book.fileName, blob, () => {
                 if (onSuccess){onSuccess( book )} 
         }, err => {
             if (onError) onError(err)
            })
        if (onSuccess) onSuccess(res)
         }).catch(err => {
             if (onError) onError(err)
     })
}
export function home () {   
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/home`
    })
}   
export function shelf () {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
    })
}

export function detail (book) {
    return axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/book/detail`,
        params:{
            fileName:book.fileName
        }
    })
}