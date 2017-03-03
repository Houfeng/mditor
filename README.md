## 只求极致

[ **M** ] arkdown + E [ **ditor** ] = **Mditor**    

[![version](https://badge.fury.io/js/mditor.svg)](http://badge.fury.io/js/mditor)  

Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已...  

体验: 
[在线 demo](http://houfeng.net/mditor/demo/index.html)  

![image](http://mditor.com/images/mditor.png)
  
## 浏览器端

##### 第一步:

引入 Mditor 样式文件  
```html
<link rel="stylesheet" href="../build/css/mditor.min.css" />
```

引用 Mditor 脚本文件
```html
<script src="../build/js/mditor.min.js"></script>
```

##### 第二步:

添加 textarea 元素
```html
<textarea name="editor" id="editor">
```

创建 Mditor 实例
```javascript
var mditor =  Mditor.fromTextarea(document.getElementById('editor'));

//获取或设置编辑器的值
console.log(mditor.value);
mditor.value = '** hello **';	

//是否打开预览			
mditor.preivew = true;	//打开
mditor.preivew = false;	//关闭

//是否全屏			
mditor.fullscreen = true;		//打开	
mditor.fullscreen = false;	//关闭			

//配置工具条按钮
//mditor.toolbar.items 是一个数组，包括所有按钮的信息
//可以直接操作 items 以控制工具条

//只保留第一个按钮
mditor.toolbar.items = mditor.toolbar.items.slice(0,1);

//更改按钮配置
let btn = mditor.toolbar.items[0];
btn.icon = '...'; //设置按钮图标
btn.title = '...'; //投置按钮标题
btn.align = 'rigth|left'; //设置按钮对齐方式
btn.key = 'ctrl+d'; //设置按钮快捷建
btn.handler = function(){}; //替换按钮动作
```

## 服务器端

通过 npm 安装
```sh
npm install mditor -save
```

在服务端解析
```javascript
var mditor = require("mditor");
var parser = new mditor.Parser();
var html = parser.parse("** Hello mditor! **");
```