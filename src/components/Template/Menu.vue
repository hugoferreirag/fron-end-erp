<template>
    <aside class="menu" v-show="isMenuVisible">
   
        <ul>
            <img src="@/assets/images/logo.png" width="200" alt="Logo" />
            <br>
            
          
            <br>
          <router-link active-class="active" exact to="/" tag="li"> <img src="@/assets/images/dasverde.png" width=" 30" alt="">  Dashboard </router-link>
          <router-link active-class="active"  to="/hierarquia" tag="li"> <img src="@/assets/images/hierarquia.png" width=" 30" alt="">  Hierarquia </router-link>
         <router-link active-class="active"  to="/clientes" tag="li"> <img src="@/assets/images/cliente.png" width=" 30" alt=""> Clientes </router-link>
          <router-link active-class="active"  to="/fornecedores" tag="li"> <img src="@/assets/images/truck.png" width=" 30" alt="">  Fornecedor </router-link>
          <li @click="showSubmenu"> <img src="@/assets/images/queta.png" width=" 30" alt="">  Categorias <img src="@/assets/images/arch.png" width="15" alt=""> </li>
          <ul v-show="submenu == true">
          <router-link active-class="submenu"  to="/categoria/arma" tag="li"> <img style="margin-left:5px" src="@/assets/images/pistol.png" width="20" alt=""> Armas</router-link>
          <router-link active-class="submenu"  to="/categoria/acessorio" tag="li"> <img style="margin-left:5px" src="@/assets/images/acessorio.png" width="20" alt=""> Acessório</router-link>
          </ul>
          
          <li @click="showSubmenu3"> <img src="@/assets/images/inventor.png" width=" 30" alt="">  Inventário <img src="@/assets/images/arch.png" width="15" alt=""></li>
          <ul v-show="submenu3 == true">
                <router-link active-class="submenu"  to="/inventario/arma" tag="li"> <img style="margin-left:5px" src="@/assets/images/pistol.png" width="20" alt=""> Armas</router-link>
                <router-link active-class="submenu"  to="/inventario/acessorio" tag="li"> <img style="margin-left:5px" src="@/assets/images/acessorio.png" width="20" alt=""> Acessório</router-link>
                <h6 style="color:white"><img style="margin-left:5px" src="@/assets/images/bala.png" width="20" alt="">Munição</h6>
                <router-link active-class="submenu"  to="/inventario/municao" tag="li"> <img style="margin-left:5px" src="@/assets/images/caixamm.png" width="20" alt="">NF </router-link>
                <router-link active-class="submenu"  to="/inventario/estoque" tag="li"> <img style="margin-left:5px" src="@/assets/images/caixamm.png" width="20" alt="">Estoque </router-link>
                <router-link active-class="submenu"  to="/inventario/boxunity" tag="li"> <img style="margin-left:5px" src="@/assets/images/caixamm.png" width="20" alt="">M/Venda </router-link>
          </ul>

          <li @click="showSubmenu2"> <img src="@/assets/images/clientes.png" width=" 30" alt="">  Relatórios <img src="@/assets/images/arch.png" width="15" alt=""> </li>
          <ul v-show="submenu2 == true">
          <router-link active-class="submenu"  to="/categoria/estoquedia" tag="li"> <img src="@/assets/images/estoqudiaa.png" width=" 30" alt=""> Estoque diário  </router-link>
          <router-link active-class="submenu"  to="/categoria/habitualidade" tag="li"> <img src="@/assets/images/habitual.png" width=" 30" alt="">  Habitualidade </router-link>
          <router-link active-class="submenu"  to="/categoria/fora" tag="li"> <img src="@/assets/images/bloqueio.png" width=" 30" alt="">  Fora da Meta </router-link>
          <router-link active-class="submenu"  to="/categoria/desaparecido" tag="li"> <img src="@/assets/images/question.png" width=" 30" alt="">  Desaparecido </router-link>
          <router-link active-class="submenu"  to="/categoria/estrategia" tag="li"> <img src="@/assets/images/estrater.png" width=" 30" alt="">  Estratégia </router-link>
          <router-link active-class="submenu"  to="/categoria/consumo" tag="li"> <img src="@/assets/images/consumirr.png" width=" 30" alt="">  Consumo </router-link>
          <router-link active-class="submenu"  to="/categoria/financeiro" tag="li"> <img src="@/assets/images/payment.png" width=" 30" alt="">  Financeiro </router-link>
          <router-link active-class="submenu"  to="/categoria/sinronizar" tag="li"> <img src="@/assets/images/atualizar.png" width=" 30" alt="">  Sincronizar </router-link>
           </ul>
         
         
         
        </ul>
    </aside>
</template>

<script>
import { mapState } from 'vuex'


import axios from 'axios'

export default {
    name: 'Menu',
    components: {  },
    computed: {
        isMenuVisible(){
        return this.$store.state.Auth.isMenuVisible
        },
        user(){
        return this.$store.state.Auth.user
        }
    },
    data: function() {
        return {
            submenu:false,
            submenu2:false,
            submenu3:false
            }
           
    },
    
    methods: {
      showSubmenu(){
          if(!this.submenu){
              this.submenu = true;
          }else{
              this.submenu = false
          }
      },
      showSubmenu2(){
          if(!this.submenu2){
              this.submenu2 = true;
          }else{
              this.submenu2 = false
          }
      },
      showSubmenu3(){
          if(!this.submenu3){
              this.submenu3 = true;
          }else{
              this.submenu3 = false
          }
      },
    },
    mounted() {
        
    }
}
</script>

<style>
    .menu {
      
        background:linear-gradient(to right, #1e2427, rgb(64, 65, 66)7 ); /*linear-gradient(to right, #232526, #414345);*/

       
    }
    .submenu{background-color:skyblue; border-top-left-radius:20px;border-bottom-left-radius:20px;}
    .submenu2{background-color:skyblue; border-top-left-radius:20px;border-bottom-left-radius:20px;}
   

</style>
