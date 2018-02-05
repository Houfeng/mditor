## 只求极致

[ **M** ] arkdown + E [ **ditor** ] = **Mditor**    

[![version](https://badge.fury.io/js/mditor.svg)](http://badge.fury.io/js/mditor)  

Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已...  

支持浏览器: chrome/safari/firefox/ie9+

![image](http://embed.mditor.com/images/mditor.png)

## 在线体验
[在线 demo](http://embed.mditor.com/demo/index.html)  

## 使用桌面版
下载桌面版本 [http://mditor.com/](http://mditor.com/)
  
## 在浏览器集成 Mditor

##### 第一步:

引入 Mditor 样式文件  
```html
<link rel="stylesheet" href="your-path/dist/css/mditor.min.css" />
```

引用 Mditor 脚本文件
```html
<script src="your-path/dist/js/mditor.min.js"></script>
```

当然，也可以使用 CDN 资源
```html
...
<link rel="stylesheet" href="https://unpkg.com/mditor@1.0.5/dist/css/mditor.min.css" />
...
<script src="https://unpkg.com/mditor@1.0.5/dist/js/mditor.min.js"></script>
...
```

##### 第二步:

添加 textarea 元素
```html
<textarea name="editor" id="editor"></textarea>
```

创建 Mditor 实例
```js
var mditor =  Mditor.fromTextarea(document.getElementById('editor'));

//获取或设置编辑器的值
mditor.on('ready',function(){
  console.log(mditor.value);
  mditor.value = '** hello **';	
});
```

所有 API 都应在 ready 事件中进行调用

##### 模式控制 API:

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
```

##### 工具条配置 API

```js
//mditor.toolbar.items 是一个数组，包括所有按钮的信息
//可以直接操作 items 以控制工具条

//只保留第一个按钮
mditor.toolbar.items = mditor.toolbar.items.slice(0,1);
//添加一个按钮
mditor.toolbar.addItem({...});
//移除一个按钮
mditor.toolbar.removeItem(name);
//替换一个按钮
mditor.toolbar.replaceItem(name, {...});
//获取一个按钮
mditor.toolbar.getItem(name);

//更改按钮行为
//示例，更改「图片」按钮配置，其它按钮是同样的方法
let btn = mditor.toolbar.getItem('image');
//替换按钮动作
btn.handler = function(){
  //自定义处理逻辑
  //this 指向当前 mditor 实例
}; 

//还可以替换其它信息
btn.icon = '...';   //设置按钮图标
btn.title = '...';  //投置按钮标题
btn.control = true; //作为控制按钮显示在右侧
btn.key = 'ctrl+d'; //设置按钮快捷建
```

##### 文本编辑 API

```js
//编辑器相关 API 在 mditor.editor 对象上

//在光标前插入文本
mditor.editor.insertBeforeText('文本');
//在光标后插入文本
mditor.editor.insertAfterText('文本');
//其它，说明待补充
...
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

在页面中展示解析后的内容 
```html
...
<!--引用样式-->
<link rel="stylesheet" href="your-path/dist/css/mditor.min.css" />
...
<div class="markdown-body">
<!--这里是解析后的内容-->
</div>
```

-end-
