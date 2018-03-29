import _ from 'lodash';
import printMe from './print.js';
//import { cube } from './math.js';
//import './style.css';
//import Icon from './timg.jpg';

if(process.env.NODE_ENV !== 'production'){
    console.log('Looks like we are in development mode!');
}



function component() {
    var element = document.createElement('pre');
    //element.innerHTML = [
    //         'Hello webpack!',
    //         '5 cubed is equal to ' + cube(5)
    //       ].join('\n\n');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.onclick = printMe
    return element;
}
//
//
//
//
let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);
//
//if (module.hot) {
//    module.hot.accept('./print.js', function() {
//        console.log('Accepting the updated printMe module!');
//        document.body.removeChild(element);
//        element = component(); // 重新渲染页面后，component 更新 click 事件处理
//        document.body.appendChild(element);
//    })
//}


//动态导入代码
//function getComponent() {
//    return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
//        var element = document.createElement('div');
//        element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//        return element;
//    }).catch(error => 'An error occurred while loading the component');
//}
//
//getComponent().then(function(component){
//    document.body.appendChild(component);
//})