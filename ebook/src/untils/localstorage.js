import Storage from 'web-storage-cache'
const LocalStorage = new Storage()
export function setLocalStorage (key, value) {
    return LocalStorage.set(key, value)
}
export function getLocalStorage (key) {
    return LocalStorage.get(key) 
}
export function removeLocalStorage (key) {
    return LocalStorage.delete(key)
}

export function clearLocalStorage (key) {
    return LocalStorage.clear()
}

export function SetBookObject (fileName, key, value) {
    let book = getLocalStorage(`$(fileName)-info`)
    if (!book) {
        book = {}
    }
    book[key] = value
    setLocalStorage(`$(fileName)-info`, book) 
 }    

 export function GetBookObject (fileName, key, value) {
    let book = getLocalStorage(`$(fileName)-info`)
    if (book) {
        return book[key]
    } else {
        return null
    } 
 }
 export function GetFontfamily (fileName) {
     return GetBookObject(fileName, 'fontFamily')
 } 
 export function SaveFontfamily (fileName, font) {
    return SetBookObject(fileName, 'fontFamily', font)
 }

 export function SaveFontSize (fileName, fontSize) {
    return SetBookObject(fileName, 'fontSize', fontSize)
 }

 export function GetFontSize (fileName) {
     return GetBookObject(fileName, 'fontSize')
 }

 export function Getlocale () {
     return getLocalStorage('locale')
 }
 export function SaveLocale (locale) {
    return setLocalStorage('locale', locale)
 } 
 export function GetTheme (fileName) {
     return GetBookObject(fileName, 'defaulatTheme')
 }
 export function SaveTheme (fileName, defaulatTheme) {
    return SetBookObject(fileName, 'defaulatTheme', defaulatTheme)
 }
export function Savelocation (fileName, location) {
    SetBookObject(fileName, 'location', location)
}
export function getLocation (fileName) {
    return GetBookObject(fileName, 'location')    
}
export function getReadTime (fileName) {
    return GetBookObject(fileName, 'time')
}
export function SaveReadTime (fileName, time) {
    return SetBookObject(fileName, 'time', time)
}