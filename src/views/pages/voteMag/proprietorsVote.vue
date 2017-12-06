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
        <el-table-column prop="telephone_number" label="电话号码" width="150">
        </el-table-column>
        <el-table-column prop="time" label="日期">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column fixed="right" prop="decision" label="选择" >
        </el-table-column>
      </el-table>
    </div>

      <!-- 分页 -->
    <PageBar :pageData="pageData" :getData="getProprietorsInfo" ></PageBar>

    <!-- 弹出框 -->
    <el-dialog title="新建维修意见" :visible.sync="modelShow">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="房号" prop="room_number">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="owner_name">
          <el-input v-model="form.owner_name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="telephone_number">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="日期">
         <el-date-picker type="date" placeholder="选择日期" v-model="date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="内容">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="选择">
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
          </el-select>
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
  import mixin from '../../../minix/index.js'
  import * as api from "../../../api/voteManagement";
  export default {
    name: "inquiry",
    components: {
  
    },
    mixins: [mixin],
    mounted() {
      this.getProprietorsInfo()
    },
    data() {
      return {
       
        tableData: [], //表格数据 
        modelShow: false, //莫弹框开关 
        date:'',//选择时间
        form: {
          owner_name:'',
          room_number:'',
          telephone_number:''

        }, //表单数据 

        rules: {
          owner_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }, 
          ],
          room_number:[
            { required: true, message: '请输入房号', trigger: 'blur' }, 
          ],
          telephone_number:[
            { required: true, message: '请输入电话号码', trigger: 'blur' }, 
          ]
        
        }


      };
    },

    methods: {

      click(){
        this.onsearch(this.search)
      },
      //获取分页数据
      getProprietorsInfo() {
        api.getProprietorsVote(this.pageData.page-1,this.pageData.pageSize).then(res => {
          console.log(res);
          this.tableData = res.data
          this.pageData.total=res.count

        });
      },
      
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

      //改变每页条数
      pageSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      //翻页
      pageCurrentChange(val) {
        console.log(`当前页: ${val}`);
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

.searchBox {
    width: 300px;
    margin-top: 15px;
    .select {
      width: 100px;
    }
  }

  .btnGroup {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  // css无效
  .el-dialog__header{
    background: #1892d1;
    span {
    line-height: 1;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    }
  }

</style>
