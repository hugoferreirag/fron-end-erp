<template>
    <div>
       || <b-button sm v-b-modal.modal-lg>Novo Modelo<img src="@/assets/images/adicionar.png" width="25" alt=""></b-button> ||
            
          <b-modal id="modal-lg" size="md" >
                <template v-slot:modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-button size="sm" variant="outline-danger" @click="close()">
        Fechar Modal
      </b-button>
      <h5 style="color:white;font-weight:bold">Novo Modelo</h5>
    </template>
            <div class="row">
              <div style="text-align:center" class="col-md-12">
                <h6>Tipo</h6>
                <select v-model="newModel.type">
                  <option selected="selected" value="escopeta">Escopeta</option>
                  <option value="pistola">Pistola</option>
                  <option value="espingarda">Espingarda</option>
                  <option value="carabina">Carabina</option>
                  <option value="rifle">Rifle</option> 
                </select>
                <h6>Modelo</h6>
                <input v-model="newModel.model" type="text" />
                <br />
            
                <h6>Fornecedor</h6>
                <select v-model="newModel.provider">
                  <option v-for="product in fornecedorProductArma" :key="product.id"  :value="{name:product.name, id:product.id}">{{product.name}}</option>
                </select>
                <h6>{{}}</h6>
              </div>
            </div>
           
            <template v-slot:modal-footer="{ ok, cancel, hide }">
              <b>Deseja adicionar o modelo?</b>
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="success" @click="adicionar(ok())">Salvar</b-button>
              <b-button size="sm" variant="danger" @click="cancel()">Cancelar</b-button>
              <!-- Button with custom close trigger value -->
            </template>
          </b-modal> 
    </div>
</template>
<script>
import { showError } from '@/global'

import {mapActions} from 'vuex'
export default {
    name:"NovoUser",
    props:['fornecedor'],
    data(){
        return{
            newModel:{
               product:''
            }
        }
    },
    
    computed:{
      fornecedorProductArma(){
        return this.$store.state.Fornecedor.fornecedorProductArma
      }
    },
    created(){
      this.setFornecedoresProductArma()
    },
    methods:{
          ...mapActions('Categoria',['setModeloArmas']),
          ...mapActions('Fornecedor',['setFornecedoresProductArma']),
            toast(content, title, variant){
                this.$bvToast.toast(`${content}`, {
                    title: `${title}`,
                    toaster: 'b-toaster-top-center',
                    solid: true,
                    appendToast: true,
                    variant:`${variant}`
                    })
            },
        async adicionar(){
            const arma = {
                category:1,
                type:this.newModel.type,
                provider_name:this.newModel.provider.name,
                model:this.newModel.model
            }
            await this.$http.post('/armas/categoria', arma)
            .then(result=>{
                
                if(result.status == 200){ 
                    this.newModel = {}
                 this.toast('Modelo cadastrado com sucesso',
                'Ação bem sucedida',
                'success')
                }else{
                    this.toast(result.data,
                'Ação má sucedida',
                'danger')

                }
               
                    this.setModeloArmas()
                
            })
        }
    }
}


</script>