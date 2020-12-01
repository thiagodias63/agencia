<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title">Funcionarios</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    Cadastro de Funcionarios
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" to="/funcionarios">Voltar</router-link>
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
                                v-model="funcionario.nome"
                                :disabled="isSending"
                                :class="{ 'is-invalid': isSubmited && $v.funcionario.nome.$invalid}">
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
import FuncionarioService from '@/services/funcionarios.service'
export default {
  title: 'Funcionarios - Cadastro',
  data() {
    return {
        isSubmited: false,
        isSending: false,
        funcionario: {
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
          FuncionarioService.save(this.eixo).then(() => {
            this.$toaster.success('Funcionário cadastrado com sucesso!');
            this.isSending = false;
            this.$router.push('/funcionarios');
          }).catch((e) => {
            this.isSending = false;
            console.error(e)
            this.$toaster.error('Erro ao salvar funcionário!');
          })
      }
  },
  validations: {
    funcionario: {
        nome: {
            required
        }
    }
  }
};
</script>