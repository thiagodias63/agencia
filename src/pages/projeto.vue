<template>
    <div class="home container-fluid">
        <div v-if="eixoSelecionado && !isLoading" class="row">
             <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-header border-0" style="display: flex; justify-content: space-between;">
                        <h3 class="mb-0">
                            Eixo: {{ eixoSelecionado.nome }}
                        </h3>
                        <button @click="desmarcarEixo" class="btn btn-sm btn-link">Voltar</button>
                    </div>
                    <div class="card-body border-0">
                        <div class="row align-items-center">
                            <div v-if="projetos.length && !isLoading" class="table-responsive">
                                <base-table
                                    class="table align-items-center table-flush"
                                    tbody-classes="list"
                                    :data="projetos"
                                >
                                    <template slot="columns">
                                        <th>Nome</th>
                                        <th>Meta</th>
                                        <th>Gestores</th>
                                        <th>Estado</th>
                                    </template>

                                    <template slot-scope="{ row }">
                                        <td>
                                            {{ row.nome }}
                                        </td>
                                        <td>
                                            {{ row.meta }}
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
                                            style="padding: .4rem .8rem !important; border-radius: 4px;"
                                            :style="{'background-color': row.estado.cor, 'border-color': row.estado.cor}">
                                            {{ row.estado.nome }}
                                            </span>
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

                            
                        </div>
                        <br>
                        <div class="col text-center" v-if="projetos.length && !isLoading">
                            <span v-for="(estado, index) in estados" :key="index">
                                {{ estado.nome }}
                            </span>
                        </div>
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
        eixoSelecionado: null,
        projetos: [],
        estados: []
      }
  },
  components: {
      'app-loader': Loader,
  },
  methods: {
    carregarProjetos() {
        this.isLoading = true;
        PublicService.getEixos().then((response) => {
            this.estados = response.data || [];
            PublicService.getProjetos(this.$route.params.id).then((response) => {
                this.projetos = response.data;
                this.eixoSelecionado = this.projetos[0].eixo
                this.isLoading = false;
            }).catch(e => {
                console.error(e)
                this.desmarcarEixo();
            })

        })
    },
    desmarcarEixo() {
        this.$router.push({name: 'eixos'})
    }
  },
  created() {
      console.log(this.$route)
    if (this.$route.params.id) {
        this.carregarProjetos();
    }
  }
};
</script>
