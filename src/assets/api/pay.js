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

export async function getPay(data) {
  try {
    const result = await axios.get("/payinfo", { params: data });
    return result.data;
  } catch (err) {
    console.log(err);
    console.log("请求出错了");
  }
}

export async function createOrder(data) {
  try {
    const result = await axios.post("/createOrder", data);
    return result.data;
  } catch (err) {
    console.log(err);
    console.log("请求出错了");
  }
}
