<template>
  <div>
    <div class="Vheader">
      <!-- 搜索框 -->
      <SearchBox :onsearch="search"></SearchBox>
      <!-- 按钮组 -->
      <div class="btnGroup">
        <el-button type="success" icon="plus" @click="openModel(1)">添加</el-button>
        <el-button type="info" icon="edit" @click="openModel(0)">编辑</el-button>
        <el-button type="danger" icon="delete"  @click="delMsg()">删除</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div>
      <el-table highlight-current-row :data="tableData" border style="width: 100%" ref="table" :default-sort="{prop: 'date', order: 'descending'}"
        @current-change="tableCurrentChange" v-loading.body="loading">
       <el-table-column prop="department" label="地址" >
        </el-table-column>
        <el-table-column prop="employee_name" label="姓名" >
        </el-table-column>
        <el-table-column prop="telephone_number" label="联系方式">
        </el-table-column>
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="picture" label="图片">
          <template slot-scope="scope">
                <img :src="scope.row.picture" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="material_cost" label="材料费">
        </el-table-column>
        <el-table-column prop="maintenance_cost" label="维修费">
        </el-table-column>
        <el-table-column prop="offer" label="报价">
        </el-table-column>
        <el-table-column label="确认完成维修">
          <template slot-scope="scope">
            <el-button type="primary" size="small" round>确认完成维修</el-button>
          </template>          
        </el-table-column>
        
      </el-table>
    </div>

    <!-- 分页 -->
    <PageBar :pageData="pageData" :getData="getInfo" ></PageBar>
    <!-- 弹出框 -->
    <el-dialog :title="modelTitle" :visible.sync="modelShow">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="地址" prop="department">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="employee_name">
          <el-input v-model="form.employee_name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone_number">
          <el-input v-model="form.telephone_number"></el-input>
        </el-form-item>
         <el-form-item label="日期" prop="date">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="date">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="date">
          <el-input v-model="form.picture"></el-input>
        </el-form-item>
        <el-form-item label="材料费" prop="material_cost">
          <el-input v-model="form.material_cost"></el-input>
        </el-form-item>
        <el-form-item label="维修费" prop="maintenance_cost">
          <el-input v-model="form.maintenance_cost"></el-input>
        </el-form-item>
        <el-form-item label="报价" prop="offer">
          <el-input v-model="form.offer"></el-input>
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
import * as utils from "@/utils/index";
export default {
  name: "waitCheck",
  mixins: [mixin],
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      form: {
        department: "",
        employee_name: "",
        telephone_number: "",
        wxopen_id: "",
        note: "",
        position: ""
      },

      
    };
  },

  methods: {


    //莫谈框点击确定
    okModel() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          console.log("submit!");
          if (this.isAdd) {
            //添加操作
            
          } else {
            //编辑操作
           
          }
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //获取分页数据
    getInfo() {
        api.getOrder(this.pageData.page,this.pageData.pageSize,{"order_state":"checking"}).then(res=>{
          this.tableData=res.data
          this.pageData.total=res.total
        })
    },

     //删除数据
    delItem() {
      if (this.checkId) {
        
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
