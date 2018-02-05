![alt](http://mditor.com/assets/screen-shot.png)
 

# 简单说明
Mditor 最早只有「组件版」，随着「桌面版」的发布，Mditor 目前有两个版本：
- 可嵌入到任意 Web 应用的 Embed 版本，这是一桌面版的基础，Repo: [https://github.com/houfeng/mditor](https://github.com/Houfeng/mditor) 
- 独立的桌面版本，目前仅有 Mac 版本，主页：[http://mditor.com](http://mditor.com)，Repo: [https://github.com/houfeng/mditor-desktop](https://github.com/houfeng/mditor-desktop)
 
  
# 相关特性
除常规的编辑功能，Mditor 桌面版还有如下特性
- 多文件编辑，Mditor 桌面版是一个「多窗口」应用，可以通过「菜单、Dock、右键菜单」打开多个窗口实例进行多件编辑
- 支持 GFM，如表格等（GFM 是 Github 拓展的基于 Markdown 的一种纯文本的书写格式）
- 自动完成，Mditor 支持「无序列表、有序列表、引用」的自动完成，以辅助输入。
- 多种编辑语言的的「代码高亮」支持（通过 ``` 语法）
- 分屏实时预览，全屏预览
- 导出 「HTML、PDF、Image」等功能。
  
# 如何参与
- 如果有任何问题或建议，可以直接发起 [Issue](https://github.com/Houfeng/mditor-desktop/issues)
- 当然，你也可以直接向 Mditor 发起 [Pull Request](https://github.com/Houfeng/mditor-desktop/pulls)
- 非常欢迎，直接给 Mditor [加个 Star](https://github.com/houfeng/mditor-desktop)，这将是对 Midior 不错的鼓励，它会变成动力。

  
## 开发指南

##### Clone 源码
```sh
$ git clone git@github.com:Houfeng/mditor-desktop.git your_path
```

##### 安装依赖
前提是需要安装好 Nodejs 和 npm（建议用 cnpm 可以通过国内镜象加速）
```sh
$ npm install
```

##### 自动构建
将会自动进行基于 Webpack 的构建（部分资源需要 Webpack 打包），并将 Watch 文件的改动然后自动进行构建
```sh
$ npm run dev
```

##### 启动程序 
将会启动开发中的 Mditor 
```sh
$ npm start
```