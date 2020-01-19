import axios from "axios";
// 模块都是单例模式：整个内存中只有一个 axios，只不过被导出引用着使用而已
// 所以这里 import 的 axios，就是 main.js 中配置的 axios 对象

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
    const result = await axios.get("/carousel");
    return result.data;
  } catch (err) {
    console.log(err);
    console.log("请求出错了");
  }
}
