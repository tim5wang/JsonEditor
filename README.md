# JsonEditor

一个前端用于编辑 JSON 的扩展

> 对于常见的输入元素 input/textarea, 传入组件的选择器，即可使这个输入元素变为可视化的 JSON 编辑器，值可以同步到输入框

使用方法如下：

```html
<link rel="stylesheet" href="dist/jsoneditor.css" />
<script src="dist/jsoneditor.js"></script>

<textarea>{name:"tim",gender:"M"}</textarea>
```

```js
jsonArea({
  el: "jsonArea",
  change: function(data) {
    console.log(data);
  }
});
```

**特别注意**：input 的 value 属性或者文本域名中放的是 JSON 字符串，即`JSON.stringify({name:"tim",gender:"M"})`处理后的 Object
