<template>
  <div>
    <div class="addNotice">
      <quillEditor v-model="content"></quillEditor>
      <div>
        选择通知的小区：
        <el-select v-model="value" placeholder="请选择"> 
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="success" @click="sentNotice">发送通知</el-button>
      </div>
    </div>


  </div>
</template>
<script>
  import mixin from "@/minix/index.js";
  import * as utils from "@/utils/index";
  import {
    quillEditor
  } from 'vue-quill-editor';
  export default {
    name: "notice",
    mixins: [mixin],
    mounted() {},
    data() {
      return {
        content: '',
        options: [{
          value: '选项1',
          label: 'A小区'
        }, {
          value: '选项2',
          label: 'B小区'
        }, {
          value: '选项3',
          label: 'C小区'
        }],
        value: ''
      };
    },
    components: {
      quillEditor
    },
    methods: {
      sentNotice() {
        if (this.content === "") {
          alert('请输入通知')
        } else {
          this.successMsg();
          console.log(this.content)
          console.log(this.value)          
        }
      }
    }
  }

</script>
<style scoped lang='scss'>
  .addNotice {
    width: 80%;
    margin: 10px auto;
  }

</style>

<style>
  .ql-container {
    height: 300px;
  }

</style>
