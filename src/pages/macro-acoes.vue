<template>
    <div class="home container-fluid">
        <div v-if="projetoSelecionado && !isLoading" class="row">
             <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-header border-0" style="display: flex; justify-content: space-between;">
                        <h3 class="mb-0">
                            Detalhes do projeto
                        </h3>
                        <router-link :to="`/projetos/${projetoSelecionado.eixo.id}`" class="btn btn-sm btn-link">Voltar</router-link>
                    </div>
                    <div class="card-body border-0">
                        <div class="row align-items-center">
                            <div class="col-md-12 form-group">
                                <strong>Eixo Estruturador: </strong>
                                <span>
                                    {{ projetos.eixo.nome }}
                                </span>
                            </div>
                            <div class="col-md-12 form-group">
                                <strong>Projeto: </strong>
                                <span>
                                    {{ projetos.nome }}
                                </span>
                            </div>
                            <div class="col-md-12 form-group">
                                <strong>Gestores: </strong>
                                <span 
                                    v-for="(funcionario, index) in projetos.funcionarios"
                                    :key="index">
                                    {{ funcionario.nome }}
                                </span>
                            </div>
                            <div class="col-md-12 form-group">
                                <strong>Meta: </strong> <span> {{ projetos.meta }} </span>
                            </div>
                            <div class="col-md-12 form-group">
                                <strong>Macro ações do projeto:</strong>
                                <div v-if="projetos.macro_acoes.length && !isLoading" class="table-responsive">
                                    <base-table
                                        class="table align-items-center table-flush"
                                        tbody-classes="list"
                                        :data="projetos.macro_acoes"
                                    >
                                        <template slot="columns">
                                            <th>Nome</th>
                                            <th>Prazo</th>
                                            <th>Responsáveis</th>
                                            <th>Estado</th>
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
                                                class="badge badge-default"
                                                style="margin-right: 3px;"
                                                v-for="(funcionario, index) in row.funcionarios"
                                                :key="index">
                                                {{ funcionario.nome }}
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                style="font-size: 85%; padding: .4rem .8rem !important; border: 2px solid; font-weight: bold; border-radius: 4px;"
                                                :style="{'color': row.estado.cor  || red, 'border-color': row.estado.cor  || red}">
                                                {{ row.estado.nome }}
                                                </span>
                                            </td>
                                        </template>
                                    </base-table>
                                </div>
                            </div>
                            <div class="col text-center" v-if="!projetos.macro_acoes.length && !isLoading"> 
                                <p>
                                    Nenhuma macro ação encontrada.
                                </p>
                                <br>
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
                <br>
            </div>
        </div>
        <div v-if="isLoading">
            <app-loader></app-loader>
        </div>
    </div>
</template>
<script>
import Loader from '@/components/loader'
import PublicService from '@/services/public.service'
export default {
  title: 'Agenda de Convergência - Vale do Aço',
  data() {
      return {
        isLoading: false,
        eixos: [],
        projetoSelecionado: null,
        projetos: [],
        estados: [],
        red: 'unset'
      }
  },
  components: {
      'app-loader': Loader,
  },
  methods: {
    carregarProjetos() {
        this.isLoading = true;
        // PublicService.getEstados().then((response) => {
            // this.estados = response.data || [];
            console.log(this.$route.params.id)
            PublicService.getProjetos(this.$route.params.eixo).then((response) => {
                this.projetos = response.data.find((projeto) => {
                    return projeto.id == this.$route.params.id;
                })
                this.projetoSelecionado = this.projetos
                this.isLoading = false;
            }).catch(e => {
                console.error(e)
                // this.desmarcarEixo();
            })

        // })
    },
    desmarcarEixo() {
        this.$router.push({name: 'eixos'})
    }
  },
  created() {
      console.log(this.$route)
    if (this.$route.params.eixo) {
        this.carregarProjetos();
    }
  }
};
</script>
<style lang="css" scoped>
.estado {
    font-size: 78%;
    margin: .1rem .6rem 0px 0px;
    padding: 2px;
    border-radius: 4px;
    border: 1px solid;
    border-left: 13px solid;
    height: .5rem;
}
</style>