<template>
    <div class="home container-fluid">
        <div v-if="!isLoading && !eixoSelecionado" class="row">
            <div class="col-md-4" v-for="(eixo, index) in eixos" :key="index">
                <div class="card shadow" @click="marcarEixo(eixo)" style="cursor: pointer">
                    <div class="card-header border-0">
                    <div class="row align-items-center">
                        <div class="col text-center">
                        <span>
                            Eixo
                        </span>
                        <h3 class="mb-0">
                            {{ eixo.nome }}
                        </h3>
                        </div>
                    </div>
                    </div>
                </div>
                <br>
            </div>
            <div class="col-md-12">
                <br><br>
                <div class="card shadow" style="cursor: pointer">
                    <img  style="width: 100%; height: 50%;" src="img/brand/patrocinadores.jpg" alt="Patrocinadores">
                </div>
            </div>
        </div>
        <div v-if="eixoSelecionado" class="row">
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
                                    <th>Eixo</th>
                                    <th>Gestores</th>
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
      }
  },
  components: {
      'app-loader': Loader,
  },
  methods: {
    carregarEixos() {
      this.isLoading = true;
      PublicService.getEixos().then((response) => {
        this.isLoading = false;
        this.eixos = response.data || [];
      })
    },
    carregarProjetos() {
        PublicService.getProjetos(this.eixoSelecionado.id).then((response) => {
            console.log(response)
            this.projetos = response.data;
        })
    },
    marcarEixo(eixo) {
        this.eixoSelecionado = eixo;
        this.carregarProjetos();
    },
    desmarcarEixo() {
        this.eixoSelecionado = null;
    }

  },
  created() {
    this.carregarEixos()
  }
};
</script>
