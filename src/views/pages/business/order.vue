<template>
  <div>
    <!--<big-img :imgUrl="imgSrc" :dialogShow="showDialog"></big-img> -->            
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
        @current-change="tableCurrentChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="orderId" label="单号" >
        </el-table-column>
        <el-table-column prop="orderName" label="接单员" >
        </el-table-column>
        <el-table-column prop="orderNumber" label="联系方式">
        </el-table-column>
        <el-table-column prop="order_type" label="类型">
          <template slot-scope="scope">
            <span>{{scope.row.order_type=="personal"?"个人":"公共"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="维修位置">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="picture" label="图片">
          <template slot-scope="scope">
            <el-popover
              ref="popover"
              placement="top-start"
              title="全部详情图"
              trigger="hover">
              <img :src="item.minFilename" style="width:60px;height:100px;" @click="showBigImg(item.filename)" class="img-item" alt="" v-for="(item,index) in scope.row.picture">
            </el-popover>
            <img :src="scope.row.picture[0].minFilename" title="点击查看更多" style="width:60px;height:100px;" v-popover:popover>      
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
          <el-col :span="12">
            <el-form-item label="维修位置" prop="department">
              <el-input v-model="form.department"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="order_type">
              <el-select v-model="form.order_type" placeholder="请选择" >
                <el-option label="个人" value="personal"></el-option>
                <el-option label="公共" value="public"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="接单员" prop="orderName">
            <el-input v-model="form.orderName"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="联系方式" prop="orderNumber">
              <el-input v-model="form.orderNumber"></el-input>
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
          <el-col :span="6">
            <el-form-item label="材料费" prop="material_cost">
              <el-input v-model="form.material_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="维修费" prop="maintenance_cost">
              <el-input v-model="form.maintenance_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报价" prop="offer">
              <el-input v-model="form.offer"></el-input>
            </el-form-item>
          </el-col>   
          <el-col :span="6">
            <el-form-item label="接单状态" prop="order_state">
              <el-select v-model="form.order_state" placeholder="请选择" >
                <el-option label="待接单中" value="pending"></el-option>
                <el-option label="已接单" value="repairing"></el-option>
              </el-select>
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
      showDialog:false,
      imgSrc:'',
      form: {
        order_staff: "",
        staff_phone: "",
        department: "",
        content: "",
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
      api.getOrder(this.pageData.page,this.pageData.pageSize,{ "$or": [{"order_state": "pending"}, {"order_state":"repairing"}]}).then(res=>{
        this.tableData=res.data
        this.pageData.total=res.total
      });
    },
    detailImg(img){
      this.imgSrc=img
      this.showDialog=true
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
    search(i) {
      console.log(i);
    },
      successHandle(response, file, fileList){
      console.log("fileList=>")
      console.dir(fileList)
      this.form.picture.push({minFilename:this.imgBaseUrl+response.minFilename,
                              filename:this.imgBaseUrl+response.filename})
    }
  }
};
</script>

<style scoped lang='scss'>

</style>
