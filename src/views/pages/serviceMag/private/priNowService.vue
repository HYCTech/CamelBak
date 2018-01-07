<template>
  <div>
    <div class="Vheader">
      <!-- 搜索框 -->
   <SearchBox :onsearch="search"></SearchBox>
      <!-- 按钮组 -->
      <div class="btnGroup">
        <el-button type="success" icon="plus" @click="openModel(1)">添加</el-button>
        <el-button type="info" icon="edit">编辑</el-button>
        <el-button type="danger" icon="delete">删除</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div>
     <el-table highlight-current-row :data="tableData" border style="width: 100%" ref="table" :default-sort="{prop: 'date', order: 'descending'}"
        @current-change="tableCurrentChange" v-loading.body="loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="room_number" label="房号" width="100">
        </el-table-column>
        <el-table-column prop="owner_name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="tel_phone" label="电话号码" width="150">
        </el-table-column>
        <el-table-column prop="datetime" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="repair_content" label="内容" width="150">
        </el-table-column>
        <el-table-column prop="content" label="图片">
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
        <el-form-item label="姓名" prop="owner_name">
          <el-input v-model="form.owner_name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="tel_phone">
          <el-input v-model="form.tel_phone"></el-input>
        </el-form-item>
        <el-form-item label="日期">
         <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.repair_content"></el-input>
        </el-form-item>
         <el-form-item label="图片">
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="报价">
          <el-input v-model="form.repair_price"></el-input>
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
  import mixin from '../../../../minix/index.js'
  import * as api from "../../../../api/repairManagement";
  export default {
    name: "priNowService",
    components: {
      
    },
    mixins: [mixin],
    mounted() {
      this.getInfo()
    },
     data() {
      return {
        form: {
          room_number:'',
          owner_name:'',
          tel_phone:'',
          creattime:'',
          repair_content:'',
          repair_price:'',
          date:''
        }, //表单数据 
      };
    },

   methods: {

      //获取分页数据
      getInfo() {
        api.getRepairInfo(this.pageData.page,this.pageData.pageSize).then(res => {
          console.log(res);
          this.tableData = res.data
          this.pageData.total=res.total

        });
      },
      
  
      //莫谈框点击确定
      okModel(){
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.modelShow = true;
             if (this.isAdd) {
            //添加操作
            api.addRepair(this.form).then(res => {
              console.log(res);
              this.modelShow = false;
              this.successMsg();
              this.getInfo();
            });
          } else {
            //编辑操作
            api.updateRepair(this.checkId, this.form).then(res => {
              console.log(res);
              this.modelShow = false;
              this.successMsg();
              this.getInfo();
            });
          }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    //删除数据
    delItem() {
      if (this.checkId) {
        api.removeRepair(this.checkId).then(res => {
          console.log(res);
          this.successMsg();
          this.getInfo();
        });
      }
    },
 

      //点击搜索按钮
      search(i) {
        console.log(i)
      }
    }
  };

</script>

<style scoped lang='scss'>
 

</style>
