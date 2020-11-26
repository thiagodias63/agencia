<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title">Projetos</h1>
    </base-header>
    <div class="container-fluid mt--7" v-if="!isLoading">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    Edição de Projeto: {{ projeto.nome }}
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" to="/projetos">Voltar</router-link>
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
                                v-model="projeto.nome"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.projeto.nome.$invalid}">
                        </div>
                        <div class="form-group">
                            <label for="meta">Meta:</label>
                            <input
                                id="meta"
                                type="text"
                                class="input-group-alternative mb-3 input-sm form-control"
                                v-model="projeto.meta"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.projeto.meta.$invalid}">
                        </div>
                        <div class="form-group">
                            <label for="eixo">Eixo:</label>
                            <select
                                id="eixo"
                                class="input-group-alternative mb-3 input-sm form-control"
                                v-model="projeto.eixo"
                                :disabled="isSending || carregandoEixos"
                                :class="{ 'is-invalid': isSubmited && $v.projeto.eixo.$invalid}">
                                <option
                                  v-for="(eixo, index) in eixos"
                                  :key="index"
                                  :value="eixo.id">
                                  {{ eixo.nome }}
                                </option>
                            </select>
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
import Loader from '../../components/loader'
import getEixosMixin from './getEixos.mixin'
import ProjetoService from '@/services/projetos.service'
export default {
  title: 'Projetos - Edição',
  mixins: [getEixosMixin],
  created() {
    this.carregarProjeto()
  },
  data() {
    return {
        isLoading: false,
        isSubmited: false,
        isSending: false,
        projeto: {
            id: 0,
            nome: '',
            meta: '',
            eixo: '',
        }
    };
  },
  components: {
    'app-loader': Loader
  },
  methods: {
    carregarProjeto() {
      this.projeto.id = this.$route.params.id
      this.isLoading = true
      ProjetoService.getOne(this.funcionario.id).then((data) => {
        this.isLoading = false;
        this.projeto = data
      })
    },
      salvar() {
          this.isSubmited = true
          if (this.$v.$invalid)  {
            return false;
          }
          this.isSending = true
          ProjetoService.edit(this.eixo.id, this.eixo).then(() => {
            this.$toaster.success('Projeto editado com sucesso!');
            this.isSending = false;
            this.$router.push('/projetos');
          })
      }
  },
  validations: {
    projeto: {
        nome: {
            required
        },
        meta: {
            required
        },
        eixo: {
            required
        },
    }
  }
};
</script>