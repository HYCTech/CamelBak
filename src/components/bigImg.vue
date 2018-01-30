<template>
    <div>
        <div class="big-modal"  @click="closeDialog">
            <img :src="imgUrl">
        </div>
    </div>
</template>
<script>
export default {
  name: 'bigImg',
  mounted(){
  },
  data () {
    return {
    }
  },
  props:['imgUrl','closeModal'],
  methods:{
      closeDialog(){
          this.closeModal()
      }
  }
}
</script>
<style lang="scss" scoped>
    .big-modal {
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background-color:rgba(0, 0, 0, 0.5);
        z-index:3000;
        text-align:center;
        padding:5% 0 0 0;
    }

    .big-modal img{
        display:inline-block;
        width:80%;
        height:80%;
    }
</style>