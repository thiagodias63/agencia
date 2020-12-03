const getCookieValue = (cookieKey) => {
    // let cookiesList = document.cookie.split(';').map(cookie => {
    //     return cookie.trim()
    // })
    
    // for (let i = 0; i < cookiesList.length; i++) {
    //     let cookie = cookiesList[i].split('=')
    //     let key = cookie[0]
    //     let value = cookie[1]
    //     if (key === cookieKey) {
    //         return value;
    //     }
    // }
    // return undefined;
    return localStorage.getItem(cookieKey) || null
}

export default { getCookieValue };