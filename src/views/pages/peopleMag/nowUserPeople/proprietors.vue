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
        <el-table-column fixed="right" label="发送" width="100">
          <template slot-scope="scope">
            <el-button @click="sendClick(scope.row)" type="success" size="mini">发送报价</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <PageBar :pageData="pageData" :getData="getProprietorsInfo" ></PageBar>
    <!-- 弹出框 -->
    <el-dialog title="新增" :visible.sync="modelShow">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="房号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="owner_name">
          <el-input v-model="form.owner_name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="openId">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input></el-input>
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
  import * as api from "../../../../api/nowUserPeople/index";
  export default {
    name: "proprietors",
    mixins: [mixin],
    mounted() {
      this.getProprietorsInfo()
    },
    data() {
      return {
        tableData: [], //表格数据 
        modelShow: false, //莫弹框开关 
        form: {
          owner_name:''
        }, //表单数据 


        rules: {
          owner_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ]
        
        }


      };
    },

    methods: {
      
      //点击 添加 或者编辑  1 添加  0编辑
      openModel(i) {
        this.modelShow = true;

      },
      //莫谈框点击确定
      okModel(){
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.modelShow = true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //点击发送按钮
      sendClick(row) {
        console.log(row)
      },

      //表格选择行
      tableCurrentChange(row) {
        console.log(row)
        console.log(this.$refs.table)


      },

       //获取分页数据
      getProprietorsInfo() {
        api.getProprietorsInfo(this.pageData.page-1,this.pageData.pageSize).then(res => {
          console.log(res);
          this.tableData = res.data
          this.pageData.total=res.count

        });
      },

     
      //点击搜索按钮
      search(i) {
        console.log(i)
      }
    }
  };

</script>

<style scoped lang='scss'>
  .Vheader {
    padding: 0 20px;
  }



  .btnGroup {
    margin-top: 20px;
    margin-bottom: 20px;
  }

</style>
