import { getReadTime, setLocalStorage, getLocalStorage } from './localstorage'
export const FONT_SIZE_LIST = [
    { fontSize: 12 },
    { fontSize: 14 },
    { fontSize: 16 },
    { fontSize: 18 },
    { fontSize: 20 },
    { fontSize: 22 },
    { fontSize: 24 }
]

export const FONT_FAMILY = [
    { font: 'Default' },
    { font:  'Cabin' },
    { font:  'Days One' },
    { font:  'Montserrat' },
    { font:  'Tangerine' }
]

export function THEME_LIST (vue) {
    return [
        {
            alias:vue.$t('book.themeDefault'),
            name: 'Default',
            style: {
                body:{
                    'color': '#4c5059',
                    'background' : '#cecece'
                }
            }
        },
        {
            alias: vue.$t('book.themeGold'),
            name: 'Gold',
            style: {
              body: {
                'color': '#5c5b56',
                'background': '#c6c2b6'
              }
            }
        },
        {
            alias: vue.$t('book.themeEye'),
            name: 'Eye',
            style: {
              body: {
                'color': '#404c42',
                'background': '#a9c1a9'
              }
            }
        },
        {
            alias: vue.$t('book.themeNight'),
            name: 'Night',
            style: {
              body: {
                'color': '#cecece',
                'background': '#000000'
              }
            }
        }
    ]
}
export function addCss (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}
export function removeCss (href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
        link.parentNode.removeChild(link)
    }
  }
}
export function removeAllcss () {
  removeCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_default.css')
  removeCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_eye.css')
  removeCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_gold.css')
  removeCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_night.css')
  removeCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_default.css')
}

export function getReadTimeByMinute (fileName) {
  const readtime = getReadTime(fileName)
  if (!readtime) {
    return 0 
  } else {
    return Math.ceil(readtime / 60)
  }
}

export function flatten (array) {
  return [].concat(...array.map(item => 
       [].concat(item, ...flatten(item.subitems))
   ))
}


const BOOK_SHELF_KEY = 'shelf'

export function addToShelf (book) {
  let bookList = getLocalStorage(BOOK_SHELF_KEY) 
  bookList = clearAddFromBookList(bookList)
  book.type = 1
  bookList.push(book)
  bookList.forEach((item, index) => {
      item.id = index + 1
  })
  setLocalStorage(BOOK_SHELF_KEY, bookList)
}

export function clearAddFromBookList (bookList) {
  return bookList.filter(item => {
    return item.type !== 3
  })
}
export function removeFromBookShelf (bookItem) {
  let bookList = getLocalStorage(BOOK_SHELF_KEY) 
  bookList = bookList.filter(item => {
    if (item.itemList) {
      item.itemList = item.itemList.filter(subItem => subItem.fileName !== bookItem.fileName)
    }
    return item.fileName !== bookItem.fileName
  })
  setLocalStorage(BOOK_SHELF_KEY, bookList)
}