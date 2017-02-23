// import '../css/style.css';
// import Content from './content.js';
import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from "redux";
import Content from "./component/content";
import Counter from "./component/Counter";
import counter from "./reducers";
const store = createStore(counter);
const rootEl = document.getElementById("root");
const render =()=>ReactDom.render(
    <Counter
    value={store.getState()}
    onIncrement={()=>{store.dispatch({type:"INCREMENT"})}}
    onDecrement={()=>{store.dispatch({type:"DECREMENT"})}}
     />,
     rootEl
)
// ReactDom.render(<Content />,rootEl);
// document.getElementById('root').appendChild(content());
render()
store.subscribe(render)
