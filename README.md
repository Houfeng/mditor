## 只求极致

[ **M** ] arkdown + E [ **ditor** ] = **Mditor**    

[![version](https://badge.fury.io/js/mditor.svg)](http://badge.fury.io/js/mditor)  

Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已...  

支持浏览器: chrome/safari/firefox/ie9+

## 在线体验
[在线 demo](http://houfeng.net/mditor/demo/index.html)  

![image](http://mditor.com/images/mditor.png)
  
## 在浏览器集成 Mditor

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
```js
var mditor =  Mditor.fromTextarea(document.getElementById('editor'));

//获取或设置编辑器的值
console.log(mditor.value);
mditor.value = '** hello **';	
```

##### 其它 API:

```js
//是否打开分屏			
mditor.split = true;	//打开
mditor.split = false;	//关闭

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

//更改指定按钮配置
let btn = mditor.toolbar.items[0];
btn.icon = '...';   //设置按钮图标
btn.title = '...';  //投置按钮标题
btn.control = true; //作为控制按钮显示在右侧
btn.key = 'ctrl+d'; //设置按钮快捷建

//替换按钮动作
btn.handler = function(){
  //自定义处理逻辑
  //this 指向当前 mditor 实例
}; 

//编辑器常用 API
//编辑器相关 AIP 在 mditor.editor 对象上

//在光标前插入文本
mditor.editor.insertBeforeText('文本');
//在光标后插入文本
mditor.editor.insertAfterText('文本');

```

## 在服务器渲染 Markdown

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

在页中展示解析后内容 
```html
...
<!--引用样式-->
<link rel="stylesheet" href="../build/css/mditor.min.css" />
...
<div class="markdown-body">
<!--这里是解析后的内容-->
</div>
```

-end-