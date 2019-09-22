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
                 <h6>Munição</h6>
                <select v-model="newModel.municao">
                  <option v-for="product in municao" :key="product.id"  :value="{provider:product.provider,caliber:product.caliber}">{{'Fornecedor: '+product.provider +' - Calibre: '+product.caliber}}</option>
                </select>
                <h6>Calibre</h6>
            <input v-if="newModel.municao" disabled type="text" v-model="newModel.municao.caliber">
            <input disabled v-else type="text">
                <h6>Modelo da Caixa</h6>
                 <select v-model="newModel.model_box">
                  <option selected="selected" :value="{name:'caixa_20und', quantity:20}">caixa de 20 und</option>
                  <option :value="{name:'caixa_50und', quantity:50}">caixa de 50 und</option>
                  <option :value="{name:'caixa_80und', quantity:80}">caixa de 80 und</option>
                  <option :value="{name:'caixa_100und', quantity:100}">caixa de 100 und</option>
                  <option :value="{name:'caixa_150und', quantity:150}">caixa de 150 und</option>
                  <option :value="{name:'caixa_200und', quantity:200}">caixa de 200 und</option>
                 
                </select>
                <br />
                <h6>Quantidade</h6>
                <input v-if="newModel.model_box" disabled type="number" v-model="newModel.model_box.quantity">
                <input disabled v-else type="number">
                <br>
                <h6>Valor unitário</h6>
                <input type="number" v-model="newModel.unity_value">
                <br>            
                <h6>Fornecedor</h6>
                <input v-if="newModel.municao" disabled type="text" v-model="newModel.municao.provider">
                <input disabled v-else type="text">
             
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
      municao(){
        return this.$store.state.Inventario.municao
      }
    },
    created(){
      this.setMunicaoInventory()
    },
    methods:{
          ...mapActions('Categoria',['setModeloMunicoes']),
          ...mapActions('Inventario',['setMunicaoInventory']),
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
            const municao = {
                caliber:this.newModel.municao.caliber,
                provider:this.newModel.municao.provider,
                model_box:this.newModel.model_box.name,
                quantity:this.newModel.model_box.quantity,
                unity_value:this.newModel.unity_value
            }
            await this.$http.post('/municoes', municao)
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
                this.setMunicaoInventory()
            })
        }
    }
}


</script>

<style >
select{
  width:150px !important
}
</style>