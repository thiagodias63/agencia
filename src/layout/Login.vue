<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title" style="text-align: center">Login</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow" style="">
            
             <div class="card-body px-lg-5 py-lg-5">
                <div class="text-muted mb-4">
                    <form role="form" ref="form" @submit.prevent="entrar">
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input
                                id="email"
                                type="text"
                                class="input-group-alternative mb-3 input-sm form-control"
                                v-model="user.email"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.user.email.$invalid}">
                        </div>
                        <div class="form-group">
                            <label for="password">Senha:</label>
                            <div class="inline-form-group">
                                <input
                                    id="password"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                                    class="input-group-alternative mb-3 input-sm form-control"
                                    v-model="user.password"
                                    :disabled="isSending"
                                    :class="{ 'is-invalid': isSubmited && $v.user.password.$invalid}">
                                <div class="input-group-append">
                                    <button
                                        :class="{ 'is-invalid': isSubmited && $v.user.password.$invalid}"
                                        class="input-group-text  btn-sm"
                                        type="button"
                                        @click="isPasswordVisible = !isPasswordVisible">
                                        <i class="fas" :class="isPasswordVisible ? 'fa-eye-slash' : 'fa-eye' "></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            :disabled="isSending"
                            class="btn btn-info"
                            type="submit"> Entrar </button>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import LoginService from '@/services/login.service'
import { mapActions } from 'vuex';
export default {
  title: 'Login',
  data() {
    return {
        isSubmited: false,
        isSending: false,
        isPasswordVisible: false,
        user: {
            email: '',
            password: '',
        }
    };
  },
  methods: {
      ...mapActions([
        'registrarLogin',
      ]),
      entrar() {
          this.isSubmited = true
          if (this.$v.$invalid)  {
            return false;
          }
          this.isSending = true;
          LoginService.signin(this.user).then((userData) => {
            this.isSending = false;
            this.registrarLogin({
              id: userData.data.user.id,
              email: userData.data.user.email,
              nome: userData.data.user.nome,
              token: userData.data.token
            });
            this.$router.push('/admin');
          }).catch((e) => {
              this.isSending = false;
              console.error(e)
              this.$toaster.warning('Não foi possível fazer login! Tente novamente.');
          })
      }
  },
  validations: {
    user: {
        email: {
            required,
            email,
        },
        password: {
            required
        },
    }
  }
};
</script>´
<style lang="css" scoped>
    .inline-form-group,
    .inline-form-group div, 
    .inline-form-group input {
        display: flex;
    }
    .inline-form-group button {
        max-height: 2.8rem;
        margin-left: -1px;
        padding: 0.625rem 0.75rem;
        border: 1px solid rgba(50, 50, 93, 0.15);
        
    }
    @media (min-width: 769px) {
      .card{
        width: 50%; margin: 0 auto;
      }
    }
</style>