//SUCCESS 总结 其实就是   createElement函数的应对

const RENDER_TO_DOM = Symbol('render to dom');
class ElementWrapper {
    // 处理元素的情况 
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) { // 匹配型，RegExp.$1 就是匹配的值
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLocaleLowerCase()), value, false)
        } else {
            // 处理className 
            if (name === 'className') {
                this.root.setAttribute('class', value);
            } else {

                this.root.setAttribute(name, value);
            }
        }
    }
    appendChild(component) { // 传入一个组件，加入组件的root
            console.log(component, '-------component');
            let range = document.createRange();
            range.setStart(this.root, this.root.childNodes.length);
            range.setEnd(this.root, this.root.childNodes.length);
            component[RENDER_TO_DOM](range);
        }
        [RENDER_TO_DOM](range) { // dom关于位置的api ---range  不再单纯的使用appendChild，
            range.deleteContents();
            range.insertNode(this.root);
        }
}

class TextWrapper {
    // 文本createElement 文本类型
    constructor(content) {
            this.root = document.createTextNode(content);
        }
        [RENDER_TO_DOM](range) { // dom关于位置的api ---range  不再单纯的使用appendChild，
            range.deleteContents();
            range.insertNode(this.root);
        }
}

export class Component {
    // 处理 createElement组件类型
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
        this._range = null;
    }
    setAttribute(name, value) {
        this.props[name] = value;
    }
    appendChild(component) { // 传入一个组件，加入组件的root
            this.children.push(component);
        }
        [RENDER_TO_DOM](range) { // dom关于位置的api ---range  不再单纯的使用appendChild，
            this._range = range;
            this.render()[RENDER_TO_DOM](range); // 如果还是component的子类还是能够递归
        }
    rerender() {
        this._range.deleteContents();
        this[RENDER_TO_DOM](this._range);
    }
    setState(newState) {
        console.log('1111', newState);
        if (this.state === null && typeof this.state !== 'object') {
            this.state = newState;
            this.rerender();
            return;
        }
        let merge = (oldState, newState) => {
            for (let p in newState) {
                if (oldState[p] === null || typeof oldState[p] !== 'object') {
                    oldState[p] = newState[p];
                } else {
                    merge(oldState[p], newState[p])
                }
            }
        }
        merge(this.state, newState)
        this.rerender();
    }

}

export function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === 'string') {

        e = new ElementWrapper(type);
    } else {
        e = new type; // 实际上，置于对原生dom的api进行封装才能真正的跑通，否则自己是没办法讲一个类，
        // 包装成一个原生的dom元素扥                  
    }
    // attributes 是对象
    for (let p in attributes) {
        e.setAttribute(p, attributes[p]); // 通过15行 20行  27 可以分析得到，我们创建的实例需要包含setAttribute 和 appendChild  两个方法
    }
    // children 是子元素数组集合
    let insertChildren = (children) => {

        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child); // 文本节点
            }
            if (child === null) {

                continue;
            }
            if (typeof child === 'object' && (child instanceof Array)) {
                insertChildren(child); // 子元素时数组，继续递归
            } else {
                // 如果递归完毕
                e.appendChild(child);
            }
        }
    }
    insertChildren(children);
    return e;
}


export function render(component, parentNode) {
    let range = document.createRange();
    range.setStart(parentNode, 0);
    range.setEnd(parentNode, parentNode.childNodes.length);
    range.deleteContents();
    component[RENDER_TO_DOM](range);
}