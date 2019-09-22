<template>
    <div>
       || <b-button sm v-b-modal.modal-lg>Editar Fornecedor<img src="@/assets/images/adicionar.png" width="25" alt=""></b-button> ||
            
          <b-modal id="modal-lg" size="md" >
                <template v-slot:modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-button size="sm" variant="outline-danger" @click="close()">
        Fechar Modal
      </b-button>
      <h5 style="color:white;font-weight:bold">Editar Usuário</h5>
    </template>
            <div class="row">
              <div style="text-align:center" class="col-md-12">
                <h6>Nome</h6>
                <input v-model="fornecedor.name" type="text" />
                <br />
                <h6>Fornece</h6>
                <input v-model="fornecedor.product" type="text" />
                <br />
                <h6>Email</h6>
                <input v-model="fornecedor.email" type="email" />
                <br />
                <h6>Tel</h6>
                <input v-model="fornecedor.tel" type="email" />
                <br />
                <h6>Cel</h6>
                <input v-model="fornecedor.cel" type="email" />
                <br />
                <h6>Endereço</h6>
                <input v-model="fornecedor.adress" type="email" />
                <br />
                <h6>Endereço comercial</h6>
                <input v-model="fornecedor.business_adress" type="email" />
                <br />
                <h6>Cnpj</h6>
                <input v-model="fornecedor.cnpj" type="email" />
                <br />
              

               
              </div>
            </div>
           
            <template v-slot:modal-footer="{ ok, cancel, hide }">
              <b>Deseja adicionar o usuário?</b>
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="success" @click="editfornecedor(ok())">Salvar</b-button>
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
    name:"Editfornecedor",
    props:['fornecedor'],
    data(){
        return{
         
            pass:''
        }
    },
    computed:{
        
    },
    methods:{
          ...mapActions('Fornecedor',['setfornecedores']),
            toast(content, title, variant){
                this.$bvToast.toast(`${content}`, {
                    title: `${title}`,
                    toaster: 'b-toaster-top-center',
                    solid: true,
                    appendToast: true,
                    variant:`${variant}`
                    })
            },
           async  editfornecedor(){
             console.log(this.fornecedor.email)
               const fornecedor ={
                 name:this.fornecedor.name,
                 email:this.fornecedor.email,
                 adress:this.fornecedor.adress,
                 business_adress:this.fornecedor.business_adress,
                 tel:this.fornecedor.tel,
                 cel:this.fornecedor.cel,
                 cnpj:this.fornecedor.cnpj,
                 product:this.fornecedor.product,
               }
             await  this.$http.put(`/fornecedor/${this.fornecedor.id}`, fornecedor)
            .then(res=>{
              if(res.status == 200){
                this.fornecedor.pass = ''
                this.$bvToast.toast('Atualizado com sucesso', {title:'Ação bem sucedida', variant:'success'})
              }else{
                this.$bvToast.toast('Ooops Erro :(', {title:'Ação não sucedida', variant:'danger'})
              }
              
           }).catch()
            },
       
    },
    created(){
  
       
    },

}


</script>