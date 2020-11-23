<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title">Eixos</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    Cadastro de Eixos
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" to="/eixos">Voltar</router-link>
                </div>
              </div>
            </div>
             <div class="card-body px-lg-5 py-lg-5">
                <div class="text-muted mb-4">
                    <form role="form" ref="form" @submit.prevent="salvar">
                        <div class="form-group">
                            <label for="nome">Nome:</label>
                            <input
                                id="nome"
                                type="text"
                                class="input-group-alternative mb-3 input-sm form-control"
                                v-model="eixo.nome"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.eixo.nome.$invalid}">
                        </div>
                        <button
                            :disabled="isSending"
                            class="btn btn-success"
                            type="submit"> Salvar </button>
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
import { required } from 'vuelidate/lib/validators'
import EixosService from '@/services/eixos.service'
export default {
  title: 'Eixos - Cadastro',
  data() {
    return {
        isSubmited: false,
        isSending: false,
        eixo: {
            nome: '',
        }
    };
  },
  methods: {
      salvar() {
          this.isSubmited = true
          if (this.$v.$invalid)  {
            return false;
          }
          this.isSending = true
          EixosService.save(this.eixo).then(() => {
            this.isSending = false
          })
      }
  },
  validations: {
    eixo: {
        nome: {
            required
        }
    }
  }
};
</script>