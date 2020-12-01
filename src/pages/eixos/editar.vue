<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title">Eixos</h1>
    </base-header>
    <div class="container-fluid mt--7" v-if="!isLoading">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    Edição de Eixo: {{ eixo.nome }}
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
    <div class="cotainer-fluid mt--7" v-else>
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-body px-lg-5 py-lg-5">
              <app-loader></app-loader>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Loader from '@/components/loader'
import EixoService from '@/services/eixos.service'
export default {
  title: 'Eixos - Edição',
  created() {
    this.carregarEixo()
  },
  data() {
    return {
        isLoading: false,
        isSubmited: false,
        isSending: false,
        eixo: {
            id: 0,
            nome: '',
        }
    };
  },
  components: {
    'app-loader': Loader
  },
  methods: {
    carregarEixo() {
      this.eixo.id = this.$route.params.id
      this.isLoading = true
      EixoService.getOne(this.eixo.id).then((response) => {
        this.isLoading = false;
        this.eixo = response.data
      },2000)
    },
      salvar() {
          this.isSubmited = true;
          if (this.$v.$invalid)  {
            return false;
          }
          this.isSending = true;
          EixoService.edit(this.eixo.id, this.eixo).then(() => {
            this.$toaster.success('Eixo editado com sucesso!');
            this.isSending = false
            this.$router.push('/eixos')
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