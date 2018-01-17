<template>
  <div>
    <div class="Vheader">
      <!-- 搜索框 -->
   <SearchBox :onsearch="search"></SearchBox>
      <!-- 按钮组 -->
      <div class="btnGroup">
        <el-button type="success" icon="plus" @click="openModel(1)">添加</el-button>
        <el-button type="info" icon="edit" @click="openModel(0)">编辑</el-button>
        <el-button type="danger" icon="delete" @click="delItem()">删除</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div>
     <el-table highlight-current-row :data="tableData" border style="width: 100%" ref="table" :default-sort="{prop: 'date', order: 'descending'}"
        @current-change="tableCurrentChange" v-loading.body="loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
         <el-table-column prop="department" label="房号" width="100">
        </el-table-column>
        <el-table-column prop="employee_name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="telephone_number" label="电话号码" width="150">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="content" label="内容" width="150">
        </el-table-column>
        <el-table-column prop="picture" label="图片">
          <template slot-scope="scope">
          <el-popover
            ref="popover"
            placement="top-start"
            title="大图"
            trigger="click">
             <img :src="item.minFilename" style="width:60px;height:100px;" @click="showBigImg(item.filename)" class="img-item" alt="" v-for="(item,index) in scope.row.picture">
          </el-popover>
          <img :src="scope.row.picture[0].minFilename" title="点击查看更多" style="width:60px;height:100px;" v-popover:popover>      
          </template>
        </el-table-column>
        <el-table-column prop="material_cost" label="材料费">
        </el-table-column>
        <el-table-column prop="maintenance_cost" label="维修费">
        </el-table-column>
        <el-table-column prop="offer" label="报价">
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
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名" prop="employee_name">
            <el-input v-model="form.employee_name"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="联系方式" prop="telephone_number">
              <el-input v-model="form.telephone_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="日期" prop="date">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>          
        </el-row>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            :action="uploadUrl"
            :on-success="successHandle"
            multiple>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="材料费" prop="material_cost">
              <el-input v-model="form.material_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="维修费" prop="maintenance_cost">
              <el-input v-model="form.maintenance_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报价" prop="offer">
              <el-input v-model="form.offer"></el-input>
            </el-form-item>
          </el-col>          
        </el-row>
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
    name: "pubNowService",
    components: {
      
    },
    mixins: [mixin],
    mounted() {
      this.getInfo()
    },
     data() {
      return {
        form: {
          department: "",
          employee_name: "",
          telephone_number: "",
          date:"",
          content:"",
          picture:[],
          material_cost:"",
          maintenance_cost:"",
          offer:"",
          order_state:""
      }//表单数据 
      };
    },

   methods: {

      //获取分页数据
      getInfo() {
        api.getOrder(this.pageData.page,this.pageData.pageSize,{"order_state":"repairing","order_type":"public"}).then(res=>{
        this.tableData=res.data
        this.pageData.total=res.total
      })
      },
      
  
      //莫谈框点击确定
      okModel(){
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.modelShow = true;
             if (this.isAdd) {
            //添加操作
            this.form.order_state="repairing"
            this.form.order_type="public"
            api.addOrder(this.form).then(res=>{
              if(res.success){
                this.modelShow=false
                 this.getInfo();
              }
            }).catch(err=>{
                this.modelShow=false
            })
          } else {
            //编辑操作
            api.updateOrder(this.checkId, this.form).then(res => {
              this.modelShow = false;
               if(res.success){
                this.modelShow=false
                this.successMsg();
              }
              this.getInfo();
            }).catch(err=>{
                this.modelShow=false
            })
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
        api.delOrder(this.checkId).then(res => {
               if(res.success){
                this.successMsg();
              }
              this.getInfo();
            })
      }
    },
 

      //点击搜索按钮
      search(searchObject) {
        console.dir(searchObject)
      let searchType=["department","employee_name","telephone_number"],
          searchKey=searchType[(searchObject.select)-1],
          searchContent=searchObject.value
      api.getOrder(this.pageData.page,this.pageData.pageSize,{[searchKey]:searchContent}).then(res=>{
        this.tableData=res.data
        this.pageData.total=res.total
      })
      },
      successHandle(response, file, fileList){
      console.log(response, file, fileList)
      this.form.picture.push({minFilename:this.imgBaseUrl+response.minFilename,
                              filename:this.imgBaseUrl+response.filename})
    }
    }
  };

</script>

<style scoped lang='scss'>
 

</style>
