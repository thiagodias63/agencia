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
      setUsuario (state, user) {
        state.usuario = user
        let keyValue = 'usuario='+JSON.stringify(user);
        let now = new Date();
        now.setTime(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        let expires = 'expires=' + now.toUTCString();
        let cookieStr = keyValue + ';' + expires;
        document.cookie = cookieStr;
      },
      logoutUsuario (state) {
        state.usuario = {
            email: '',
            nome: '',
            token: ''
        }

        let keyValue = 'usuario='
        let now = new Date();
        now.setTime(now.getTime() - 24 * 60 * 60 * 1000);
        let expires = 'expires=' + now.toUTCString();
        let cookieStr = keyValue + ';' + expires;
        document.cookie = cookieStr;
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
        return state.usuario.email !== '' ? true : false
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