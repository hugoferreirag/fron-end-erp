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
                <h6>acessorio</h6>
                <select v-model="newModel.model">
                  <option v-for="product in modelAcessorio" :key="product.id"  :value="{name:product.type,model: product.model, provider:product.provider_name}">{{product.type +' - '+ product.model}}</option>
                </select>
               
                <br>
                <h6>Numeração</h6>
                <input v-model="newModel.numeration" type="text" />
                <br />
                <h6>NF</h6>
                <input v-model="newModel.nf" type="text" />
                <br />
                 <h6>Fornecedor</h6>
                <input disabled v-if="newModel.model" v-model="newModel.model.provider" type="text" />
                <input disabled v-else  type="text" />
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
      modelAcessorio(){
        return this.$store.state.Categoria.modelAcs
      }
    },
    created(){
      this.setAcs()
      this.setModeloAcs()
    },
    methods:{
          ...mapActions('Inventario',['setAcs']),
          ...mapActions('Categoria',['setModeloAcs']),
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
            const acessorio = {
                provider:this.newModel.model.provider,
                name:this.newModel.model.name,
                model:this.newModel.model.model,
                nf:this.newModel.nf,
                numeration:this.newModel.numeration,
                date:new Date()
             
            }
            await this.$http.post('/acessorios', acessorio)
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
                this.$http.get('/acessorios')
                .then(result=>{
                    this.setAcs(result.data)
                    this.newModel = {}
                })
            })
        }
    }
}


</script>