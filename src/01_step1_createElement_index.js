/*
Step 1: Function createElement
*/

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

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}
// If we have a comment like this one,
// when babel transpiles the JSX it will use the function we define.
// 如果我们有这样的注释，当 babel 转译 JSX 时，它会使用我们定义的函数。

// 不加下面这行会报错
/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const Didact = {
    createElement,
}

// const element = createElement('div', null, 'a')
// console.log(element)