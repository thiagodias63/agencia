import CookieService from './services/cookie.service'
import AxiosService from './services/axios.service'
export const store = {
    state: {
        usuario: {
          id: '',
          email: '',
          nome: '',
          token: ''
        },
    },
    mutations: {
      setUsuario (state, usuario) {
        if (usuario && usuario.email) {
          state.usuario = usuario
          // let keyValue = 'usuario='+JSON.stringify(usuario);
          // let now = new Date();
          // now.setTime(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          // let expires = 'expires=' + now.toUTCString();
          // let cookieStr = keyValue + ';' + expires;
          // document.cookie = cookieStr;
          localStorage.setItem('usuario', JSON.stringify(usuario))
        }
      },
      logoutUsuario (state) {
        state.usuario = {
            email: '',
            nome: '',
            token: ''
        }
        AxiosService.defaults.headers.common['Authorization'] = ''
        // let keyValue = 'usuario='
        // let now = new Date();
        // now.setTime(now.getTime() - 24 * 60 * 60 * 1000);
        // let expires = 'expires=' + now.toUTCString();
        // let cookieStr = keyValue + ';' + expires;
        // document.cookie = cookieStr;
        localStorage.removeItem('usuario')
      }
    },
    actions: {
      registrarLogin: ({commit}, usuario) => {
        commit('setUsuario', usuario)
      },
      logoutUsuario: ({commit}) => {
        commit('logoutUsuario');
      }
    },
    getters: {
      getUsuarioLogado: state => {
        if (state.usuario.email) {
          AxiosService.defaults.headers.common['Authorization'] = state.usuario.token
          return { find: 'state' }
        } else {
          if (CookieService.getCookieValue('usuario')) {
            const usuario = JSON.parse(CookieService.getCookieValue('usuario'))
            if (CookieService.getCookieValue('usuario') != '{}' && usuario?.email) {
              AxiosService.defaults.headers.common['Authorization'] = usuario.token
              return { find: 'cookie', user: usuario }
            }
          }
        }
        return { find: false }
      },
      getUsuario: state => {
        return state.usuario
      },
      getUsuarioToken: state => {
        return state.usuario.token
      },
      getUid: state => {
        return state.usuario.id
      }
    }
  }