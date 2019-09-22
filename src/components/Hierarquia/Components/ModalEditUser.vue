<template>
    <div>
       || <b-button sm v-b-modal.modal-lg>Editar Usuário<img src="@/assets/images/adicionar.png" width="25" alt=""></b-button> ||
            
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
                <input v-model="user.name" type="text" />
                <br />
                <h6>Email</h6>
                <input v-model="user.email" type="email" />
                <br />
                <h6>Senha</h6>
                <input v-model="pass" type="password" />
      
                <br />
                <h6>Cargo</h6>

                <select v-model="user.cargo_id">
                  <option selected="selected" value="1">Gestor</option>
                  <option value="2">Supervisor</option>
                  <option value="3">Colaborador</option>
                </select>
              </div>
            </div>
           
            <template v-slot:modal-footer="{ ok, cancel, hide }">
              <b>Deseja adicionar o usuário?</b>
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="success" @click="editUser(ok())">Salvar</b-button>
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
    name:"EditUser",
    props:['user'],
    data(){
        return{
         
            pass:''
        }
    },
    computed:{
        
    },
    methods:{
          ...mapActions('Auth',['setUsers']),
            toast(content, title, variant){
                this.$bvToast.toast(`${content}`, {
                    title: `${title}`,
                    toaster: 'b-toaster-top-center',
                    solid: true,
                    appendToast: true,
                    variant:`${variant}`
                    })
            },
           async  editUser(){
             console.log(this.user.email)
               const user ={
                 name:this.user.name,
                 email:this.user.email,
                 pass:this.pass,
                 cargo_id:this.user.cargo_id
               }
                this.pass = ''
             console.log(this.user.status)
             await  this.$http.put(`/user/${this.user.id}`, user)
            .then(res=>{
              if(res.status == 200){
                this.user.pass = ''
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