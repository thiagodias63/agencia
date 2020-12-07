<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title">Macro Ações</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    Cadastro de Macro Ações
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" :to="`/admin/projetos/${projetoId}`">Voltar</router-link>
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
                                v-model="macro.nome"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.macro.nome.$invalid}">
                        </div>
                        <div class="form-group">
                            <label for="prazo">Prazo:</label>
                            <input
                                id="prazo"
                                type="date"
                                class="input-group-alternative mb-3 input-sm form-control"
                                v-model="macro.prazo"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.macro.prazo.$invalid}">
                        </div>
                        <div class="form-group">
                            <label for="eixo">Estado:</label>
                            <select
                                id="estado"
                                class="input-group-alternative mb-3 input-sm form-control"
                                v-model="macro.estado"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.macro.estado.$invalid}">
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
                                  v-model="macro.funcionarios"
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
import getFuncionarios from '../getFuncionarios.mixin'
import getEstados from '../getEstados.mixin'
import MacroAcaoService from '@/services/macros.service'
export default {
  title: 'Projetos - Cadastro',
  created() {
    this.projetoId = this.$route.params.projeto
  },
  mixins: [getFuncionarios, getEstados],
  data() {
    return {
        projetoId: null,
        isSubmited: false,
        isSending: false,
        macro: {
            nome: '',
            prazo: '',
            estado: '',
            funcionarios: [],
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
          MacroAcaoService.save(this.projetoId, {
            ...this.macro, 
            estado: this.macro.estado.id,
            projeto: this.projetoId,
            responsavel: this.macro.funcionarios
          }).then(() => {
            this.$toaster.success('Macro ação com sucesso!');
            this.isSending = false;
            this.$router.push(`/admin/projetos/${this.projetoId}/macro-acoes`);
          }).catch((e) => {
            this.isSending = false;
            console.error(e)
            this.$toaster.error('Erro ao salvar macro ação!');
          })
      }
  },
  validations: {
    macro: {
        nome: {
            required
        },
        estado: {
            required
        },
        prazo: {
            required
        },
        funcionarios: {
            required
        },
    }
  }
};
</script>