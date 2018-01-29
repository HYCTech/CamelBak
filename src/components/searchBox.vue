
<template>
  <div>
      <div class="searchBox">
        <el-input placeholder="请输入内容" v-model="search.value">
          <el-select v-model="search.select" slot="prepend" placeholder="请选择" class="select">
            <el-option :label="item.labelTag" :value="item.indexTag" v-for="(item,index) in labelItem" :key="index"></el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="click"></el-button>
        </el-input>
      </div>
  </div>
</template>

<script>
 
 
export default {
  name:'searchBox',
  props: {
    onsearch:{
                type:String
              },
    labelItem:{
      type:Array,
      default:[{
                    labelTag:'维修位置',
                    indexTag:1
                    },
                   {
                    labelTag:'姓名',
                    indexTag:2
                    },
                   {
                    labelTag:'电话号码',
                    indexTag:3
                    }]
              }
    },
  
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
