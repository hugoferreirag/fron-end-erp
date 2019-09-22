<template>
    <div>
       || <b-button sm v-b-modal.modal-lg>Novo Fornecedor<img src="@/assets/images/adicionar.png" width="25" alt=""></b-button> ||
            
          <b-modal id="modal-lg" size="md" >
                <template v-slot:modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-button size="sm" variant="outline-danger" @click="close()">
        Fechar Modal
      </b-button>
      <h5 style="color:white;font-weight:bold">Novo Fornecedor</h5>
    </template>
            <div class="row">
              <div style="text-align:center" class="col-md-12">
                <h6>Nome</h6>
                <input v-model="newProvider.name" type="text" />
                <br />
                <h6>Representante</h6>
                <input v-model="newProvider.agent" type="text" />
                <br />
                <h6>Email</h6>
                <input v-model="newProvider.email" type="email" />
                <br />
                <h6>CNPJ</h6>
                <input v-model="newProvider.cnpj" type="text" />
                <br />
                <h6>Tel</h6>
                <input v-model="newProvider.tel" type="text" />
                <br />
                <h6>Cel</h6>
                <input v-model="newProvider.cel" type="text" />
                <br />
                <h6>Endereço</h6>
                <input v-model="newProvider.adress" type="text" />
                <br />
                <h6>Endereço Comercial</h6>
                <input v-model="newProvider.business_adress" type="text" />
                <br />
                <h6>Produto</h6>
                <select name="" v-model="newProvider.product" id="">
                    <option selected value="arma">Arma</option>
                    <option value="acessorio">Acessorio</option>
                    <option value="municao">Munição</option>
                </select>
                
              </div>
            </div>
           
            <template v-slot:modal-footer="{ ok, cancel, hide }">
              <b>Deseja adicionar o Fornecedor?</b>
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
    data(){
        return{
            newProvider:{
                product:'arma'
            }
        }
    },
    computed:{
        
    },
    methods:{
          ...mapActions('Fornecedor',['setFornecedores']),
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
            await this.$http.post('/fornecedor', this.newProvider)
            .then(result=>{
                
                if(result.status == 200){ 
                 this.toast('Fornecedor cadastrado com sucesso',
                'Ação bem sucedida',
                'success')
                    this.newProvider = {}
                }else{
                    this.toast(result.data,
                'Ação má sucedida',
                'danger')

                }
                this.$http.get('/fornecedor')
                .then(result=>{
                    this.setFornecedores(result.data)
                })
            })
        }
    }
}


</script>