
<template>
  <div>
      <div class="searchBox">
        <el-input placeholder="请输入内容" v-model="search.value">
          <el-select v-model="search.select" slot="prepend" placeholder="请选择" class="select">
            <el-option label="房号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="电话号码" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="click"></el-button>
        </el-input>
      </div>
  </div>
</template>

<script>
 
 
export default {
  name:'searchBox',
  props: ["onsearch"],
  
  data () {
    return {
     search: {
          value: "",
          select: ""
        },
     
    }
  },
  methods:{
   click(){
     this.onsearch(this.search)
   }
    

  },
  
 
  
}
</script>


<style lang='scss' scoped>

 .searchBox {
    width: 300px;
    margin-top: 15px;
    .select {
      width: 100px;
    }
  }

</style>
