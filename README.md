# 入门webpack


## 安装webpack
---
//全局安装
```
npm install webpack -g
```
//安装到项目（需在项目文件夹下执行次命令）
````
npm install --save-dev webpack
````
## 开始项目
### 准备工作
1. 创建项目文件夹，如：webpack-project
2. 在根目录下新建文件package.json（npm init 或者手动新建该文件）
3. 该项目下安装webpack（切换到根目录，执行npm install --save-dev webpack）
4. 在根目录创建component和public两个文件夹。   components用于存放原数据和javascript模块，public来存放将要给浏览器读取的数据。
5. 将入口文件index.html文件放在public文件夹，它用来加载打包后的入口javascript文件bundle.js
6. 在component目录下创建index.js、content.js
### 使用webpack
**执行命令： webpack component/index.js public/bundle.js**

在浏览器中打开index.html,将显示content.js 文件中的标签内容
### 通过配置来使用webpack
在根目录下创建webpack.config.js
```javascript
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```
**注**：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
````javascript
module.exports = {
  entry:entry:"./component/index.js", //已多次提及的唯一入口文件
  output: {
    path: path.resolve('/', "public"),//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}

````
**此时在控制台使用命令 webpack，再刷新页面**
### 简化打包命令
package.json
````json
{
  "name": "optimization-of-jmstore-webpack",
  "version": "1.0.0",
  "description": "test webpack",
  "main": "index.js",
  "scripts": {
    "start": "webpack"
  },
  "repository": {
    "type": "git",
    "url": "http://fegit.jumeicd.com/zhangxiao/optimization-of-jmstore-webpack.git"
  },
  "keywords": [
    "webpack"
  ],
  "author": "xiaoz",
  "license": "MIT",
  "devDependencies": {
    "autoprefixer": "^6.5.4",
    "babel-core": "^6.21.0",
    "babel-loader": "^6.2.10",
    "babel-plugin-react-transform": "^2.0.2",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "css-loader": "^0.26.1",
    "html-webpack-plugin": "^2.24.1",
    "json-load": "^1.0.1",
    "postcss-loader": "^1.2.1",
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-transform-hmr": "^1.0.4",
    "style-loader": "^0.13.1",
    "webpack": "^1.13.3",
    "webpack-dev-server": "^1.16.2"
  },
  "dependencies": {}
}


````
其中的 *"scripts": {"start": "webpack" },*就是用来把npm的start命令指向webpack命令
**在控制台执行npm start** 
## webpack其他强大的功能

### Source Maps 方便调试代码
在webpack.config.js 里面配置 devtool
```javascript
devtool:"eval-source-map",
```
### 使用webpack构建本里服务器
安装webpack-dev-server
```
npm install --save-dev webpack-dev-server
```
webpack.config.js里配置devserver
```javascript
devServer: { 
    inline: true,
    hot: true ,//是否热加载
    contentBase:"./public",//本地服务器加载页面的目录
    port:"8080"//端口号
	}
```
package.json
````json
"scripts": {
    "start": "webpack-dev-server --progress"
  },
````

### loaders
* test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
* loader：loader的名称（必须）
* include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
* query：为loaders提供额外的设置选项（可选）

比如我们有一个单独的json文件来存放页面文本内容，config.json
````json
//config.json
{
    "hello":"welcome to webpack!!"
}
````
````javascript
//安装可转换JSON的loader
npm install json-loader
````
````javascript
module:{
		loaders:[
			{
				test:/\.json$/,
				loader:"json"
			}
		]
	},
````
### babel
````javascript
// npm一次性安装多个依赖模块，模块之间用空格隔开
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
````
webpack.config.js 的module下配置
`````javascript
{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015','react']
        }
`````
也可将babel的配置单独出来，放在.babelrc文件
````javascript
// .babelrc
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",

         "imports": ["react"],

         "locals": ["module"]
       }]
     }]]
    }
  }
}
````
现在的你项目允许你使用ES6和JSX了 那我们使用React
````javascript
npm install --save react react-dom
````
content.js 使用ES6语法
````javascript
import config from "./config.json";
import React from 'react';
import styles from './content.css';
class Content extends React.Component{
  render() {
    return (
      <div className={styles.root}>//添加类名
        {config.hello}
      </div>
    );
  }
}

export default Content
````
index.js 使用import导入模块
````javascript
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

render(<Greeter />, document.getElementById('root'));
````
安装css模块加载器
````javascript
npm install --save-dev style-loader css-loader
````
webpack.config.js module 下配置
`````javascript
{
    test: /\.css$/,
    loader: 'style!css'//添加对样式表的处理
}
`````
### CSS module
Webpack从一开始就对CSS模块化提供了支持，在CSS loader中进行配置后，你所需要做的一切就是把”modules“传递都所需要的地方
````javascript
{
    test: /\.css$/,
    loader: 'style!css?modules'//跟前面相比就在后面加上了?modules
}
````
创建content.css,在content.js中 

````javascript
import config from "./config.json";
import React from 'react';
import styles from './content.css'; //导入css
class Content extends React.Component{
  render() {
    return (
      <div className={styles.root}> <!--添加类名 -->
        {config.hello}
      </div>
    );
  }
}

export default Content
````
### 插件
Hot Module Replacement(热刷新插件)
````javascript
//顶部导入
var webpack = require("webpack");
var  HtmlWebpackPlugin  = require('html-webpack-plugin');
````
````javascript
plugins:[
	new webpack.HotModuleReplacementPlugin(),
	new HtmlWebpackPlugin({template:"./component/template.ejs"})
	],
`````