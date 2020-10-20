import { createElement, Component, render } from  './toy-react';

class MyComponent extends Component{
    render() {
        return  <div>
            <h1>my component</h1>
            { this.children }   
        </div>
    }
  
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


// 将a挂载到body上
// 改为大写的，默认为一个类，不会再当做字符串进行create 再用上面的createElement不再合适
// 需要对createElement中原生方法，如createElement和createTextNode等api进行适配
// 视频中称为wrapper

// 将a 挂载到 body上
// document.body.appendChild(a)   // 当有文本内容的时候，需要判断

render(<MyComponent>
    <div>abc</div>
    <div></div>
    <div></div>
</MyComponent>,document.body)


