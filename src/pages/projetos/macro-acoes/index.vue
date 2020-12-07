<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title">Macro Ações do Projeto {{ macros[0] ? ' - ' + macros[0].projeto.nome : '' }} </h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    Lista de Macros
                  </h3>
                </div>
                <div class="col text-right">
                  <router-link class="btn btn-sm btn-primary" :to="`/admin/projetos/${projetoId}/macro-acoes/cadastrar`">Cadastrar</router-link>
                  <router-link class="btn btn-sm btn-default" :to="`/admin/projetos`">Voltar</router-link>
                </div>
              </div>
            </div>
            <div v-if="macros.length && !isLoading" class="table-responsive">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="macros"
              >
                <template slot="columns">
                  <th>Nome</th>
                  <th>Prazo</th>
                  <th>Status</th>
                  <th>Projeto</th>
                  <th></th>
                </template>

                <template slot-scope="{ row }">
                  <td>
                    {{ row.nome }}
                  </td>
                  <td>
                    {{ row.prazo_at }}
                  </td>
                  <td>
                    <span
                      style="padding: .4rem .8rem !important; border-radius: 4px; "
                      :style="{'background-color': row.estado.cor, 'border-color': row.estado.cor}">
                      {{ row.estado.nome }}
                    </span>
                  </td>
                  <td>
                    {{ row.projeto.nome }}
                  </td>
                  <td class="text-right">
                    <base-dropdown class="dropdown"
                                position="right">
                    <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                    </a>
                      <template>
                        <router-link :to="`macro-acoes/${row.id}`" class="dropdown-item" href="#">Editar</router-link>
                        <button @click="modalRemover(row)" class="dropdown-item" href="#">Remover</button>
                      </template>
                    </base-dropdown>
                  </td>
                </template>
               
              </base-table>
            </div>
            <div class="col text-center" v-if="!macros.length && !isLoading"> 
                <p>
                    Nenhum registor encontrado.
                </p>
                <br>
            </div>
            <!-- <div v-if="macros.length" class="card-footer d-flex justify-content-center">
                <base-pagination :total="macros.length"></base-pagination>
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
        <p>Remover o projeto: <span style="font-weight: bold">{{ macroSelecionada.nome }}</span> </p>
        <br>
        <button @click="fecharModal" class="btn btn-default btn-sm">Cancelar</button>
        <button @click="confirmarRemocao" class="btn btn-danger btn-sm">Remover</button>
      </div>
    </modal>
  </div>
</template>

<script>
import Loader from '@/components/loader'
import MacroAcaoService from '@/services/macros.service'
import dayjs from 'dayjs'
export default {
  title: 'Macros - Lista',
  data() {
    return {
      projetoId: null,
      isLoading: false,
      macros: [],
      isRemoving: false,
      isSending: false,
      macroSelecionada: {},
    };
  },
  components: {
    'app-loader': Loader
  },
  methods: {
    carregarMacros() {
      this.isLoading = true;
      MacroAcaoService.getAll(this.projetoId).then((response) => {
        this.macros = response.data.map((macro) => {
          macro.prazo_at = dayjs(macro.prazo_at).format('DD/MM/YYYY')
          return macro
        }) || [];
        this.isLoading = false;
      })
    },
    modalRemover(projeto) {
      this.macroSelecionada = projeto
      this.isRemoving = true
    },
    confirmarRemocao() {
      this.isSending = true;
      MacroAcaoService.remove(this.macroSelecionada.id).then(() => {
        this.macroSelecionada = {};
        this.fecharModal();
        this.carregarMacros();
        this.$toaster.error('Mqacro deletado com sucesso!');
        this.isSending = false;
      }).catch((e) => {
        this.isSending = false;
        console.error(e)
        this.$toaster.error('Erro ao remover marco!');
      })
    },
    fecharModal() {
      this.macroSelecionada = {};
      this.isRemoving = false
    }
  },
  created() {
    this.projetoId = this.$route.params.projeto
    this.carregarMacros();
  }
};
</script>