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
    <PageBar :pageData="pageData" :getData="getInfo"></PageBar>
    <!-- 弹出框 -->
    <el-dialog :title="modelTitle" :visible.sync="modelShow">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="房号" prop="room_number">
          <el-input v-model="form.room_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="owner_name">
          <el-input v-model="form.owner_name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="telephone_number">
          <el-input v-model="form.telephone_number"></el-input>
        </el-form-item>
        <el-form-item label="openId">
          <el-input v-model="form.wxopen_id"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note"></el-input>
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
        searchCondition: [{
          labelTag: '房号',
          indexTag: 'room_number'
        },
          {
            labelTag: '姓名',
            indexTag: 'owner_name'
          },
          {
            labelTag: '电话号码',
            indexTag: 'telephone_number'
          }],
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
                  console.log("----v.姓名--->" + v.姓名 + "----v.联系电话--->" + v.联系电话);
                  var  room_number=v.房号==undefined?"":v.房号;
                  var owner_name=v.姓名==undefined?"":v.姓名;
                  var telephone_number=v.联系电话==undefined?"":v.联系电话.toString().trim();
                  var note=v.备注==undefined?"":v.备注;

                  var shop_number=v.店面号==undefined?"":v.店面号;
                  var shop_name=v.店名==undefined?"":v.店名;

                  //添加业主用户信息
                  if(owner_name!="" && room_number!=""  ){
                    var params = {
                      owner_name: owner_name,
                      room_number: room_number,
                      telephone_number:telephone_number,
                      wxopen_id: "",
                      note: note
                    };

                    console.log(params);
                      //添加操作
                      api.addProprietorsInfo(params).then(res => {
                        console.log(res);
                      });
                  }
                  //添加店面用户信息
                  if(shop_number!="" && shop_name!="" ){
                    var params = {
                      shop_name:shop_name,
                      owner_name: owner_name,
                      room_number: shop_number,
                      telephone_number:telephone_number,
                      wxopen_id: "",
                      note: note
                    };

                    console.log(params);
                    //添加操作
                    api.addProprietorsInfo(params).then(res => {
                      console.log(res);
                    });
                  }

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
        api.getProprietorsInfo(this.pageData.page, this.pageData.pageSize, {})
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
      search(searchObject) {
        if (searchObject.value && !!searchObject.select) {
          api.getProprietorsInfo(this.pageData.page, this.pageData.pageSize, {[searchObject.select]: searchObject.value})
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
