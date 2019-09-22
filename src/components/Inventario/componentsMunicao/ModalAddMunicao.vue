<template>
    <div>
       || <b-button sm v-b-modal.modal-lg>Novo Munição<img src="@/assets/images/adicionar.png" width="25" alt=""></b-button> ||
            
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
              
              
                      <h6>Calibre</h6>
                <select class="op" v-model="newModel.caliber">
                  <option selected="selected" value=".22">.22</option>
                  <option value=".25">.25</option>
                  <option value=".30">.30</option>
                  <option value=".32">.32</option>
                  <option value=".35">.35</option>
                  <option value=".38">.38</option>
                  <option value=".40">.40</option>
                  <option value=".45">.45</option>
                  <option value="7.62">7.62</option> 
                  <option value="7.65">7.65</option> 
                  <option value="7.92">7.92</option> 
                  <option value="8">8</option> 
                  <option value="5">5</option> 
                </select>
                <br>
                <h6>Quantidade</h6>
                <input v-model="newModel.quantity" type="number" />
                <br />
                <h6>NF</h6>
                <input v-model="newModel.nf" type="text" />
                <br />
                <h6>Fornecedor</h6>
                <select v-model="newModel.provider">
                  <option v-for="product in fornecedorProductMunicao" :key="product.id"  :value="{name:product.name,id:product.id}">{{product.name}}</option>
                </select>
                <br />
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
      modelMunicao(){
        return this.$store.state.Categoria.modelMunicao
      },
      fornecedorProductMunicao(){
        return this.$store.state.Fornecedor.fornecedorProductMunicao
      }
    }, 
    created(){
      this.setMunicoesNf()
      this.setModeloMunicoes()
      this.setFornecedoresProductMunicoes()
      
    },
    methods:{
          ...mapActions('Inventario',['setMunicoesNf']),
          ...mapActions('Categoria',['setModeloMunicoes']),
          ...mapActions('Fornecedor',['setFornecedoresProductMunicoes']),
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
            const municoes = {
                provider:this.newModel.provider.name,
                provider_id:this.newModel.provider.id,
                caliber:this.newModel.caliber,
                nf:this.newModel.nf,
                quantity:this.newModel.quantity,
                date:new Date()
             
            }
            await this.$http.post('/municoes_nf', municoes)
            .then(result=>{
                
                if(result.status == 200){ 
                    this.newModel = {}
                 this.toast('Modelo cadastrado com sucesso',
                'Ação bem sucedida',
                'success')
                }else{
                    this.newModel = {}
                    this.toast(result.data,
                'Ação má sucedida',
                'danger')

                }
                
                    this.setMunicoesNf()
                    this.newModel = {}
              
            })
        }
    }
}


</script>

<style>
  select{
    width:150px
  }
</style>