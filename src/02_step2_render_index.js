// Step 1: Function createElement

// 例子 实现这样的功能
// import React from 'react'
// import ReactDOM from 'react-dom'

// const element = (
//     <div id="foo">
//         <a>bar</a>
//         <b />
//     </div>
// )
// const container = document.getElementById('root');
// ReactDOM.render(element, container);


// 函数
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => 
                typeof child === 'object'
                    ? child
                    : createTextElement(child)
            )
        }
    }
}
// 创建文本节点
function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

// Step 2: Function render
function render(element, container) {
    // 需要判断是否是文本节点
    const dom =
        element.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(element.type);
        
    const isProperty = key => key !== 'children'
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })
    element.props.children.forEach(child => {
        render(child, dom);
    })
    container.appendChild(dom);
}



// If we have a comment like this one,
// when babel transpiles the JSX it will use the function we define.
// 如果我们有这样的注释，当 babel 转译 JSX 时，它会使用我们定义的函数。

// 不加下面这行会报错
/** @jsxRuntime classic */
const Didact = {
    createElement,
    render
}

/** @jsx Didact.createElement */
const element = (
    <div style="background: salmon">
        <h1>Hello World</h1>
        <h2 style="text-align:right">from Didact</h2>
    </div>
);

const container = document.getElementById('root');
Didact.render(element, container);