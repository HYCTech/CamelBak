
module.exports = {
 data(){
   return {

    //分页数据
    pageData:{
      page:1,
      pageSize:5,
      total:10
   },
   }
 },
  methods: {
    del(i) {
     console.log(i)
    }
  }
}
