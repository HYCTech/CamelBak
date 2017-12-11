<template>
  <div>
    <div class="Vheader">
      <!-- 搜索框 -->
      <SearchBox :onsearch="search"></SearchBox>
      <!-- 按钮组 -->
      <div class="btnGroup">
        <el-button type="success" icon="plus" @click="openModel(1)">添加</el-button>
        <el-button type="info" icon="edit" @click="openModel(0)">编辑</el-button>
        <el-button type="danger" icon="delete" @click="delMsg()">删除</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div>
      <el-table highlight-current-row :data="tableData" border style="width: 100%" ref="table" :default-sort="{prop: 'date', order: 'descending'}"
        @current-change="tableCurrentChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="room_number" label="房号" width="150">
        </el-table-column>
        <el-table-column prop="owner_name" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="telephone_number" label="电话号码">
        </el-table-column>
        <el-table-column prop="wxopen_id" label="openId">
        </el-table-column>
        <el-table-column prop="note" label="备注">
        </el-table-column>
        
      </el-table>
    </div>

    <!-- 分页 -->
    <PageBar :pageData="pageData" :getData="getInfo" ></PageBar>
    <!-- 弹出框 -->
    <el-dialog :title="modelTitle" :visible.sync="modelShow">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="房号" prop="room_number">
          <el-input  v-model="form.room_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="owner_name">
          <el-input v-model="form.owner_name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="telephone_number">
          <el-input  v-model="form.telephone_number"></el-input>
        </el-form-item>
        <el-form-item label="openId" >
          <el-input  v-model="form.wxopen_id"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input  v-model="form.note"></el-input>
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
import * as api from "@/api/nowUserPeople";
import * as utils from "@/utils/index"
export default {
  name: "proprietors",
  mixins: [mixin],
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      form: {
        owner_name: "",
        room_number: "",
        telephone_number: "",
        wxopen_id: "",
        note: ""
      },

      
    };
  },

  methods: {

    //获取数据分页
    getInfo() {
      api
        .getProprietorsInfo(this.pageData.page - 1, this.pageData.pageSize)
        .then(res => {
          console.log(res);
          this.tableData = res.data;
          this.pageData.total = res.count;
        });
    },
    //莫谈框点击确定
    okModel() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          console.log("submit!");
          if (this.isAdd) {
            //添加操作
            api.addProprietorsInfo(this.form).then(res => {
              console.log(res);
              this.modelShow = false;
              this.successMsg();
              this.getInfo();
            });
          } else {
            //编辑操作
            api.updateProprietorsInfo(this.checkId, this.form).then(res => {
              console.log(res);
              this.modelShow = false;
              this.successMsg();
              this.getInfo();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //删除数据
    delItem() {
      if (this.checkId) {
        api.removeProprietorsInfo(this.checkId).then(res => {
          console.log(res);
          this.successMsg();
          this.getInfo();
        });
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
