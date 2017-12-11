import router from '../router/index'

//将路由转化成tree结构(没写完)
export const changeNav = (r) =>{
    var Nva = []
    var hasChild=[]
    var menuArr = r.filter(i=>i.menu)
    Nva= menuArr.filter(i=>!i.title)
    hasChild = menuArr.filter(i=>i.title)
    for(let i of hasChild){
      
        let arr = hasChild.filter( t => t.name == i.name)
        for(let  j of arr){
            let obj = JSON.parse(JSON.stringify(j))
            let item =Object.assign({},obj)
            item = Object.assign(item,{

            })

        }
    }  
    return hasChild 
}

// 将对象置为空(form 表单重置)
export const emptyObject =(obj) =>{
    let o = JSON.parse(JSON.stringify(obj))
    for(let i in o){
        o[i] = ( o[i] instanceof Array) ? [] :''
    }
    return o  
}

// obj1 的值覆盖到obj上 , （编辑表单时候用）
export const coverObj = (obj,obj1) =>{
    let o = JSON.parse(JSON.stringify(obj))
    let o1 = JSON.parse(JSON.stringify(obj1))
     for(let i in o ){
         if(o1[i] !='undefined'){
             o[i] = o1[i]
         }else{
            o[i] = ( o[i] instanceof Array) ? [] :''
         }
     }
   return o

}

