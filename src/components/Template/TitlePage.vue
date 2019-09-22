<template>
    <div>
        <div  id="title" ><div class="back"><h1>{{title}} </h1> </div> </div>
    </div>
</template>
<script>
export default {
    name:"title",
    props:['title']
}
</script>
<style >


    #title{
        background-color:rgba(60,141,188);
        z-index:2;
        text-align:center;
        margin:auto;
        width:800px;
        padding:10px;
        border-top-left-radius:20px;
        border-top-right-radius:20px;
        text-align: center;
        font-family: 'Courier New', Courier, monospace;
        font-size:40px !important;
        color:grey;
        border:grey solid 1px;
        box-shadow:0.1em 0.1em 0.1em 0.03em  #333;
        
         
    }
    #title h1{
        color:white;
        font-weight: bold;
        text-shadow: 0.1em 0.1em 0.03em  #333
    }
    .back{
    margin:auto;
    text-align:center;
    background: url("~@/assets/images/logo.png") 50% no-repeat;
    background-size: 200px 50px; width:100%;height:100%;
    }
    .tiro{
          
        animation-name:tiro1;
        animation-duration:6s;
        animation-iteration-count: 1;
   
       
    }
    .tiro2{
         animation-name:tiro2;
        animation-duration:12s;
        animation-iteration-count: 1;
    }
</style>