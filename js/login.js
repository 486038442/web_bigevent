$(function(){
// 注册账号的链接
$('#link_reg').on('click',function(){
  $('.login-box').hide()
  $('.reg-box').show()
})
//请登录的链接
$('#link_login').on('click',function(){
  $('.login-box').show()
  $('.reg-box').hide()
})
// 从layui中获取form
var form=layui.form
var layer=layui.layer
// 通过form.verify()自定义校验规则
form.verify({
  // 自定义了一个 pwd的校验规则
  pwd: [
    /^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'
  ],
  // 校验两次密码是否一致的规则
//value：表单的值、item：表单的DOM对象
  repwd:function(value){
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败，泽return一个提示消息
      var pwd=$('.reg-box [name=password]').val()
      if(pwd != value) {
        return '两次密码不一致'
      }
  }
})
  //  表单的注册提交事件
$('#form_reg').on('submit',function(e){
  // 阻止默认的提交行为
  e.preventDefault()
  // 发起ajax的post请求
  let data={ 
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
  }
  $.post('/api/reguser',data,function(res){
    if(res.status!==0){
      // return console.log();
      return layer.msg(res.message);
    }
    layer.msg('注册成功，请登录')
    // 注册成功后执行一次去登录的点击事件
    $('#link_login').click()
  })
})
// 表单的登录提交事件
$('#form_login').on('submit',function(e){
  e.preventDefault()
  $.ajax({
    url:'/api/login',
    method:'POST',
//     serialize() 方法通过序列化表单值创建 URL 编码文本字符串。

// 您可以选择一个或多个表单元素（如输入和/或文本区），或表单元素本身。

// 序列化的值可在生成 AJAX 请求时用于 URL 查询字符串中。
    // 快速获取表单数据
    data:$(this).serialize(),
    success:function(res) {
      if(res.status !== 0) {
        return layer.msg('登录失败')
      }
      layer.msg('登录成功')
      // 保存数据：localStorage.setItem(key,value);
      // 将登录成功后的token字符串保存到localStorage中
    localStorage.setItem('token',res.token)
      // 跳转页面
      location.href='./index.html'
    }
  })
})
})