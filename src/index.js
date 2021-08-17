import React from 'react'
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

// Step 5: Fiber
function createDom(fiber) {
    // 需要判断是否是文本节点
    const dom =
        fiber.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(fiber.type);
        
    const isProperty = key => key !== 'children'
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = fiber.props[name]
        })

    return dom;
    // element.props.children.forEach(child => {
    //     render(child, dom);
    // })
    // container.appendChild(dom);
}

function commitRoot() {
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
}

function commitWork(fiber) {
    if(!fiber) {
        return
    }
    const domParent = fiber.parent.dom;
    domParent.appendChild(fiber.dom);
    commitWork(fiber.children);
    commitWork(fiber.sibling);
}

// In the render function we set nextUnitOfWork
// to the root of the fiber tree.
function render(element, container) {
    // TODO set next unit of work
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: cuurntRoot
    }
    nextUnitOfWork = wipRoot;
}


let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaing() < 1
    }
    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
    // TODO add dom node
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    const elements = fiber.props.children;
    reconcileChildren(fiber, elements);
    
    if (fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}

function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let prevSibling = null;
    while (index < elements.length) {
        const element = elements[index];
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }
        if (index === 0) {
            fiber.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
        index++
    }
}



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