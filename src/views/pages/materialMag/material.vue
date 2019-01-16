<template>
  <div>
    <div class="Vheader">
      <!-- 搜索框 -->
      <SearchBox :onsearch="search" :labelItem="searchCondition"></SearchBox>
      <!-- 按钮组 -->
      <div class="btnGroup">
        <el-button type="success" icon="plus" @click="openModel(1)">添加</el-button>
        <el-button type="info" icon="edit" @click="openModel(0)">编辑</el-button>
        <el-button type="danger" icon="delete" @click="delMsg()">删除</el-button>
        <!--<input type="file" @change="importf(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>-->
        <!-- <input type="button" value="" onclick="upload.click()" class="imgBtn">-->
        <el-button type="warning" onclick="upload.click()">导入用户Excel</el-button>
        <input type="file" @change="importf(this)"
               accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
               id="upload" name="upload" style="display:none">
      </div>
    </div>

    <!-- 表格 -->
    <div>
      <el-table highlight-current-row :data="tableData" border style="width: 100%" ref="table"
                :default-sort="{prop: 'date', order: 'descending'}"
                @current-change="tableCurrentChange" v-loading.body="loading">
        <el-table-column prop="material_name" label="材料名称" width="250">
        </el-table-column>
        <el-table-column prop="material_specifications" label="材料规格" width="250">
        </el-table-column>
        <el-table-column prop="material_price" label="材料价格">
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <PageBar :pageData="pageData" :getData="getInfo"></PageBar>
    <!-- 弹出框 -->
    <el-dialog :title="modelTitle" :visible.sync="modelShow">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="材料名称" prop="material_name">
          <el-input v-model="form.material_name"></el-input>
        </el-form-item>
        <el-form-item label="材料规格" prop="material_specifications">
          <el-input v-model="form.material_specifications"></el-input>
        </el-form-item>
        <el-form-item label="材料价格" prop="material_price">
          <el-input v-model="form.material_price"></el-input>
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
  import * as api from "@/api/materialManagement";
  import * as utils from "@/utils/index"

  export default {
    name: "proprietors",
    mixins: [mixin],
    mounted() {
      this.getInfo();
    },
    data() {
      return {
        searchCondition: [{
          labelTag: '材料名称',
          indexTag: 'material_name'
        },
        {
          labelTag: '材料规格',
          indexTag: 'material_specifications'
        } ],
        form: {
          material_name:"",
          material_specifications: "",
          material_price: ""
        },
      };
    },

    methods: {
      importf(obj) {

        let _this = this;

        let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据

        this.file = event.currentTarget.files[0];

        var rABS = false; //是否将文件读取为二进制字符串

        var f = this.file;

        var reader = new FileReader();

        //if (!FileReader.prototype.readAsBinaryString) {

        FileReader.prototype.readAsBinaryString = function (f) {

          var binary = "";

          var rABS = false; //是否将文件读取为二进制字符串

          var pt = this;

          var wb; //读取完成的数据

          var outdata;

          var reader = new FileReader();

          reader.onload = function (e) {

            var bytes = new Uint8Array(reader.result);

            var length = bytes.byteLength;

            for (var i = 0; i < length; i++) {

              binary += String.fromCharCode(bytes[i]);

            }

            var XLSX = require('xlsx');

            if (rABS) {

              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化

                type: 'base64'

              });

            } else {

              wb = XLSX.read(binary, {

                type: 'binary'

              });

            }
            // excel 数据再处理
            for (var i = 0; i < wb.SheetNames.length; i++) {

              // outdata就是你想要的东西 excel导入的数据
              var outdatas = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]]);

              if (outdatas.length > 0) {
                outdatas.map(v => {
                  console.log("----v.材料名称--->" + v.材料名称 + "----v.材料规格--->" + v.材料规格+ "----v.材料价格--->" + v.材料价格);
                  var material_name=v.材料名称==undefined?"":v.材料名称;
                  var material_specifications=v.材料规格==undefined?"":v.材料规格;
                  var material_price=v.材料价格==undefined?"":v.材料价格;

                    var params = {
                      material_name:material_name,
                      material_specifications: material_specifications,
                      material_price: material_price
                    };
                    console.log(params);
                    //添加操作
                    api.addMaterialInfo(params).then(res => {
                      console.log(res);
                    });


                })
              }

              if(i+1==wb.SheetNames.length){
                //延迟刷新界面
                setTimeout( function(){
                  _this.successMsg();
                  _this.getInfo();
                }, 5 * 1000 );//延迟5000毫米

              }

            }
          }

          reader.readAsArrayBuffer(f);

        }

        if (rABS) {

          reader.readAsArrayBuffer(f);

        } else {

          reader.readAsBinaryString(f);

        }

      },
      //获取数据分页
      getInfo() {
        api.getMaterialInfo(this.pageData.page, this.pageData.pageSize, {})
          .then(res => {
            console.log(res);
            this.tableData = res.data;
            this.pageData.total = res.total;
          });
      },
      //莫谈框点击确定
      okModel() {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            console.log("submit!");
            if (this.isAdd) {
              //添加操作
              api.addMaterialInfo(this.form).then(res => {
                console.log(res);
                this.modelShow = false;
                this.successMsg();
                this.getInfo();
              });
            } else {
              //编辑操作
              api.updateMaterialInfo(this.checkId, this.form).then(res => {
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
          api.removeMaterialInfo(this.checkId).then(res => {
            console.log(res);
            this.successMsg();
            this.getInfo();
          });
        }
      },

      //点击搜索按钮
      search(searchObject) {
        if (searchObject.value && !!searchObject.select) {
          api.getMaterialInfo(this.pageData.page, this.pageData.pageSize, {[searchObject.select]: searchObject.value})
            .then(res => {
              this.tableData = res.data
              this.pageData.total = res.total
            })
        } else {
          this.getInfo()
        }
      }
    }
  };
</script>

<style scoped lang='scss'>

</style>
