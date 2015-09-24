## 只求极致

[ **M** ] arkdown + E [ **ditor** ] = **Mditor**    


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
var editor = document.getElementById('editor');
var mditor = new Mditor(editor,{
	height:300
});
```

## 服务器端

通过 npm 安装
```sh
npm install mditor -save
```

在代码中调用
```javascript
var mditor = require("mditor");
var parser = mditor.Parser();
var html = parser.parse("** Hello mditor! **");
```