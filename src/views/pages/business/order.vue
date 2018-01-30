<template>
  <div>
    <big-img :imgUrl="imgSrc" :closeModal="closeModalPicture" v-show="showBig"></big-img>         
    <div class="Vheader">
      <!-- 搜索框 -->
      <SearchBox :onsearch="search" :labelItem="searchCondition"></SearchBox>
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
        @current-change="tableCurrentChange">
        <el-table-column prop="orderId" label="单号" >
        </el-table-column>
        <el-table-column prop="staff_name" label="接单员" >
        </el-table-column>
        <el-table-column prop="staff_tel" label="联系方式">
        </el-table-column>
        <el-table-column prop="order_type" label="类型">
          <template slot-scope="scope">
            <span>{{scope.row.order_type=="personal"?"个人":"公共"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="repair_place" label="维修位置">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="picture" label="图片">
          <template slot-scope="scope">
            <div v-if="scope.row.picture.length>0">
              <el-popover
                ref="popover"
                placement="top-start"
                title="大图"
                trigger="hover">
                <img :src="item.minFilename"  title="点击查看大图" style="width:60px;height:100px;" @click="bigImg(item.filename)" class="img-item" alt="" v-for="(item,index) in scope.row.picture">
              </el-popover>
                <img :src="scope.row.picture[0].minFilename" style="width:60px;height:100px;" v-popover:popover>   
            </div> 
            <span v-show="scope.row.picture.length==0">用户没有上传图片</span>    
          </template>
        </el-table-column>
        <el-table-column prop="material_cost" label="材料费">
        </el-table-column>
        <el-table-column prop="maintenance_cost" label="维修费">
        </el-table-column>
        <el-table-column prop="offer" label="合计">
        </el-table-column>
        <el-table-column prop="order_state" label="接单状态" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.order_state=="pending"?"待接单中":"已接单"}}</span>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <!-- 分页 -->
    <PageBar :pageData="pageData" :getData="getInfo" ></PageBar>
    <!-- 弹出框 -->
    <el-dialog :title="modelTitle" :visible.sync="modelShow">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">  
        <el-row>
          <el-col :span="8">
            <el-form-item label="维修位置" prop="repair_place">
              <el-input v-model="form.repair_place"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="order_type">
              <el-select v-model="form.order_type" placeholder="请选择" >
                <el-option label="个人" value="personal"></el-option>
                <el-option label="公共" value="public"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接单状态" prop="order_state">
              <el-select v-model="form.order_state" placeholder="请选择" @input="showMaintenanceToggele(form.order_state)">
                <el-option label="待接单中" value="pending"></el-option>
                <el-option label="已接单" value="repairing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  v-show="maintenanceIsShow">
          <el-col :span="6">
            <el-form-item label="接单员" prop="staff_name">
            <el-select v-model="form.staff_name" placeholder="请选择" >
                <el-option :label="item.maintenance_name" :value="item.maintenance_name" v-for="(item,index) in maintenance_info" :key="index"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="联系方式" prop="staff_tel">
              <el-input v-model="form.staff_tel"></el-input>
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
import mixin from "@/minix/index.js";
import * as api from "@/api/repairManagement";
import bigImg from "@/components/bigImg";
export default {
  name: "order",
  mixins: [mixin],
  mounted() {
    this.getInfo();
  },
  components:{
    bigImg
  },
  data() {
    return {
      maintenanceIsShow:true,
      searchCondition: [{
        labelTag:'地址',
        indexTag:'repair_place'
        },
      {
        labelTag:'姓名',
        indexTag:'staff_name'
        },
      {
        labelTag:'电话号码',
        indexTag:'staff_tel'
      }],
      form: {
        repair_place: "",
        content: "",
        staff_tel:"",
        staff_name:"",
        date:"",
        picture:[],
        position: "",
        material_cost:"",
        maintenance_cost:"",
        offer:"",
        order_state:"",
        order_type:""
      },

      
    };
  },

  methods: {


    //莫谈框点击确定
    okModel() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {     
          console.log("submit!");
          if(this.form.order_state=='pending'){
              this.form.staff_name=''
              this.form.staff_tel=''
              this.form.date=''
            }
          if (this.isAdd) {
            //添加操作
            api.createOrderId(this.form).then(res=>{
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
          console.log("error submit!!");
          return false;
        }
      });
    },

    //获取分页数据
    getInfo() {
      api.getOrder(this.pageData.page,this.pageData.pageSize,{ "$or": [{"order_state": "pending"}, {"order_state":"repairing"}]})
         .then(res=>{
          this.tableData=res.data
          this.pageData.total=res.total
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
      if(searchObject.value&&!!searchObject.select){
        api.getOrder(this.pageData.page,this.pageData.pageSize,{[searchObject.select]:searchObject.value,"$or": [{"order_state": "pending"}, {"order_state":"repairing"}]}).then(res=>{
          this.tableData=res.data
          this.pageData.total=res.total
        })
      }else {
        this.getInfo()
      }
    },
      successHandle(response, file, fileList){
      console.log("fileList=>")
      console.dir(fileList)
      this.form.picture.push({minFilename:this.imgBaseUrl+response.minFilename,
                              filename:this.imgBaseUrl+response.filename})
    },
    showMaintenanceToggele(currentSelect){
      if(currentSelect=='pending'){
        this.maintenanceIsShow=false
      }else if(currentSelect=='repairing'){
        this.maintenanceIsShow=true
      }
    }
  }
};
</script>

<style scoped lang='scss'>

</style>
