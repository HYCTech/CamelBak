<template>
  <div class="hello">
     {{text}}
     <button @click='click' class="aa">变18</button>
  </div>
</template>

<script>
import { mapActions, mapState,mapMutations,mapGetters } from 'vuex'
import store from '../store'
import * as api from '../api'
export default {
  name: 'hello',
  data () {
    return {

     
    }
  },
  methods:{
   click(){
   this.setText(4)
    
   },
    ...mapActions(['setText']), 
    ...mapMutations(["SET_TEXT"]) 
    

  },
  computed:{
    ...mapState(['text']),
    ...mapGetters(['text'])

  },
  mounted(){
    // api.getAllGoods().then(res=>{console.log(res)}).catch(err=>{console.log(err)})
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>



</style>
