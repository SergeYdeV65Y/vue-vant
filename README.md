# vant

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目结构

```shell
│  .gitignore Git忽略提交
│  babel.config.js
│  package-lock.json 第三方包版本锁定文件
│  package.json 包描述文件
│  README.md 项目说明文档
│  vue.config.js vue-cli配置文件
│
├─node_modules 保存当前项目本地安装的模块/包
│
├─public 专门保存不需要编译的静态文件的目录
│  │  favicon.ico
│  │  index.html 唯一完成的HTML页面
│  │
│  └─img 图片文件夹
│
└─src  保存所有咱们自己编写的需要打包和编译的代码
    │  App.vue 根组件 <div id="app"></div>
    │  main.js 入口函数 new Vue({})
    │
    ├─assets
    │  └─api 封装函数的文件夹，例如axios
    │
    ├─components 放所有除页面组件之外的一切子组件或全局组件
    │      Swiper.vue
    │
    ├─router 前端路由
    │      index.js
    │
    ├─store
    │      index.js
    │
    └─views 保存所有页面组件
            Details.vue
            Index.vue
```

### 配置懒加载

- 项目本地安装

```shell
npm i @babel/plugin-syntax-dynamic-import -D
```

- 在项目根目录，添加 vue.config.js 配置文件

```js
module.exports = {
  chainWebpack: config => {
    // 删除编译后的独立js文件上的预获取操作
    config.plugins.delete("prefetch");
  }
};
```

### vant

```shell
npm i vant
```

```shell
npm i babel-plugin-import -D
```

babel.config.js 配置

```js
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
};
```

assets/vant/vant-ui.js 按需引入组件

```js
import Vue from "vue";
import {
  AddressEdit,
  AddressList,
  Area,
  Button,
  Card,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Col,
  Dialog,
  Divider,
  Field,
  Grid,
  GridItem,
  Icon,
  Image,
  ImagePreview,
  Lazyload,
  List,
  NavBar,
  Panel,
  PullRefresh,
  Row,
  Stepper,
  SubmitBar,
  Swipe,
  SwipeCell,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Toast,
  Uploader
} from "vant";

Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Area);
Vue.use(Button);
Vue.use(Card);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Field);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(Image);
Vue.use(ImagePreview);
Vue.use(Lazyload);
Vue.use(List);
Vue.use(NavBar);
Vue.use(Panel);
Vue.use(PullRefresh);
Vue.use(Row);
Vue.use(Stepper);
Vue.use(SubmitBar);
Vue.use(Swipe);
Vue.use(SwipeCell);
Vue.use(SwipeItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Uploader);
```

main.js 配置

```js
import "./assets/vant/vant-ui";
```

## axios

```shell
npm i axios
```

main.js 配置

```js
// 导入axios第三方ajax模块
import axios from "axios";
// 配置axios基础路径
axios.defaults.baseURL = "http://127.0.0.1:3000";
// 配置axios保存session信息
axios.defaults.withCredentials = true;
// 将axios注册到vue实例中，由于axios不支持use，所以将实例添加到vue原型
Vue.prototype.axios = axios;
```

assets/api/home.js

```js
import axios from "axios";
// 模块都是单例模式：整个内存中只有一个axios，只不过被导出引用着使用而已
// 所以这里import的axios，就是main.js中配置的axios对象

// export function getBanner() {
//   return new Promise((resolve, reject) => {
//     axios
//       .get("/user/v12/searchuser/root")
//       .then(result => {
//         resolve(result.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

export async function getBanner() {
  try {
    const result = await axios.get("http://localhost:3000/carousel");
    return result.data;
  } catch (err) {
    console.log(err);
    console.log("请求出错了");
  }
}
```

```js
import { getBanner } from "../../assets/api/home.js";
//      对象解构        模块对象，其中包含getIndex()
import swiper from "../../components/Swiper";
export default {
  data() {
    return {
      bannerlist: [{ imgsrc: "" }]
    };
  },
  created() {
    getBanner().then(res => (this.bannerlist = res));
  },
  methods: {},
  components: {
    swiper
  }
};
```
