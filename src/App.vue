<template>
  <v-app>
    <v-content>
      <div class="corpo row">
        <div class="col-md-2">
          <Menu v-if="isMenuVisible" />
        </div>
        <div v-if="!validatingToken" class="col-md-10">
          
        
          <b-breadcrumb  v-if="isMenuVisible" class="col-md-12 row toolbar" style=" height:80px;" >
              
              <div v-if="isMenuVisible && 1+1 == 3 && user" style="background-color:rgba(221,221,221,0.8);100px;border-radius:10px;margin-left:30px;" class="col-md-3 row"> 
                <h6 class="col-md-12" id="logged" >{{'CAIXA: '+ user.nome}}</h6>
                <div class="col-md-6" style="background-color:indianred; border-radius:10px;" >
                <img  class="col-md-6" src="@/assets/images/shop.png" width="30" height="30" alt="">
                <img  src="@/assets/images/fechado.png" class="col-md-6" width="30" height="30" alt="">
                </div>
                <div class="col-md-4">
                <img class="col-md-12"  src="@/assets/images/abrirc.png" width="30" height="30" alt="">
                </div>
              </div>
              <div v-else-if="isMenuVisible && 1+1 == 2 && user" style="background-color:rgba(221,221,221,0.8);100px;border-radius:10px;margin-left:30px;" class="col-md-3 row"> 
                <h6 class="col-md-12" id="logged" >{{'CAIXA: ' +user.nome }}</h6>
                <div class="col-md-6" style="background-color:seagreen; border-radius:10px;" >
                <img  class="col-md-6" src="@/assets/images/shop.png" width="30" height="30" alt="">
                <img  src="@/assets/images/aberto.png" class="col-md-6" width="30" height="30" alt="">
                </div>
                <div class="col-md-4">
                <img class="col-md-12"  src="@/assets/images/novopedido.png" width="30" height="30" alt="">
                </div>
              </div>
              <div v-else></div>
                <div v-if="isMenuVisible " class="row col-md-8" style="margin-top:1%; margin-left:2%;">
                  <div class="col-md-2" style="float:right"> <img  src="@/assets/images/pagar.png" width="30" height="30" alt=""></div>
                  <div class="col-md-2"> <img  src="@/assets/images/paguei.png" width="30" height="30" alt=""></div>
                  <div class="col-md-2"> <img  src="@/assets/images/stand.png" width="30" height="30" alt=""></div>
                  <div class="col-md-2" style="float:right"> <img  src="@/assets/images/chat.png" width="30" height="30" alt=""></div>
                  <div class="col-md-2"> <img  src="@/assets/images/config.png" width="30" height="30" alt=""></div>
                  <div class="col-md-2"  style="float:right"> <img style="cursor:pointer" @click="logOut" src="@/assets/images/saindo.png" width="30" height="30" alt=""></div>
          
             </div>
             <v-else></v-else>
            </b-breadcrumb> 
            <b-breadcrumb  v-else class="col-md-12 row" style="background-color:transparent; height:80px;" >
            </b-breadcrumb>
          <div class="col-md-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import { userKey, validatingToken } from "@/global";
import { mapState } from "vuex";
import Menu from "./components/Template/Menu";
import { setInterval, setTimeout } from "timers";

export default {
  components: { Menu },
  name: "App",
  data() {
    return {
      cargo:'',
      validatingToken : true

    };
  },
  computed: {
    user() {
      return this.$store.state.Auth.user;
    },
    isMenuVisible() {
      return this.$store.state.Auth.isMenuVisible;
    }
  },
  methods: {
    ...mapActions("Auth", ["setUser"]),  
    ...mapActions("Fornecedor", ["setFornecedoresProductArma"]),  
     setCargo(){
      if(this.user.cargo == 1){
    
        this.cargo = "Gestor"
      }else if (this.user.cargo == 2){
     
      this.cargo = 'Supervisor'
      }else{
     
        this.cargo = 'Colaborador'
      }
    },
    async validateToken() {
      this.validatingToken = true;

      const userData = JSON.parse(localStorage.getItem("userKey"));
      this.setUser(null);
      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }
     
      const res = await this.$http.post("/validateToken", userData);

      if (res.data == true) {
        this.setUser(userData);
      } else {
        localStorage.removeItem("userKey");
        this.$router.push({ name: "Auth" });
      }

      this.validatingToken = false;
      
    },
    logOut(){
        localStorage.setItem('userKey', null)
        this.setUser(null);
        this.validateToken()
      },
  
  },
   
  updated(){
      this.setCargo()
 
  },
  

  created() {
    this.validateToken();
     
  },
  mounted(){
    
  }

};
</script>
<style >
.toolbar{
  background-color:rgba(60,141,188);
}
.painel img{
  float:right
}
#logged{
text-align:center;font-family: 'Courier New'; font-size:15px; font-weight:bold;
}
  
</style>