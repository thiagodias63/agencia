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
                    Lista de Projetos
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" to="/projetos/cadastrar">Cadastrar</router-link>
                </div>
              </div>
            </div>
            <div v-if="projetos.length && !isLoading" class="table-responsive">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="projetos"
              >
                <template slot="columns">
                  <th>Nome</th>
                  <th>Meta</th>
                  <th>Eixo</th>
                  <th></th>
                </template>

                <template slot-scope="{ row }">
                  <td>
                    {{ row.nome }}
                  </td>
                  <td>
                    {{ row.meta }}
                  </td>
                  <td>
                    {{ row.eixo.nome }}
                  </td>

                  <td class="text-right">
                    <base-dropdown class="dropdown"
                                position="right">
                    <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                    </a>
                      <template>
                        <router-link :to="`projetos/${row.id}`" class="dropdown-item" href="#">Editar</router-link>
                        <button @click="modalRemover(row)" class="dropdown-item" href="#">Remover</button>
                      </template>
                    </base-dropdown>
                  </td>
                </template>
               
              </base-table>
            </div>
            <div class="col text-center" v-if="!projetos.length && !isLoading"> 
                <p>
                    Nenhum registor encontrado.
                </p>
                <br>
            </div>
            <!-- <div v-if="projetos.length" class="card-footer d-flex justify-content-center">
                <base-pagination :total="projetos.length"></base-pagination>
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
        <p>Remover o projeto: <span style="font-weight: bold">{{ projetoSelecionado.nome }}</span> </p>
        <br>
        <button @click="fecharModal" class="btn btn-default btn-sm">Cancelar</button>
        <button @click="confirmarRemocao" class="btn btn-danger btn-sm">Remover</button>
      </div>
    </modal>
  </div>
</template>

<script>
import Loader from '../../components/loader'
import ProjetoService from '@/services/projetos.service'
export default {
  title: 'Projetos - Lista',
  data() {
    return {
      isLoading: false,
      projetos: [],
      isRemoving: false,
      projetoSelecionado: {},
    };
  },
  components: {
    'app-loader': Loader
  },
  methods: {
    carregarProjetos() {
      this.isLoading = true;
      ProjetoService.getAll().then((data) => {
        this.projetos = data.projetos || [];
        // this.projetos = [{ id: 1, nome: 'a', meta: 'b', eixo: { nome: 'eixoA' } }]
        this.isLoading = false;
      })
    },
    modalRemover(projeto) {
      this.projetoSelecionado = projeto
      this.isRemoving = true
    },
    confirmarRemocao() {
      this.projetoSelecionado = {};
      this.fecharModal();
      this.carregarProjetos();
    },
    fecharModal() {
      this.projetoSelecionado = {};
      this.isRemoving = false
    }
  },
  created() {
    this.carregarProjetos();
  }
};
</script>