class  ElementWrapper {
    // 处理元素的情况
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name,value) {
        this.root.setAttribute(name,value);
    }
    appendChild (component) {  // 传入一个组件，加入组件的root
        this.root.appendChild(component.root);
    }
}

class TextWrapper {
     //TODO  TextWrapper 目前还留有疑惑
     constructor(content) {
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor( ) {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }
    setAttribute(name,value) {
        this.props[name] = value;
    }
    appendChild (component) {  // 传入一个组件，加入组件的root
        this.children.push(component);
    }
    get root() {
        if(!this._root) {
            this._root = this.render().root;  // 如果返回的依然是component那么会继续递归取root
        }
        return this._root;
    }
}

export function  createElement(type,attributes,...children) {
    let e;
    if(typeof type === 'string') {

        e = new ElementWrapper(type);
    } else {
        e = new type;  // 实际上，置于对原生dom的api进行封装才能真正的跑通，否则自己是没办法讲一个类，
        // 包装成一个原生的dom元素扥                  
    }
    // attributes 是对象
    for (let p in attributes) {
        e.setAttribute(p,attributes[p]);  // 通过15行 20行  27 可以分析得到，我们创建的实例需要包含setAttribute 和 appendChild  两个方法
    }
    // children 是子元素数组集合
    let insertChildren = (children) => {

        for(let child of children) {
            if(typeof child === 'string') {
                child = new TextWrapper(child);
            }
            if(typeof child === 'object' && (child instanceof Array )) {
                insertChildren(child);
            } else {

                e.appendChild(child);
            }
        }
    }
    insertChildren(children);
    return e;
}


export  function render(component,parentNode) {
    parentNode.appendChild(component.root)
}
