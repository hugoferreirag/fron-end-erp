<template>
    <div>
       || <b-button sm v-b-modal.modal-lg>Novo Usuário<img src="@/assets/images/adicionar.png" width="25" alt=""></b-button> ||
            
          <b-modal id="modal-lg" size="md" >
                <template v-slot:modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-button size="sm" variant="outline-danger" @click="close()">
        Fechar Modal
      </b-button>
      <h5 style="color:white;font-weight:bold">Novo Usuário</h5>
    </template>
            <div class="row">
              <div style="text-align:center" class="col-md-12">
                <h6>Nome</h6>
                <input v-model="newUser.name" type="text" />
                <br />
                <h6>Email</h6>
                <input v-model="newUser.email" type="email" />
                <br />
                <h6>Senha</h6>
                <input v-model="newUser.pass" type="password" />
                <br />
                <h6>Cargo</h6>

                <select v-model="newUser.cargo_id">
                  <option selected="selected" value="1">Gestor</option>
                  <option value="2">Supervisor</option>
                  <option value="3">Colaborador</option>
                </select>
              </div>
            </div>
           
            <template v-slot:modal-footer="{ ok, cancel, hide }">
              <b>Deseja adicionar o usuário?</b>
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
            newUser:{
                cargo_id:3
            }
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
        async adicionar(){
            await this.$http.post('/user', this.newUser)
            .then(result=>{
                
                if(result.status == 200){ 
                 this.toast('Usuário cadastrado com sucesso',
                'Ação bem sucedida',
                'success')
                    this.newUser = {
                    cargo_id:3
                }
                }else{
                    this.toast('thu',
                'Ação má sucedida',
                'danger')

                }
                this.$http.get('/user')
                .then(result=>{
                    this.setUsers(result.data)
                })
            })
        }
    }
}


</script>