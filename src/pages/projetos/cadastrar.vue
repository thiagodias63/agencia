<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title">Projetos</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    Cadastro de Projetos
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" to="/admin/projetos">Voltar</router-link>
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
                         <div class="form-group">
                            <label for="eixo">Estado:</label>
                            <select
                                id="estado"
                                class="input-group-alternative mb-3 input-sm form-control"
                                v-model="projeto.estado"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.projeto.estado.$invalid}">
                                <option
                                  v-for="(estado, index) in estados"
                                  :key="index"
                                  :value="estado">
                                  {{ estado.nome }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="eixo">Funcionarios:</label>
                            <div class="form-check" v-for="(funcionario, index) in funcionarios" :key="index">
                              <input
                                  :id="index"
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="funcionario.id"
                                  v-model="projeto.funcionarios"
                                  :disabled="isSending || carregandoFuncionarios"
                                >
                                <label class="form-check-label" :for="index"> {{ funcionario.nome }} </label>
                            </div>
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
import getEixosMixin from './getEixos.mixin'
import getFuncionarios from './getFuncionarios.mixin'
import getEstados from './getEstados.mixin'
import ProjetoService from '@/services/projetos.service'
export default {
  title: 'Projetos - Cadastro',
  mixins: [getEixosMixin, getFuncionarios, getEstados],
  data() {
    return {
        isSubmited: false,
        isSending: false,
        projeto: {
            nome: '',
            meta: '',
            eixo: {},
            funcionarios: [],
            estado: 1
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
          ProjetoService.save(this.projeto).then(() => {
            this.$toaster.success('Projeto cadastrado com sucesso!');
            this.isSending = false;
            this.$router.push('/admin/projetos');
          }).catch((e) => {
            this.isSending = false;
            console.error(e)
            this.$toaster.error('Erro ao salvar projeto!');
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
        estado: {
            required
        },
    }
  }
};
</script>