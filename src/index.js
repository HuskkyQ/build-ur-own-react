// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';


// ①
// const element = <h1 title="foo">Hello</h1>

// ②
// const element = React.createElement(
//   'h1',
//   { title: 'foo'},
//   'Hello1'
// )
// const container = document.getElementById("root");
// ReactDOM.render(element, container)

// ③
const element = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'Hello'
  },
}
const container = document.getElementById("root");
const node = document.createElement(element.type);
node['title'] = element.props.title;
const text = document.createTextNode('');
text['nodeValue'] = element.props.children;

node.appendChild(text);
container.appendChild(node);
