<template>
    <div>

        <div style="margin-bottom:60px; text-align:center" id="tableoption" class="col-md-12 row justify-center">
            <div class="col-md-2">
             ||<b-button   @click="remove">  Remover<img src="@/assets/images/deletar.png" width="20" alt=""></b-button>||
            </div>
            <Editar class="col-md-2" :fornecedor="fornecedorId"/>

           
        </div>
        <div class="container row box">
            <div class="col-md-5">
                <img src="@/assets/images/users.png" width="200" alt="">
            </div>
            <div  class="col-md-6 user">
               <h5>{{`Nome: ${fornecedorId.name}`}}</h5> <hr>
               <h5>{{`Fornece: ${fornecedorId.product}`}}</h5> <hr>
               <h5>{{`Tel: ${fornecedorId.tel}`}}</h5><hr>
               <h5>{{`CNPJ: ${fornecedorId.cnpj}`}}</h5><hr>
               <h5>{{`Endereço: ${fornecedorId.adress}`}}</h5><hr>
               <h5>{{`Endereço Comercial: ${fornecedorId.business_adress}`}}</h5><hr>
               <h5>{{`Representante: ${fornecedorId.agent}`}}</h5><hr>
               <h5>{{`Cel: ${fornecedorId.cel}`}}</h5><hr>
               <h5>Status: {{fornecedorId.status == true? 'Ativo': 'Inativo'}}</h5><hr>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Title from '../Template/TitlePage'
import Editar from './Components/ModalEditFornecedor'
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
        fornecedorId(){
            return this.$store.state.Fornecedor.fornecedorId
        }
    },
    methods:{
        ...mapActions('Fornecedor',['getFornecedor']),

         async  buscarFornecedor(){
          await  this.$http.get('/fornecedor/'+ this.id)
            .then(result=>{
                console.log(result)
                this.getFornecedor(result.data)
            }).catch()
            
        },
        remove(){
            var push= false;
            this.$http.delete(`fornecedor/${this.id}`)
            .then(result=>{
                if(result.status == 200){
                
                this.$router.push({name:'fornecedores'})
                
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
        this.buscarFornecedor()
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
