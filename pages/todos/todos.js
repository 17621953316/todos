Page({
  data:{
    add:'',
    todos:[
      {name:"HTML",completed:true},
      {name:"CSS",completed:false},
      {name:"javascript",completed:false}
    ],
    leftCount:2,
    allCompleted:false
  },
  addtodohandle:function(e) {
    //console.log(e.detail.value)
    this.setData({add:e.detail.value})
  },
  changehandle:function() {
    //console.log(111)
    if(!this.data.add) return
    var todos = this.data.todos
    todos.push({
      name:this.data.add,
      completed:false
    })
    //必须显式的通过setData修改数据,才可以同步到界面
    this.setData({todos:todos,add:'',leftCount:this.data.leftCount+1})
  },
  toggletodoshandle:function(e) {
    //console.log(e.currentTarget.dataset)
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.completed = !item.completed
    //根据当前任务的状态，判断是否加1
    var leftCount = this.data.leftCount + (item.completed ? -1 : 1)
    this.setData({todos:this.data.todos,leftCount:leftCount})

  },
  removehandle:function(e) {
    var todos = this.data.todos
    //splice 返回的是一个数组,使用item接收被移除掉的元素
    var item = todos.splice(e.currentTarget.dataset.index,1)[0]
    var leftCount = this.data.leftCount + (item.completed ? 0 : -1)
    this.setData({todos:todos,leftCount:leftCount})
  },
  changeallhandle:function() {
    //this在这里永远指向的页面对象
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    var that = this
    todos.forEach(function(item) {
      item.completed = that.data.allCompleted
    })
    var leftCount = this.data.allCompleted ? 0 : this.data.todos.length
    this.setData({
      todos:todos,
      leftCount:leftCount
    })
  },
  clearhandle:function() {
    var todos = this.data.todos.filter(function(item) {
      return !item.completed
    })
    this.setData({todos:todos})
  }

  
})