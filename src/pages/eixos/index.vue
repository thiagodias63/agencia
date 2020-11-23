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
                    Lista de Eixos
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" to="/eixos/cadastrar">Cadastrar</router-link>
                </div>
              </div>
            </div>
            <div v-if="eixos.length && !isLoading" class="table-responsive">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="eixos"
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
                        <router-link :to="`eixos/${row.id}`" class="dropdown-item" href="#">Editar</router-link>
                        <button @click="modalRemover(row)" class="dropdown-item" href="#">Remover</button>
                      </template>
                    </base-dropdown>
                  </td>
                </template>
               
              </base-table>
            </div>
            <div class="col text-center" v-if="!eixos.length && !isLoading"> 
                <p>
                    Nenhum registor encontrado.
                </p>
                <br>
            </div>
            <!-- <div v-if="eixos.length" class="card-footer d-flex justify-content-center">
                <base-pagination :total="eixos.length"></base-pagination>
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
        <p>Remover o eixo: <span style="font-weight: bold">{{ eixoSelecionado.nome }}</span> </p>
        <br>
        <button @click="fecharModal" class="btn btn-default btn-sm">Cancelar</button>
        <button @click="confirmarRemocao" class="btn btn-danger btn-sm">Remover</button>
      </div>
    </modal>
  </div>
</template>

<script>
import Loader from '@/components/loader'
import EixosService from '@/services/eixos.service'
export default {
  title: 'Eixos - Lista',
  data() {
    return {
      isLoading: false,
      eixos: [],
      isRemoving: false,
      eixoSelecionado: {},
    };
  },
  components: {
    'app-loader': Loader
  },
  methods: {
    carregarEixos() {
      this.isLoading = true;
      EixosService.getAll().then((data) => {
        this.isLoading = false;
        this.eixos = data.eixos || [];
      })
    },
    modalRemover(eixo) {
      this.eixoSelecionado = eixo
      this.isRemoving = true
    },
    confirmarRemocao() {
      this.eixoSelecionado = {};
      this.fecharModal();
      this.carregarEixos();
    },
    fecharModal() {
      this.eixoSelecionado = {};
      this.isRemoving = false
    }
  },
  created() {
    this.carregarEixos();
  }
};
</script>