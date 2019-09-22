<template>
    <div>

        <div style="margin-bottom:60px; text-align:center" id="tableoption" class="col-md-12 row justify-center">
            <div class="col-md-2">
             ||<b-button   @click="remove">  Remover<img src="@/assets/images/deletar.png" width="20" alt=""></b-button>||
            </div>
            <Editar class="col-md-2" :user="userId"/>

           
        </div>
        <div class="container row box">
            <div class="col-md-5">
                <img src="@/assets/images/users.png" width="200" alt="">
            </div>
            <div  class="col-md-6 user">
               <h5>{{`Nome: ${userId.name}`}}</h5> <hr>
               <h5>{{`Email: ${userId.email}`}}</h5><hr>
               <h5>Status: {{userId.status == true? 'Ativo': 'Inativo'}}</h5><hr>
                <h5 v-if="userId.cargo_id ===  1">Cargo :Gestor</h5>
               <h5 v-else-if="userId.cargo_id ===  2">Cargo :Supervisor</h5>
               <h5 v-else >Cargo : Colaborador</h5>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Title from '../Template/TitlePage'
import Editar from './Components/ModalEditUser'
import { setTimeout } from 'timers';
export default {
    components:{ Title, Editar },
    name:"infoUser",
    props:['id'],

    data(){
        return{

        }
    },
    computed:{
        userId(){
            return this.$store.state.Auth.userId
        }
    },
    methods:{
        ...mapActions('Auth',['getUser']),

         async  buscarUsuario(){
          await  this.$http.get('/user/'+ this.id)
            .then(result=>{
                this.getUser(result.data)
            }).catch()
            
        },
        remove(){
            var push= false;
            this.$http.delete(`user/${this.id}`)
            .then(result=>{
                if(result.status == 201){
                
                this.$router.push({name:'hierarquia'})
                
                }else{
                this.$bvToast.toast('Ooops, houve algum erro',{title:'Ação má sucedida',variant:'warning'})
                }
                
          
            })
            .catch()
        }

    },
    created(){

    },
    mounted(){
        this.buscarUsuario()
    }
}
</script>
<style >
    .box{
        background-image:linear-gradient(to right,rgb(160, 224, 250),rgb(109, 177, 253));
        border:rgb(179, 225, 236) 2px solid;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 20px;
    }
    .user h5{
        font-family: 'Courier New', Courier, monospace;
        font-weight:bold !important
}
</style>;
