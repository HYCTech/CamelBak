
import * as utils from '../utils/index'
import { mapActions, mapState,mapMutations,mapGetters } from 'vuex'
export default{
  data() {
    return {
      imgBaseUrl:'http\://api.yx101.cn/img/',
      uploadUrl:'http://api.yx101.cn/upload',
      tableData: [], //表格数据
      modelShow: false, //新增修改莫弹框开关
      modelTitle: '新增', //莫态框标题
      isAdd: false, //是否为添加模态框,
      checkId: '', //选择的id （用来编辑、删除）
      // loading:'',
      editIten:{}, //要编辑的内容（模拟*）
    
      //分页数据
      pageData: {
        page: 1,
        pageSize: 5,
        total: 1
      },

      //新增/修改维修单表单验证规则
      rules: {
        repair_name: [{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        }],
        room_number: [{
          required: true,
          message: "请输入房号",
          trigger: "blur"
        }],
        tel_phone: [{
          required: true,
          message: "请输入电话号码",
          trigger: "blur"
        }],
        repair_price: [{
          required: true,
          message: "请输入报价",
          trigger: "blur"
        }],
        datetime: [{
          type:'date',
          required: true,
          message: "请输入日期",
          trigger: "blur"
        }],
        repair_content: [{
          required: true,
          message: "请输入内容",
          trigger: "blur"
        }],

        owner_name: [{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        }],
        telephone_number: [{
          required: true,
          message: "请输入电话号码",
          trigger: "blur"
        }],
        department: [{
          required: true,
          message: "请输入部门",
          trigger: "blur"
        }],
        employee_name: [{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        }],
        position: [{
          required: true,
          message: "请输入职务",
          trigger: "blur"
        }],
        content: [{
          required: true,
          message: "请输入内容",
          trigger: "blur"
        }],
        decision: [{
          required: true,
          message: "请输入描述",
          trigger: "blur"
        }],
        creattime: [{
          type:'date',
          required: true,
          message: "请输入日期",
          trigger: "blur"
        }],
        time: [{
          type:'date',
          required: true,
          message: "请输入日期",
          trigger: "blur"
        }],
        oldPassword:[{
          required: true,
          message: "请输入原始密码",
          trigger: "blur"
        }],
        newPassword:[{
          required: true,
          message: "请输入新密码",
          trigger: "blur"
        }],
        currentPassword:[{
          required: true,
          message: "请输入确认密码",
          trigger: "blur"
         }],
        // changeName:[{
        //   required: true,
        //   message: "请输入要改的姓名",
        //   trigger: "blur"
        // }],
        // birthDate:[{
        //   type:'date',
        //   required: true,
        //   message: "请选择修改的日期",
        //   trigger: "blur"
        // }]
       

      }
    }
  },
  methods: {

    //表格选择行
    tableCurrentChange(row) {
      //console.log(row);
     // console.log(this.$refs.table);  
      if(row){
        this.editIten = row
        this.checkId=row._id
      }else{
        this.editIten = {}
        this.checkId=""
      }
    },
    //点击 添加 或者编辑  1 添加  0编辑
    openModel(i) {
      this.isAdd = !!i
      this.modelShow = !!(this.isAdd||this.checkId);
      this.modelTitle = this.isAdd?'新增':'编辑'
      this.form=utils.emptyObject(this.form) 
      if(this.isAdd){  
        //添加操作
      }else if(!this.isAdd&&this.checkId){
        //编辑操作
        this.form = utils.coverObj(this.form,this.editIten)
        if(Object.keys(this.form).includes('datetime')){
          this.form.datetime = new Date(this.form.datetime)
        }else if(Object.keys(this.form).includes('creattime')){
          this.form.creattime = new Date(this.form.creattime)
        }else if(Object.keys(this.form).includes('time')){
          this.form.time = new Date(this.form.time) 
        }
        
      }  
    },
  
  showBigImg(imgUrl){
    this.$alert(`<img src="${imgUrl}">`, '大图', {
      dangerouslyUseHTMLString: true
    });
  },
  //表格展示格式  (日期)
  formatData: function (row, column) {
      return (row.datetime +"").slice(0,10)
  },
    
  //成功提示窗口
   successMsg(){
    this.$message({
      showClose: true,
      message: '操作成功',
      type: 'success'
    });
   },

   //删除提示框
    delMsg() {
      if (this.checkId){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       this.delItem()
      }).catch()
    }
  }
  },
  computed:{
    ...mapState(['loading']),   
  },
}
