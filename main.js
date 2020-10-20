for(let i = 1 ; i < 4; i++ ) {
    console.log(i);
}
/* var a = <div id="a" class="c">
    <div></div>
    <div></div>
    <div></div>
</div> */

//SUCCESS  就能够这也样一个结构 createElement("div", {
//   id: "a",
//   "class": "c"
// }, createElement("div", null), createElement("div", null), createElement("div", null));

//  jsx 语法即使碰到html的括号会被翻译成一个函数的调用  以上会翻译为React.createElement('div',null);
// 通过配置  @babel/transform-react-jsx  插件的 第二个参数，能够修改这个函数名

// 如果我去定义这createElement为document.createElement 的操作，就能够将 jsx语法转化为真实的dom节点

function  createElement(tagName,attributes,...children) {
    var e = document.createElement(tagName);
    // attributes 是对象
    for (let p in attributes) {
        e.setAttribute(p,attributes[p]);
    }
    // children 是子元素数组集合
    for(let child of children) {
        if(typeof child === 'string') {
            child = document.createTextNode(child);
        }
        e.appendChild(child);
    }
    return e;
}

// 将a挂载到body上
window.a =<div id="a" class="c">
    <div>a</div>
    <div>b</div>
    <div>c</div>
</div>;

// 将a 挂载到 body上
document.body.appendChild(a)   // 当有文本内容的时候，需要判断
