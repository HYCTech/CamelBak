<template>
  <div>
    <div class="Vheader">
      <!-- 搜索框 -->
   <SearchBox :onsearch="search"></SearchBox>
      <!-- 按钮组 -->
      <div class="btnGroup">
        <el-button type="success" icon="plus" @click="openModel(1)">添加</el-button>
        <el-button type="info" icon="edit"  @click="openModel(0)">编辑</el-button>
        <el-button type="danger" icon="delete"  @click="delMsg()">删除</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div>
      <el-table highlight-current-row :data="tableData" border style="width: 100%" ref="table" :default-sort="{prop: 'date', order: 'descending'}"
        @current-change="tableCurrentChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="room_number" label="房号" width="100">
        </el-table-column>
        <el-table-column prop="repair_name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="tel_phone" label="电话号码" width="150">
        </el-table-column>
        <el-table-column prop="datetime" :formatter="formatData" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="repair_content" label="内容" width="150">
        </el-table-column>
        <el-table-column prop="picServerId" label="图片">
           <template slot-scope="props">
            <img :src="props.row.picServerId" class="img-style"/>
          </template>
        </el-table-column>
         <el-table-column prop="repair_price" label="报价">
        </el-table-column> 
      </el-table>
    </div>

    <!-- 分页 -->
     <PageBar :pageData="pageData" :getData="getInfo" ></PageBar>

    <!-- 弹出框 -->
    <el-dialog :title="modelTitle" :visible.sync="modelShow">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="房号" prop="room_number">
          <el-input v-model="form.room_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="repair_name">
          <el-input v-model="form.repair_name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="tel_phone">
          <el-input v-model="form.tel_phone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="datetime">
         <el-date-picker type="date" placeholder="选择日期" v-model="form.datetime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="报价" prop="repair_price">
          <el-input v-model="form.repair_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="repair_content">
          <el-input v-model="form.repair_content"></el-input>
        </el-form-item>
     
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modelShow = false">取 消</el-button>
        <el-button type="primary" @click="okModel">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import mixin from "@/minix/index.js";
import * as api from "@/api/repairManagement";
import * as utils from "@/utils/index"
export default {
  name: "publicAcc",
  components: {},
  mixins: [mixin],
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      //搜索框数据
      searchVal: {
        value: "",
        select: ""
      },
     
      //表单数据
      form: {
        room_number: "",
        repair_name: "",
        tel_phone: "",
        datetime: "",
        repair_content: "",
        repair_price:""
      }, 

    
    };
  },

  methods: { 


    //获取分页数据
    getInfo() {
    
    },
    

   
    //莫谈框点击确定（确定新增或者修改）
    okModel() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          console.log("submit!");
          if(this.isAdd){
            //添加操作
            
          }else{
            //编辑操作
           
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    
    //删除数据
    delItem(){
      if(this.checkId){
        
      }
     
    },
  


    //点击搜索按钮
    search(i) {
      console.log(i);
    }
  }
};
</script>

<style scoped lang='scss'>

</style>
