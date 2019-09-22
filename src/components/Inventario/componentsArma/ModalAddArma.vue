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
                <h6>Arma</h6>
                <select v-model="newModel.model">
                  <option v-for="product in modelArma" :key="product.id"  :value="{name:product.type,model: product.model, provider:product.provider_name}">{{product.type +' - '+ product.model}}</option>
                </select>
                <br>
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
      modelArma(){
        return this.$store.state.Categoria.modelArma
      }
    }, 
    created(){
      this.setArmas()
      this.setModeloArmas()
    },
    methods:{
          ...mapActions('Inventario',['setArmas']),
          ...mapActions('Categoria',['setModeloArmas']),
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
                provider:this.newModel.model.provider,
                name:this.newModel.model.name,
                model:this.newModel.model.model,
                caliber:this.newModel.caliber,
                nf:this.newModel.nf,
                numeration:this.newModel.numeration,
                date:new Date()
             
            }
            await this.$http.post('/armas', arma)
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
                this.$http.get('/armas')
                .then(result=>{
                    this.setArmas(result.data)
                    this.newModel = {}
                })
            })
        }
    }
}


</script>