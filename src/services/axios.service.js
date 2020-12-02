import axios from 'axios'
// import CookieService from './cookie.service'
// let token = ''
// if (CookieService.getCookieValue('usuario')) {
//     const usuario = JSON.parse(CookieService.getCookieValue('usuario'))
//     if (usuario && CookieService.getCookieValue('usuario') != '{}') {
//         token = JSON.parse(CookieService.getCookieValue('usuario')).token
//     }
// }
const instance = axios.create({
    baseURL: 'http://deiferson.com/api/',
    // headers: {
    //     'Authorization': token
    // }
});

export default instance