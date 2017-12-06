<template>
    <div >
    <el-pagination class="fr mr20 mt10 " @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page='pageData.page'
      :page-sizes="[5,10, 20, 50,]" :page-size="pageData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageData.total">
    </el-pagination>
    </div>
</template>

<script>
export default {
  name: "pageBar",
  props:["pageData","getData"],
  data() {
    return {    
    };
  },
  methods:{
      //改变每页条数
      pageSizeChange(val) {
        //console.log(`每页 ${val} 条`)
        this.pageData.pageSize=val;
        this.pageData.page=1
        this.getData()
       
      },

      //翻页
      pageCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.pageData.page=(val)
        this.getData()
        
      },
  }
};
</script>

<style>

</style>