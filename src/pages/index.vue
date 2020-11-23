<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 ">
    <h1 class="title">Home</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    Lista de integrantes
                  </h3>
                </div>
              </div>
            </div>
            <div v-if="integrantes.length" class="table-responsive">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="integrantes"
              >
              
                <template slot-scope="{ row }">
                  <td>
                    {{ row }}
                  </td>

                </template>
               
              </base-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  title: 'Home',
  data() {
      return {
          integrantes: ['Nome1', 'Nome2', 'Nome3']
      }
  },
  components: {},
  methods: {},
  created() {}
};
</script>