<template>
    <div class="home col-md-12">
    
       
    </div>
</template>

<script>

import axios from 'axios'
import TitlePage from '../Template/TitlePage'

export default {
    name: 'Home',
    components: { TitlePage },
    data: function() {
        return {
            stat: {}
        }
    },
    methods: {
      
    },
  
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
