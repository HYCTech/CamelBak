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
        <el-table-column prop="room_number" label="房号" width="100">
        </el-table-column>
        <el-table-column prop="owner_name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="telephone_number" label="电话号码" width="150">
        </el-table-column>
        <el-table-column prop="creattime" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="content" label="内容" width="150">
        </el-table-column>
        <el-table-column prop="content" label="图片">
        </el-table-column>
        <el-table-column prop="content" label="报价">
        </el-table-column>
        <el-table-column prop="decision" label="是否同意维修">
        </el-table-column>
        <el-table-column prop="content" label="状态">
        </el-table-column>
        <el-table-column fixed="right"  label="发送" width="100">
          <template slot-scope="scope">
            <el-button @click="sendClick(scope.row)" type="success" size="mini">发送报价</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
     <PageBar :pageData="pageData" :getData="getProprietorsInfo" ></PageBar>

    <!-- 弹出框 -->
    <el-dialog :title="modelTitle" :visible.sync="modelShow">
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
        <el-form-item label="状态">
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
          <el-option label="受里中" value="doing"></el-option>
          <el-option label="已完成" value="done"></el-option>
          <el-option label="已取消" value="cancel"></el-option>
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
  import mixin from '../../../../minix/index.js'
  import * as api from "../../../../api/voteManagement";
  export default {
    name: "priNowService",
    components: {
      
    },
    mixins: [mixin],
    mounted() {
      this.getProprietorsInfo()
    },
    data() {
      return {
        searchVal: {
          value: "",
          select: ""
        },
        tableData: [], //表格数据 
        modelShow: false, //莫弹框开关 
        date:'',//选择时间
        form: {
          room_number:'',
          owner_name:'',
          telephone_number:'',
          creattime:'',
          content:''
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

      
      //获取分页数据
      getProprietorsInfo() {
        api.getBusinessReceive(this.pageData.page-1,this.pageData.pageSize).then(res => {
          console.log(res);
          this.tableData = res.data
          this.pageData.total=res.count

        });
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

     

  
      //点击搜索按钮
      search(i) {
        console.log(i)
      }
    }
  };

</script>

<style scoped lang='scss'>
 

</style>
