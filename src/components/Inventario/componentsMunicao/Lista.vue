<template>
  <b-container id="lista"  fluid>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Pesquisa por:"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
              <template v-slot:first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

    
      

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Pesquisar..."
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Digite oque deseja...."
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Apagar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
     
    </b-row>

    <!-- Main table element -->
    <b-table
        :striped="true"
      :bordered="false"
      :borderless="true"
      :outlined="true"
      :small="false"
      :hover="true"
      :dark="false"
      :fixed="true"
      :foot-clone="true"
      :no-border-collapse="true"
    
      
      
      :table-variant="'info'"
      
    
      stacked="md"
      :items="municao"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
 <template  slot="actions" slot-scope="row">
     <div class="row" v-if="user.cargo !== 3 && user.cargo !== 2">
      <a  @click="remove(row.item.id)"><img src="@/assets/images/fora.png" width="25" alt=""></a> 
     
    </div>
    <span v-else style="color:red">.....</span>
    
      </template>
     
     
   
    </b-table>
     <b-col sm="7" md="12" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
  </b-container>
  
</template>

<script>

import { mapActions } from "vuex";
  export default {
      components:{},
      name:'ListaUser',
    data() {
      return {
          items:[{
              name:"aas",
              id:'21',
              cargo_id:'15'
          }],
          table:'primary',
        fields: [
          { key: 'id', label: 'ID', sortable: true,class: 'text-left', sortDirection: 'desc' },
          { key: 'nf', label: 'Nota Fiscal', sortable: true,class: 'text-left', sortDirection: 'desc' },
          { key: 'date', label: 'Data', sortable: true,class: 'text-left', sortDirection: 'desc' },
          { key: 'quantity', label: 'Quantidade', sortable: true,class: 'text-left', sortDirection: 'desc' },
          { key: 'actions', label: 'Ações' } 
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 8,
        pageOptions: [ 10],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
      municao(){
          return this.$store.state.Inventario.municao
      },
      user(){
          return this.$store.state.Auth.user
      },
    },
    mounted() {
        this.setMunicoesNf()
        

      // Set the initial number of items
      this.totalRows = this.users.length
    },
    methods: {
        ...mapActions('Inventario',['setMunicoesNf']),
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      remove(id){
        this.$http.delete(`municoes/${id}`)
        .then(res=>{
          console.log(res)
          if(res.status == 200){
            this.$bvToast.toast('Removido com sucesso', {title:'Ação bem sucedida', variant:'info'})
            this.setMunicoesNf()
          }else{
            this.$bvToast.toast('Ooops Erro :(', {title:'Ação não sucedida', variant:'danger'})
          }
        }).catch()
      },
      
   
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

<style>
    #lista{
       
        
    }
    table{
        color:white;
        background-color:rgba(255,255,255,0.5);
        box-shadow: 2px 1px 5px 1px;
    }
    td{
        font-weight: bold;
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
    }
    .ok{
        color:white
    }
 
</style>