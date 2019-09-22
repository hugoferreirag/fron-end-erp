<template>
  <div class="col-md-12">
    <div class="row">
 
      
      <div id="tableoption" class="col-md-12">
        
        <div style="text-align:center  " class="">
        <Modal style="" v-show="user.cargo == 1"/> 
         
        </div>
      
      </div>
    
    </div>
    <Getusers />
  </div>
</template>
<script>
import TitlePage from "../Template/TitlePage";
import Getusers from "../Fornecedores/Components/Lista";
import Modal from "../Fornecedores/Components/ModalAddFornecedor";

export default {
  name: "fornecedores",
  components: { TitlePage, Getusers, Modal },
  data() {
    return {
      newUser: {
        cargo_id: 3
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.Auth.user;
    },

  }
};
</script>
<style>

input {
  border: 1px grey solid;
  border-radius: 10px;
}
select {
  border: 1px grey solid;
  border-radius: 10px;
}
</style>