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
                    Lista de Funcionarios
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" to="/admin/funcionarios/cadastrar">Cadastrar</router-link>
                </div>
              </div>
            </div>
            <div v-if="funcionarios.length && !isLoading" class="table-responsive">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="funcionarios"
              >
                <template slot="columns">
                  <th>Nome</th>
                  <th></th>
                </template>

                <template slot-scope="{ row }">
                  <td>
                    {{ row.nome }}
                  </td>

                  <td class="text-right">
                    <base-dropdown class="dropdown"
                                position="right">
                    <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                    </a>
                      <template>
                        <router-link :to="`funcionarios/${row.id}`" class="dropdown-item" href="#">Editar</router-link>
                        <button @click="modalRemover(row)" class="dropdown-item" href="#">Remover</button>
                      </template>
                    </base-dropdown>
                  </td>
                </template>
               
              </base-table>
            </div>
            <div class="col text-center" v-if="!funcionarios.length && !isLoading"> 
                <p>
                    Nenhum registor encontrado.
                </p>
                <br>
            </div>
            <!-- <div v-if="funcionarios.length" class="card-footer d-flex justify-content-center">
                <base-pagination :total="funcionarios.length"></base-pagination>
            </div> -->
            <div v-if="isLoading">
              <app-loader></app-loader>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show="isRemoving" @close="fecharModal()">
      <div class="text-center">
        <p>Remover funcionario: <span style="font-weight: bold">{{ funcionarioSelecionado.nome }}</span> </p>
        <br>
        <button @click="fecharModal" class="btn btn-default btn-sm">Cancelar</button>
        <button @click="confirmarRemocao" class="btn btn-danger btn-sm">Remover</button>
      </div>
    </modal>
  </div>
</template>

<script>
import Loader from '../../components/loader'
import FuncionarioService from '@/services/funcionarios.service'
export default {
  title: 'Funcionarios - Lista',
  data() {
    return {
      isLoading: false,
      funcionarios: [],
      isRemoving: false,
      isSending: false,
      funcionarioSelecionado: {},
    };
  },
  components: {
    'app-loader': Loader
  },
  methods: {
    carregarFuncionarios() {
      this.isLoading = true;
      FuncionarioService.getAll().then((response) => {
        this.funcionarios = response.data || []
        this.isLoading = false;
      })
    },
    modalRemover(funcionario) {
      this.funcionarioSelecionado = funcionario
      this.isRemoving = true
    },
    confirmarRemocao() {
      this.isSending = true;
      FuncionarioService.remove(this.funcionarioSelecionado.id).then(() => {
        this.funcionarioSelecionado = {};
        this.fecharModal();
        this.carregarFuncionarios();
        this.$toaster.error('Funcionário deletado com sucesso!');
        this.isSending = false;
      }).catch((e) => {
        this.isSending = false;
        console.error(e)
        this.$toaster.error('Erro ao remover funcionário!');
      })
    },
    fecharModal() {
      this.funcionarioSelecionado = {};
      this.isRemoving = false
    }
  },
  created() {
    this.carregarFuncionarios();
  }
};
</script>